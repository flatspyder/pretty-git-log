export const colorMap: { [key: string]: string } = {
  black: '#000000',
  red: '#ff0000',
  green: '#008000',
  yellow: '#ffff00',
  blue: '#0000ff',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff',
};

export const getContrastingTextColor = (color: string): string => {
  const hex = colorMap[color] || color;
  if (!hex.startsWith('#')) {
    return '#ffffff';
  }

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};
