'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Upload, Trash2, Download } from 'lucide-react';

// 安装包类型
interface Package {
  id: string;
  name: string;
  version: string;
  size: string;
  uploadTime: string;
}

// 主机类型
interface Host {
  id: string;
  ip: string;
  name: string;
}

const PackagePage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHostListModalOpen, setIsHostListModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // 模拟主机数据
  const [hosts, setHosts] = useState<Host[]>([
    { id: '1', ip: '192.168.1.100', name: 'Host 1' },
    { id: '2', ip: '192.168.1.101', name: 'Host 2' },
    { id: '3', ip: '192.168.1.102', name: 'Host 3' }
  ]);
  
  // 存储空间统计
  const storageUsed = 45.2;
  const storageTotal = 100;
  const storagePercentage = (storageUsed / storageTotal) * 100;

  // 模拟数据
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'zgis-server-linux.zip',
      version: '1.0.0',
      size: '1.2GB',
      uploadTime: '2026-01-10 14:30'
    },
    {
      id: '2',
      name: 'zgis-desktop-windows.exe',
      version: '1.0.0',
      size: '800MB',
      uploadTime: '2026-01-09 09:15'
    },
    {
      id: '3',
      name: 'zgis-mobile-android.apk',
      version: '1.0.0',
      size: '50MB',
      uploadTime: '2026-01-08 16:45'
    }
  ]);

  // 显示 Toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 模拟文件上传
  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsUploadModalOpen(false);
          showToast('✅ 文件已入库', 'success');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
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
          {/* Page Title and Upload Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">GIS版本包管理</h2>
            <Button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isUploading}
            >
              <Upload size={16} className="mr-1" />
              上传安装包
            </Button>
          </div>

          {/* Storage Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">存储空间</h3>
              <span className="text-sm text-gray-600">已用 {storageUsed}GB / 总计 {storageTotal}GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Package List Table */}
          <div className="bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>包名</TableHead>
                  <TableHead>版本</TableHead>
                  <TableHead>大小</TableHead>
                  <TableHead>上传时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.name}</TableCell>
                    <TableCell>{pkg.version}</TableCell>
                    <TableCell>{pkg.size}</TableCell>
                    <TableCell>{pkg.uploadTime}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            showToast('✅ 下载已开始', 'success');
                          }}
                        >
                          <Download size={16} className="mr-1" />
                          下载
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setSelectedPackage(pkg.id);
                            setIsHostListModalOpen(true);
                          }}
                        >
                          推送至主机
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setPackages(prev => prev.filter(p => p.id !== pkg.id));
                            showToast('✅ 安装包已删除', 'success');
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
      <Dialog open={isUploadModalOpen} onOpenChange={!isUploading ? setIsUploadModalOpen : undefined}>
        <DialogContent className="w-[500px] max-w-[90vw] bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle>上传安装包</DialogTitle>
          </DialogHeader>
          
          <div className="p-4 space-y-6">
            {/* 文件选择 */}
            <div className="grid grid-cols-12 gap-4">
              <label htmlFor="packageFile" className="col-span-4 text-right font-medium">
                <span className="text-red-500 mr-1">*</span>安装包文件
              </label>
              <div className="col-span-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload size={40} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">点击或拖拽文件到此处上传</p>
                  <p className="text-xs text-gray-500">支持 .zip, .exe, .apk 格式文件，大小不超过 2GB</p>
                  <input
                    type="file"
                    id="packageFile"
                    className="hidden"
                    accept=".zip,.exe,.apk"
                  />
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => document.getElementById('packageFile')?.click()}
                  >
                    选择文件
                  </button>
                </div>
              </div>
            </div>

            {/* 上传进度条 */}
            {isUploading && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 text-right font-medium">上传进度</div>
                <div className="col-span-8">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 text-right">{uploadProgress}%</div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="border-t p-4">
            <Button 
              variant="secondary" 
              onClick={() => !isUploading && setIsUploadModalOpen(false)}
              disabled={isUploading}
            >
              取消
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? '上传中...' : '开始上传'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Host List Modal */}
      <Dialog open={isHostListModalOpen} onOpenChange={setIsHostListModalOpen}>
        <DialogContent className="w-[600px] max-w-[90vw] bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle>选择主机</DialogTitle>
          </DialogHeader>
          
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>主机名</TableHead>
                  <TableHead>IP地址</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosts.map((host) => (
                  <TableRow key={host.id}>
                    <TableCell>{host.name}</TableCell>
                    <TableCell>{host.ip}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          setIsHostListModalOpen(false);
                          showToast('✅ 安装包已推送至主机', 'success');
                        }}
                      >
                        推送
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter className="border-t p-4">
            <Button variant="secondary" onClick={() => setIsHostListModalOpen(false)}>
              取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackagePage;