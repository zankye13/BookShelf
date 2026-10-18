import { useState } from "react";
import { BookOpen, Trash2, MoreHorizontal } from "lucide-react";
import { statusLabels } from "../../data/books.js";
import { getFriends } from '../../services/notificationService';
import RecommendBookModal from '../notifications/RecommendBookModal';
import BookDetailModal from './BookDetailModal'; // yeni modal importu

export default function BookCard({ book, onStatusChange, onDelete }) {
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false); // 3 nokta modal i state i 

  return (
    <article className="book-card card-design-v2">
      {/* kapak resmi alani */}
      <div className={`book-cover cover-${book.color || "blue"}`}>
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={`${book.title} kitap kapağı`} 
            loading="lazy"
            onError={(event) => { event.currentTarget.style.display = "none"; }} 
          />
        ) : null}
        <div className="cover-fallback">
          <BookOpen size={25} />
          <span>{book.title}</span>
        </div>

        {/* 3 nokta butonu - detay ve arka kapak modalını acar */}
        <button 
          className="more-button-top" 
          aria-label={`${book.title} detayları`}
          onClick={() => setIsDetailOpen(true)}
          title="Arka kapak ve notları gör"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* kitap bilgileri alani */}
      <div className="book-info">
        <div className="book-meta-top">
          <div className="book-category pill-category">{book.category}</div>
          <span className={`status-pill status-${book.status}`}>
            {statusLabels[book.status]}
          </span>
        </div>
        
        <h3 title={book.title}>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        
        {/* detay bilgiler */}
        <div className="book-details-list">
          <span className="detail-item"><strong>Baskı:</strong> {book.year || "Belirtilmemiş"}</span>
          <span className="detail-item"><strong>ISBN:</strong> {book.isbn || "Belirtilmemiş"}</span>
        </div>

        {/* footer */}
        <div className="book-card-footer-v2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <select 
            className="status-select-v2"
            value={book.status}
            onChange={(e) => onStatusChange(book.id, e.target.value)}
            aria-label="Kitap durumunu değiştir"
          >
            <option value="to-read">Okunacak</option>
            <option value="reading">Okunuyor</option>
            <option value="read">Okundu</option>
          </select>

          <div className="footer-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="button-recommend-v2" onClick={() => setIsRecommendOpen(true)}>
              Öner
            </button>
            <button className="delete-button-bottom" title="Kitabı sil" onClick={() => onDelete(book.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* oneri modal i */}
      {isRecommendOpen && (
        <RecommendBookModal 
          book={book} 
          onClose={() => setIsRecommendOpen(false)} 
          friends={getFriends()}
        />
      )}

      {/* arka kapak ve notlar modal i */}
      {isDetailOpen && (
        <BookDetailModal 
          book={book} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </article>
  );
}