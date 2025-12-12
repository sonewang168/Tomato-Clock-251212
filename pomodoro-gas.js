// ============================================
// 🍅 番茄鐘 GAS 後端 - 伺服器端計時 + LINE Messaging API
// ============================================

// ⚠️ 請填入你的 LINE 設定
const LINE_CHANNEL_TOKEN = '你的 Channel Access Token';
const LINE_USER_ID = '你的 User ID';

// ============================================
// 接收網頁請求
// ============================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    console.log('收到請求:', JSON.stringify(data));
    
    switch (data.action) {
      case 'startTimer':
        return handleStartTimer(data);
      
      case 'cancelTimer':
        return handleCancelTimer();
      
      case 'testNotify':
        return handleTestNotify();
      
      case 'getStatus':
        return handleGetStatus();
      
      case 'sendNow':
        return handleSendNow(data);
      
      default:
        return jsonResponse({ success: false, error: '未知的 action' });
    }
  } catch (error) {
    console.error('doPost 錯誤:', error);
    return jsonResponse({ success: false, error: error.message });
  }
}

// ============================================
// 直接發送 LINE 通知（完成時立即發送）
// ============================================
function handleSendNow(data) {
  const phase = data.phase || 'work';
  const todayCount = data.todayCount || 0;
  const dailyGoal = data.dailyGoal || 8;
  
  var message = '';
  
  if (phase === 'work') {
    var remaining = dailyGoal - todayCount;
    message = '🍅 番茄完成！\n\n';
    message += '✅ 今天已完成 ' + todayCount + ' 個番茄\n';
    
    if (remaining > 0) {
      message += '🎯 距離目標還有 ' + remaining + ' 個\n';
    } else if (remaining === 0) {
      message += '🎉 恭喜達成今日目標！\n';
    } else {
      message += '🏆 超越目標 ' + Math.abs(remaining) + ' 個！\n';
    }
    message += '\n☕ 休息一下吧！';
  } else {
    var remaining = dailyGoal - todayCount;
    message = '☕ 休息結束！\n\n';
    message += '📊 今天已完成 ' + todayCount + ' 個番茄\n';
    if (remaining > 0) {
      message += '🎯 還需要 ' + remaining + ' 個達成目標\n';
    } else {
      message += '🏆 今日目標已達成！\n';
    }
    message += '\n💪 準備開始工作！';
  }
  
  var result = sendLineMessage(message);
  console.log('直接發送 LINE:', result.success ? '成功' : '失敗');
  
  return jsonResponse({ success: result.success });
}

function doGet(e) {
  const status = getTimerStatus();
  return ContentService.createTextOutput(
    '🍅 番茄鐘 GAS 後端運作中！\n' +
    '計時狀態: ' + (status ? `${status.phase} - ${status.remaining}分鐘後通知` : '無')
  );
}

// ============================================
// 計時器控制
// ============================================
function handleStartTimer(data) {
  const minutes = data.minutes || 25;
  const phase = data.phase || 'work';  // 'work' 或 'rest'
  const todayCount = data.todayCount || 0;
  const dailyGoal = data.dailyGoal || 8;
  
  // 先清除舊的觸發器
  clearAllTriggers();
  
  // 計算觸發時間
  const triggerTime = new Date(Date.now() + minutes * 60 * 1000);
  
  // 建立新觸發器
  ScriptApp.newTrigger('onTimerComplete')
    .timeBased()
    .at(triggerTime)
    .create();
  
  // 儲存計時資訊
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    'timerPhase': phase,
    'timerEndTime': triggerTime.getTime().toString(),
    'todayCount': todayCount.toString(),
    'dailyGoal': dailyGoal.toString(),
    'timerMinutes': minutes.toString()
  });
  
  console.log(`⏰ 設定 ${minutes} 分鐘後觸發 (${phase})`);
  
  return jsonResponse({ 
    success: true, 
    message: `計時器已設定：${minutes} 分鐘後通知`,
    triggerTime: triggerTime.toISOString()
  });
}

function handleCancelTimer() {
  clearAllTriggers();
  
  const props = PropertiesService.getScriptProperties();
  props.deleteAllProperties();
  
  console.log('⏹️ 計時器已取消');
  
  return jsonResponse({ success: true, message: '計時器已取消' });
}

function handleGetStatus() {
  const status = getTimerStatus();
  return jsonResponse({ success: true, status: status });
}

function getTimerStatus() {
  const props = PropertiesService.getScriptProperties();
  const endTime = props.getProperty('timerEndTime');
  
  if (!endTime) return null;
  
  const remaining = Math.ceil((parseInt(endTime) - Date.now()) / 60000);
  
  return {
    phase: props.getProperty('timerPhase'),
    endTime: new Date(parseInt(endTime)).toISOString(),
    remaining: remaining,
    todayCount: parseInt(props.getProperty('todayCount') || '0'),
    dailyGoal: parseInt(props.getProperty('dailyGoal') || '8')
  };
}

// ============================================
// 計時完成 - 發送 LINE 通知
// ============================================
function onTimerComplete() {
  console.log('⏰ 計時器觸發！');
  
  const props = PropertiesService.getScriptProperties();
  const phase = props.getProperty('timerPhase') || 'work';
  const todayCount = parseInt(props.getProperty('todayCount') || '0');
  const dailyGoal = parseInt(props.getProperty('dailyGoal') || '8');
  const minutes = parseInt(props.getProperty('timerMinutes') || '25');
  
  let message = '';
  let newTodayCount = todayCount;
  
  if (phase === 'work') {
    // 工作完成
    newTodayCount = todayCount + 1;
    const remaining = dailyGoal - newTodayCount;
    
    message = `🍅 番茄完成！\n\n`;
    message += `✅ 今天已完成 ${newTodayCount} 個番茄\n`;
    
    if (remaining > 0) {
      message += `🎯 距離目標還有 ${remaining} 個\n`;
    } else if (remaining === 0) {
      message += `🎉 恭喜達成今日目標！\n`;
    } else {
      message += `🏆 超越目標 ${Math.abs(remaining)} 個！\n`;
    }
    
    message += `\n☕ 休息一下吧！`;
    
    // 更新今日計數
    props.setProperty('todayCount', newTodayCount.toString());
    
  } else {
    // 休息完成
    const remaining = dailyGoal - todayCount;
    
    message = `☕ 休息結束！\n\n`;
    message += `📊 今天已完成 ${todayCount} 個番茄\n`;
    
    if (remaining > 0) {
      message += `🎯 還需要 ${remaining} 個達成目標\n`;
    } else {
      message += `🏆 今日目標已達成！\n`;
    }
    
    message += `\n💪 準備開始工作！`;
  }
  
  // 發送 LINE 訊息
  const result = sendLineMessage(message);
  console.log('LINE 發送結果:', result);
  
  // 清除此觸發器
  clearAllTriggers();
}

// ============================================
// LINE Messaging API
// ============================================
function sendLineMessage(message) {
  const url = 'https://api.line.me/v2/bot/message/push';
  
  const payload = {
    to: LINE_USER_ID,
    messages: [
      {
        type: 'text',
        text: message
      }
    ]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + LINE_CHANNEL_TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    
    if (code === 200) {
      console.log('✅ LINE 訊息發送成功');
      return { success: true };
    } else {
      console.error('❌ LINE 發送失敗:', response.getContentText());
      return { success: false, error: response.getContentText() };
    }
  } catch (error) {
    console.error('❌ LINE 發送錯誤:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 測試通知
// ============================================
function handleTestNotify() {
  const message = `🍅 番茄鐘測試通知\n\n` +
    `✅ GAS 後端運作正常\n` +
    `⏰ 時間：${new Date().toLocaleString('zh-TW')}\n\n` +
    `現在可以使用伺服器端計時功能！`;
  
  const result = sendLineMessage(message);
  
  return jsonResponse({ 
    success: result.success, 
    message: result.success ? '測試訊息已發送' : result.error 
  });
}

// 手動測試用
function testSendMessage() {
  handleTestNotify();
}

// ============================================
// 工具函數
// ============================================
function clearAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onTimerComplete') {
      ScriptApp.deleteTrigger(trigger);
      console.log('🗑️ 刪除觸發器');
    }
  });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// 每日重置（可選）
// ============================================
function dailyReset() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('todayCount', '0');
  console.log('📅 每日計數已重置');
}

// 設定每日重置觸發器（手動執行一次）
function setupDailyReset() {
  // 清除舊的每日重置觸發器
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'dailyReset') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // 設定每天凌晨 0 點重置
  ScriptApp.newTrigger('dailyReset')
    .timeBased()
    .atHour(0)
    .everyDays(1)
    .create();
  
  console.log('✅ 每日重置觸發器已設定');
}
