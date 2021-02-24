import { Injectable } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({providedIn: 'root'})

export class NotificationService {

  constructor(private notifer: NotifierService) { }

  public notify(type:NotificationType, message:string) {
    this.notifer.notify(type, message);
  }
}
