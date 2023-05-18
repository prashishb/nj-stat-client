export const getTimeUntilNextUpdate = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const timeUntilNextHour =
    3600000 - minutes * 60000 - seconds * 1000 - milliseconds + 60000;
  return timeUntilNextHour;
};
