import React, { useState } from 'react';
import { getProfile, saveProfile } from '../../services/profileService';

export default function ProfileForm() {
  const [profile, setProfile] = useState(getProfile);
  const [success, setSuccess] = useState(false);

  const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // ismin ilk harfini otomatik avatar yapalım
    const firstLetter = profile.name ? profile.name.charAt(0).toLocaleUpperCase("tr-TR") : "Z";
    const updated = { ...profile, avatar: firstLetter };
    saveProfile(updated);
    setProfile(updated);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', maxWidth: '500px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1f2937' }}>Profilini Düzenle</h3>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Ad Soyad</label>
        <input 
          type="text" 
          value={profile.name} 
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Profil Rengi</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {colors.map(color => (
            <div 
              key={color} 
              onClick={() => setProfile({ ...profile, avatarBg: color })}
              style={{ 
                width: '30px', height: '30px', borderRadius: '50%', background: color, cursor: 'pointer',
                border: profile.avatarBg === color ? '3px solid #111' : '2px solid transparent' 
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Biyografi</label>
        <textarea 
          value={profile.bio} 
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', minHeight: '80px' }}
        />
      </div>

      <button type="submit" className="button button-primary" style={{ width: '100%', padding: '10px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
        Değişiklikleri Kaydet
      </button>

      {success && <p style={{ color: '#10b981', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>✓ Profil güncellendi!</p>}
    </form>
  );
}