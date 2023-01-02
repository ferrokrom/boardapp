import React from "react";
import { Comment } from "../../types";
import formatDate from "../../utils/formatDate";
import Displayer from "../../utils/Displayer";

function CommentItem({ commentItem }: { commentItem: Comment }) {
  return (
    <article className=" mb-3 text-base text-gray-100 rounded-lg ">
      <footer className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 gap-2 ">
            <Displayer imgSrc={commentItem.sender.avatar} />
            <span className="font-bold">{commentItem.sender.username} </span>
          </p>
          <p className="text-sm font-thin text-gray-600 dark:text-gray-800">
            <time
              title="February 8th, 2022"
              className="text-sm"
              style={{ fontSize: "12px" }}
            >
              on {formatDate(commentItem.createdDate)}
            </time>
          </p>
        </div>
        <button
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        <div
          id="dropdownComment1"
          className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="/"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-gray-800 text-sm ml-7">{commentItem.subject} </p>
    </article>
  );
}

export default CommentItem;
