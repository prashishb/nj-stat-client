// format date to users local format
export const formatDate = (date) => {
  const isoDate = new Date(date).toISOString();
  const time = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${isoDate.slice(0, 10)} ${time}`;
};

export const formatDateNew = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear().toString().slice(-2);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};
