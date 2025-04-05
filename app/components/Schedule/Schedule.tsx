
import { backgroundColor, darkenColor } from "@/lib/colors";
import { motion } from "framer-motion";
import { useState } from "react";


//not to be passed an array of events greater than 5.
//for the more detailed schedule, use detailed_events array.
const events = [
  {
    title: "Event 1",
    date: "May 9 at 4:00PM",
    description: "The hacking will begin!",
  },
  {
    title: "Event 2",
    date: "May 9 at 5:00PM",
    description: "A series of workshops, including those offered by our sponsors will kick off the night.",
  },
  {
    title: "Event 3",
    date: "May 9 at 7:00PM",
    description: "You will be fed. You got that right! Snacks will also be happening throughout the night. Click below for the detailed schedule.",
  },
  {
    title: "Event 4",
    date: "May 9 at 8:00PM",
    description: "Time to focus. All... night... long!!!",
  },
  {
    title: "Event 5",
    date: "May 10 at 11:00AM",
    description: "The judges will deliberate, and awards will be given out!",
  }
]



//will appear in modal with scroll bar
const detailed_events = [
  {
    title: "Event 1",
    date: "January 5, 2022",
    description: "Get started with dozens of web components and interactive elements.",
  },
  {
    title: "Event 2",
    date: "January 5, 2022",
    description: "Get started with dozens of web components and interactive elements.",
  },
  {
    title: "Event 3",
    date: "January 5, 2022",
    description: "Get started with dozens of web components and interactive elements.",
  },
  {
    title: "Event 4",
    date: "January 5, 2022",
    description: "Get started with dozens of web components and interactive elements.",
  },
  {
    title: "Event 5",
    date: "January 5, 2022",
    description: "Get started with dozens of web components and interactive elements.",
  }
]



const Schedule = () => {
  //TODO: implement modal and pass detailed events
  console.log(detailed_events)


  return (
    <>
      <ol aria-label="timeline of Hackathon" className="items-center sm:flex">

        {events.map((event, index) => {
          console.log(index)
          if (index == 0) {
            return (
              <span key={`schedule_item_${event.title}`}>
                <Schedule_List_Item title={event.title} description={event.description} date={event.date} />
                <Divider />
              </span>
            );
          } else if (index != events.length - 1) {
            return (
              <span key={`schedule_item_${event.title}`}>

                <Schedule_List_Item title={event.title} description={event.description} date={event.date} />
                <Divider />
              </span>);
          } else {
            return (
              <Schedule_List_Item key={`schedule_item_${event.title}`} title={event.title} description={event.description} date={event.date} />
            );
          }
        })}

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

interface Schedule_List_Item__Props {
  title: string;
  date: string;
  description: string;
}


const Schedule_List_Item = (props: Schedule_List_Item__Props) => {
  return (
    <li className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
          <svg className="w-4.5 h-4.5 md:w-2.5 md:h-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
        </div>
        <div className="hidden sm:flex w-full bg-white h-0.5"></div>
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className="text-lg font-semibold text-white">{props.title}</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-white">{props.date}</time>
        <p className="text-white">{props.description}</p>
      </div>
    </li>
  )
}


export default Schedule
