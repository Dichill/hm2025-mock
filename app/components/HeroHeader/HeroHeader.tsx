import { backgroundColor, darkenColor, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import { motion } from "framer-motion";
import {useRouter} from "next/navigation"
import { useState } from "react";


const HeroHeader = () => {

      const router = useRouter();

      const [isPressed_register, setIsPressed_register] = useState(false);
      const [isHovering_register, setIsHovering_register] = useState(false);

      const [isPressed_about, setIsPressed_about] = useState(false);
      const [isHovering_about, setIsHovering_about] = useState(false);



  return (


    <section className="">
      <style>
        {`
        #hero_header_buzzwords {
          list-style: none; /* Remove default bullets */
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        #hero_header_buzzwords li {
          color: ${backgroundColor};
          font-size: 1.5rem;
          font-weight: bold;
          padding: 0.5em 1em;
          border: 2px solid ${TERTIARY_COLORS.PURPLE_2655.hex};
          border-radius: 1em;
          background: ${TERTIARY_COLORS.PURPLE_2655.hex};
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        #hero_header_buzzwords li:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        `}
      </style>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <div style={{backgroundColor: backgroundColor, borderRadius: "1.4vw"}} className="inline-block p-4 shadow-2xl">
          <div style={{backgroundColor: backgroundColor, border: `1vw solid ${TERTIARY_COLORS.PURPLE_2655.hex}`, borderRadius: "1vw"}} className="p-6">
        <h2 className="text-4xl font-extrabold tracking-tight leading-none text-white md:text-6xl lg:text-6xl">May 9 - 10</h2>
  
          <div className="mb-10 mt-6">
          <p className=" mt-3 text-lg md:text-xl font-bold text-white inline border-2 border-red-500 p-3">Registration Deadline: May 7</p>

          </div>
  
          <ul id="hero_header_buzzwords" className="mb-10">
          <li>Innovate</li>
          <li>Create</li>
          <li>Inspire</li>
          <li>Connect</li>
        </ul>
        <p className="mb-8 text-3xl font-normal lg:text-xl sm:px-16 lg:px-48 text-white mt-6">LACCD student Hackathon</p>
        <div style={{ maxWidth: "50%", margin: "auto", }} className="flex p-4 flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <motion.button
                        key="hero-register"
                        initial={false}

                        className={`float-right m-4 mt-3 text-white w-[90%] rounded-md drop-shadow-lg transition-colors duration-150`}
                        style={{
                            cursor: "pointer",
                            border: isHovering_register
                                ? "0.17vw solid white"
                                : `0.17vw solid ${darkenColor(SECONDARY_COLORS.ORANGE_151.hex, 30)}`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            backgroundColor:
                                !isHovering_register && !isPressed_register

                                    ? SECONDARY_COLORS.ORANGE_151.hex
                                    : isHovering_register && !isPressed_register
                                        ? darkenColor(
                                            SECONDARY_COLORS.ORANGE_151.hex,
                                            20
                                        )
                                        : darkenColor(
                                            SECONDARY_COLORS.ORANGE_151.hex,
                                            50
                                        ),

                        }} // Darkens when pressed
                        transition={{ duration: 0.05 }}
                        onHoverStart={() => setIsHovering_register(true)}
                        onHoverEnd={() => setIsHovering_register(false)}
                        onTouchStart={() => setIsPressed_register(true)}
                        onTouchEnd={() => setIsPressed_register(false)}
                        onMouseDown={() => setIsPressed_register(true)}
                        onMouseUp={() => setIsPressed_register(false)}
                        onClick={() => router.push("/register")}
                    >
                        <p
                            style={{
                                padding: "1vh",
                                color: darkenColor(SECONDARY_COLORS.ORANGE_151.hex, 65)
                            }}
                            className={`font-bold flex justify-center content-center text-lg`}
                        >
                            Register
                        </p>
                    </motion.button>
                    <motion.button
                        key="hero-about"
                        initial={false}
                        className={`float-right m-4 mt-3 text-white w-[90%] rounded-md drop-shadow-lg transition-colors duration-150`}
                        style={{
                            cursor: "pointer",
                            border: isHovering_about
                                ? "0.17vw solid white"
                                : `0.17vw solid rgba(255, 255, 255, 0.6)`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            backgroundColor:
                                !isHovering_about && !isPressed_about
                                    ? backgroundColor
                                    : isHovering_about && !isPressed_about
                                        ? TERTIARY_COLORS.PURPLE_2655.hex
                                        : darkenColor(
                                          backgroundColor,
                                            50
                                        ),

                        }} // Darkens when pressed
                        transition={{ duration: 0.05 }}
                        onHoverStart={() => setIsHovering_about(true)}
                        onHoverEnd={() => setIsHovering_about(false)}
                        onTouchStart={() => setIsPressed_about(true)}
                        onTouchEnd={() => setIsPressed_about(false)}
                        onMouseDown={() => setIsPressed_about(true)}
                        onMouseUp={() => setIsPressed_about(false)}
                        onClick={() => router.push("/#section-about")}
                    >
                        <p
                            style={{
                                padding: "1vh",
                            }}
                            className={`font-bold flex justify-center content-center text-white text-lg`}
                        >
                          About
                        </p>
                    </motion.button>
        </div>
        </div>
        </div>
      </div>
    </section>

  )
}

export default HeroHeader


