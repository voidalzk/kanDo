import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Firestore, collection, query, where, orderBy, collectionData, doc, updateDoc, deleteDoc } from "@angular/fire/firestore";
import { Auth, User as FirebaseUser } from "@angular/fire/auth";
import { AuthService } from "./auth.service";
import { Notification } from '../types/notification.types';

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);

  constructor(
    private firestore: Firestore, 
    private authService: AuthService,
    private auth: Auth
  ) {
    this.initNotificationListener().catch(error => 
      console.error('Error in notification service initialization:', error)
    );
  }

  private async initNotificationListener() {
    try {
      const currentUser = await this.authService.getCurrentUser();
      if (!currentUser) return;
      const user = currentUser as unknown as FirebaseUser;
      if (user?.uid) {
        const notificationsRef = collection(this.firestore, "notifications");
        const q = query(
          notificationsRef,
          where("toUserId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        collectionData(q, { idField: "id" }).subscribe((notifications) => {
          this.notifications.next(notifications as Notification[]);
        });
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const notificationRef = doc(
        this.firestore,
        `notifications/${notificationId}`
      );
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const promises = this.notifications.value
        .filter((n) => !n.read)
        .map((n) => {
          const notificationRef = doc(this.firestore, `notifications/${n.id}`);
          return updateDoc(notificationRef, { read: true });
        });
      await Promise.all(promises);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async declineInvite(notificationId: string): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const notificationRef = doc(
        this.firestore,
        `notifications/${notificationId}`
      );
      await deleteDoc(notificationRef);
    } catch (error) {
      console.error('Error declining invite:', error);
      throw error;
    }
  }

  async acceptInvite(notificationId: string): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const notificationRef = doc(
        this.firestore,
        `notifications/${notificationId}`
      );
      await updateDoc(notificationRef, { accepted: true, read: true });
    } catch (error) {
      console.error('Error accepting invite:', error);
      throw error;
    }
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }
}
