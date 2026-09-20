'use client';

import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  iconClassName?: string;
}

export default function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select...', 
  triggerClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  iconClassName = 'text-on-surface-variant'
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between focus:outline-none transition-all ${triggerClassName} ${isOpen ? 'ring-2 ring-primary/20 border-primary' : ''}`}
      >
        <span className={`truncate ${selectedOption ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ml-2 ${iconClassName} ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>
      
      {isOpen && (
        <div className={`absolute z-50 bg-surface-container-lowest border border-surface-container rounded-xl shadow-xl py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto ${dropdownClassName}`}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left truncate hover:bg-surface-container transition-colors ${optionClassName} ${value === option.value ? 'bg-primary-container/30 text-primary font-bold' : 'text-on-surface'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
