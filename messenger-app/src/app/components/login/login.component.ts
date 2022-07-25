import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, tap, takeUntil} from 'rxjs/operators';
import { MessengerService } from '../../services/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private unsubscribeAll$: Subject<any> = new Subject<any>();
  roomId = new FormControl('',[Validators.required]);
  personId = new FormControl('',[Validators.required]);

  constructor(
    private messenger: MessengerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  startSession(){
    if(!this.roomId.valid || !this.personId.valid){
      this.roomId.markAllAsTouched();
      this.personId.markAllAsTouched();
      return;
    }
    
    this.messenger.enterSession(
      {
        roomId:this.roomId.value,
        personId:this.personId.value
      }
    ).pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:any)=>{
        if(d.success){
          this.messenger.roomId = this.roomId.value;
          this.messenger.personId = this.personId.value;
          this.unsubscribeAll$.next(true);
          this.router.navigate(['/chat']);
        } else {
          //Show alert
        }
      }),
    ).subscribe()
  }

}
