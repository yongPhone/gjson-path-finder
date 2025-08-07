import React, { useState, useMemo, useCallback } from 'react';
import JsonInput from './components/JsonInput';
import JsonViewer from './components/JsonViewer';
import PathDisplay from './components/PathDisplay';
import { generateGjsonPaths } from './services/gjsonPathfinder';
import { JsonNodeInfo } from './types';
import { DEFAULT_JSON } from './constants';

const App: React.FC = () => {
  const [jsonString, setJsonString] = useState<string>(DEFAULT_JSON);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<JsonNodeInfo | null>(null);

  const parsedJson = useMemo(() => {
    if (!jsonString.trim()) {
      setError(null);
      setSelectedNode(null);
      return null;
    }
    try {
      const parsed = JSON.parse(jsonString);
      setError(null);
      return parsed;
    } catch (e) {
      if (e instanceof Error) {
        setError(`Invalid JSON: ${e.message}`);
      } else {
        setError('An unknown error occurred while parsing JSON.');
      }
      setSelectedNode(null);
      return null;
    }
  }, [jsonString]);

  const handleNodeSelect = useCallback((nodeInfo: JsonNodeInfo) => {
    setSelectedNode(nodeInfo);
  }, []);
  
  const generatedPaths = useMemo(() => {
    if (selectedNode && parsedJson) {
      return generateGjsonPaths(selectedNode.path, parsedJson, selectedNode.value);
    }
    return [];
  }, [selectedNode, parsedJson]);

  return (
    <div className="min-h-screen font-sans flex flex-col bg-slate-100">
      <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
            </svg>
            <div className="flex-1">
              <h1 className="text-xl font-bold">GJSON Path Finder</h1>
              <p className="text-sm text-blue-100">Click any key or value in the JSON tree to generate GJSON paths</p>
            </div>
            <a 
              href="https://github.com/tidwall/gjson" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium">GJSON</span>
            </a>
          </div>
          <div className="text-sm text-blue-100 bg-white/10 rounded-lg p-3">
            <p>
              This tool is designed for <a href="https://github.com/tidwall/gjson" target="_blank" rel="noopener noreferrer" className="text-white font-medium underline hover:text-blue-200">GJSON</a>, 
              a fast Go JSON parsing library that supports dot syntax path queries. Use this tool to easily generate various GJSON path expressions, 
              including direct paths, wildcard paths, and query paths.
            </p>
          </div>
        </div>
      </header>
      
      <main className="w-full max-w-screen-2xl mx-auto p-4 flex flex-col gap-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow min-h-0">
          <JsonInput value={jsonString} onChange={setJsonString} error={error} />

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-lg font-semibold mb-2 text-slate-800">Interactive JSON Tree</h2>
            <div className="flex-grow overflow-hidden">
              {parsedJson !== null ? (
                <JsonViewer 
                  data={parsedJson} 
                  onNodeSelect={handleNodeSelect} 
                  selectedPath={selectedNode?.path || []} 
                />
              ) : (
                <div className="text-slate-400 h-full flex items-center justify-center">
                  <p>{error ? 'Fix the JSON to see the tree.' : 'Enter valid JSON to get started.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <PathDisplay paths={generatedPaths} />
      </main>
    </div>
  );
};

export default App;