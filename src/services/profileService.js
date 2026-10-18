const PROFILE_KEY = "bookshelf-profile-v1";
const REVIEWS_KEY = "bookshelf-reviews-v1";

export function getProfile() {
  const defaultProfile = {
    name: "Kitap Okuru",
    bio: "Kişisel kütüphanem ve okuma yolculuğum.",
    avatar: "K",
    favoriteGenre: "Roman / Edebiyat"
  };
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("profileUpdated"));
}

export function getBookReviews(bookId) {
  try {
    const saved = localStorage.getItem(REVIEWS_KEY);
    const allReviews = saved ? JSON.parse(saved) : {};
    return allReviews[bookId] || [];
  } catch {
    return [];
  }
}

export function addBookReview(bookId, review) {
  try {
    const saved = localStorage.getItem(REVIEWS_KEY);
    const allReviews = saved ? JSON.parse(saved) : {};
    const bookReviews = allReviews[bookId] || [];
    allReviews[bookId] = [review, ...bookReviews];
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
    return allReviews[bookId];
  } catch {
    return [];
  }
}