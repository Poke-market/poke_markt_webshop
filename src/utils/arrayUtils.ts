export const getRandomItems = <T>(items: T[], count: number): T[] => {
  const products = [...items];
  const randomItems: T[] = [];
  for (let i = 0; i < count && products.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * products.length);
    randomItems.push(products[randomIndex]);
    products.splice(randomIndex, 1); // Remove the selected item to avoid duplicates
  }
  return randomItems;
};
