import json
from urllib.parse import parse_qs
from channels.generic.websocket import AsyncWebsocketConsumer

class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Obtener el id del usuario de la query string: ws://host/ws/tasks/?user_id=10
        qs = parse_qs(self.scope['query_string'].decode())
        user_id = qs.get('user_id', [None])[0]
        if not user_id:
            await self.close()
            return
        self.group_name = f"user_{user_id}"
        
        # Agregar la conexión al grupo específico del usuario
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Remover la conexión del grupo
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Este método se llama cuando se envía un mensaje al grupo
    async def task_completed(self, event):
        # Enviar el mensaje al cliente WebSocket, incluyendo el task_id
        await self.send(text_data=json.dumps({
            "task_id": event["task_id"],
            "message": event["message"]
        }))
