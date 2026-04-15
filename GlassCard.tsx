import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  noPadding = false
}) => {
  return (
    <div className={`glass rounded-2xl ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
};
