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
        <div className="w-full max-w-screen-2xl mx-auto flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
          </svg>
          <div>
            <h1 className="text-xl font-bold">GJSON Path Finder</h1>
            <p className="text-sm text-blue-100">Click any key or value in the JSON tree to generate its paths.</p>
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