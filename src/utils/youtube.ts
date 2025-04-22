
/**
 * Extrae el ID de YouTube desde un texto o una URL.
 */
export const extractYouTubeIdFromText = (text: string): string | null => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11}))/;
  const match = text.match(urlRegex);
  if (match && match[2]) {
    return match[2];
  }
  return null;
};

export const getYouTubeEmbedUrl = (urlOrId: string): string => {
  // Si es sólo el ID, lo envuelve en la URL embed; si es una URL, extrae el ID.
  const idMatch = urlOrId.match(/^[\w-]{11}$/)
    ? urlOrId
    : extractYouTubeIdFromText(urlOrId);
  if (idMatch) {
    return `https://www.youtube.com/embed/${idMatch}?autoplay=1`;
  }
  return urlOrId;
};

export const isYouTubeUrl = (url?: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

export const getYouTubeVideoId = (url?: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
