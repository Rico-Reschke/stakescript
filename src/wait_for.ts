export const wait_for = (
  conditional: () => boolean,
  interval: number = 100
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const intervalId = setInterval(() => {
      if (conditional()) {
        clearInterval(intervalId);
        resolve();
      }
    }, interval);
  });
};