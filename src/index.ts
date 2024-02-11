const defaultDuration = 60 * 1000;

export const wait = (duration: number = defaultDuration): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
}