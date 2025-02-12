export interface Notification {
    id: string;
    toUserId: string;
    fromUser: string;
    type: 'invite' | 'system';
    read: boolean;
    accepted?: boolean;
    createdAt: Date;
    boardName?: string;
  }