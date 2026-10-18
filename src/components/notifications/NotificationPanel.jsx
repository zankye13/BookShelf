import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../../services/notificationService';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState(getNotifications);

  // yeni bir bildirim geldiginde veya durum degistiginde paneli guncel tutar
  useEffect(() => {
    const handleUpdate = () => setNotifications(getNotifications());
    window.addEventListener("notificationsUpdated", handleUpdate);
    return () => window.removeEventListener("notificationsUpdated", handleUpdate);
  }, []);

  const handleMarkAsRead = (id) => {
    // servis üzerinden hem localStorage guncellenir hem de notificationsUpdated eventi tetiklenir
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '400px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', marginBottom: '16px', color: '#1f2937' }}>
        <Bell size={18} /> Bildirimler & Öneriler
      </h3>

      {notifications.length === 0 ? (
        <p style={{ color: '#6b7280', fontSize: '13px' }}>Hiç bildirimin yok.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notifications.map((n) => (
            <li 
              key={n.id} 
              style={{ 
                padding: '10px 12px', 
                marginBottom: '8px', 
                background: n.read ? '#f9fafb' : '#ede9fe', 
                borderRadius: '8px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}
            >
              <div>
                <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>{n.text}</p>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{n.date}</span>
              </div>
              {!n.read && (
                <button 
                  onClick={() => handleMarkAsRead(n.id)} 
                  title="Okundu işaretle" 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' }}
                >
                  <CheckCircle size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}