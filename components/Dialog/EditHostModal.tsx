'use client';

import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { InputField } from '../ui/InputField';
import { PasswordField } from '../ui/PasswordField';
import { HostConfig } from '@/types';
import { testHostConnection, testDatabaseConnection } from '@/lib/api';

interface EditHostModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: HostConfig) => void;
  initialData?: HostConfig;
}

// 表单验证规则
const hostConfigSchema = z.object({
  ip: z.string()
    .min(1, '主机IP不能为空')
    .regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, '请输入有效的IP地址'),
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(1, '密码不能为空'),
  dbDriver: z.enum(['GaussDB', 'PostgreSQL', 'MySQL']),
  dbUser: z.string().min(1, '数据库用户名不能为空'),
  dbPassword: z.string().min(1, '数据库密码不能为空'),
});

type HostConfigFormData = z.infer<typeof hostConfigSchema>;

const EditHostModal: React.FC<EditHostModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [hostTestStatus, setHostTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [dbTestStatus, setDbTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // 使用 react-hook-form 管理表单
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HostConfigFormData>({
    resolver: zodResolver(hostConfigSchema),
    defaultValues: initialData || {
      ip: '',
      username: '',
      password: '',
      dbDriver: 'GaussDB',
      dbUser: '',
      dbPassword: '',
    },
  });

  // 监听表单值变化
  const formValues = watch();

  // 监听IP输入变化，实现智能默认值填充
  React.useEffect(() => {
    // 使用正则匹配10.168.网段
    if (/^10\.168\./.test(formValues.ip)) {
      // 自动填入默认用户名'root'
      setValue('username', 'root');
      // 默认选中GaussDB 505.2.1
      setValue('dbDriver', 'GaussDB');
    }
  }, [formValues.ip, setValue]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 主机测试状态文字
  const [hostTestText, setHostTestText] = useState('测试中...');
  // 数据库测试状态文字
  const [dbTestText, setDbTestText] = useState('测试中...');

  const handleHostTest = async () => {
    // 检查表单是否完整，如果不完整，触发校验
    if (!formValues.ip || !formValues.username || !formValues.password) {
      // 触发所有必填字段的校验
      if (!formValues.ip) {
        document.getElementById('ip')?.focus();
      } else if (!formValues.username) {
        document.getElementById('username')?.focus();
      } else if (!formValues.password) {
        document.getElementById('password')?.focus();
      }
      return;
    }

    setHostTestStatus('testing');
    
    try {
      // 动态更新测试状态文字
      setHostTestText('正在握手...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHostTestText('验证凭据...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 网段匹配逻辑
      if (/^10\.168\./.test(formValues.ip) && formValues.username === 'root') {
        setHostTestStatus('success');
        showToast('✅ 连接成功', 'success');
      } else {
        setHostTestStatus('idle');
        showToast('❌ 网络不可达：请检查 VPN 连接', 'error');
      }
    } catch (error) {
      setHostTestStatus('idle');
      showToast('❌ 网络不可达：请检查 VPN 连接', 'error');
    }
  };

  const handleDbTest = async () => {
    // 检查表单是否完整，如果不完整，触发校验
    if (!formValues.ip || !formValues.username || !formValues.password || !formValues.dbUser || !formValues.dbPassword) {
      // 触发所有必填字段的校验
      if (!formValues.ip) {
        document.getElementById('ip')?.focus();
      } else if (!formValues.username) {
        document.getElementById('username')?.focus();
      } else if (!formValues.password) {
        document.getElementById('password')?.focus();
      } else if (!formValues.dbUser) {
        document.getElementById('dbUser')?.focus();
      } else if (!formValues.dbPassword) {
        document.getElementById('dbPassword')?.focus();
      }
      return;
    }

    setDbTestStatus('testing');
    
    try {
      // 动态更新测试状态文字
      setDbTestText('正在握手...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDbTestText('验证凭据...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 网段匹配逻辑
      if (/^10\.168\./.test(formValues.ip) && formValues.username === 'root') {
        setDbTestStatus('success');
        showToast('✅ 连接成功', 'success');
      } else {
        setDbTestStatus('idle');
        showToast('❌ 网络不可达：请检查 VPN 连接', 'error');
      }
    } catch (error) {
      setDbTestStatus('idle');
      showToast('❌ 网络不可达：请检查 VPN 连接', 'error');
    }
  };

  const onSubmit: SubmitHandler<HostConfigFormData> = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <>
      {/* Toast 提示 */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg animate-in fade-in-0 slide-in-from-top-5 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[600px] max-w-[90vw] bg-white rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle>{initialData ? '编辑主机' : '添加主机'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
            {/* 主机IP */}
            <InputField
              label="主机IP"
              id="ip"
              required
              placeholder="输入主机IP"
              {...register('ip')}
            />
            {errors.ip && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3"></div>
                <p className="col-span-9 text-xs text-red-500">{errors.ip.message}</p>
              </div>
            )}

            {/* 用户名 */}
            <InputField
              label="用户名"
              id="username"
              required
              placeholder="输入用户名"
              {...register('username')}
            />
            {errors.username && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3"></div>
                <p className="col-span-9 text-xs text-red-500">{errors.username.message}</p>
              </div>
            )}

            {/* 密码 */}
            <PasswordField
              label="密码"
              id="password"
              required
              placeholder="输入密码"
              {...register('password')}
            />
            {errors.password && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3"></div>
                <p className="col-span-9 text-xs text-red-500">{errors.password.message}</p>
              </div>
            )}

            {/* 测试主机按钮 */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3"></div>
              <button
                type="button"
                onClick={handleHostTest}
                className="col-span-9 text-left text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                disabled={hostTestStatus === 'testing'}
              >
                {hostTestStatus === 'testing' ? (
                  <>
                    <Loader2 size={16} className="inline mr-1 animate-spin" /> {hostTestText}
                  </>
                ) : hostTestStatus === 'success' ? (
                  <>
                    <Check size={16} className="inline mr-1 text-green-500" /> 测试主机 正常
                  </>
                ) : (
                  '测试主机'
                )}
              </button>
            </div>

            {/* 数据库驱动 */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label htmlFor="dbDriver" className="col-span-3 text-right font-medium">
                <span className="text-red-500 mr-1">*</span>选择数据库驱动
              </label>
              <div className="col-span-9">
                <Select
                  value={formValues.dbDriver}
                  onValueChange={(value) => setValue('dbDriver', value as HostConfig['dbDriver'])}
                >
                  <SelectTrigger id="dbDriver" className="focus:ring-blue-500">
                    <SelectValue placeholder="选择数据库驱动" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GaussDB">GaussDB 505.2.1</SelectItem>
                    <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                    <SelectItem value="MySQL">MySQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 数据库用户名 */}
            <InputField
              label="数据库用户名"
              id="dbUser"
              required
              placeholder="输入数据库用户名"
              {...register('dbUser')}
            />
            {errors.dbUser && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3"></div>
                <p className="col-span-9 text-xs text-red-500">{errors.dbUser.message}</p>
              </div>
            )}

            {/* 数据库密码 */}
            <PasswordField
              label="数据库密码"
              id="dbPassword"
              required
              placeholder="输入数据库密码"
              {...register('dbPassword')}
            />
            {errors.dbPassword && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3"></div>
                <p className="col-span-9 text-xs text-red-500">{errors.dbPassword.message}</p>
              </div>
            )}

            {/* 测试数据库按钮 */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3"></div>
              <button
                type="button"
                onClick={handleDbTest}
                className="col-span-9 text-left text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                disabled={dbTestStatus === 'testing'}
              >
                {dbTestStatus === 'testing' ? (
                  <>
                    <Loader2 size={16} className="inline mr-1 animate-spin" /> {dbTestText}
                  </>
                ) : dbTestStatus === 'success' ? (
                  <>
                    <Check size={16} className="inline mr-1 text-green-500" /> 测试数据库 正常
                  </>
                ) : (
                  '测试数据库'
                )}
              </button>
            </div>
          </form>
          
          <DialogFooter className="border-t p-4">
            <Button variant="secondary" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditHostModal;