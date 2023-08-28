import React from "react";

type Props = {};

const EmptyTaskDetail = (props: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 text-blue-500 dark:text-yellow-500 px-5">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[100px] h-[100px] animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
          />
        </svg>
      </div>

      <p className="font-medium text-lg text-gray-400">
        Click on a task to view details
      </p>
    </div>
  );
};

export default EmptyTaskDetail;
