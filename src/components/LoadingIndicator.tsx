import { type ReactElement } from "react";

export default function LoadingIndicator(): ReactElement {
  return (
    <div className="flex items-center justify-center fixed inset-0 p-5 bg-gray-100 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
}
