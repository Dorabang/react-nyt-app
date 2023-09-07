const DateFormat = (date: string) => {
  const dateFormatting = new Date(date);
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const yyyy = dateFormatting.getFullYear();
  const mm = dateFormatting.getMonth() + 1;
  const dd = dateFormatting.getDate();
  const dayOfWeek = week[dateFormatting.getDay()];
  return `${yyyy}.${mm >= 10 ? mm : '0' + mm}.${
    dd >= 10 ? dd : '0' + dd
  }. (${dayOfWeek})`;
};

export default DateFormat;
