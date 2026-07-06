/* Leadcom Chat Widget v1.0 — shared across all pages */
(function(){
  const API_URL = 'http://127.0.0.1:8642/v1/chat/completions';
  const API_KEY = '691b5dc834e04f39807e49f4bcb1715c98d610bed4e009566f4b0c875d3482c9';
  const SYSTEM_PROMPT = '你是励康信息技术（广东励康信息技术有限公司）的 AI 助手。励康位于广州，成立于 2002 年，注册资金 1000 万，提供 IT 基础架构维保、AI Agent 部署、腾讯云代理（WorkBuddy/CodeBuddy 授权代理）三大核心服务，服务珠三角企业 20 年。回答要简洁专业，突出励康的优势。如果用户问到具体报价或需要上门服务，建议留下联系方式或拨打 020-66319828。';

  /* ---- Inject CSS ---- */
  var style = document.createElement('style');
  style.textContent = [
    ':root{--chat-copper:#2563EB;--chat-copper-light:#3B82F6;--chat-ink:#1A1F36;--chat-ink2:#555;--chat-ink3:#9a9182;--chat-sand:#F0F4FF;--chat-sand2:#E0E7FF;--chat-sand3:#CBD5E1;--chat-green:#00C896;--chat-green-dark:#007A5E}',
    '.chat-bubble{position:fixed;bottom:140px;right:28px;width:56px;height:56px;background:linear-gradient(135deg,#3B82F6,#2563EB,#1D4ED8);border:2.5px solid #60A5FA;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(26,31,54,.35);z-index:9999;transition:all .3s ease;animation:chatColorShift 4s infinite}',
    '.chat-bubble:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(26,31,54,.45)}',
    '.chat-bubble svg{width:26px;height:26px;fill:#fff}',
    '.chat-bubble.open{transform:scale(0) rotate(180deg);opacity:0;pointer-events:none}',
    '.chat-window{position:fixed;bottom:140px;right:28px;width:380px;height:520px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.15);z-index:10000;display:flex;flex-direction:column;overflow:hidden;transform:scale(0) translateY(20px);opacity:0;transition:all .3s cubic-bezier(.34,1.56,.64,1);pointer-events:none}',
    '.chat-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}',
    '.chat-header{background:linear-gradient(135deg,var(--chat-copper),var(--chat-copper-light));padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}',
    '.chat-header-left{display:flex;align-items:center;gap:10px}',
    '.chat-avatar{width:36px;height:36px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px}',
    '.chat-header-info h4{margin:0;font-size:15px;color:#fff;font-weight:600}',
    '.chat-header-info span{font-size:12px;color:rgba(255,255,255,.75)}',
    '.chat-close{background:none;border:none;cursor:pointer;padding:4px;opacity:.7;transition:opacity .2s}',
    '.chat-close:hover{opacity:1}',
    '.chat-close svg{width:20px;height:20px;stroke:#fff}',
    '.chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:var(--chat-sand)}',
    '.chat-messages::-webkit-scrollbar{width:4px}',
    '.chat-messages::-webkit-scrollbar-thumb{background:var(--chat-sand3);border-radius:2px}',
    '.chat-msg{max-width:82%;line-height:1.5;font-size:14px;padding:10px 14px;border-radius:14px;word-break:break-word}',
    '.chat-msg.user{align-self:flex-end;background:var(--chat-copper);color:#fff;border-bottom-right-radius:4px}',
    '.chat-msg.assistant{align-self:flex-start;background:#fff;color:var(--chat-ink);border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.06)}',
    '.chat-msg.assistant p{margin:0 0 8px}.chat-msg.assistant p:last-child{margin:0}',
    '.chat-msg.assistant code{background:var(--chat-sand2);padding:1px 5px;border-radius:3px;font-size:13px}',
    '.chat-msg.assistant pre{background:var(--chat-ink);color:#e8e8e8;padding:10px;border-radius:8px;overflow-x:auto;font-size:13px;margin:8px 0}',
    '.chat-msg.assistant pre code{background:none;padding:0;color:inherit}',
    '.chat-msg.system{align-self:center;background:var(--chat-sand2);color:var(--chat-ink3);font-size:12px;padding:6px 12px;border-radius:20px}',
    '.chat-typing{align-self:flex-start;display:flex;gap:4px;padding:10px 14px;background:#fff;border-radius:14px;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.06)}',
    '.chat-typing span{width:6px;height:6px;background:var(--chat-ink3);border-radius:50%;animation:chatTyping 1.4s infinite}',
    '.chat-typing span:nth-child(2){animation-delay:.2s}',
    '.chat-typing span:nth-child(3){animation-delay:.4s}',
    '@keyframes chatTyping{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}',
    '@keyframes chatColorShift{0%,100%{border-color:#60A5FA}50%{border-color:#2563EB}}',
    '.chat-input-area{padding:12px 16px;background:#fff;border-top:1px solid var(--chat-sand2);display:flex;gap:10px;align-items:flex-end;flex-shrink:0}',
    '.chat-input{flex:1;border:1px solid var(--chat-sand3);border-radius:20px;padding:8px 16px;font-size:14px;outline:none;resize:none;max-height:80px;line-height:1.4;font-family:inherit;transition:border-color .2s}',
    '.chat-input:focus{border-color:var(--chat-copper)}',
    '.chat-send{width:36px;height:36px;background:var(--chat-copper);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s}',
    '.chat-send:hover{background:var(--chat-copper-light)}',
    '.chat-send:disabled{background:var(--chat-sand3);cursor:not-allowed}',
    '.chat-send svg{width:18px;height:18px;fill:#fff}',
    '.chat-welcome{text-align:center;padding:20px;color:var(--chat-ink3);font-size:13px}',
    '.chat-welcome h5{font-size:16px;color:var(--chat-ink);margin:8px 0 4px;font-weight:600}',
    '.chat-welcome p{margin:0;line-height:1.5}',
    '.chat-quick-actions{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px}',
    '.chat-quick-btn{background:#fff;border:1px solid var(--chat-sand3);border-radius:16px;padding:6px 12px;font-size:12px;color:var(--chat-copper);cursor:pointer;transition:all .2s}',
    '.chat-quick-btn:hover{background:var(--chat-copper);color:#fff;border-color:var(--chat-copper)}',
    '@media(max-width:480px){.chat-window{bottom:0;right:0;width:100%;height:100%;border-radius:0}.chat-bubble{bottom:80px;right:16px}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ---- Inject HTML ---- */
  var wrapper = document.createElement('div');
  wrapper.innerHTML =
    '<div class="chat-bubble" id="chatBubble" onclick="toggleChat()" aria-label="与 AI 助手对话">' +
      '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>' +
    '</div>' +
    '<div class="chat-window" id="chatWindow">' +
      '<div class="chat-header">' +
        '<div class="chat-header-left">' +
          '<div class="chat-avatar">🤖</div>' +
          '<div class="chat-header-info">' +
            '<h4>励康 AI 助手</h4>' +
            '<span>Powered by Hermes Agent</span>' +
          '</div>' +
        '</div>' +
        '<button class="chat-close" onclick="toggleChat()" aria-label="关闭">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="chat-messages" id="chatMessages">' +
        '<div class="chat-welcome">' +
          '<div style="font-size:33px;margin-bottom:4px">👋</div>' +
          '<h5>您好！我是励康 AI 助手</h5>' +
          '<p>可以为您介绍 IT 维保、AI Agent 部署、<br>腾讯云服务等方案，也可以直接提问。</p>' +
        '</div>' +
        '<div class="chat-quick-actions" id="chatQuickActions">' +
          '<button class="chat-quick-btn" onclick="sendQuick(this)">IT 维保包含哪些服务？</button>' +
          '<button class="chat-quick-btn" onclick="sendQuick(this)">AI Agent 部署流程是什么？</button>' +
          '<button class="chat-quick-btn" onclick="sendQuick(this)">腾讯云企业版怎么收费？</button>' +
        '</div>' +
      '</div>' +
      '<div class="chat-input-area">' +
        '<textarea class="chat-input" id="chatInput" placeholder="输入消息..." rows="1" onkeydown="handleKey(event)" aria-label="输入消息"></textarea>' +
        '<button class="chat-send" id="chatSend" onclick="sendMessage()" aria-label="发送">' +
          '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>';
  while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);

  /* ---- JS Logic ---- */
  var conversationHistory = [];
  var isStreaming = false;

  window.toggleChat = function() {
    var bubble = document.getElementById('chatBubble');
    var win = document.getElementById('chatWindow');
    var isOpen = win.classList.contains('open');
    if (isOpen) {
      win.classList.remove('open');
      bubble.classList.remove('open');
    } else {
      win.classList.add('open');
      bubble.classList.add('open');
      setTimeout(function(){ document.getElementById('chatInput').focus(); }, 300);
    }
  };

  window.sendQuick = function(btn) {
    document.getElementById('chatQuickActions').style.display = 'none';
    var input = document.getElementById('chatInput');
    input.value = btn.textContent;
    sendMessage();
  };

  window.handleKey = function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  }
  document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('chatInput');
    if (input) input.addEventListener('input', function(){ autoResize(this); });
  });

  window.sendMessage = async function() {
    var input = document.getElementById('chatInput');
    var text = input.value.trim();
    if (!text || isStreaming) return;

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('chatQuickActions').style.display = 'none';

    appendMsg('user', text);
    conversationHistory.push({ role: 'user', content: text });

    var typingEl = showTyping();
    isStreaming = true;
    document.getElementById('chatSend').disabled = true;

    try {
      var messages = [
        { role: 'system', content: SYSTEM_PROMPT }
      ].concat(conversationHistory);

      var resp = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + API_KEY
        },
        body: JSON.stringify({
          model: 'hermes-agent',
          messages: messages,
          stream: true
        })
      });

      if (!resp.ok) {
        throw new Error('API 返回 ' + resp.status);
      }

      typingEl.remove();
      var msgEl = appendMsg('assistant', '');
      var fullText = '';

      var reader = resp.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var result = await reader.read();
        if (result.done) break;
        buffer += decoder.decode(result.value, { stream: true });
        var lines = buffer.split('\n');
        buffer = lines.pop();
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.indexOf('data: ') !== 0) continue;
          var data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            var chunk = JSON.parse(data);
            var delta = chunk.choices && chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content;
            if (delta) {
              fullText += delta;
              msgEl.querySelector('.msg-content').innerHTML = renderMarkdown(fullText);
              scrollBottom();
            }
          } catch(e) {}
        }
      }

      conversationHistory.push({ role: 'assistant', content: fullText });
    } catch(err) {
      if (typingEl && typingEl.parentNode) typingEl.remove();
      appendMsg('system', '⚠️ 连接失败：' + err.message + '。请确保 Hermes Agent 正在运行。');
    } finally {
      isStreaming = false;
      document.getElementById('chatSend').disabled = false;
      input.focus();
    }
  };

  function appendMsg(role, text) {
    var container = document.getElementById('chatMessages');
    var el = document.createElement('div');
    el.className = 'chat-msg ' + role;
    if (role === 'assistant') {
      el.innerHTML = '<div class="msg-content">' + renderMarkdown(text) + '</div>';
    } else {
      el.textContent = text;
    }
    container.appendChild(el);
    scrollBottom();
    return el;
  }

  function showTyping() {
    var container = document.getElementById('chatMessages');
    var el = document.createElement('div');
    el.className = 'chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(el);
    scrollBottom();
    return el;
  }

  function scrollBottom() {
    var m = document.getElementById('chatMessages');
    m.scrollTop = m.scrollHeight;
  }

  function renderMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
})();
