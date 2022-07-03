const randomR = () => {
  return Math.floor(Math.random() * 256);
};
export const randomRGB = () => {
  return `rgb(${randomR()} ${randomR()} ${randomR()})`;
};
