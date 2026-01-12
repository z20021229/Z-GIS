'use client';

import React, { useState } from 'react';
import { Home, Server, Database, Monitor } from 'lucide-react';

const Sidebar = () => {
  const [serviceDeploymentExpanded, setServiceDeploymentExpanded] = useState(false);

  return (
    <aside className="fixed left-0 top-0 h-full bg-[#001529] text-white w-[260px] shadow-lg z-20">
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
              href="#" 
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
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
              <span className="ml-auto">{serviceDeploymentExpanded ? '▼' : '▶'}</span>
            </div>
            {serviceDeploymentExpanded && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors text-sm">
                    添加主机
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* 数据管理 */}
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <Database size={18} />
              <span>数据管理</span>
            </a>
          </li>

          {/* 监控管理 */}
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
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