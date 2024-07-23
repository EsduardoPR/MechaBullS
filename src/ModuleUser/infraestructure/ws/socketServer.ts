import WebSocket from 'ws';
import { WebSocketMessage } from '../../../ModuleBovino/infrastructure/repositories/typesMsgs/msg';

const token = process.env.TOKEN_SECRET;

const calculateRetryInterval = (attempts: number): number => {
  return Math.min(1000 * Math.pow(2, attempts), 300000);
};

class SetupWS {
  private ws: WebSocket | null = null;
  private retryAttempts = 0;

  connectws = (): void => {
    this.ws = new WebSocket('ws://localhost:3030', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.ws.on('open', () => {
      console.log('\nConexion with Server WS successful.\n');
      this.retryAttempts = 0;
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      console.log('Received message from server:', data.toString());
    });

    this.ws.onerror = () => {
      console.error('\nWebSocket error');
      this.ws?.close();
    };

    this.ws.on('close', () => {
      console.log('WebSocket connection closed');
      this.reconnect();
    });
  };

  reconnect = (): void => {
    const retryInterval = calculateRetryInterval(this.retryAttempts);
    this.retryAttempts += 1;
    setTimeout(() => {
      console.log(`Attempting to reconnect... Attempt #${this.retryAttempts}\n`);
      this.connectws();
    }, retryInterval);
  };

  sendEvent = (message: WebSocketMessage): void => {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageStr = JSON.stringify(message);
      this.ws.send(messageStr);
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  };

  getWebSocket = (): WebSocket | null => this.ws;
}

const wsClient = new SetupWS();
wsClient.connectws();

export { wsClient };
