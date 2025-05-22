/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param url YouTube URL
 * @returns YouTube video ID or null if not found
 */
export const extractYoutubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Gets the YouTube thumbnail URL for a video
 * @param videoUrl YouTube video URL
 * @param quality Thumbnail quality: default, hqdefault, mqdefault, sddefault, maxresdefault
 * @returns URL to the YouTube thumbnail
 */
export const getYoutubeThumbnailUrl = (videoUrl: string, quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string => {
  const videoId = extractYoutubeVideoId(videoUrl);
  
  if (!videoId) {
    return 'https://images.unsplash.com/photo-1599353229998-484ff1334dfd'; // Fallback image
  }
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
