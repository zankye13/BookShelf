import React from 'react';
import NotificationPanel from '../components/notifications/NotificationPanel';

export default function NotificationsPage() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1>Bildirimler ve Öneriler</h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Arkadaşlarından gelen kitap önerilerini ve güncellemeleri buradan takip et.</p>
      </div>
      <NotificationPanel />
    </div>
  );
}