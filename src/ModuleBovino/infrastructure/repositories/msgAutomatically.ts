import { Bovino } from "../mongoModels/bovinoModel";
import { wsClient } from '../../../ModuleUser/infraestructure/ws/socketServer';
import { WebSocketMessage } from "./typesMsgs/msg";

async function msgAutoAddUpdateDelete(): Promise<void> {
    const changeStream = Bovino.watch();
  
    changeStream.on('change', (change: any) => {
      const documentData = change.fullDocument;  
      // Define el mensaje con la estructura que deseas
      const message: WebSocketMessage = {
          event: 'dbChange',
          data: documentData,
      };
  
      //wsClient.sendEvent(message);
    });
  
    changeStream.on('error', (error: any) => {
      console.error('Error in Change Stream:', error);
    });
  }
  
  export { msgAutoAddUpdateDelete };