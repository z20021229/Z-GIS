'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import EditHostModal from '@/components/Dialog/EditHostModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data: any) => {
    console.log('保存主机配置:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Z-GIS 企业级GIS系统</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">主机配置管理</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            添加主机配置
          </Button>
        </div>
      </div>

      <EditHostModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Home;