import React from "react";
import Spinner from "../ui/Spinner";

const LoadingPage = () => {
  return (
    <div className="min-h-svh text-[var(--neutral-100)] from-[var(--primary-700)] to-[var(--primary-500)] bg-gradient-to-br flex justify-center items-center">
      <div>
        <Spinner className="text-4xl" />
        <p className="mt-5 text-2xl md:text-3xl uppercase font-thin text-center">Starting Backend Server</p>
        <p className="text-center mt-3 text-lg font-thin">This can take a while initially...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
