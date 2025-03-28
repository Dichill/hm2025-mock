
// import useWindowSize from "@/lib/useWindowSize";
// import { mobile_size_reference } from "@/lib/colors";
// import Logo from "../Logo/Logo";
// import MESA_Graphic from "../MESA_Graphic/MESA_Graphic";

import { HackMESA_casing } from "@/lib/colors"

const HeroHeader = () => {
  // const {/* height */ width } = useWindowSize();




  return (


    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">{HackMESA_casing} 2025</h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 ">LACCD student Hackathon</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg focus:ring-4">
            Register
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          <a href="#" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none border-black rounded-lg border focus:z-10 focus:ring-4">
            About
          </a>
        </div>
      </div>
    </section>

  )
}

export default HeroHeader




// <div className={variable_style}>
// {width < mobile_size_reference &&
//   <Logo opacity="0%" size={350} />
// }
// {width >= mobile_size_reference && <>
//   <div className="mb-4 -mt-10">
//     <Logo opacity="100%" size={500} />
//   </div>
// </>}
// <div className="text-center -mb-35" style={{ marginTop: width > mobile_size_reference ? "0em" : "4em" }}>
//   <p className="font-bold" style={{ fontSize: width > mobile_size_reference ? "6em" : "4em" }}>May 9th-10th</p>
// </div>
// <div className="flex justify-center mb-10">
//   <div className="inline-block">
//     <div className="block mt-20 justify-center items-center padding-2">
//         <>
//           <div className="-ml-2 flex flex-row">

//             {/* <MESA_Graphic width={150} /> */}

//             <p className="inline text-4xl relative mt-[10] pl-1 h-10">{/* sponsored */}</p>
//           </div>
//           <p className="text-6xl -mt-5 font-black text-center">Hackathon</p>
//           <p className="text-2xl text-center font-black">open to LACCD students</p>
//           </>
//     </div>
//   </div>
// </div>
// </div>