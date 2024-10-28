import React from 'react';

function Hero() {
  return (
    <div className="relative min-w-[300px] max-w-6xl mx-auto mt-3 items-center rounded-lg justify-center w-full min-h-[500px] p-4 flex flex-row shadow-2xl bg-white bg-opacity-20 backdrop-blur-3xl">
      <div className="absolute inset-0 bg-fill bg-no-repeat bg-center opacity-50" style={{ backgroundImage: "url('/convert.svg')" }}></div>
      <div className="relative flex flex-col flex-1">
        <h1 className="text-black text-6xl">
          Convert types<span className="text-red-600">.</span>
        </h1>
        <h1 className="text-black text-6xl">
          Transform structs<span className="text-yellow-500">.</span>
        </h1>
        <h1 className="text-black text-6xl">
          Use<span className="text-sky-600">.</span>
        </h1>
      </div>
      <div className="relative flex flex-1">
        <p> Test </p>
      </div>
    </div>
  );
}

export default Hero;