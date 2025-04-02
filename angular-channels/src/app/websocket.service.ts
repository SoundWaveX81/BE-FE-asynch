import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  public connect( userId: string ): WebSocketSubject<any> {
    if ( !this.socket$ || this.socket$.closed ) {
      this.socket$ = webSocket( `ws://localhost:8000/ws/tasks/?user_id=${ userId }` );
    }

    return this.socket$;
  }

}