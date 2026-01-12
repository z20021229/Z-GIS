'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Header from '@/components/Header';

const PlatformMonitorPage = () => {
  // 模拟统计数据
  const [stats, setStats] = useState({
    onlineHosts: 12,
    runningServices: 36,
    alarms: 2
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">平台监控</h2>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              刷新数据
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* 在线主机数 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">在线主机数</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.onlineHosts}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    H
                  </div>
                </div>
              </div>
            </div>

            {/* 运行服务数 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">运行服务数</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.runningServices}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                </div>
              </div>
            </div>

            {/* 异常告警数 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">异常告警数</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.alarms}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitoring Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CPU 趋势 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CPU 趋势</h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* 模拟 CPU 趋势图 */}
                <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-green-500 opacity-20 rounded-md"></div>
              </div>
            </div>

            {/* 内存占用 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">内存占用</h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* 模拟内存占用图 */}
                <div className="w-full h-32 bg-gradient-to-r from-yellow-500 to-red-500 opacity-20 rounded-md"></div>
              </div>
            </div>

            {/* 网络流量 */}
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">网络流量</h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* 模拟网络流量图 */}
                <div className="w-full h-32 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformMonitorPage;