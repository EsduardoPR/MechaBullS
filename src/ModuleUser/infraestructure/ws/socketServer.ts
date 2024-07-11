import WebSocket from "ws";

const token = process.env.TOKEN_SECRET;

let retryAttempts = 0;
const calculateRetryInterval = (attempts: number) => {
  return Math.min(1000 * Math.pow(2, attempts), 300000);
};


export class setupWS{
  private ws: WebSocket | null = null;
  private retryAttempts = 0;

  connectws = () =>{
    this.ws = new WebSocket('ws://localhost:3030', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.ws.on('open', () => { 
      console.log('\nConexion with Server WS succesfull.\n');
      retryAttempts = 0;
    });
    
    this.ws.onerror = () => {
      console.error('\nWebsocket error')
      this.ws?.close();
    }
    this.ws.onclose = () =>{
      console.log('WebSocket connection closed');
      this.reconnect();
    }

  }
  
  private reconnect() {
    const retryInterval = calculateRetryInterval(this.retryAttempts);
    this.retryAttempts += 1;
    setTimeout(() => {
      console.log(`Intentando reconectar... Attempt #${this.retryAttempts}\n`);
      this.connectws();
    }, retryInterval);
  }
}
