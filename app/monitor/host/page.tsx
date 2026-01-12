'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

// 主机类型
interface Host {
  id: string;
  name: string;
  ip: string;
  cpuLoad: number;
  memoryLoad: number;
  diskUsage: number;
  status: 'online' | 'offline';
}

const HostMonitorPage = () => {
  // 模拟主机数据
  const [hosts, setHosts] = useState<Host[]>([
    {
      id: '1',
      name: '测试主机',
      ip: '10.168.207.94',
      cpuLoad: 12,
      memoryLoad: 65,
      diskUsage: 45,
      status: 'online'
    },
    {
      id: '2',
      name: 'Host 2',
      ip: '192.168.1.101',
      cpuLoad: 28,
      memoryLoad: 72,
      diskUsage: 58,
      status: 'online'
    },
    {
      id: '3',
      name: 'Host 3',
      ip: '192.168.1.102',
      cpuLoad: 5,
      memoryLoad: 42,
      diskUsage: 32,
      status: 'offline'
    }
  ]);

  // 模拟实时负载变化，每3秒更新一次
  useEffect(() => {
    const interval = setInterval(() => {
      setHosts(prevHosts => 
        prevHosts.map(host => {
          if (host.status === 'online') {
            // 在线主机随机更新负载
            return {
              ...host,
              cpuLoad: Math.floor(Math.random() * 100),
              memoryLoad: Math.floor(Math.random() * 100),
              diskUsage: Math.floor(Math.random() * 100)
            };
          }
          return host;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">主机监控</h2>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              查看详情
            </Button>
          </div>

          {/* Host List Table */}
          <div className="bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>主机名</TableHead>
                  <TableHead>IP地址</TableHead>
                  <TableHead>CPU负载</TableHead>
                  <TableHead>内存占用</TableHead>
                  <TableHead>磁盘使用</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosts.map((host) => (
                  <TableRow key={host.id}>
                    <TableCell>{host.name}</TableCell>
                    <TableCell>{host.ip}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${host.cpuLoad}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{host.cpuLoad}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${host.memoryLoad}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{host.memoryLoad}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-yellow-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${host.diskUsage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{host.diskUsage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${host.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className={host.status === 'online' ? 'text-green-600' : 'text-red-600'}>
                          {host.status === 'online' ? '在线' : '离线'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostMonitorPage;