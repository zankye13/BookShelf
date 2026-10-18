import React, { useState } from 'react';
import { sendBookRecommendation } from '../../services/notificationService';

export default function RecommendBookModal({ book, onClose, friends }) {
  const [selectedFriend, setSelectedFriend] = useState(friends[0]?.name || "");
  const [success, setSuccess] = useState("");

  const handleRecommend = (e) => {
    e.preventDefault();
    if (!selectedFriend) return;
    
    sendBookRecommendation(selectedFriend, book.title);
    setSuccess(`"${book.title}" kitabı ${selectedFriend} adlı kişiye önerildi!`);
    
    // kısa süre sonra modal ı kapat
    setTimeout(() => {
        setSuccess("");
        onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop-recommend" onClick={onClose}>
      <div className="modal-content-recommend" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title-recommend">Arkadaşına Öner ✨</h3>
        <p className="modal-copy-recommend">
          <strong>"{book.title}"</strong> kitabını kiminle paylaşmak istersin?
        </p>
        
        <form onSubmit={handleRecommend} className="modal-form-recommend">
          <div className="form-group-recommend">
            <label>Arkadaş Seç</label>
            <select 
                value={selectedFriend} 
                onChange={(e) => setSelectedFriend(e.target.value)}
                className="modal-select-recommend"
            >
              {friends.map(friend => (
                <option key={friend.id} value={friend.name}>{friend.name}</option>
              ))}
            </select>
          </div>

          <div className="modal-actions-recommend">
            <button type="button" className="button button-text-recommend" onClick={onClose}>
              Vazgeç
            </button>
            <button type="submit" className="button button-primary-recommend">
              Bildirimi Gönder
            </button>
          </div>
        </form>
        
        {success && <p className="success-message-recommend">✓ {success}</p>}
      </div>
    </div>
  );
}