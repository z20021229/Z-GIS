# Z-GIS 项目

## 项目简介

Z-GIS是一个基于Next.js的GIS系统，用于管理和监控地理信息数据。

## 环境要求

- Node.js 18+
- npm 9+
- Docker (可选，用于本地开发数据库)

## 安装步骤

### 1. 安装Node.js依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

## Docker部署

### 安装Docker

#### Windows

1. 访问 https://docs.docker.com/desktop/install/windows-install/
2. 下载Docker Desktop安装包
3. 运行安装包并按照向导完成安装
4. 启动Docker Desktop

#### macOS

1. 访问 https://docs.docker.com/desktop/install/mac-install/
2. 下载适合您芯片的Docker Desktop安装包
3. 运行安装包并按照向导完成安装
4. 启动Docker Desktop

#### Linux

根据您的Linux发行版，按照 https://docs.docker.com/engine/install/ 上的指南安装

### 启动Docker服务

```bash
docker-compose up -d
```

这将启动一个PostgreSQL数据库，配置如下：
- 端口：5432
- 用户名：postgres
- 密码：password123
- 数据库名：zgis_db

### 停止Docker服务

```bash
docker-compose down
```

## 构建生产版本

```bash
npm run build
npm start
```

## 主要功能

- 主机配置管理
- 数据库连接测试
- 地理信息可视化
- 网络监控

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- PostgreSQL
