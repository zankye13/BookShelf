import React from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, Quote, Calendar, Hash } from 'lucide-react';

export default function BookDetailModal({ book, onClose }) {
  if (!book) return null;

  // modalı dogrudan DOM un en ustune baglayarak kart icinden cikariyoruz
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: '28px' }}
      >
        {/* ust baslik ve kapat butonu */}
        <div className="modal-heading" style={{ marginBottom: '16px' }}>
          <div>
            <span className="pill-category" style={{ fontSize: '10px' }}>{book.category}</span>
            <h2 style={{ fontSize: '20px', marginTop: '6px' }}>{book.title}</h2>
            <p style={{ color: '#89909e', fontSize: '12px', margin: 0 }}>{book.author}</p>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* detay alanlari */}
        <div style={{ display: 'grid', gap: '18px' }}>
          <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6366f1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
              <BookOpen size={15} />
              <span>ARKA KAPAK YAZISI</span>
            </div>
            <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
              {book.description || "Bu kitap için henüz arka kapak yazısı veya özet eklenmemiş."}
            </p>
          </div>

          <div style={{ background: '#f0edff', padding: '14px', borderRadius: '10px', border: '1px solid #e0d9ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7764d8', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
              <Quote size={15} />
              <span>FAVORİ ALINTI & NOTLAR</span>
            </div>
            <p style={{ fontSize: '12px', color: '#374151', fontStyle: 'italic', lineHeight: '1.5', margin: 0 }}>
              "{book.note || "Henüz bir not eklenmedi."}"
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: '#6b7280', paddingTop: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> <strong>Baskı Yılı:</strong> {book.year || "Belirtilmemiş"}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Hash size={13} /> <strong>ISBN:</strong> {book.isbn || "Belirtilmemiş"}
            </span>
          </div>
        </div>

        <div style={{ marginTop: '22px', textAlign: 'right' }}>
          <button 
            className="button button-secondary" 
            onClick={onClose}
            style={{ padding: '8px 18px', fontSize: '12px' }}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>,
    document.body // portal hedefi
  );
}