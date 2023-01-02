import React from "react";
import {
  format,
  eachDayOfInterval,
  startOfToday,
  endOfWeek,
  startOfWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import { useState, useEffect } from "react";
import { Board } from "../../types";
import { useGetTodosByBoard } from "../../features/todo/api/getTodosByBoardId";
import TodoInput from "../Todo/TodoInput";
type CalenderviewProps = {
  board: Board;
};

const Calenderview = ({ board }: CalenderviewProps) => {
  const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const [boardId, setBoardId] = useState(board.id);

  let today = startOfToday();
  const getWeeks = startOfWeek(today);
  const [currentWeek, setCurrentWeek] = useState(getWeeks);
  const { data, isLoading } = useGetTodosByBoard({ boardId });

  const [todos, setTodo] = useState(data?.data.data);

  useEffect(() => {
    setTodo(data?.data.data);
  }, [data]);
  useEffect(() => {
    if (board) {
      setBoardId(board.id);
    }
  }, [board]);

  const [, setSelectedDays] = useState(
    eachDayOfInterval({
      start: startOfWeek(currentWeek),
      end: endOfWeek(currentWeek),
    })
  );

  useEffect(() => {
    setSelectedDays(() =>
      eachDayOfInterval({
        start: startOfWeek(currentWeek),
        end: endOfWeek(currentWeek),
      })
    );
  }, [currentWeek]);

  const allWeekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek),
    end: endOfWeek(currentWeek),
  });

  return (
    <div className="posts-list p-5 overflow-y-auto">
      <div className="flex ">
        <div className=" text-lg flex">
          {format(today, "MMM-dd")}
          <button
            className="ml-5"
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              setCurrentWeek(addWeeks(currentWeek, 1));
            }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 rows-5 ">
        {allWeekDays.map((item, index) => (
          <div
            className="p-5 mt-5  h-full border border-gray-300 rounded-lg "
            key={index}
          >
            <div className="flex gap-2 items-center justify-center mb-5">
              <div className={`text-lg`}>{weekDays[index]}</div>
              <div className="text-base  ">
                <span
                  className={`text-base  ${
                    today.toDateString() === item.toDateString()
                      ? "bg-blue-400 rounded-full p-1"
                      : ""
                  }`}
                >
                  {format(item, "d")}
                </span>
              </div>
            </div>

            {!isLoading &&
              todos
                ?.filter(
                  (todo) =>
                    new Date(todo.duedate).toDateString() ===
                    item.toDateString()
                )
                .map((todo, index) => (
                  <div className="hover:bg-red-100 py-1 rounded">
                    <TodoInput
                      todoItem={todo}
                      key={index}
                      sectionId={todo.section.id}
                    />
                  </div>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calenderview;
