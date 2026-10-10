/**
 * 父页面与 iframe 之间的通信协议
 * - 父 → 子：{ type: 'pause' }        切换游戏时通知旧 iframe 暂停
 * - 父 → 子：{ type: 'resume' }       切回时通知 iframe 恢复（可选）
 * - 子 → 父：{ type: 'ready' }        iframe 初始化完成
 * - 子 → 父：{ type: 'gameover', payload }  游戏结束时通知父页面（可选）
 */
(function () {
    const PROTOCOL = 'game-hub';

    window.GameBridge = {
        // 父页面调用
        notifyPause(iframe) {
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ protocol: PROTOCOL, type: 'pause' }, '*');
            }
        },
        // iframe 内部调用
        onParentMessage(handler) {
            window.addEventListener('message', (e) => {
                if (e.data && e.data.protocol === PROTOCOL) {
                    handler(e.data);
                }
            });
        },
        // iframe 内部调用
        notifyReady() {
            if (window.parent !== window) {
                window.parent.postMessage({ protocol: PROTOCOL, type: 'ready' }, '*');
            }
        }
    };
})();
