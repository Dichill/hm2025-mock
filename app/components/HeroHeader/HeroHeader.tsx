import { HackMESA_casing } from "@/lib/colors"

const HeroHeader = () => {

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
          <a href="#section-about" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none border-black rounded-lg border focus:z-10 focus:ring-4">
            About
          </a>
        </div>
      </div>
    </section>

  )
}

export default HeroHeader