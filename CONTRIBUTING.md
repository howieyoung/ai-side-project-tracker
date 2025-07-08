# 🤝 貢獻指南

感謝你對 AI Side Project Tracker 的興趣！我們歡迎任何形式的貢獻。

## 🚀 快速開始

### 1. Fork 專案
點擊 GitHub 頁面右上角的 "Fork" 按鈕

### 2. Clone 到本地
```bash
git clone https://github.com/your-username/ai-side-project-tracker.git
cd ai-side-project-tracker
```

### 3. 設置開發環境
```bash
# 啟動本地伺服器
python3 -m http.server 8000
# 或者
npx http-server -p 8000
```

在瀏覽器打開 `http://localhost:8000` 開始開發

## 📝 貢獻類型

### 🐛 回報 Bug
- 檢查 [Issues](https://github.com/your-username/ai-side-project-tracker/issues) 確認是否已有相同問題
- 使用 Bug Report 模板創建新 Issue
- 提供詳細的重現步驟、截圖或錯誤訊息

### ✨ 新功能建議
- 創建 Feature Request Issue
- 詳細描述功能需求和使用場景
- 解釋為什麼這個功能對用戶有價值

### 🔧 程式碼貢獻
1. 創建新的功能分支：`git checkout -b feature/amazing-feature`
2. 進行開發並測試
3. 提交變更：`git commit -m "Add amazing feature"`
4. 推送分支：`git push origin feature/amazing-feature`
5. 創建 Pull Request

## 📋 開發規範

### 程式碼風格
- **JavaScript**: 使用 ES6+ 語法，遵循 [JavaScript Standard Style](https://standardjs.com/)
- **CSS**: 使用 BEM 命名法，保持一致的縮排（2 空格）
- **HTML**: 語義化標籤，保持可訪問性

### 檔案結構
```
├── index.html          # 主要 HTML 文件
├── app.js             # 核心 JavaScript 邏輯
├── styles.css         # 樣式文件
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
└── icons/            # 應用圖標
```

### Commit 訊息規範
使用 [Conventional Commits](https://conventionalcommits.org/) 格式：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**類型 (type):**
- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文檔更新
- `style`: 程式碼格式調整
- `refactor`: 程式碼重構
- `perf`: 效能改善
- `test`: 測試相關
- `chore`: 其他雜項

**範例:**
```
feat(tracker): add dark mode toggle
fix(pwa): resolve service worker cache issue
docs(readme): update installation instructions
```

## 🧪 測試

### 手動測試
在以下環境中測試你的變更：
- Chrome (桌面和行動版)
- Safari (iOS 和 macOS)
- Firefox
- Edge

### PWA 功能測試
- 確認可以安裝為 PWA
- 測試離線功能
- 驗證 Service Worker 正常運作

## 📱 響應式設計

確保新功能在以下螢幕尺寸正常運作：
- 手機 (320px - 767px)
- 平板 (768px - 1024px)
- 桌面 (1025px+)

## 🔍 Pull Request 檢查清單

提交 PR 前請確認：

- [ ] 程式碼遵循專案風格規範
- [ ] 已在多個瀏覽器測試
- [ ] 響應式設計正常運作
- [ ] PWA 功能未受影響
- [ ] 提供清晰的 PR 描述
- [ ] 關聯相關的 Issue

## 🌐 國際化 (未來規劃)

目前專案使用繁體中文，未來可能加入：
- 英文 (English)
- 簡體中文
- 日文

如有興趣協助翻譯，歡迎聯絡！

## ❓ 需要幫助？

- 查看 [Issues](https://github.com/your-username/ai-side-project-tracker/issues) 中的 "good first issue" 標籤
- 在 [Discussions](https://github.com/your-username/ai-side-project-tracker/discussions) 提問
- 發送郵件到：your-email@example.com

## 🙏 貢獻者

感謝所有為這個專案做出貢獻的人！

<!-- 這裡會自動生成貢獻者列表 -->

---

再次感謝你的貢獻！每一個 PR、Issue 或建議都讓這個專案變得更好。 🚀 