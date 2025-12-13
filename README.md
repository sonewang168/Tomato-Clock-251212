# 🍅 番茄鐘 Pro v5.4.4

專業級番茄鐘網頁應用，支援多種語音服務、LINE 通知、成就系統等豐富功能。

## ✨ 功能特色

### 🕐 三種計時模式
- **番茄鐘模式**：25 分鐘工作 + 5 分鐘休息
- **整點模式**：每小時 55 分鐘工作 + 5 分鐘休息
- **課堂模式**：45 分鐘上課 + 10 分鐘下課

### 🎙️ 語音服務（v5.2 新增）
支援三種語音服務，完成時語音播報：

| 服務 | 語音數量 | 費用 | 特點 |
|------|----------|------|------|
| 🌐 Web Speech | 系統內建 | 免費 | 無需 API Key |
| 🤖 Gemini | 30 種 | 免費額度 | Google AI 語音 |
| 🎭 ElevenLabs | 20+ 種 | 免費額度 | 超自然語音 |

**Gemini 語音列表：**
- ⭐ 推薦：Zephyr、Puck、Kore、Charon、Aoede
- 👩 女聲：Leda、Callirrhoe、Autonoe、Despina、Erinome、Laomedeia、Pulcherrima
- 👨 男聲：Orus、Fenrir、Enceladus、Iapetus、Umbriel、Algieba、Algenib、Rasalgethi
- 🌟 其他：Achernar、Alnilam、Schedar、Gacrux 等

**ElevenLabs 語音列表：**
- 👩 女聲：Rachel、Bella、Domi、Elli、Nicole、Glinda、Gigi、Grace
- 👨 男聲：Adam、Antoni、Josh、Sam、Arnold、Bill、Brian、Callum
- 🌟 特色：Charlotte、Alice、Chris、Daniel（英式口音）

### 📡 LINE 通知（GAS 伺服器端計時）
即使手機螢幕休眠，也能收到 LINE 通知！

**運作流程：**
1. 按下開始 → 網頁發送計時請求給 GAS
2. GAS 設定時間觸發器
3. 時間到 → GAS 發送 LINE 訊息
4. LINE 通知響起！

### 🏆 成就系統（14 個成就）
- 🌱 初次萌芽：完成第 1 個番茄
- 🌿 小有成就：完成 10 個番茄
- 🌳 茁壯成長：完成 50 個番茄
- 🏆 番茄大師：完成 100 個番茄
- 💪 週冠軍：連續 7 天使用
- 🎖️ 全日達標：單日完成目標
- ⭐ 超越自我：單日超越目標
- 🌙 夜貓子：晚上 10 點後完成
- ☀️ 早起鳥：早上 6 點前完成
- 🔥 火力全開：單日 10 個以上
- 💎 鑽石意志：連續 30 天
- 👑 傳奇：完成 500 個番茄
- 🎯 精準打擊：連續 5 天達標
- 🌟 完美主義：連續 10 天達標

### 🌳 番茄森林
根據每日完成數量種植不同的樹：
- 1 個：🌱 幼苗
- 2 個：🌿 小草
- 4 個：🪴 盆栽
- 6 個：🌲 松樹
- 8 個：🌳 大樹
- 10 個：🎄 聖誕樹
- 12 個：🌴 棕櫚樹
- 15 個：💐 花束
- 20 個：🏵️ 金花

### 🔔 提醒方式
- 🔊 30 種音效可選
- 🗣️ 語音播報（Web/Gemini/ElevenLabs）
- 📳 震動提醒（Android）
- 📱 系統通知
- 📡 LINE 通知（需設定 GAS）

### 📊 其他功能
- 🎯 每日目標設定
- 📈 統計圖表
- ✅ 待辦事項
- 🌙 背景執行 / ☀️ 螢幕長亮模式
- 🎨 多種主題
- 💾 資料匯出（CSV/JSON）
- ⌨️ 快捷鍵支援

---

## 🚀 快速開始

### 線上使用
https://sonewang168.github.io/Tomato-Clock-251212/

### 本地使用
1. 下載 `index.html`
2. 用瀏覽器開啟

---

## ⚙️ 設定 LINE 通知

### Step 1：建立 GAS 專案
1. 開啟 [Google Apps Script](https://script.google.com/)
2. 新增專案
3. 貼上 `pomodoro-gas.js` 的內容
4. 修改 LINE 設定：
```javascript
const LINE_CHANNEL_TOKEN = '你的 Channel Access Token';
const LINE_USER_ID = '你的 User ID';
```

### Step 2：部署 GAS
1. 點擊 **部署** → **新增部署**
2. 類型：**網頁應用程式**
3. 執行身分：**我**
4. 存取權限：**所有人**
5. 複製網址

### Step 3：設定番茄鐘
1. 設定 → LINE 通知
2. 貼上 GAS URL
3. 點擊「📤 測試 LINE」

---

## ⌨️ 快捷鍵

| 按鍵 | 功能 |
|------|------|
| Space | 開始/暫停 |
| R | 重置 |
| F | 全螢幕 |
| M | 靜音 |

---

## 📝 版本歷史

### v5.4.5 (2024-12-13)
- 🗣️ 整點模式：整點提醒強制使用 Web Speech（iOS 限制）
- 🗣️ 休息結束：自動倒數完成用 Web Speech，手動點擊可用 Gemini/ElevenLabs
- 🔧 修復 iOS setInterval 中異步音頻無法播放問題

### v5.4.4 (2024-12-13)
- 🕐 整點模式加入 LINE 通知
- 🏫 課堂模式完整支援語音 + LINE
- 📡 GAS 新增 hourly phase 處理

### v5.4.3 (2024-12-13)
- 🗣️ 工作完成：強制使用 Web Speech（iOS setInterval 限制）
- 🤖 休息結束：使用選擇的語音服務（Gemini / ElevenLabs / Web）
- 🔧 修復 Gemini TTS PCM 轉 WAV 音頻格式問題
- 📡 LINE 同步通知優化

### v5.3 (2024-12-13)
- 🗣️ 修復語音播報（工作完成+休息結束都會播報）
- 📡 LINE 同步通知（完成時立即發送，不依賴 GAS 觸發器）
- 🔧 加強語音播放可靠性和除錯訊息

### v5.2 (2024-12-13)
- 🎭 Gemini 30 種語音下拉選單
- 🎭 ElevenLabs 20 種語音下拉選單
- 🔧 語音選擇介面優化

### v5.1 (2024-12-13)
- 🎙️ 新增語音服務選擇（Web/Gemini/ElevenLabs）
- 👤 男/女聲選擇
- 🔑 API Key 設定

### v5.0 (2024-12-13)
- 📡 GAS 伺服器端計時
- 📱 LINE Messaging API 通知
- 🔔 手機休眠也能收到通知

### v4.0 (2024-12-12)
- 📳 震動提醒
- 🎯 每日目標
- 🌳 番茄森林
- 🏆 成就系統（14 個）
- 💾 資料匯出（CSV/JSON）

### v3.0 (2024-12-12)
- 📱 執行模式選擇（背景/螢幕長亮）
- 🔒 Wake Lock API

### v2.9 (2024-12-12)
- 🐛 修復背景番茄計數問題
- 💾 計時狀態保存機制

---

## 📄 授權

MIT License

---

## 👨‍💻 作者

Sone Wang

---

## 🙏 致謝

- Google Gemini TTS
- ElevenLabs TTS
- LINE Messaging API
