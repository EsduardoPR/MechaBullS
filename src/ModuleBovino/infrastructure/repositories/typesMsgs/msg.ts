export interface WebSocketMessage {
    event?: string;
    action?: string;
    data?: any; // Puedes definir un tipo más específico si conoces la estructura de los datos
  }