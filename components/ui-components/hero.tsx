import React from 'react';
import { MotionDiv } from './motion';

function Hero() {
  return (
    <MotionDiv
    whileTap={{ scale: 0.98 }}
    whileInView={"visible"}
    viewport={{ once: false, amount: 0.5 }}
    variants={{
      hidden: { opacity: 0, y: 100},
      visible: { opacity: 1, y: 0 },
    }}
    initial="hidden"
    animate="visible"
    className="relative min-w-[300px] flex max-w-7xl mx-auto mt-3 outline-none items-center rounded-lg justify-center w-full min-h-[700px] px-6 p-4 flex-col md:flex-row bg-secondary shadow-slate-500 shadow-2xl"
  >
    <div
        className="hidden md:block absolute bg-center inset-0 ml-[30px] bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('/convert.svg')",
          backgroundSize: "auto",
        }}
      ></div>
      <div className="relative flex flex-col flex-1">
        <h1 className="text-primary  text-5xl lg:text-6xl">
          Convert <span className="bg-clip-text text-transparent bg-gradient-to-r to-red-600 from-red-300">types</span><span className="text-red-600">.</span>
        </h1>
        <h1 className="text-primary text-5xl lg:text-6xl">
          Transform <span className="bg-clip-text text-transparent bg-gradient-to-r  from-yellow-400/[0.4] to-yellow-500">structs</span><span className="text-yellow-500">.</span>
        </h1>
        <h1 className="text-border-black decoration-inherit text-shadow-black text-black text-5xl lg:text-6xl">
          <span className="mr-4">
            Create 
          </span>
          <span className="decoration-8 text-stroke-2 text-fill-white underline-offset-8 cursor-pointer decoration-dashed paint decoration-black underline">
            JSON
          </span>
          <span className="bg-clip-text text-8xl text-transparent bg-gradient-to-r from-yellow-500 to-red-600">.</span>
        </h1>
      </div>
      <div className="relative flex flex-1 bg-primary w-full h-full min-h-[500px] mt-6 md:mt-0 md:ml-36 rounded-lg">
        <p> Test </p>
      </div>
    </MotionDiv>
  );
}

export default Hero;