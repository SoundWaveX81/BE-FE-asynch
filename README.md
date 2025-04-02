# :baby: Example of Asynchronous communicaton BE - FE

Backend (*built with Django, Redis, Daphne and Celery*) has and endpoint to get an user id and then start processing a task that lasts 10 segs by default. Also the backend starts a websocket. 

Frontend (*built with Angular*) has a component that allows the user to put and `UserID` and send a `POST` request to the backend and then connects to the WebSocket to await response when the task ends.  


### :rocket: To run the backend:

``` shell
$ docker compose up
```
*Backend will start listening on port `8000`* :ear:

### 🛸 To run the Frontend, `cd` into the project's folder and run:

``` shell
$ ng serve 
```

*Frontend will start listening on port `4200`* :ear:

--- 
**Dev Notes:**

Task endpoint will be `/start-task/` :arrow_left: 

POST body has to be:
``` json
{
    "id": 234,
    "time": 30
}
```
- `id`: must be an integer, simulates an use id
- `time`: must be an integer. It's optional, the default value is 10. this will be the number or seconds that the celery task will last. 


WebSocket could be reached on:

```ws://localhost:8000/ws/tasks/?user_id=<user_id>```

:alien: :metal: :alien:
