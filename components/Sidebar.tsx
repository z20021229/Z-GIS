'use client';

import React, { useState, useEffect } from 'react';
import { Home, Server, Database, Monitor, ChevronRight, ChevronDown, FileText, BarChart3, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState({
    deployment: false,
    data: false,
    monitor: false
  });

  // 路径匹配时自动展开对应菜单
  useEffect(() => {
    if (pathname.includes('/deployment')) {
      setExpandedMenus(prev => ({ ...prev, deployment: true }));
    } else if (pathname.includes('/data')) {
      setExpandedMenus(prev => ({ ...prev, data: true }));
    } else if (pathname.includes('/monitor')) {
      setExpandedMenus(prev => ({ ...prev, monitor: true }));
    }
  }, [pathname]);

  const toggleMenu = (menu: keyof typeof expandedMenus) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  // 检查菜单项是否激活
  const isActive = (href: string) => {
    return pathname === href;
  };

  // 检查二级菜单项是否激活
  const isSubActive = (parentPath: string) => {
    return pathname.includes(parentPath);
  };

  return (
    <aside className="fixed left-0 top-0 h-full bg-[#001529] text-white w-[260px] shadow-lg z-20 transition-all duration-300 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700 bg-[#000d1a] sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-white">Z-GIS</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 overflow-y-auto flex-1">
        <ul className="space-y-2">
          {/* 主页 */}
          <li>
            <a 
              href="/" 
              className={`flex items-center gap-3 p-2 rounded transition-all duration-200 ${isActive('/') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
            >
              <Home size={18} />
              <span>主页</span>
            </a>
          </li>

          {/* 服务部署 */}
          <li>
            <div 
              className={`flex items-center gap-3 p-2 rounded transition-all duration-200 cursor-pointer ${isSubActive('/deployment') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
              onClick={() => toggleMenu('deployment')}
            >
              <Server size={18} />
              <span className="flex-1">服务部署</span>
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-300 ${expandedMenus.deployment ? 'rotate-90' : ''}`}
              />
            </div>
            <ul 
              className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus.deployment ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <li>
                <a 
                  href="/deployment/host" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/deployment/host') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <FileText size={16} />
                  添加主机
                </a>
              </li>
              <li>
                <a 
                  href="/deployment/driver" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/deployment/driver') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <Database size={16} />
                  数据库驱动管理
                </a>
              </li>
              <li>
                <a 
                  href="/deployment/package" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/deployment/package') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <Upload size={16} />
                  GIS版本包管理
                </a>
              </li>
            </ul>
          </li>

          {/* 数据管理 */}
          <li>
            <div 
              className={`flex items-center gap-3 p-2 rounded transition-all duration-200 cursor-pointer ${isSubActive('/data') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
              onClick={() => toggleMenu('data')}
            >
              <Database size={18} />
              <span className="flex-1">数据管理</span>
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-300 ${expandedMenus.data ? 'rotate-90' : ''}`}
              />
            </div>
            <ul 
              className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus.data ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <li>
                <a 
                  href="/data/source" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/data/source') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <FileText size={16} />
                  数据源管理
                </a>
              </li>
              <li>
                <a 
                  href="/data/layer" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/data/layer') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <MapPin size={16} />
                  图层管理
                </a>
              </li>
            </ul>
          </li>

          {/* 监控管理 */}
          <li>
            <div 
              className={`flex items-center gap-3 p-2 rounded transition-all duration-200 cursor-pointer ${isSubActive('/monitor') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
              onClick={() => toggleMenu('monitor')}
            >
              <Monitor size={18} />
              <span className="flex-1">监控管理</span>
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-300 ${expandedMenus.monitor ? 'rotate-90' : ''}`}
              />
            </div>
            <ul 
              className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus.monitor ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <li>
                <a 
                  href="/monitor/dashboard" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/monitor/dashboard') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <BarChart3 size={16} />
                  监控面板
                </a>
              </li>
              <li>
                <a 
                  href="/monitor/alarm" 
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-200 text-sm ${isActive('/monitor/alarm') ? 'bg-[#1890ff] text-white' : 'hover:bg-gray-700'}`}
                >
                  <FileText size={16} />
                  告警管理
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;