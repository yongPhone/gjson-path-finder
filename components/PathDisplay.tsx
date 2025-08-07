import React, { useState } from 'react';

interface PathDisplayProps {
  paths: string[];
}

const CopyIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const PathDisplay: React.FC<PathDisplayProps> = ({ paths }) => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  if (paths.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-2 text-slate-800">Generated GJSON Paths</h2>
        <p className="text-slate-500">Select a node in the JSON tree to see its paths here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-3 text-slate-800">Generated GJSON Paths</h2>
      <ul className="space-y-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center justify-between bg-slate-100 p-2.5 rounded-md">
            <code className="text-sm text-slate-900 break-all mr-4">{path}</code>
            <button
              onClick={() => handleCopy(path)}
              className="p-1.5 rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
              aria-label={`Copy path ${path}`}
            >
              {copiedPath === path ? (
                 <CheckIcon className="h-5 w-5 text-teal-500" />
              ) : (
                 <CopyIcon className="h-5 w-5 text-slate-500" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PathDisplay;