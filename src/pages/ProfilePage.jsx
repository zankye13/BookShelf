import React from 'react';
import ProfileForm from '../components/profile/ProfileForm';

export default function ProfilePage() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1>Profil Yönetimi</h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Kişisel bilgilerini ve okur tercihlerini güncelle.</p>
      </div>
      <ProfileForm />
    </div>
  );
}