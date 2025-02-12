import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { Subscription } from 'rxjs';
import { Notification } from '../../types/notification.types';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('notificationButton') notificationButton!: ElementRef;
  @ViewChild('notificationPanel') notificationPanel!: ElementRef;

  notifications: Notification[] = [];
  unreadCount: number = 0;
  isOpen: boolean = false;
  private notificationSubscription?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationSubscription = this.notificationService
      .getNotifications()
      .subscribe(notifications => {
        this.notifications = notifications;
        this.updateUnreadCount();
      });
  }

  ngOnDestroy() {
    this.notificationSubscription?.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.notificationButton?.nativeElement.contains(event.target) &&
        !this.notificationPanel?.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  acceptInvite(notification: Notification) {
    this.notificationService.acceptInvite(notification.id);
    this.markAsRead(notification);
  }

  declineInvite(notification: Notification) {
    this.notificationService.declineInvite(notification.id);
    this.markAsRead(notification);
  }

  private markAsRead(notification: Notification) {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id);
    }
  }
}