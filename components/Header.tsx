'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  
  // 路由到面包屑名称的映射
  const routeToNameMap: Record<string, string> = {
    '/': '主页',
    '/deployment': '服务部署',
    '/deployment/host': '添加主机',
    '/deployment/driver': '数据库驱动管理',
    '/data': '数据管理',
    '/data/source': '数据源管理',
    '/data/layer': '图层管理',
    '/monitor': '监控管理',
    '/monitor/dashboard': '监控面板',
    '/monitor/alarm': '告警管理'
  };
  
  // 生成面包屑数组
  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ path: '/', name: '主页' }];
    
    if (pathname === '/') {
      return breadcrumbs;
    }
    
    const segments = pathname.split('/').filter(Boolean);
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath = `${currentPath}/${segment}`;
      const fullPath = index === segments.length - 1 ? currentPath : `${currentPath}`;
      const name = routeToNameMap[fullPath] || segment;
      
      breadcrumbs.push({ path: currentPath, name });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
              <span 
                className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-blue-600 cursor-pointer'}
                onClick={() => {
                  if (index < breadcrumbs.length - 1) {
                    window.location.href = crumb.path;
                  }
                }}
              >
                {crumb.name}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;