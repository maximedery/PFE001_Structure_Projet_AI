import dayjs from 'dayjs';

export function getDurationString(start: string, end: string) {
  let result = '';

  const dayjsStart = dayjs(start).startOf('day');
  const dayjsEnd = dayjs(end).startOf('day');

  const diffDays = dayjsEnd.diff(dayjsStart, 'day');

  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = Math.floor((diffDays % 365) % 30);

  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''}`;
  }

  if (months > 0) {
    result += `${result.length ? ', ' : ''}${months} month${
      months > 1 ? 's' : ''
    }`;
  }

  if (days > 0) {
    result += `${result.length ? ', ' : ''}${days} day${days > 1 ? 's' : ''}`;
  }

  return result;
}
