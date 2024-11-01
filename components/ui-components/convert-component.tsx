"use client"
import React, { useEffect, useRef, useState } from 'react'
import { MotionDiv } from './motion'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Random from "@/public/random.svg"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'

const ConvertComponent = () => {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  const textControls = useAnimation()


  const [componentTop, setComponentTop] = useState(0)
  const [componentBottom, setComponentBottom] = useState(0)
  const componentRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const rect = componentRef.current?.getBoundingClientRect()
    if (rect) {
      const rectTop = rect.top
      const rectBottom = rect.bottom
      setComponentTop(rectTop + window.scrollY)
      setComponentBottom(rectBottom + window.scrollY)
    }
  }, [])

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        setScrollY(window.scrollY)
      }
  
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])



  const xStart = 600

  useEffect(() => {
    if (inView) {
      textControls.start({
        x: 0,
        opacity: 1
      })
    }
  })
  

  useEffect(() => {
    if (componentTop !== 0 && componentBottom !== 0) {
          const middle = componentTop + ((componentBottom - componentTop) / 2)
          var progress = scrollY / middle
          if (progress > 1) {
            const newProgress = 1 - (progress - 1)
            progress = newProgress 
          }

          if (scrollY > componentBottom) {
            controls.start({
              x: xStart,
              opacity: 0
            })

            return
          }

          console.log(progress)
          
          controls.start({
            x: progress >= 0.9 ? xStart : Math.min(0.5, progress) === 0.5 ? 0 : xStart,
            opacity: progress >= 0.9 ? 0 : Math.min(0.5, progress) === 0.5 ? 1 : 0
          })
      }
    }, [scrollY, componentTop, componentBottom])

  return (
    <div     
    ref={componentRef}
    className="min-h-[1000px] justify-center flex">
        <div 
          className="mt-48 overflow-hidden shadow-2xl shadow-slate-600 max-w-7xl mx-auto border-dashed border-white border-8 rounded-lg bg-primary w-full h-[700px]"
          >
        <MotionDiv 
          ref={ref}
          initial={{ opacity: 0, x: xStart }}
          animate={controls}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-white flex flex-col lg:gap-4 lg:flex-row w-full p-4 h-full"
          >
            <div className="flex-1">
              <h1 className="text-2xl"> Generate <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-black text-3xl"> random </span> fields  </h1>
              <div className="mt-32 justify-center flex flex-col items-center">
                <p> Name: String (Random Name) =&gt; <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-black">Michele</span></p>
                <p> Age: number (Random (max 100)) =&gt; <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-black">5</span></p>
                <p> Email: String (Random Email) =&gt; <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-black">t3Tdvn3@yahoo.com</span></p>
                <p> Country: String (Random Country) =&gt; <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-black"> Romania </span> </p>
              </div>
              <div className="flex mt-12 justify-center items-center">
                <Button className=""> Start to use... </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Image src={Random} width="700" height="500" alt="random" />
            </div>
        </MotionDiv>
        </div>
    </div>
  )
}

export default ConvertComponent