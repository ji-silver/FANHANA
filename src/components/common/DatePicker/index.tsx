import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./index.module.css";
import "./index.css";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const YEARS = Array.from(
  { length: getYear(new Date()) + 1 - 2000 },
  (_, i) => getYear(new Date()) - i
);

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePickerBox = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.SetStateAction<Date | null>) => {
    setIsOpen(!isOpen);
    setSelectedDate(e);
  };
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const getDayOfWeek = (date: any) => {
    //ex) getDayOfWeek('2022-06-13')
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  };

  return (
    <div className={styles.datePickerContainer}>
      <button className={styles.datePicker} onClick={handleClick}>
        {format(selectedDate, `yyyy.MM.dd (${getDayOfWeek(selectedDate)})`)}
      </button>
      {isOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 2)}
          showYearDropdown
          scrollableYearDropdown
          shouldCloseOnSelect
          yearDropdownItemNumber={100}
          minDate={new Date("2000-01-01")}
          maxDate={new Date()}
          calendarClassName={styles.calenderWrapper}
          dayClassName={(d) =>
            d.getDate() === selectedDate!.getDate()
              ? styles.selectedDay
              : styles.unselectedDay
          }
          className={styles.datePicker}
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            prevMonthButtonDisabled,
            increaseMonth,
            nextMonthButtonDisabled,
          }) => (
            <div className={styles.customHeaderContainer}>
              <div className={styles.monthBox}>
                <button
                  type="button"
                  onClick={decreaseMonth}
                  className={styles.monthButton}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
                <button
                  type="button"
                  onClick={increaseMonth}
                  className={styles.monthButton}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
              <select
                value={getYear(date)}
                className={styles.year}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          inline
        />
      )}
    </div>
  );
};

export default DatePickerBox;
