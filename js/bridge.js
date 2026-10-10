/**
 * 父页面与 iframe 通信协议
 *
 * 父 → 子：
 *   { protocol: 'game-hub', type: 'pause' }   切换游戏时通知旧 iframe 暂停
 *
 * 子 → 父：
 *   { protocol: 'game-hub', type: 'ready' }   iframe 初始化完成
 */
(function () {
    'use strict';

    const PROTOCOL = 'game-hub';

    window.GameBridge = {
        // 父页面调用：通知指定 iframe 暂停
        notifyPause(iframe) {
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ protocol: PROTOCOL, type: 'pause' }, '*');
            }
        },

        // iframe 内部调用：监听来自父页面的消息
        onParentMessage(handler) {
            window.addEventListener('message', (e) => {
                if (e.data && e.data.protocol === PROTOCOL) {
                    handler(e.data);
                }
            });
        },

        // iframe 内部调用：通知父页面已就绪
        notifyReady() {
            if (window.parent !== window) {
                window.parent.postMessage({ protocol: PROTOCOL, type: 'ready' }, '*');
            }
        }
    };
})();
