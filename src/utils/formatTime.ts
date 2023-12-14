export const formatTime = (seconds: number): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const hours = pad(Math.floor(seconds / 3600));
  const minutes = pad(Math.floor((seconds % 3600) / 60));
  const secs = pad(seconds % 60);
  return `${hours}:${minutes}:${secs}`;
};

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};
