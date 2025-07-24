import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
    <Home size={16} />
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ChevronRight size={16} />
        <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700 cursor-pointer'}>
          {item.label}
        </span>
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumb;
