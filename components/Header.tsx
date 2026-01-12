'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeaderProps {
  breadcrumbs: string[];
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
              <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-blue-600 cursor-pointer'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;