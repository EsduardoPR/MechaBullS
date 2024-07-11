import http from 'http';
import { app } from '../../app';
import { setupWS } from '../../ModuleUser/infraestructure/ws/socketServer';

const startServer = () => {
  const server = http.createServer(app);
  const port = process.env.PORT;

  const wsSetup = new setupWS();
  wsSetup.connectws();


  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

export { startServer };
