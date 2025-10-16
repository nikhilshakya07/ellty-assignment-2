// Utility functions for UI components

// Generate consistent avatar colors based on username
export const getAvatarColor = (username: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-cyan-500',
    'bg-emerald-500'
  ];
  
  // Use username to consistently pick the same color
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};
