import http from 'http';
import { app } from '../../app';
import { setupWS } from '../../ModuleUser/infraestructure/ws/socketServer';

const startServer = () => {
  const server = http.createServer(app);
  const port = process.env.PORT;

  setTimeout(() =>{
    const wsSetup = new setupWS();
    wsSetup.connectws();
  }, 10000)

  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

export { startServer };
