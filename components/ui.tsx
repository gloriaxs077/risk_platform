import React from 'react';
import { RiskLevel, ProcessStatus } from '../types';

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: React.ReactNode; subTitle?: React.ReactNode; extra?: React.ReactNode }> = ({
  children,
  className = '',
  title,
  subTitle,
  extra
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-border shadow-[0_10px_26px_rgba(15,23,42,0.08)] overflow-hidden ${className}`}>
      {(title || extra) && (
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subTitle && <p className="text-xs text-text-secondary mt-1">{subTitle}</p>}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

// --- Status Light ---
export const StatusLight: React.FC<{ level: RiskLevel | 'active' | 'inactive'; size?: 'sm' | 'md' }> = ({ level, size = 'md' }) => {
  let color = 'bg-gray-400';
  let shadow = 'shadow-gray-400/50';

  switch (level) {
    case RiskLevel.HIGH:
      color = 'bg-risk-high';
      shadow = 'shadow-risk-high/50';
      break;
    case RiskLevel.MEDIUM:
      color = 'bg-risk-med';
      shadow = 'shadow-risk-med/50';
      break;
    case RiskLevel.WARNING:
      color = 'bg-yellow-500';
      shadow = 'shadow-yellow-500/50';
      break;
    case RiskLevel.LOW:
      color = 'bg-risk-low';
      shadow = 'shadow-risk-low/50';
      break;
    case RiskLevel.NORMAL:
      color = 'bg-risk-low';
      shadow = 'shadow-risk-low/50';
      break;
  }

  const dims = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <div className={`rounded-full ${color} ${dims} shadow-sm ring-2 ring-white ${shadow}`} />
  );
};

// --- Badge ---
export const Badge: React.FC<{ text: string; type: RiskLevel | 'blue' | 'gray' }> = ({ text, type }) => {
  let bg = 'bg-gray-100 text-gray-600';
  
  switch (type) {
    case RiskLevel.HIGH:
      bg = 'bg-red-50 text-red-600 border border-red-100';
      break;
    case RiskLevel.MEDIUM:
      bg = 'bg-orange-50 text-orange-600 border border-orange-100';
      break;
    case RiskLevel.WARNING:
      bg = 'bg-yellow-50 text-yellow-600 border border-yellow-100';
      break;
    case RiskLevel.LOW:
      bg = 'bg-green-50 text-green-600 border border-green-100';
      break;
    case 'blue':
      bg = 'bg-blue-50 text-blue-600 border border-blue-100';
      break;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${bg}`}>
      {text}
    </span>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'sm' | 'md';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  let baseClass = 'inline-flex items-center justify-center transition-colors duration-200 focus:outline-none';
  let variantClass = '';
  let sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-5 py-2 text-sm';
  let roundedClass = 'rounded-full';

  if (variant === 'primary') {
    variantClass = 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-blue-500/20';
  } else if (variant === 'ghost') {
    variantClass = 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50';
  } else if (variant === 'link') {
    variantClass = 'text-primary hover:underline p-0 bg-transparent';
    roundedClass = '';
    sizeClass = '';
  }

  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass} ${roundedClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Process Badge ---
export const StatusBadge: React.FC<{ status: ProcessStatus }> = ({ status }) => {
  switch (status) {
    case ProcessStatus.PENDING:
      return <Badge text="● 待处理" type={RiskLevel.MEDIUM} />; // Visual orange
    case ProcessStatus.PROCESSING:
      return <Badge text="● 处理中" type="blue" />;
    case ProcessStatus.CLOSED:
      return <Badge text="● 已关闭" type={RiskLevel.LOW} />; // Visual green
    default:
      return <Badge text={status} type="gray" />;
  }
};