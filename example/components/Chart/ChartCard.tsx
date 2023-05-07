import React from "react";

interface IChart {
  children: React.ReactNode;
  title: string;
}

function Chart({ children, title }: IChart) {
  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
      <p className="mb-4 font-sans text-gray-800">{title}</p>
      {children}
    </div>
  );
}

export default Chart;
