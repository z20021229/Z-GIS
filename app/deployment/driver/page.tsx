'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Checkbox } from '@/components/ui/Checkbox';
import { Switch } from '@/components/ui/Switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Trash2, Edit, Upload, Database as DatabaseIcon } from 'lucide-react';

// 驱动类型
interface Driver {
  id: string;
  name: string;
  type: 'GaussDB' | 'PostgreSQL' | 'MySQL';
  version: string;
  isDefault: boolean;
  uploader: string;
  icon: React.ReactNode;
}

const DriverPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'GaussDB',
      type: 'GaussDB',
      version: '505.2.1',
      isDefault: true,
      uploader: 'admin',
      icon: <DatabaseIcon size={20} className="text-blue-500" />
    },
    {
      id: '2',
      name: 'PostgreSQL',
      type: 'PostgreSQL',
      version: '15.3',
      isDefault: false,
      uploader: 'admin',
      icon: <DatabaseIcon size={20} className="text-green-500" />
    },
    {
      id: '3',
      name: 'MySQL',
      type: 'MySQL',
      version: '8.0.33',
      isDefault: false,
      uploader: 'admin',
      icon: <DatabaseIcon size={20} className="text-orange-500" />
    }
  ]);

  // 处理默认驱动切换
  const handleDefaultToggle = (driverId: string, type: Driver['type'], checked: boolean) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => ({
        ...driver,
        isDefault: driver.id === driverId 
          ? checked 
          : driver.type === type && driver.isDefault 
            ? false 
            : driver.isDefault
      }))
    );
  };

  // 处理选择驱动
  const handleSelectDriver = (driverId: string) => {
    setSelectedDrivers(prev => 
      prev.includes(driverId) 
        ? prev.filter(id => id !== driverId)
        : [...prev, driverId]
    );
  };

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDrivers(drivers.map(driver => driver.id));
    } else {
      setSelectedDrivers([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title and Upload Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">数据库驱动管理</h2>
            <Button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Upload size={16} className="mr-1" />
              上传新驱动
            </Button>
          </div>

          {/* Driver List Table */}
          <div className="bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox 
                      checked={selectedDrivers.length === drivers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-12">驱动图标</TableHead>
                  <TableHead>驱动名称</TableHead>
                  <TableHead>适用版本</TableHead>
                  <TableHead>默认状态</TableHead>
                  <TableHead>上传人</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedDrivers.includes(driver.id)}
                        onCheckedChange={() => handleSelectDriver(driver.id)}
                      />
                    </TableCell>
                    <TableCell>{driver.icon}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.version}</TableCell>
                    <TableCell>
                      <Switch 
                        checked={driver.isDefault}
                        onCheckedChange={(checked) => handleDefaultToggle(driver.id, driver.type, checked)}
                      />
                    </TableCell>
                    <TableCell>{driver.uploader}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => console.log('Edit driver:', driver.id)}
                        >
                          <Edit size={16} className="mr-1" />
                          编辑
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setDrivers(prev => prev.filter(d => d.id !== driver.id));
                            setSelectedDrivers(prev => prev.filter(id => id !== driver.id));
                          }}
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
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="w-[500px] max-w-[90vw] bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle>上传新驱动</DialogTitle>
          </DialogHeader>
          
          <div className="p-4 space-y-6">
            {/* 选择数据库类型 */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label htmlFor="dbType" className="col-span-4 text-right font-medium">
                <span className="text-red-500 mr-1">*</span>数据库类型
              </label>
              <div className="col-span-8">
                <Select defaultValue="GaussDB">
                  <SelectTrigger id="dbType" className="focus:ring-blue-500">
                    <SelectValue placeholder="选择数据库类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GaussDB">GaussDB</SelectItem>
                    <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                    <SelectItem value="MySQL">MySQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 版本号 */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label htmlFor="version" className="col-span-4 text-right font-medium">
                <span className="text-red-500 mr-1">*</span>版本号
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  id="version"
                  placeholder="输入版本号"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 文件上传区 */}
            <div className="grid grid-cols-12 gap-4">
              <label htmlFor="fileUpload" className="col-span-4 text-right font-medium">
                <span className="text-red-500 mr-1">*</span>驱动文件
              </label>
              <div className="col-span-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload size={40} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">点击或拖拽文件到此处上传</p>
                  <p className="text-xs text-gray-500">支持 .jar, .zip 格式文件，大小不超过 100MB</p>
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    accept=".jar,.zip"
                  />
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => document.getElementById('fileUpload')?.click()}
                  >
                    选择文件
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="border-t p-4">
            <Button variant="secondary" onClick={() => setIsUploadModalOpen(false)}>
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              上传
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverPage;