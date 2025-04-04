
import { backgroundColor, darkenColor } from "@/lib/colors";
import { motion } from "framer-motion";
import { useState } from "react";

const Schedule = () => {
  return (
    <>
      <ol className="items-center sm:flex">
        <Schedule_List_Item />
        <Divider />
        <Schedule_List_Item />
        <Divider />
        <Schedule_List_Item />
        <Divider />
        <Schedule_List_Item />
        <Divider />
        <Schedule_List_Item />
      </ol>

      <div className="mt-10 flex justify-center">
      <DetailsButton />
      </div>

    </>
  )
}

const Divider = () => {
  return (
    <hr className="m-2 md:hidden" style={{ border: "1px solid white" }}></hr>
  )
}


const DetailsButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false)

  return (
    <>
      <motion.button
        key="web-nav__register"
        initial={false}
        className="m-4 border-2 p-3 font-bold border-solid text-white rounded-lg bg-gray-50 drop-shadow-lg transition-colors duration-150"
        whileTap={{ scale: 0.95 }}
        style={{ cursor: 'pointer' }}
        animate={{ backgroundColor: !isHovering && !isPressed ? backgroundColor : isHovering && !isPressed ? darkenColor(backgroundColor, -40) : darkenColor(backgroundColor, 50) }} // Darkens when pressed
        transition={{ duration: 0.05 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >

        Detailed Schedule

      </motion.button>

    </>
  );
}


const Schedule_List_Item = () => {
  return (
    <li className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
          <svg className="w-4.5 h-4.5 md:w-2.5 md:h-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <div className="hidden sm:flex w-full bg-white h-0.5"></div>
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className="text-lg font-semibold text-white">Flowbite Library v1.0.0</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-white">Released on January 5, 2022</time>
        <p className="text-white">Get started with dozens of web components and interactive elements.</p>
      </div>
    </li>
  )
}

export default Schedule
