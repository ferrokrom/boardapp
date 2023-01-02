import React from "react";
import { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  getMonth,
  addMonths,
} from "date-fns";
import addDays from "date-fns/addDays";
import subMonths from "date-fns/subMonths";
import { MdClose } from "react-icons/md";

type CalenderProps = {
  value: Date;
  onSubmit: (e: any) => void;
  setOpenCalender: () => void;
};

function Calender({ value, onSubmit, setOpenCalender }: CalenderProps) {
  const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const months = [
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

  let today = startOfToday();

  const currentMonth = startOfMonth(today);

  const [theDueDate, setTheDueDate] = useState(new Date(value).toDateString());
  const [currentMonths, setCurrentMonths] = useState(currentMonth);
  const startOfTheWeek = startOfWeek(currentMonths);

  var a = getMonth(currentMonths);
  const skipDays = eachDayOfInterval({
    start: addDays(startOfTheWeek, 1),
    end: currentMonths,
  });
  const [selectedDays, setSelectedDays] = useState(
    eachDayOfInterval({
      start: startOfMonth(currentMonths),
      end: endOfMonth(currentMonths),
    })
  );

  useEffect(() => {
    setTheDueDate(new Date(value).toDateString());
  }, [value]);
  var blankDays = skipDays.map((item) => null);

  useEffect(() => {
    setSelectedDays(
      eachDayOfInterval({
        start: startOfMonth(currentMonths),
        end: endOfMonth(currentMonths),
      })
    );
  }, [currentMonths]);
  function addToCurrentMonth() {
    setCurrentMonths(addMonths(currentMonths, 1));
  }

  function subToCurrentMonth() {
    setCurrentMonths(subMonths(currentMonths, 1));
  }

  return (
    <div className="w-72 absolute flex flex-col p-3 bg-slate-100 z-50 top-0 left-4 rounded-lg border shadow-md h-fit">
      <div className="text-lg p-2  bg-blue-200 flex justify-between items-center">
        {today.toDateString()}
        <MdClose onClick={setOpenCalender} />
      </div>

      <div className="flex flex-start gap-2 mb-5  p-2 justify-between">
        <div className="text-lg ">{months[a]}</div>

        <div>
          <button className="text-lg" onClick={subToCurrentMonth}>
            {"<"}
          </button>
          <button className="text-lg" onClick={addToCurrentMonth}>
            {">"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 grid-rows-1  gap-x-0 gap-y-5 text-center">
        {weekDays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 gap-x-0 gap-y-5 ">
        {blankDays.map((item) => (
          <div>{item}</div>
        ))}
        {selectedDays.map((day, index) => (
          <div
            key={index}
            className={
              new Date(day).toDateString() === theDueDate
                ? "bg-red-200 p-2 rounded-lg cursor-pointer flex  justify-center"
                : "rounded-lg p-2 cursor-pointer hover:bg-red-200  flex justify-center"
            }
            onClick={() => onSubmit(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
