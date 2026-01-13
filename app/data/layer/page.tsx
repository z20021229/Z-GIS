'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// 图层类型
interface Layer {
  id: string;
  name: string;
  dataSource: string;
  coordinate: string;
  status: 'published' | 'unpublished';
}

const LayerPage = () => {
  // 模拟数据
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: '基础底图',
      dataSource: 'Test GaussDB',
      coordinate: 'EPSG:4326',
      status: 'published'
    },
    {
      id: '2',
      name: '道路图层',
      dataSource: 'Test PostgreSQL',
      coordinate: 'EPSG:4326',
      status: 'unpublished'
    },
    {
      id: '3',
      name: '建筑物图层',
      dataSource: 'Test GaussDB',
      coordinate: 'EPSG:3857',
      status: 'published'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">图层管理</h2>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              添加图层
            </Button>
          </div>

          {/* Layer List Table */}
          <div className="bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>图层名</TableHead>
                  <TableHead>所属数据源</TableHead>
                  <TableHead>坐标系</TableHead>
                  <TableHead>发布状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {layers.map((layer) => (
                  <TableRow key={layer.id}>
                    <TableCell>{layer.name}</TableCell>
                    <TableCell>{layer.dataSource}</TableCell>
                    <TableCell>{layer.coordinate}</TableCell>
                    <TableCell>
                      <span className={layer.status === 'published' ? 'text-green-600' : 'text-gray-500'}>
                        {layer.status === 'published' ? '已发布' : '未发布'}
                      </span>
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

export default LayerPage;