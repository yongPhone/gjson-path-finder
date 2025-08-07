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
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-medium">GJSON</span>
          </a>
        </div>
      </header>
      
      <main className="w-full max-w-screen-2xl mx-auto p-4 flex flex-col gap-4 h-[calc(100vh-80px)]">
        {/* Tool Description */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border border-teal-200/50 rounded-xl p-6 shadow-sm">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 to-cyan-100/20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(20,184,166,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(6,182,212,0.08)_0%,_transparent_50%)]"></div>
          </div>
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-teal-900 mb-1">Designed for GJSON</h3>
              <p className="text-sm text-teal-800/90 leading-relaxed">
                This tool works with <a href="https://github.com/tidwall/gjson" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-medium underline decoration-dotted hover:text-teal-900 transition-colors">GJSON</a>, 
                a fast Go JSON parsing library. Generate various path expressions including direct paths, wildcards, and queries with just a click.
              </p>
            </div>
            <div className="hidden sm:flex items-center text-teal-600/40">
              <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Generated Paths - Top Section */}
        <div className={`${generatedPaths.length > 0 ? 'h-48' : 'h-auto'} min-h-0`}>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-800">Generated GJSON Paths</h2>
              {generatedPaths.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">
                    {generatedPaths.length} path{generatedPaths.length !== 1 ? 's' : ''}
                  </span>
                  {generatedPaths.length > 3 && (
                    <span className="text-slate-500 flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                      </svg>
                      Scroll for more
                    </span>
                  )}
                </div>
              )}
            </div>
            {generatedPaths.length === 0 ? (
              <p className="text-slate-500">Select a node in the JSON tree to see its paths here.</p>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {generatedPaths.map((path, index) => (
                    <li key={index} className="flex items-center justify-between bg-slate-100 p-2.5 rounded-md">
                      <code className="text-sm text-slate-900 break-all mr-4">{path}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(path);
                          // You can add copy feedback here if needed
                        }}
                        className="p-1.5 rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                        aria-label={`Copy path ${path}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left Column: JSON Input */}
          <div className="h-full">
            <JsonInput value={jsonString} onChange={setJsonString} error={error} />
          </div>

          {/* Right Column: Interactive JSON Tree */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col h-full">
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
      </main>
    </div>
  );
};

export default App;