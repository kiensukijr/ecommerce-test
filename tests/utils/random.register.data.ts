export const generateRandomEmail = (prefix: string = 'auto') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);

  return `${prefix}_${timestamp}_${random}@gmail.com`;
};

export const generateRandomPassword = (prefix: string = 'Pass') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);

  return `${prefix}_${timestamp}_${random}`;
};