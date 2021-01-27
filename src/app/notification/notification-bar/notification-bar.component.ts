import { Component, OnInit } from '@angular/core';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { NotificationQueries } from 'src/modules/notification/services/notification.queries';
import { NotificationStore } from 'src/modules/notification/notification.store';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.less']
})
export class NotificationBarComponent implements OnInit {
  anyNotifications: AnyNotification[];

  constructor(private notifService: NotificationService, private notifStore: NotificationStore, private notifQueries: NotificationQueries) {

  }

  async ngOnInit() 
  {
    this.anyNotifications = await this.notifQueries.getNotifications();
    console.log('any Notif', this.anyNotifications);

  }

  timeConversion(millisec: any) 
  {
    const date = new Date(millisec * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

}
