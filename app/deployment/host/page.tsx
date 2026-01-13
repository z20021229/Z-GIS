'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EditHostModal from '@/components/Dialog/EditHostModal';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit } from 'lucide-react';
import { HostConfig } from '@/types';

const HostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHost, setEditingHost] = useState<HostConfig | null>(null);
  const [selectedHosts, setSelectedHosts] = useState<string[]>([]);
  // 通知状态
  const [notification, setNotification] = useState<string | null>(null);

  // 从localStorage读取初始数据
  const [hosts, setHosts] = useState<HostConfig[]>([]);

  // 初始化加载数据
  useEffect(() => {
    const savedHosts = localStorage.getItem('z_gis_hosts');
    if (savedHosts) {
      try {
        const parsedHosts = JSON.parse(savedHosts);
        setHosts(parsedHosts);
      } catch (error) {
        console.error('Failed to parse saved hosts:', error);
        // 如果解析失败，使用默认数据
        setHosts([
          {
            ip: '192.168.1.100',
            username: 'admin',
            password: 'password123',
            dbDriver: 'GaussDB',
            dbUser: 'dbadmin',
            dbPassword: 'dbpassword123'
          }
        ]);
      }
    } else {
      // 如果没有保存的数据，使用默认数据
      setHosts([
        {
          ip: '192.168.1.100',
          username: 'admin',
          password: 'password123',
          dbDriver: 'GaussDB',
          dbUser: 'dbadmin',
          dbPassword: 'dbpassword123'
        }
      ]);
    }
  }, []);

  // 生成邻近的10.168.x.x IP
  const generateAdjacentIPs = (baseIP: string): string[] => {
    const ipParts = baseIP.split('.');
    if (ipParts.length !== 4 || ipParts[0] !== '10' || ipParts[1] !== '168') {
      return [];
    }
    
    const fourthOctet = parseInt(ipParts[3], 10);
    const adjacentIPs: string[] = [];
    
    // 生成+1和+2的邻近IP
    for (let i = 1; i <= 2; i++) {
      const newFourthOctet = fourthOctet + i;
      if (newFourthOctet <= 255) {
        adjacentIPs.push(`${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.${newFourthOctet}`);
      }
    }
    
    return adjacentIPs;
  };

  const handleSave = (data: HostConfig) => {
    let updatedHosts: HostConfig[];
    
    if (editingHost) {
      // 编辑现有主机
      updatedHosts = hosts.map(host => 
        host.ip === editingHost.ip ? data : host
      );
      setEditingHost(null);
    } else {
      // 添加新主机
      updatedHosts = [...hosts, data];
      
      // 如果是10.168网段，生成2台邻近IP的虚拟主机
      if (data.ip.startsWith('10.168.')) {
        const adjacentIPs = generateAdjacentIPs(data.ip);
        
        adjacentIPs.forEach(ip => {
          updatedHosts.push({
            ip,
            username: 'root',
            password: 'password',
            dbDriver: 'GaussDB',
            dbUser: 'root',
            dbPassword: 'password'
          });
        });
      }
    }
    
    // 更新状态
    setHosts(updatedHosts);
    // 保存到localStorage
    localStorage.setItem('z_gis_hosts', JSON.stringify(updatedHosts));
    
    // 显示成功通知
    setNotification(`主机 ${data.ip} 已成功注册至运维中心`);
    // 5秒后自动关闭通知
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    
    setIsModalOpen(false);
  };

  const handleEdit = (host: HostConfig) => {
    setEditingHost(host);
    setIsModalOpen(true);
  };

  const handleDelete = (ip: string) => {
    const updatedHosts = hosts.filter(host => host.ip !== ip);
    setHosts(updatedHosts);
    // 保存到localStorage
    localStorage.setItem('z_gis_hosts', JSON.stringify(updatedHosts));
  };

  const handleSelect = (ip: string) => {
    setSelectedHosts(prev => 
      prev.includes(ip) 
        ? prev.filter(id => id !== ip)
        : [...prev, ip]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 成功通知 */}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-in fade-in-0 slide-in-from-top-5">
          ✅ {notification}
        </div>
      )}
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">主机配置管理</h2>
              <div className="flex gap-2">
                {/* 清空缓存按钮 */}
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="text-sm"
                >
                  清空缓存
                </Button>
                <Button onClick={() => {
                  setEditingHost(null);
                  setIsModalOpen(true);
                }}>
                  添加主机配置
                </Button>
              </div>
            </div>
            
            {/* 主机列表表格 */}
            {hosts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectedHosts.length === hosts.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedHosts(hosts.map(host => host.ip));
                          } else {
                            setSelectedHosts([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>主机名</TableHead>
                    <TableHead>IP地址</TableHead>
                    <TableHead>用户名</TableHead>
                    <TableHead>检查结果</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hosts.map((host) => (
                    <TableRow key={host.ip}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedHosts.includes(host.ip)}
                          onCheckedChange={() => handleSelect(host.ip)}
                        />
                      </TableCell>
                      <TableCell>{host.username}@host</TableCell>
                      <TableCell className="flex items-center">
                        {host.ip}
                        {/* 为10.168.网段的主机添加蓝色的'实验网段'标签 */}
                        {host.ip.startsWith('10.168.') && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                            实验网段
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{host.username}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-sm text-green-600">正常</span>
                          {/* 为自动生成的实验网段主机标注状态 */}
                          {hosts.indexOf(host) > 0 && host.ip.startsWith('10.168.') && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                              实验网段自动发现
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(host)}
                          >
                            <Edit size={16} className="mr-1" />
                            编辑
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(host.ip)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            删除
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              /* 空状态 */
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无主机配置</h3>
                <p className="text-gray-500 mb-6">点击下方按钮添加第一个主机配置</p>
                <Button onClick={() => {
                  setEditingHost(null);
                  setIsModalOpen(true);
                }}>
                  添加主机配置
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditHostModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingHost(null);
        }}
        onSave={handleSave}
        initialData={editingHost || undefined}
      />
    </div>
  );
};

export default HostPage;