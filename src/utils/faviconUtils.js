// Utility function to change favicon based on route
export const setFavicon = (route) => {
  const faviconMap = {
    '/': '👏',
    '/login': '🔐',
    '/register': '📝',
    '/forgot-password': '🔑',
    '/dashboard': '📊',
    '/users': '👥',
    '/users/add': '➕',
    '/reports': '📈',
    '/settings': '⚙️',
  };

  const emoji = faviconMap[route] || '📱';
  
  // Create canvas and draw emoji
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(0, 0, 64, 64);
  
  // Draw emoji
  ctx.font = 'bold 40px Arial';
  ctx.fillText(emoji, 12, 48);
  
  // Convert to favicon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL();
  if (!document.querySelector("link[rel*='icon']")) {
    document.head.appendChild(link);
  }
};
