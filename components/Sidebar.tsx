'use client';

import React, { useState, useEffect } from 'react';
import { Home, Server, Database, Monitor } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [serviceDeploymentExpanded, setServiceDeploymentExpanded] = useState(false);

  // 路径匹配时自动展开对应菜单
  useEffect(() => {
    if (pathname.includes('/deployment')) {
      setServiceDeploymentExpanded(true);
    }
  }, [pathname]);

  return (
    <aside className="fixed left-0 top-0 h-full bg-[#001529] text-white w-[260px] shadow-lg z-20 transition-all duration-300">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Z-GIS</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {/* 主页 */}
          <li>
            <a 
              href="/" 
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors ${pathname === '/' ? 'bg-gray-700' : ''}`}
            >
              <Home size={18} />
              <span>主页</span>
            </a>
          </li>

          {/* 服务部署 */}
          <li>
            <div 
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => setServiceDeploymentExpanded(!serviceDeploymentExpanded)}
            >
              <Server size={18} />
              <span>服务部署</span>
              <span className="ml-auto transition-transform duration-300">
                {serviceDeploymentExpanded ? '▼' : '▶'}
              </span>
            </div>
            <ul 
              className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${serviceDeploymentExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <li>
                <a 
                  href="/deployment/host" 
                  className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors text-sm ${pathname === '/deployment/host' ? 'bg-gray-700' : ''}`}
                >
                  添加主机
                </a>
              </li>
            </ul>
          </li>

          {/* 数据管理 */}
          <li>
            <a 
              href="/data" 
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors ${pathname === '/data' ? 'bg-gray-700' : ''}`}
            >
              <Database size={18} />
              <span>数据管理</span>
            </a>
          </li>

          {/* 监控管理 */}
          <li>
            <a 
              href="/monitor" 
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors ${pathname === '/monitor' ? 'bg-gray-700' : ''}`}
            >
              <Monitor size={18} />
              <span>监控管理</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;