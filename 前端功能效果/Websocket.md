### Websocket

**WebSocket 是一种网络通信协议，提供了在单个 TCP 连接上进行全双工通信的方法是。与传统的 HTTP 请求-响应模型不同，WebSocket 允许服务器主动向客户端推送数据**

#### 主要特点

1. 全双工通信：WebSocket 允许客户端和服务器同时发送和接收数据。这种特性使得实时应用程序（如在线聊天、游戏、金融交易等）能快速交换信息。

2. 跨域支持：WebSocket 不受同源策略的限制，允许不同域之间建立连接，这对于实现跨域通信非常重要。

3. 持久连接：一旦建立连接，WebSocket 可以保持长时间的连接，避免了频繁建立和断开连接的开销。这使得数据传输更为高效。

4. 心跳检测：为了保持连接的有效性，WebSocket 通常会实现心跳检测机制，定期发送心跳消息以确认连接状态，从而确保客户端和服务器之间的通信不会因为网络问题而中断


<script>
export default {
  data() {
    return {
      timeout: 40 * 1000, // 心跳间隔时间，40秒
      heartbeatInterval: null, // 存储心跳定时器
      websocket: null, // WebSocket 实例
      lockReconnect: false, // 避免重复重连的标志
      isConnected: false, // WebSocket 连接状态
    };
  },
  mounted() {
    this.initWebSocket(); // 初始化 WebSocket
    window.addEventListener('beforeunload', this.closeWebSocket); // 页面卸载时关闭 WebSocket
  },
  beforeDestroy() {
    this.closeWebSocket(); // 组件销毁前关闭 WebSocket
  },
  methods: {
    initWebSocket() {
      if (!('WebSocket' in window)) {
        return alert('当前浏览器不支持 WebSocket');
      }

      this.websocket = new WebSocket('ws://your-websocket-url');

      this.websocket.addEventListener('open', this.handleWebSocketOpen);
      this.websocket.addEventListener('message', this.handleWebSocketMessage);
      this.websocket.addEventListener('close', this.handleWebSocketClose);
      this.websocket.addEventListener('error', this.handleWebSocketError);
    },

    handleWebSocketOpen() {
      console.log('WebSocket 连接成功');
      this.isConnected = true;
      this.startHeartbeat();
    },

    handleWebSocketMessage(event) {
      if (event.data === 'heartbeat') {
        // 收到心跳消息
        console.log('心跳消息接收时间:', new Date().toISOString());
      } else {
        console.log('收到消息:', event.data);
      }
    },

    handleWebSocketClose() {
      console.log('WebSocket 连接关闭');
      this.isConnected = false;
      this.reconnect();
    },

    handleWebSocketError(error) {
      console.error('WebSocket 错误:', error);
      this.isConnected = false;
      this.reconnect();
    },

    startHeartbeat() {
      this.clearHeartbeatInterval();
      this.heartbeatInterval = setInterval(() => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          this.websocket.send('heartbeat');
        } else {
          this.reconnect();
        }
      }, this.timeout);
    },

    clearHeartbeatInterval() {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
    },

    reconnect() {
      if (this.lockReconnect) return;

      this.lockReconnect = true;
      setTimeout(() => {
        this.initWebSocket();
        this.lockReconnect = false;
      }, 5000); // 5秒后重连
    },

    closeWebSocket() {
      if (this.websocket) {
        this.websocket.close();
      }
    }
  }
}
</script>
