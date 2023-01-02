import React from "react";
import {
  startOfToday,
  eachDayOfInterval,
  startOfDay,
  parseISO,
  isAfter,
} from "date-fns";

interface IPriority {
  status: string;
  color: string;
}

function Priority({ date }: { date: string }) {
  if (date == null) return null;
  let today = startOfToday();
  let duedate = startOfDay(parseISO(date));
  let priority = {} as IPriority;

  if (isAfter(today, duedate))
    return (
      <div
        className="px-2 text-slate-100 rounded-full"
        style={{ background: `red`, fontSize: "10px" }}
      >
        Past Due
      </div>
    );

  var daysDiff = eachDayOfInterval({
    start: today,
    end: duedate,
  });

  if (daysDiff && daysDiff.length <= 3) {
    priority = { status: "High", color: `red` };
  } else if (daysDiff.length >= 7) {
    priority = { status: "Low", color: "blue" };
  } else if (daysDiff.length < 0) {
    priority = { status: "Past Due", color: "gray" };
  } else {
    priority = { status: "Medium", color: "orange" };
  }
  return (
    <div
      className="px-2 text-slate-100 rounded-full"
      style={{ background: `${priority.color}`, fontSize: "10px" }}
    >
      {priority.status}
    </div>
  );
}

export default Priority;
