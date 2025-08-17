# Websocket

**WebSocket 是一种网络通信协议，提供了在单个 TCP 连接上进行全双工通信的方法是。与传统的 HTTP 请求-响应模型不同，WebSocket 允许服务器主动向客户端推送数据**

## 主要特点

1. 全双工通信：WebSocket 允许客户端和服务器同时发送和接收数据。这种特性使得实时应用程序（如在线聊天、游戏、金融交易等）能快速交换信息。

2. 跨域支持：WebSocket 不受同源策略的限制，允许不同域之间建立连接，这对于实现跨域通信非常重要。

3. 持久连接：一旦建立连接，WebSocket 可以保持长时间的连接，避免了频繁建立和断开连接的开销。这使得数据传输更为高效。

4. 心跳检测：为了保持连接的有效性，WebSocket 通常会实现心跳检测机制，定期发送心跳消息以确认连接状态，从而确保客户端和服务器之间的通信不会因为网络问题而中断

## 实现心跳检测

1. 发送心跳消息： 在客户端和服务器之间定期发送心跳消息（通常是简单的文本消息，比如 "heartbeat"）

1. 接收心跳响应： 服务器收到心跳消息后，应返回一个响应消息（"heartbeat_ack"）。客户端在收到响应时，可以确认连接正常

1. 心跳超时检测： 如果客户端在设定时间内没有收到响应消息，就认为连接可能断开，并尝试重新连接

1. 自动重连机制： 当连接断开时，自动进行重连尝试，并且可以逐步增加重连间隔时间，以减少对服务器的冲击

<script>
export default {
  data() {
    return {
      timeout: 40 * 1000, // 心跳间隔时间，40秒
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
    // 初始化 WebSocket 连接
    initWebSocket() {
      if (!('WebSocket' in window)) {
        alert('当前浏览器不支持 WebSocket');
        return;
      }

      this.websocket = new WebSocket('ws://your-websocket-url');

      // 注册 WebSocket 事件监听器
      this.websocket.addEventListener('open', this.handleWebSocketOpen);
      this.websocket.addEventListener('message', this.handleWebSocketMessage);
      this.websocket.addEventListener('close', this.handleWebSocketClose);
      this.websocket.addEventListener('error', this.handleWebSocketError);
    },

    // 发送消息方法
    sendMessage(message) {
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(message);
        console.log('发送消息:', message);
      } else {
        console.warn('WebSocket 未连接，无法发送消息');
      }
    },

    // WebSocket 连接成功处理
    handleWebSocketOpen() {
      console.log('WebSocket 连接成功');
      this.isConnected = true;

      // 简化的心跳检测，每隔 40 秒发送一次心跳消息
      this.sendHeartbeat();
    },

    // WebSocket 收到消息处理
    handleWebSocketMessage(event) {
      console.log('收到消息:', event.data);
    },

    // WebSocket 连接关闭处理
    handleWebSocketClose() {
      console.log('WebSocket 连接关闭');
      this.isConnected = false;
      this.reconnect(); // 尝试重新连接
    },

    // WebSocket 错误处理
    handleWebSocketError(error) {
      console.error('WebSocket 错误:', error);
      this.isConnected = false;
      this.reconnect(); // 尝试重新连接
    },

    // 发送心跳消息
    sendHeartbeat() {
      // 清理已有定时器
      if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);

      this.heartbeatTimer = setInterval(() => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          this.websocket.send('heartbeat');
          console.log('发送心跳');
        }
      }, this.timeout);
    },

    // 重新连接 WebSocket
    reconnect() {
      if (this.lockReconnect) return;

      this.lockReconnect = true;
      setTimeout(() => {
        this.initWebSocket();
        this.lockReconnect = false;
      }, 5000); // 5秒后尝试重新连接
    },

    // 关闭 WebSocket 连接
    closeWebSocket() {
      if (this.websocket) {
        this.websocket.close();
      }
    }
  }
};
</script>
