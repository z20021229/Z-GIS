'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import EditHostModal from '@/components/Dialog/EditHostModal';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Checkbox } from '@/components/ui/Checkbox';
import { Trash2, Edit } from 'lucide-react';
import { HostConfig } from '@/types';

const HostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHost, setEditingHost] = useState<HostConfig | null>(null);
  const [selectedHosts, setSelectedHosts] = useState<string[]>([]);

  // 模拟数据
  const [hosts, setHosts] = useState<HostConfig[]>([
    {
      ip: '192.168.1.100',
      username: 'admin',
      password: 'password123',
      dbDriver: 'GaussDB',
      dbUser: 'dbadmin',
      dbPassword: 'dbpassword123'
    }
  ]);

  const handleSave = (data: HostConfig) => {
    if (editingHost) {
      // 编辑现有主机
      setHosts(prev => prev.map(host => 
        host.ip === editingHost.ip ? data : host
      ));
      setEditingHost(null);
    } else {
      // 添加新主机
      setHosts(prev => [...prev, data]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (host: HostConfig) => {
    setEditingHost(host);
    setIsModalOpen(true);
  };

  const handleDelete = (ip: string) => {
    setHosts(prev => prev.filter(host => host.ip !== ip));
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
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">主机配置管理</h2>
              <Button onClick={() => {
                setEditingHost(null);
                setIsModalOpen(true);
              }}>
                添加主机配置
              </Button>
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
                      <TableCell>{host.ip}</TableCell>
                      <TableCell>{host.username}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-sm text-green-600">正常</span>
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