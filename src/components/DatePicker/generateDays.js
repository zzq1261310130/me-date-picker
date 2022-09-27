import dayjs from "dayjs";

/**
 *
 * @param {*} year
 * @param {*} month
 * @param {*} weekFormat
 * @returns
 */
const generateDays = (year, month, weekFormat) => {
  const startOfMonth = 1;
  const endOfMonth = dayjs(`${year}-${month}`, "YYYY-M").daysInMonth();
  const currentMonthFirstDay = `${year}-${month}-1`;
  const currentMonthLastDay = `${year}-${month}-${endOfMonth}`;

  const firstDayWeek = dayjs(`${year}-${month}-1`, "YYYY-M-D").day();

  const lastMonthDaysArray = [];
  let value;
  let isCurMonth;
  if (weekFormat === "zh") {
    const firstDayWeek_zh = firstDayWeek === 0 ? 7 : firstDayWeek;
    const lastMonthDays = firstDayWeek_zh - 1;
    for (let i = lastMonthDays; i > 0; i--) {
      value = dayjs(currentMonthFirstDay, "YYYY-M-D")
        .subtract(i, "d")
        .format("YYYY-M-D");
      isCurMonth = false;
      lastMonthDaysArray.push({ value, isCurMonth });
    }
  } else {
    for (let k = firstDayWeek; k > 0; k--) {
      value = dayjs(currentMonthFirstDay, "YYYY-M-D")
        .subtract(k, "d")
        .format("YYYY-M-D");
      isCurMonth = false;
      lastMonthDaysArray.push({ value, isCurMonth });
    }
  }

  const curMonthDaysArray = [];
  for (let j = startOfMonth; j <= endOfMonth; j++) {
    value = `${year}-${month}-${j}`;
    isCurMonth = true;
    curMonthDaysArray.push({ value, isCurMonth });
  }

  const nextMonthDaysArray = [];
  const nextMonthDays =
    6 * 7 - lastMonthDaysArray.length - curMonthDaysArray.length;
  for (let n = 1; n <= nextMonthDays; n++) {
    value = dayjs(currentMonthLastDay, "YYYY-M-D")
      .add(n, "d")
      .format("YYYY-M-D");
    isCurMonth = false;
    nextMonthDaysArray.push({ value, isCurMonth });
  }

  const calendarDaysArray = [];
  [...lastMonthDaysArray, ...curMonthDaysArray, ...nextMonthDaysArray].forEach(
    (item, index) => {
      if (index % 7 === 0) {
        calendarDaysArray.push([]);
      }
      calendarDaysArray[Math.floor(index / 7)].push(item);
    }
  );

  return calendarDaysArray;
};

const generateDaysByNumber = (yearR, monthR, currentValue, weekFormat) => {
  let year;
  let month;
  if (yearR !== 0) {
    [year, month] = dayjs(currentValue, "YYYY-M-D")
      .add(yearR, "year")
      .format("YYYY-M")
      .split("-");
  } else {
    [year, month] = dayjs(currentValue, "YYYY-M-D")
      .add(monthR, "month")
      .format("YYYY-M")
      .split("-");
  }
  return [year, month, generateDays(year, month, weekFormat)];
};

export { generateDays, generateDaysByNumber };
