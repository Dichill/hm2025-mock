import { HackMESA_casing } from "@/lib/colors"
import { register } from "@/lib/link_base"


const HeroHeader = () => {

  return (


    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">{HackMESA_casing} 2025</h1>
        <p className="mb-8 text-3xl font-normal lg:text-xl sm:px-16 lg:px-48 ">LACCD student Hackathon</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
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
    </section>

  )
}

export default HeroHeader