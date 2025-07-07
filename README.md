# 🚀 AppWorks Side Project Tracker

一個專為 AppWorks 活動參加者設計的 PWA（Progressive Web App），讓你能夠輕鬆追蹤和管理你的 side projects，記錄投入時間，並評估專案成效。

## ✨ 功能特色

### 📊 專案管理
- **創建專案**：輕鬆新增 side project，設定類別、優先級和目標
- **專案追蹤**：查看所有專案的進度和狀態
- **狀態管理**：將專案標記為進行中、已完成或暫停

### ⏰ 時間記錄
- **每日記錄**：記錄每天投入的時間
- **進度描述**：詳細記錄當天完成的工作內容
- **成效評分**：對每次工作的效率進行 1-10 分評分

### 📈 數據分析
- **時間統計**：查看本週總投入時間
- **專案概覽**：統計活躍專案和已完成專案數量
- **效率分析**：計算平均工作成效分數
- **個人化建議**：基於數據提供改進建議

### 📱 PWA 功能
- **可安裝**：可以安裝到手機或電腦上，像原生 App 一樣使用
- **離線使用**：支援離線操作，數據儲存在本地
- **響應式設計**：完美適配手機、平板和電腦
- **快速啟動**：從快捷方式直接打開特定功能

## 🚀 快速開始

### 1. 本地開發

由於瀏覽器的安全策略，PWA 需要在 HTTPS 環境或 localhost 下運行。

#### 方法一：使用 Python 內建服務器
```bash
# 在專案目錄下執行
python3 -m http.server 8000

# 或者使用 Python 2
python -m SimpleHTTPServer 8000
```

然後在瀏覽器中打開：`http://localhost:8000`

#### 方法二：使用 Node.js 服務器
```bash
# 安裝 http-server
npm install -g http-server

# 啟動服務器
http-server -p 8000

# 或者使用 live-server（支援熱重載）
npm install -g live-server
live-server --port=8000
```

#### 方法三：使用 PHP 內建服務器
```bash
php -S localhost:8000
```

### 2. 部署到生產環境

你可以將這個 PWA 部署到以下平台：

- **GitHub Pages**：免費靜態網站托管
- **Netlify**：自動部署和 HTTPS
- **Vercel**：快速部署和全球 CDN
- **Firebase Hosting**：Google 的靜態網站托管

### 3. 安裝 PWA

當你在支持的瀏覽器中訪問應用時：
1. 瀏覽器會顯示「安裝應用程式」的提示
2. 點擊「安裝」按鈕
3. 應用會被安裝到你的設備上
4. 你可以從主螢幕或應用列表啟動它

## 📱 使用指南

### 創建第一個專案
1. 點擊導航欄的「➕ 新增」
2. 填寫專案名稱（必填）
3. 選擇專案類別和優先級
4. 設定本週目標和預估時數
5. 點擊「✨ 創建專案」

### 記錄工作時間
1. 在「📁 專案」頁面找到你的專案
2. 點擊專案卡片上的「⏰」按鈕
3. 選擇日期和投入時數
4. 描述今天的進度
5. 評分工作成效（1-10分）
6. 保存記錄

### 查看數據分析
1. 點擊「📈 分析」查看統計圖表
2. 在「📊 總覽」查看本週數據摘要
3. 查看個人化的改進建議

## 🛠️ 技術特色

- **Pure JavaScript**：無需框架，輕量級實現
- **本地儲存**：使用 localStorage 保存數據
- **Service Worker**：支援離線功能和快取
- **Responsive Design**：適配所有設備尺寸
- **Modern CSS**：使用 CSS Grid 和 Flexbox
- **PWA 最佳實踐**：符合 Google PWA 標準

## 🎨 自定義設定

### 修改主題顏色
在 `styles.css` 中修改 CSS 變數：
```css
:root {
    --primary-color: #2563eb;  /* 主色調 */
    --secondary-color: #10b981; /* 次要色調 */
    /* ... 其他顏色變數 */
}
```

### 新增專案類別
在 `index.html` 中的 `projectCategory` select 元素裡新增選項：
```html
<option value="new-category">新類別</option>
```

在 `app.js` 中的 `getCategoryText` 方法裡新增對應文字：
```javascript
'new-category': '新類別名稱'
```

## 📂 檔案結構

```
├── index.html          # 主要 HTML 文件
├── styles.css          # 樣式文件
├── app.js             # 主要 JavaScript 邏輯
├── manifest.json      # PWA manifest 文件
├── sw.js             # Service Worker
├── create_icons.html  # 圖標生成工具
├── icons/            # 應用圖標目錄
│   └── icon.svg      # SVG 圖標
└── README.md         # 說明文件
```

## 🔧 開發建議

### 新增功能
- 資料匯出/匯入功能
- 專案標籤系統
- 時間目標設定和提醒
- 團隊協作功能
- 數據視覺化圖表

### 效能優化
- 實作虛擬滾動（如果專案很多）
- 新增圖片壓縮和快取
- 實作背景同步
- 優化 Service Worker 快取策略

## 📄 授權條款

MIT License - 自由使用和修改

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 聯絡方式

如有問題或建議，請透過以下方式聯絡：
- GitHub Issues
- Email: [你的郵箱]

---

**讓我們一起追蹤和實現我們的 side project 夢想！** 🚀✨ 