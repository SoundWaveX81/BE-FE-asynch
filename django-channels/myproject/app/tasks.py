# app/tasks.py
import time
from celery import shared_task
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@shared_task
def long_running_task(user_id: int|str, time_to_run: int):
    # mimics a task that runs for <time> seconds 
    time.sleep(time_to_run)
    result = "Task completed"
    
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{user_id}",  # specific group for this user 
        {
            "type": "task.completed",  # method called in the consumer 
            "task_id": long_running_task.request.id,  # Celery generated Task ID 
            "message": result,
        }
    )
    return result