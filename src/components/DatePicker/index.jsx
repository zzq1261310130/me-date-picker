import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import "./index.less";
import weekday from "./const";
import { generateDays, generateDaysByNumber } from "./generateDays";

function DatePicker(props, ref) {
  
  const today = dayjs().format("YYYY-M-D");
  const { value = today, weekFormat = "zh", lang = "zh" } = props;
  const weekdays = weekday[`${weekFormat}_${lang}`];
  const [year, month, _] = value.split("-");
  const yearRef = useRef();
  const monthRef = useRef();

  const [yearDisplay, setYearDisplay] = useState(false);
  const [monthDisplay, setMonthDisplay] = useState(false);

  const initCalendarDaysArray = generateDays(year, month, weekFormat);
  const [calendarDaysArray, setCalendarDaysArray] = useState(
    initCalendarDaysArray
  );

  const [curYearMonth, setCurYearMonth] = useState([year, month]);
  const [chosedDay, setChosedDay] = useState(value);

  const clickOutline = (yearR, monthR) => {
    return () => {
      let [curYear, curMonth, newCalendarDaysArray] = generateDaysByNumber(
        yearR,
        monthR,
        `${curYearMonth[0]}-${curYearMonth[1]}-1`,
        weekFormat
      );
      setCalendarDaysArray(newCalendarDaysArray);
      setCurYearMonth([curYear, curMonth]);
    };
  };

  const choseDay = (dayValue, isCurMonth) => {
    setChosedDay(dayValue);

    if (!isCurMonth) {
      let [curYear, curMonth, _] = dayValue.split("-");
      setCalendarDaysArray(generateDays(curYear, curMonth, weekFormat));
      setCurYearMonth([curYear, curMonth]);
    }
    ref.getValue(dayValue);
  };

  const choseToday = () => {
    const today = dayjs().format("YYYY-M-D");
    let [curYear, curMonth, _] = today.split("-");
    setCalendarDaysArray(generateDays(curYear, curMonth, weekFormat));
    setCurYearMonth([curYear, curMonth]);
    setChosedDay(today);
    ref.getValue(today);
  };

  const changeYearDisplay = () => {
    setYearDisplay(!yearDisplay);
  };

  const yearChangeBlur = (e) => {
    let [curYear, curMonth] = [
      e.target.value || curYearMonth[0],
      curYearMonth[1],
    ];
    setYearDisplay(!yearDisplay);
    setCalendarDaysArray(generateDays(curYear, curMonth, weekFormat));
    setCurYearMonth([curYear, curMonth]);
  };

  const changeMonthDisplay = () => {
    setMonthDisplay(!monthDisplay);
  };
  const monthChangeBlur = (e) => {
    let [curYear, curMonth] = [
      curYearMonth[0],
      e.target.value || curYearMonth[1],
    ];
    setMonthDisplay(!monthDisplay);
    setCalendarDaysArray(generateDays(curYear, curMonth, weekFormat));
    setCurYearMonth([curYear, curMonth]);
  };

  useEffect(() => {
    yearRef.current.focus();
    monthRef.current.focus();
    setCalendarDaysArray(generateDays(...curYearMonth, weekFormat));
  }, [yearDisplay, monthDisplay, weekFormat]);

  return (
    <div className="datePicker">
      <div className="dateHead">
        <DoubleLeftOutlined
          className="doubleLeft"
          onClick={clickOutline(-1, 0)}
        />
        <LeftOutlined className="left" onClick={clickOutline(0, -1)} />
        <div className="middle">
          <span
            className="year"
            onClick={changeYearDisplay}
            style={{ display: yearDisplay ? "none" : "" }}
          >{`${curYearMonth[0]}${lang === "zh" ? "年" : " "}`}</span>
          <input
            type={"text"}
            ref={yearRef}
            style={{ display: yearDisplay ? "" : "none" }}
            onBlur={yearChangeBlur}
          ></input>
          <span
            className="month"
            onClick={changeMonthDisplay}
            style={{ display: monthDisplay ? "none" : "" }}
          >{`${curYearMonth[1]}${lang === "zh" ? "月" : " "}`}</span>
          <input
            type={"text"}
            ref={monthRef}
            style={{ display: monthDisplay ? "" : "none" }}
            onBlur={monthChangeBlur}
          ></input>
        </div>

        <RightOutlined className="right" onClick={clickOutline(0, 1)} />
        <DoubleRightOutlined
          className="doubleRight"
          onClick={clickOutline(1, 0)}
        />
      </div>
      <div className="dateBody">
        <div className="week">
          {weekdays.map((item) => {
            return (
              <span key={nanoid()} className="day">
                {item}
              </span>
            );
          })}
        </div>
        {calendarDaysArray.map((week) => {
          return (
            <div key={nanoid()} className="week">
              {week.map((day) => {
                return (
                  <span
                    key={day.value}
                    className={`day
                    ${day.isCurMonth ? "" : " notCurMonth"}
                    ${day.value === today ? " isToday" : ""}
                    ${
                      day.value === chosedDay && day.isCurMonth
                        ? " chosedDay"
                        : ""
                    }`}
                    onClick={() => {
                      choseDay(day.value, day.isCurMonth);
                    }}
                  >
                    {day.value.split("-")[2]}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="dateFooter">
        <span onClick={choseToday}>{lang === "en" ? "Today" : "今天"}</span>
      </div>
    </div>
  );
}

export default forwardRef(DatePicker);
