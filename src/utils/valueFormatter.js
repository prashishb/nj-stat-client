// format date to users local format
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

export const formatDateNew = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear().toString().slice(-2);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};
