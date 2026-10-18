import { useState } from "react";
import { X } from "lucide-react";

const initialForm = { title: "", author: "", category: "Roman", year: "", status: "to-read" };

export default function AddBookModal({ onClose, onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError("Kitap adı ve yazar alanları zorunludur.");
      return;
    }
    onAdd({
      ...form,
      id: crypto.randomUUID ? crypto.randomUUID() : `book-${Date.now()}`,
      title: form.title.trim(),
      author: form.author.trim(),
      year: form.year ? Number(form.year) : null,
      color: ["rose", "orange", "blue", "green", "purple", "teal"][Math.floor(Math.random() * 6)],
      cover: ""
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <div><span className="eyebrow">KOLEKSİYONUNU BÜYÜT</span><h2 id="modal-title">Yeni kitap ekle</h2></div>
          <button className="icon-button" type="button" aria-label="Kapat" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="book-form">
          <label>Kitap adı *<input name="title" value={form.title} onChange={update} placeholder="Örn. Saatleri Ayarlama Enstitüsü" autoFocus /></label>
          <label>Yazar *<input name="author" value={form.author} onChange={update} placeholder="Yazar adı" /></label>
          <div className="form-row">
            <label>Kategori
              <select name="category" value={form.category} onChange={update}>
                {["Roman", "Klasik", "Bilim", "Fantastik", "Tarih", "Kişisel Gelişim", "Diğer"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>Yayın yılı<input name="year" type="number" min="0" max="2100" value={form.year} onChange={update} placeholder="2024" /></label>
          </div>
          <label>Okuma durumu
            <select name="status" value={form.status} onChange={update}>
              <option value="to-read">Okunacak</option><option value="reading">Okunuyor</option><option value="read">Okundu</option>
            </select>
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>Vazgeç</button>
            <button type="submit" className="button button-primary">Kitabı ekle</button>
          </div>
        </form>
      </section>
    </div>
  );
}
