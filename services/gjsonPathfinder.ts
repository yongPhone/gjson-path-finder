import type { Json, PathSegment } from '../types';

// Helper to escape special GJSON characters in a path segment.
function escapeGjsonSegment(segment: PathSegment): string {
    if (typeof segment === 'number') {
        return String(segment);
    }
    // Escape characters that have special meaning in gjson paths, including '.'
    return segment.replace(/([\\.*?|#@.])/g, '\\$1');
}

// Helper to safely get a value from a path
function getValueByPath(data: Json, path: PathSegment[]): Json | undefined {
  let current: any = data;
  for (const segment of path) {
    if (current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[segment];
  }
  return current;
}

// Recursively find all paths to a value that matches the selected primitive value.
function findPathsToValue(currentData: Json, selectedValue: Json, currentPath: PathSegment[], results: Set<string>) {
    if (currentData === selectedValue) {
        if (currentPath.length > 0) {
            results.add(currentPath.map(escapeGjsonSegment).join('.'));
        }
    }

    if (Array.isArray(currentData)) {
        currentData.forEach((item, index) => {
            findPathsToValue(item, selectedValue, [...currentPath, index], results);
        });
    } else if (typeof currentData === 'object' && currentData !== null) {
        Object.entries(currentData).forEach(([key, value]) => {
            findPathsToValue(value, selectedValue, [...currentPath, key], results);
        });
    }
}


export function generateGjsonPaths(path: PathSegment[], jsonData: Json, selectedValue: Json): string[] {
  if (!path || path.length === 0) {
    return [];
  }
  const pathSet = new Set<string>();

  // 1. Direct path
  const directPath = path.map(escapeGjsonSegment).join('.');
  pathSet.add(directPath);

  // 2. Generate wildcard and query paths by iterating up the tree
  for (let i = 0; i < path.length; i++) {
    const parentPath = path.slice(0, i);
    const parentNode = getValueByPath(jsonData, parentPath);

    if (Array.isArray(parentNode)) {
      const itemPath = path.slice(0, i + 1);
      const itemNode = getValueByPath(jsonData, itemPath);
      const suffixPath = path.slice(i + 1).map(escapeGjsonSegment).join('.');
      
      const parentPathStr = parentPath.map(escapeGjsonSegment).join('.');
      const prefix = parentPathStr ? parentPathStr + '.' : '';

      // a) Wildcard '?' (first match) and '*' (all matches) paths
      const wildcardPath = `${prefix}?${suffixPath ? '.' + suffixPath : ''}`;
      pathSet.add(wildcardPath);

      const starWildcardPath = `${prefix}*${suffixPath ? '.' + suffixPath : ''}`;
      pathSet.add(starWildcardPath);
      
      // b) Query path '#(...)'
      if (typeof itemNode === 'object' && itemNode !== null && !Array.isArray(itemNode)) {
          // If the item is an object, find good keys to query by
          Object.keys(itemNode).forEach(key => {
              const value = itemNode[key];
              // Only create queries for primitive values
              if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                  const valueStr = JSON.stringify(value);
                  const queryKey = escapeGjsonSegment(key);
                  const query = `#(${queryKey}==${valueStr})`;
                  const queryPath = `${prefix}${query}${suffixPath ? '.' + suffixPath : ''}`;
                  pathSet.add(queryPath);
              }
          });
      } else if ((typeof itemNode !== 'object' || itemNode === null) && !suffixPath) {
          // If the item in the array is a primitive value, we can query for it directly.
          // This only makes sense if the primitive itself was selected (i.e., suffixPath is empty).
          const valueStr = JSON.stringify(itemNode);
          const query = `#(.==${valueStr})`;
          const queryPath = `${prefix}${query}`;
          pathSet.add(queryPath);
      }
    }
  }

  // 3. Find other paths to the same primitive value
  if (typeof selectedValue !== 'object' || selectedValue === null) {
      findPathsToValue(jsonData, selectedValue, [], pathSet);
  }

  return Array.from(pathSet).sort((a, b) => {
      // Prioritize shorter paths and direct paths over queries/wildcards
      const aLen = a.length;
      const bLen = b.length;
      const aIsQuery = a.includes('#') || a.includes('?');
      const bIsQuery = b.includes('#') || b.includes('?');

      if (aIsQuery && !bIsQuery) return 1;
      if (!aIsQuery && bIsQuery) return -1;
      if (a.includes('*') && !b.includes('*')) return 1;
      if (!a.includes('*') && b.includes('*')) return -1;
      return aLen - bLen;
  });
}