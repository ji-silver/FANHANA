export const getDayOfWeek = (date: any) => {
  const WEEKS: ReadonlyArray<string> = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ];
  const dayOfWeek = WEEKS[new Date(date).getDay()];
  return dayOfWeek;
};

export const formatDateForTable = (date: string) => {
  const dateArr = date.split("-");
  return `${dateArr[1]}월 ${dateArr[2]}일 (${getDayOfWeek(date)})`;
};

export const formatDate = (date: Date) => {
  // YYYYMMDD 형식으로 반환
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${month < 10 ? `0${month}` : month}${
    day < 10 ? `0${day}` : day
  }`;
};

export const getDaysInMonthArr = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

export const isSameDate = (date1: Date, date2: Date) => {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
    return true;
  return false;
};
