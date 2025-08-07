import React from 'react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JsonInput: React.FC<JsonInputProps> = ({ value, onChange, error }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col h-full">
      <label htmlFor="json-input" className="text-lg font-semibold mb-2 text-slate-800">
        Your JSON
      </label>
      <div className="relative flex-grow">
        <textarea
          id="json-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-full p-3 rounded-md border font-mono text-sm leading-relaxed resize-none
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-teal-400'} 
            focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-slate-50`}
          spellCheck="false"
          aria-invalid={!!error}
          aria-describedby={error ? "json-error" : undefined}
        />
      </div>
      {error && (
        <div id="json-error" role="alert" className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default JsonInput;