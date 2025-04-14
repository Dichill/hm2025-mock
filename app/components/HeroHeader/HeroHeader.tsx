import { SECONDARY_COLORS } from "@/lib/colors"
import { register } from "@/lib/link_base"
// import useWindowSize from "@/lib/useWindowSize"


const HeroHeader = () => {
  // const {width} = useWindowSize();

  return (


    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <div style={{backgroundColor: SECONDARY_COLORS.YELLOW_107.hex,}} className="inline-block p-4 rounded-xl">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">May 9-10</h2>
        <p className="mb-8 text-3xl font-normal lg:text-xl sm:px-16 lg:px-48 ">LACCD student Hackathon</p>
        <div style={{ maxWidth: "50%", margin: "auto", }} className="flex p-4 flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a href={`${register}`} style={{color: "#2c2c2c"}} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg focus:ring-4">
            Register
            <svg transform="scale(1.5)" className="w-3.5 h-3.5 ms-2 rtl:rotate-180 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="#2c2c2c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          <a href="#section-about" style={{color: "#2c2c2c", border: "4px solid #2c2c2c"}} className="py-3 px-5 sm:ms-4 text-sm font-medium  focus:outline-none  border-4 rounded-lg focus:z-10 focus:ring-4">
            About
          </a>
        </div>
        </div>
      </div>
    </section>

  )
}

export default HeroHeader




// const HeroHeader = () => {
//   const {/* height */ width } = useWindowSize();

//   return (
//     <>
//       {width < mobile_size_reference &&
//         <Logo size={350} />
//       }
//       {width >= mobile_size_reference && <>
//         <div className="mb-20 -mt-10">
//           <Logo size={500} />
//         </div>
//       </>}
//       <div className="text-center" style={{ marginTop: width > mobile_size_reference ? "0em" : "4em" }}>
//         <p className="font-bold p-5" style={{ fontSize: width > mobile_size_reference ? "6em" : "4em" }}>May 9th-10th</p>
//       </div>

//     </>
//   )
// }

// export default HeroHeader