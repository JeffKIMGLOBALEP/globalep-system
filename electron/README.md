# GLOBALEP Desktop Application

## PWA (Progressive Web App) - 即时可用

直接在浏览器打开 `index.html`，然后：

### Chrome / Edge
1. 点击地址栏右侧的 **安装图标** ⬇️
2. 或者：菜单 → **安装 GLOBALEP**
3. 应用会以独立窗口打开（无浏览器边框）

### Safari (Mac)
1. 打开页面后，点击 **分享按钮** → **添加到程序坞**

### 移动端
1. 用浏览器打开页面
2. **添加到主屏幕**

---

## Electron 打包为 .exe（Windows桌面应用）

### 前置条件
```bash
# 安装 Node.js (推荐 22.x)
# https://nodejs.org
```

### 步骤
```bash
# 1. 进入 electron 目录
cd electron

# 2. 安装依赖
npm install

# 3. 先本地测试运行
npm start

# 4. 打包为 .exe (portable 便携版，免安装)
npm run build:win

# 5. 打包为 Windows 安装程序 (.exe installer)
npm run build:win:installer

# 打包好的文件在: electron/dist/
```

### 生成的文件
```
electron/dist/
├── GLOBALEP-2.0.0.exe          ← 便携版，双击即用
└── GLOBALEP Setup 2.0.0.exe    ← 安装程序
```

### Mac 打包
```bash
npm run build:mac
# 生成: electron/dist/GLOBALEP-2.0.0.dmg
```

### Linux 打包
```bash
npm run build:linux
# 生成: electron/dist/GLOBALEP-2.0.0.AppImage
```

---

## 注意事项
- Electron 打包后的 .exe 约 150MB（包含 Chromium 内核）
- PWA 方案体积为 0，但需要浏览器环境
- 数据存储在浏览器 localStorage 中，使用备份功能可导出为 JSON 文件
