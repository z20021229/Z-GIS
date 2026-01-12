'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import EditHostModal from '@/components/Dialog/EditHostModal';
import Header from '@/components/Header';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data: any) => {
    console.log('保存主机配置:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header breadcrumbs={['主页', '服务部署', '添加主机']} />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">主机配置管理</h2>
            <Button onClick={() => setIsModalOpen(true)}>
              添加主机配置
            </Button>
          </div>
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