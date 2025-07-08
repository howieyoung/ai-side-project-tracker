# 🚀 AI Side Project Tracker

<div align="center">

![AI Side Project Tracker](icons/icon-192x192.png)

**一個專為創作者設計的 PWA 專案追蹤器**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue.svg)](https://search.google.com/test/mobile-friendly)

[🌐 Live Demo](https://your-username.github.io/ai-side-project-tracker) | [📱 Install as App](#安裝-pwa) | [🐛 Report Bug](https://github.com/your-username/ai-side-project-tracker/issues) | [💡 Request Feature](https://github.com/your-username/ai-side-project-tracker/issues)

</div>

## 📖 關於專案

AI Side Project Tracker 是一個輕量級的 Progressive Web App (PWA)，專為追蹤個人 side projects 而設計。無論你是開發者、設計師還是創作者，這個工具都能幫助你：

- 📊 **追蹤進度**：記錄每個專案的投入時間和進展
- ⏰ **時間管理**：詳細記錄工作時數和成效評分
- 📈 **數據分析**：視覺化你的工作模式和效率
- 🎯 **目標設定**：設定週目標並追蹤完成情況
- 📱 **隨時可用**：支援離線使用，可安裝為原生應用

## ✨ 功能特色

### 🎯 專案管理
- **創建專案**：設定專案名稱、描述、類別和優先級
- **狀態追蹤**：管理專案狀態（進行中/已完成/暫停）
- **分類過濾**：按狀態和類別篩選專案
- **目標設定**：設定週目標和預估時數

### ⏰ 時間記錄
- **每日記錄**：記錄每天的工作時數
- **進度描述**：詳細記錄工作內容和成果
- **成效評分**：1-10 分的工作效率評估
- **歷史查看**：檢視過往的工作記錄

### 📊 數據分析
- **時間統計**：本週總投入時間統計
- **專案概覽**：活躍和完成專案數量
- **效率分析**：平均工作成效分數
- **智能建議**：基於數據的個人化改進建議

### 📱 PWA 功能
- **可安裝**：一鍵安裝到桌面或主畫面
- **離線使用**：完全支援離線操作
- **響應式設計**：完美適配各種螢幕尺寸
- **快速啟動**：從快捷方式直接打開特定功能
- **本地儲存**：數據安全地儲存在本地

## 🖼️ 截圖預覽

<details>
<summary>點擊查看更多截圖</summary>

### 桌面版
![Desktop Dashboard](screenshots/desktop-dashboard.png)
![Desktop Projects](screenshots/desktop-projects.png)

### 行動版
![Mobile Dashboard](screenshots/mobile-dashboard.png)
![Mobile Add Project](screenshots/mobile-add.png)

</details>

## 🚀 快速開始

### 方法一：直接使用（推薦）
1. 訪問 [Live Demo](https://your-username.github.io/ai-side-project-tracker)
2. 點擊瀏覽器的「安裝應用程式」提示
3. 開始使用！

### 方法二：本地部署

#### 前置需求
- Python 3.x、Node.js 或 PHP（任選一種）
- 現代瀏覽器（Chrome, Safari, Firefox, Edge）

#### 安裝步驟

1. **Clone 專案**
   ```bash
   git clone https://github.com/your-username/ai-side-project-tracker.git
   cd ai-side-project-tracker
   ```

2. **啟動本地伺服器**
   
   選擇以下任一方法：
   
   **使用 Python:**
   ```bash
   python3 -m http.server 8000
   # 或 Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **使用 Node.js:**
   ```bash
   npx http-server -p 8000
   # 或安裝後使用
   npm install -g http-server
   http-server -p 8000
   ```
   
   **使用 PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **開始使用**
   ```
   打開瀏覽器，訪問 http://localhost:8000
   ```

## 🛠️ 技術架構

### 核心技術
- **Frontend**: 純 JavaScript (ES6+)、HTML5、CSS3
- **存儲**: localStorage API
- **PWA**: Service Worker、Web App Manifest
- **圖標**: SVG + 多尺寸 PNG

### 檔案結構
```
ai-side-project-tracker/
├── index.html          # 主要 HTML 文件
├── app.js             # 核心 JavaScript 邏輯
├── styles.css         # 樣式文件
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
├── icons/            # 應用圖標
│   ├── icon.svg      # 原始 SVG 圖標
│   └── *.png         # 各尺寸 PNG 圖標
├── screenshots/      # 應用截圖（需自行添加）
└── README.md         # 說明文件
```

### 瀏覽器支援
- ✅ Chrome 67+
- ✅ Safari 12+
- ✅ Firefox 63+
- ✅ Edge 79+

## 📱 安裝 PWA

### 在手機上安裝
1. 用瀏覽器開啟應用
2. 點擊瀏覽器選單中的「加入主畫面」或「安裝應用程式」
3. 確認安裝

### 在電腦上安裝
1. 用 Chrome 或 Edge 開啟應用
2. 點擊網址列右側的安裝圖標
3. 確認安裝

## 🔧 開發指南

### 開發環境設置
1. Fork 這個 repository
2. Clone 到本地
3. 按照「快速開始」步驟啟動本地伺服器
4. 開始開發！

### 新增功能
想要新增功能？歡迎參考以下想法：

- [ ] **資料匯出/匯入**：JSON 格式的備份功能
- [ ] **專案標籤系統**：更靈活的分類方式
- [ ] **時間目標提醒**：達成目標的通知功能
- [ ] **深色模式**：護眼的深色主題
- [ ] **數據視覺化**：更豐富的圖表展示
- [ ] **團隊協作**：多人專案支援
- [ ] **雲端同步**：跨裝置資料同步

### 程式碼風格
- 使用 ES6+ 語法
- 遵循 JavaScript Standard Style
- CSS 使用 BEM 命名法
- 注重可讀性和可維護性

## 🌐 部署指南

### GitHub Pages
1. Fork 這個 repository
2. 在 Settings > Pages 中啟用 GitHub Pages
3. 選擇 main branch 作為源
4. 訪問 `https://your-username.github.io/ai-side-project-tracker`

### Netlify
1. 連接你的 GitHub repository
2. 設定 build 命令為空（靜態網站）
3. 設定 publish directory 為 `/`
4. 部署！

### Vercel
1. Import GitHub repository
2. 使用預設設定
3. 部署完成

## 🤝 參與貢獻

我們歡迎各種形式的貢獻！

### 如何貢獻
1. **Fork** 這個 repository
2. **Create** 你的 feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** 你的變更 (`git commit -m 'Add some AmazingFeature'`)
4. **Push** 到 branch (`git push origin feature/AmazingFeature`)
5. **Open** 一個 Pull Request

### 貢獻類型
- 🐛 回報或修復 Bug
- ✨ 新增功能
- 📚 改善文檔
- 🎨 改善 UI/UX
- ⚡ 效能優化
- 🌐 國際化 (i18n)

## 📄 授權條款

本專案採用 MIT 授權條款。詳細內容請查看 [LICENSE](LICENSE) 文件。

## 🙏 致謝

- 圖標設計靈感來自 [Heroicons](https://heroicons.com/)
- PWA 最佳實踐參考 [Google PWA](https://web.dev/progressive-web-apps/)
- 感謝所有貢獻者和使用者的支持

## 📞 聯絡方式

- **GitHub Issues**: [回報問題或建議](https://github.com/your-username/ai-side-project-tracker/issues)
- **Email**: your-email@example.com
- **Twitter**: [@your-handle](https://twitter.com/your-handle)

## 📊 專案統計

![GitHub stars](https://img.shields.io/github/stars/your-username/ai-side-project-tracker?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/ai-side-project-tracker?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/ai-side-project-tracker)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/ai-side-project-tracker)

---

<div align="center">

**讓我們一起追蹤和實現創作夢想！** 🚀✨

Made with ❤️ by [Your Name](https://github.com/your-username)

</div> 