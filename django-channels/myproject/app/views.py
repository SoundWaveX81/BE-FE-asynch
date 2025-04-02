# app/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .tasks import long_running_task

@csrf_exempt
def start_task(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('id')
            time = data.get('time', 10)  # time that the task will run
            if not user_id:
                raise ValueError("user's id is required")
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        
        # starts the task for the given user
        task = long_running_task.delay(user_id, time)
        return JsonResponse({'status': 'ok', 'task_id': task.id})
    return JsonResponse({'error': 'only post requests are POST allowed'}, status=400)