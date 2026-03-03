const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 10;

export function addToRecentlyViewed(productId: string) {
  const stored = localStorage.getItem(STORAGE_KEY);
  let ids: string[] = stored ? JSON.parse(stored) : [];

  // Retirer si déjà présent
  ids = ids.filter((id) => id !== productId);

  // Ajouter au début
  ids.unshift(productId);

  // Limiter à 10
  ids = ids.slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}