'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const Home = () => {
  const router = useRouter();

  // 重定向到主机配置页面
  useEffect(() => {
    router.push('/deployment/host');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header breadcrumbs={['主页']} />
      
      {/* Main Content */}
      <div className="pt-20 pb-10 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">欢迎使用 Z-GIS</h2>
            <p className="text-gray-600 mb-6">企业级GIS项目管理平台</p>
            <div className="text-gray-400">正在跳转到主机配置页面...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;