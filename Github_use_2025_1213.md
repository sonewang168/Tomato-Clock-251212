# 🚀 GitHub 推送教學 (2025/12/13)

## 📋 前置準備

### 1. 確認已安裝 Git
```powershell
git --version
```
如果沒有安裝，請到 https://git-scm.com/downloads 下載安裝。

### 2. 確認已登入 GitHub
```powershell
git config --global user.name
git config --global user.email
```

如果沒有設定，請執行：
```powershell
git config --global user.name "你的GitHub帳號"
git config --global user.email "你的Email"
```

---

## 🆕 情況一：首次推送（新專案）

### Step 1：在 GitHub 建立新 Repository
1. 開啟 https://github.com/new
2. Repository name: `Tomato-Clock-251212`（或你想要的名稱）
3. Description: `🍅 番茄鐘 Pro - 支援語音播報、LINE通知`
4. 選擇 **Public**（公開）
5. ❌ **不要勾選** "Add a README file"
6. 點擊 **Create repository**

### Step 2：在本地初始化 Git
```powershell
# 進入專案資料夾
cd "C:\Users\你的帳號\文件\番茄鐘計時機器人 2025 1212\Tomato-Clock-251212"

# 初始化 Git
git init

# 新增所有檔案
git add .

# 建立第一次 Commit
git commit -m "🍅 初始版本 v5.4.3"
```

### Step 3：連結 GitHub 並推送
```powershell
# 設定遠端（把 YOUR_USERNAME 換成你的 GitHub 帳號）
git remote add origin https://github.com/YOUR_USERNAME/Tomato-Clock-251212.git

# 設定主分支為 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### Step 4：驗證
開啟 `https://github.com/YOUR_USERNAME/Tomato-Clock-251212` 確認檔案已上傳。

---

## 🔄 情況二：更新推送（已有 Repository）

### 快速三步驟
```powershell
# 1. 進入專案資料夾
cd "C:\Users\你的帳號\文件\番茄鐘計時機器人 2025 1212\Tomato-Clock-251212"

# 2. 新增變更並 Commit
git add .
git commit -m "🎉 v5.4.3 - 語音播報完成"

# 3. 推送
git push
```

---

## 📝 常用 Commit 訊息範例

```powershell
# 新功能
git commit -m "✨ 新增 Gemini TTS 語音服務"

# 修復 Bug
git commit -m "🐛 修復 iOS 語音播放問題"

# 更新版本
git commit -m "🎉 v5.4.3 - 語音播報完成"

# 文檔更新
git commit -m "📝 更新 README"

# 樣式調整
git commit -m "💄 優化設定頁面 UI"

# 效能改善
git commit -m "⚡ 提升語音載入速度"
```

---

## ❓ 常見問題

### Q1: `fatal: not a git repository`
**解決：** 確認你在正確的資料夾，或執行 `git init`

### Q2: `error: src refspec main does not match any`
**解決：** 
```powershell
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Q3: `fatal: The current branch main has no upstream branch`
**解決：**
```powershell
git push --set-upstream origin main
```

### Q4: `error: failed to push some refs`
**解決：**
```powershell
git pull --rebase origin main
git push
```

### Q5: GitHub 要求輸入帳號密碼
**解決：** 使用 Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. 勾選 `repo` 權限
4. 用這個 Token 當作密碼

---

## 🌐 啟用 GitHub Pages（網頁託管）

### Step 1：進入 Repository 設定
1. 開啟你的 Repository
2. 點擊 **Settings**
3. 左側選單點擊 **Pages**

### Step 2：設定來源
1. Source: **Deploy from a branch**
2. Branch: **main**
3. Folder: **/ (root)**
4. 點擊 **Save**

### Step 3：等待部署
約 1-2 分鐘後，會顯示網址：
```
https://YOUR_USERNAME.github.io/Tomato-Clock-251212/
```

---

## 📂 完整推送流程範例

```powershell
# ========================================
# 番茄鐘 v5.4.3 完整推送流程
# ========================================

# 1. 進入專案資料夾
cd "C:\Users\Win11 XPG-2T\OneDrive\文件\研習總集合\114學年度\程式語言練功區\番茄鐘計時機器人 2025 1212\Tomato-Clock-251212"

# 2. 查看狀態
git status

# 3. 新增所有變更
git add .

# 4. Commit（提交）
git commit -m "🎉 v5.4.3 - 工作完成用Web Speech，休息結束用Gemini/ElevenLabs"

# 5. 推送到 GitHub
git push

# ========================================
# 完成！開啟 GitHub 確認
# ========================================
```

---

## 🔑 快速指令速查表

| 動作 | 指令 |
|------|------|
| 查看狀態 | `git status` |
| 新增所有檔案 | `git add .` |
| 提交變更 | `git commit -m "訊息"` |
| 推送 | `git push` |
| 拉取更新 | `git pull` |
| 查看紀錄 | `git log --oneline` |
| 查看遠端 | `git remote -v` |

---

## ✅ 推送前檢查清單

- [ ] 確認沒有真實的 API Key 在程式碼中
- [ ] 確認 `index.html` 的 `geminiApiKey: ''` 是空的
- [ ] 確認 `pomodoro-gas.js` 的 LINE Token 是佔位符
- [ ] 執行 `git status` 確認要推送的檔案
- [ ] Commit 訊息清楚描述這次更新

---

**最後更新：2025/12/13**
