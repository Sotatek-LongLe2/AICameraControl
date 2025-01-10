export const formatCountdown = (countdown: number | null): string => {
  if (countdown === null) return "";
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "";
  }

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? "1 sec ago" : `${diffInSeconds} secs ago`;
  }

  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? "1 min ago" : `${diffInMinutes} mins ago`;
  }

  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  }

  // Days ago
  const diffInDays = Math.floor(diffInHours / 24);
  return diffInDays === 1 ? "1 Day Ago" : `${diffInDays} Days Ago`;
};
