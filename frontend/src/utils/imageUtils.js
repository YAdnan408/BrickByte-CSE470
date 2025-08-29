// Utility function to ensure image URLs are full URLs
export const getFullImageUrl = (url) => {
  if (!url) return url;
  
  // If URL already starts with http, return as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // If URL starts with /backend, prepend the backend server URL
  if (url.startsWith('/backend')) {
    return `http://localhost:3000${url}`;
  }
  
  // Return as is for other cases (like external URLs)
  return url;
};

// Convert array of image URLs to full URLs
export const getFullImageUrls = (urls) => {
  if (!Array.isArray(urls)) return urls;
  return urls.map(url => getFullImageUrl(url));
};
