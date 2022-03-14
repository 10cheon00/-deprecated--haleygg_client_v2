const colorConfig = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  info: '#17a2b8',
  danger: '#dc3545',
  warning: '#ffc107',
  gray: '#babfc2',
  dark: '#343a40',
  
  // Custom colors
  light: '#f8f9fa',
  protoss: '#ffc400',
  terran: '#1d73dd',
  zerg: '#7424ae',
};

const getColor = (key) => {
  const color = colorConfig[key];
  if(color === undefined){
    return colorConfig.primary;
  }
  return color;
};

export { 
  colorConfig,
  getColor
}