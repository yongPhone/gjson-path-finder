import React from 'react';
import type { Json, PathSegment, JsonNodeInfo } from '../types';

const isPathSelected = (currentPath: PathSegment[], selectedPath: PathSegment[]): boolean => {
  if (currentPath.length !== selectedPath.length) return false;
  return currentPath.every((segment, index) => segment === selectedPath[index]);
};

// Component for rendering the visual style of a primitive value
const PrimitiveValueDisplay: React.FC<{
  value: string | number | boolean;
}> = ({ value }) => {
  let valueClass = 'text-fuchsia-600'; // boolean
  let displayValue: string = String(value);

  if (typeof value === 'string') {
    valueClass = 'text-green-600';
    displayValue = `"${value}"`;
  } else if (typeof value === 'number') {
    valueClass = 'text-orange-600';
  }
  return <span className={valueClass}>{displayValue}</span>;
};

// The main recursive renderer for the JSON tree
const JsonNodeRenderer: React.FC<{
  data: Json;
  path: PathSegment[];
  onNodeSelect: (nodeInfo: JsonNodeInfo) => void;
  selectedPath: PathSegment[];
  prefix?: React.ReactNode;
}> = ({ data, path, onNodeSelect, selectedPath, prefix }) => {
  
  const isSelected = isPathSelected(path, selectedPath);
  const selectedClass = isSelected ? 'bg-sky-100 rounded' : 'hover:bg-slate-100 rounded';

  const handleNodeClick = (e: React.MouseEvent, nodeValue: Json) => {
    e.stopPropagation();
    onNodeSelect({ path, value: nodeValue });
  };
  
  // Base case: Render primitive values
  if (data === null || typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return (
      <span className={`cursor-pointer p-0.5 ${selectedClass}`} onClick={(e) => handleNodeClick(e, data)}>
        {prefix}
        {data === null ? (
          <span className="text-fuchsia-600">null</span>
        ) : (
          <PrimitiveValueDisplay value={data} />
        )}
      </span>
    );
  }

  // Recursive case: Render arrays
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span onClick={(e) => handleNodeClick(e, data)}>{prefix}[]</span>;
    }
    return (
      <div>
        <span className={`cursor-pointer p-0.5 ${selectedClass}`} onClick={(e) => handleNodeClick(e, data)}>{prefix}[</span>
        <div className="pl-6">
          {data.map((item, index) => (
            <div key={index}>
              <JsonNodeRenderer
                data={item}
                path={[...path, index]}
                onNodeSelect={onNodeSelect}
                selectedPath={selectedPath}
              />
              {index < data.length - 1 && <span className="text-slate-500">,</span>}
            </div>
          ))}
        </div>
        <span>]</span>
      </div>
    );
  }

  // Recursive case: Render objects
  const entries = Object.entries(data);
  if (entries.length === 0) {
    return <span onClick={(e) => handleNodeClick(e, data)}>{prefix}{'{ }'}</span>;
  }
  return (
    <div>
      <span className={`cursor-pointer p-0.5 ${selectedClass}`} onClick={(e) => handleNodeClick(e, data)}>{prefix}{'{'}</span>
      <div className="pl-6">
        {entries.map(([key, value], index) => {
          const keyPath = [...path, key];
          const isKeySelected = isPathSelected(keyPath, selectedPath);
          const keySelectedClass = isKeySelected ? 'bg-sky-100 rounded' : 'hover:bg-slate-100 rounded';
          
          const keyPrefix = (
             <span
                className={`text-sky-600 font-medium cursor-pointer p-0.5 ${keySelectedClass}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeSelect({ path: keyPath, value });
                }}
              >
                "{key}"
              </span>
          );

          return (
            <div key={key}>
              <JsonNodeRenderer
                data={value}
                path={keyPath}
                onNodeSelect={onNodeSelect}
                selectedPath={selectedPath}
                prefix={<>{keyPrefix}<span className="text-slate-500">: </span></>}
              />
              {index < entries.length - 1 && <span className="text-slate-500">,</span>}
            </div>
          );
        })}
      </div>
      <span>{'}'}</span>
    </div>
  );
};


interface JsonViewerProps {
  data: Json;
  onNodeSelect: (nodeInfo: JsonNodeInfo) => void;
  selectedPath: PathSegment[];
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, onNodeSelect, selectedPath }) => {
  return (
    <div className="overflow-auto h-full font-mono text-sm leading-relaxed">
      <JsonNodeRenderer data={data} path={[]} onNodeSelect={onNodeSelect} selectedPath={selectedPath} />
    </div>
  );
};

export default JsonViewer;