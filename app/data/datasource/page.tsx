'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { InputField } from '@/components/ui/InputField';
import { PasswordField } from '@/components/ui/PasswordField';
import { Check, Loader2 } from 'lucide-react';

// 数据源类型
interface DataSource {
  id: string;
  name: string;
  type: 'GaussDB' | 'PostgreSQL';
  connection: string;
  status: 'connected' | 'disconnected';
  creator: string;
  createTime: string;
}

const DataSourcePage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');

  // 模拟数据
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Test GaussDB',
      type: 'GaussDB',
      connection: '192.168.1.100:5432/test_db',
      status: 'connected',
      creator: 'admin',
      createTime: '2026-01-10 14:30'
    },
    {
      id: '2',
      name: 'Test PostgreSQL',
      type: 'PostgreSQL',
      connection: '192.168.1.101:5432/test_db',
      status: 'disconnected',
      creator: 'admin',
      createTime: '2026-01-09 09:15'
    }
  ]);

  // 显示 Toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 模拟测试连接
  const handleTestConnection = async () => {
    setTestStatus('testing');
    
    // 模拟1秒延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTestStatus('success');
    showToast('✅ 连接成功', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Toast 提示 */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg animate-in fade-in-0 slide-in-from-top-5 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title and Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">数据源管理</h2>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              添加数据源
            </Button>
          </div>

          {/* Data Source List Table */}
          <div className="bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>数据源名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>连接地址</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>创建人</TableHead>
                  <TableHead>创建时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell>{source.name}</TableCell>
                    <TableCell>{source.type}</TableCell>
                    <TableCell>{source.connection}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${source.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className={source.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                          {source.status === 'connected' ? '已连接' : '未连接'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{source.creator}</TableCell>
                    <TableCell>{source.createTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add Data Source Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="w-[600px] max-w-[90vw] bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle>添加数据源</DialogTitle>
          </DialogHeader>
          
          <form className="space-y-6 p-4">
            {/* 数据源名称 */}
            <InputField
              label="数据源名称"
              id="name"
              required
              placeholder="输入数据源名称"
            />

            {/* 类型选择 */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label htmlFor="type" className="col-span-3 text-right font-medium">
                <span className="text-red-500 mr-1">*</span>类型
              </label>
              <div className="col-span-9">
                <Select defaultValue="GaussDB">
                  <SelectTrigger id="type" className="focus:ring-blue-500">
                    <SelectValue placeholder="选择数据库类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GaussDB">GaussDB</SelectItem>
                    <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* IP */}
            <InputField
              label="IP"
              id="ip"
              required
              placeholder="输入IP地址"
            />

            {/* 端口 */}
            <InputField
              label="端口"
              id="port"
              type="number"
              required
              placeholder="输入端口"
            />

            {/* 库名 */}
            <InputField
              label="库名"
              id="dbName"
              required
              placeholder="输入数据库名称"
            />

            {/* 用户名 */}
            <InputField
              label="用户名"
              id="username"
              required
              placeholder="输入用户名"
            />

            {/* 密码 */}
            <PasswordField
              label="密码"
              id="password"
              required
              placeholder="输入密码"
            />

            {/* 测试连接按钮 */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3"></div>
              <button
                type="button"
                onClick={handleTestConnection}
                className="col-span-9 text-left text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                disabled={testStatus === 'testing'}
              >
                {testStatus === 'testing' ? (
                  <>
                    <Loader2 size={16} className="inline mr-1 animate-spin" /> 测试中...
                  </>
                ) : testStatus === 'success' ? (
                  <>
                    <Check size={16} className="inline mr-1 text-green-500" /> 连接成功
                  </>
                ) : (
                  '测试连接'
                )}
              </button>
            </div>
          </form>
          
          <DialogFooter className="border-t p-4">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourcePage;