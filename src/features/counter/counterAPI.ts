export const fetchCount = (amount: number = 1) => {
  return new Promise<{ data: number }>((resolve) => {
    setTimeout(() => {
      resolve({ data: amount });
    }, 500);
  });
};
