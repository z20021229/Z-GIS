// 主机配置数据
export interface HostConfig {
  ip: string;
  username: string;
  password: string;
  dbDriver: 'GaussDB' | 'PostgreSQL' | 'MySQL';
  dbUser: string;
  dbPassword: string;
}