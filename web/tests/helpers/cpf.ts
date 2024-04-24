export const generateRandomCPF = () => {
  const cpfChars = [];
  for (let i = 0; i < 11; i++) {
    cpfChars.push(Math.floor(Math.random() * 10));
  }
  return cpfChars.join('');
};
