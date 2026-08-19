import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: Readonly<ButtonProps>) {
  const base = 'px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 focus:outline-none shadow-xs';
  const variants = {
    primary: 'bg-primary_blue hover:bg-primary_blue-hover text-white active:scale-[0.98]',
    secondary: 'bg-zinc-800 hover:bg-zinc-900 text-white active:scale-[0.98]',
    outline: 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-400 active:scale-[0.98]',
  };

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
