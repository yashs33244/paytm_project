import React from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={`bg-blue-800 p-4 rounded-lg shadow-md ${className}`}>
      <h1 className="text-2xl font-bold pb-2 ">{title}</h1>
      <div className="mt-2 text-white">{children}</div>
    </div>
  );
}
