import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  const formatLabel = (text: string) => {
    if (text.includes('*')) {
      const parts = text.split('*');
      return (
        <>
          {parts[0]}
          <span className="text-red-500 font-bold ml-0.5">*</span>
          {parts.slice(1).join('*')}
        </>
      );
    }
    return text;
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-zinc-700">
        {formatLabel(label)}
      </label>
      <input
        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary_blue focus:border-primary_blue transition-all shadow-2xs ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}
