import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../task.service';
import { WebSocketService } from '../websocket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnDestroy {
  userId: string = ''
  httpResult: any;
  wsResult: any;
  wsSuscription!: Subscription;

  constructor( private taskService: TaskService, private wsService: WebSocketService ) {}

  startTask() {
    if( !this.userId ){
      alert('User ID has to be provided')
      return;
    }

    this.taskService.startTask( Number( this.userId ) ).subscribe(
      result => {
        this.httpResult = result;
        this.connectWebSocket();
      },
      err => {
        console.error( err )
      }
    )
  }

  connectWebSocket() {
    const socket$ = this.wsService.connect(this.userId);
    this.wsSuscription = socket$.subscribe(
      message => {
        this.wsResult = message;
      },
      err => console.error( 'WebSocket error', err )
    )

  }

  ngOnDestroy(): void {
    if( this.wsSuscription ) {
      this.wsSuscription.unsubscribe();
    }
  }

}
