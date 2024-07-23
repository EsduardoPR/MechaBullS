import http from 'http';
import { app } from '../../app';
import { wsClient } from '../../ModuleUser/infraestructure/ws/socketServer';

const startServer = () => {
  const server = http.createServer(app);
  const port = process.env.PORT;

  setTimeout(() =>{
    wsClient.connectws();
  }, 10000)

  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

export { startServer };
