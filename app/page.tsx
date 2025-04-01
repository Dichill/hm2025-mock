"use client";

import { mobile_size_reference, PRIMARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import NavBar, { Render_MobileNav } from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";
import MESA_Color_Graphic from "./components/MESA_Color_Graphic/MESA_Color_Graphic";
import LACC_Color_Graphic from "./components/LACC_Color_Graphic/LACC_Color_Graphic";
import Image_Overlay from "./components/Image_Overlay/Image_Overlay";
import useWindowSize from "@/lib/useWindowSize";
// import Schedule from "./components/Schedule/Schedule";
import LocationMap from "./components/LocationMap/LocationMap";
// import FAQ_component from "./components/FAQ_Component/FAQ_Component";
import Logo from "./components/Logo/Logo";
import SVG_Window from "./components/SVG_Window/SVG_Window";
import TheTeam from "./components/TheTeam/TheTeam";
import { backgroundColor } from "@/lib/colors";

function App() {
  const { width } = useWindowSize();

  return (
    <>
      <div id="page-backdrop">


        {/* This is the hero logo */}
        {width > mobile_size_reference &&
          <div id="hero-logo_container" className="z-100 flex justify-center absolute top-40 w-full">
            <Logo size={300} opacity="100%" />
          </div>}
        {width <= mobile_size_reference &&
          <div id="hero-logo_container" className="z-100 flex justify-center absolute top-40 w-full">
            <Logo size={400} opacity="100%" />
          </div>}


        {/* This is the jumbotron */}
        {width > mobile_size_reference &&
          <div id="header-container" className="z-10 absolute top-110 flex flex-col justify-center w-full">
            <HeroHeader />
          </div>}
        {width <= mobile_size_reference &&
          <div id="header-container" className="z-10 absolute top-130 flex flex-col justify-center w-full">
            <HeroHeader />
          </div>}

        {/* Add SVG Window component */}
        <div className="relative h-screen">
          <SVG_Window />
        </div>

        {/* This is the svg backdrop (the sunset) */}
        <div id="graphic__sunset-backdrop" className="z-0">
          {width > mobile_size_reference &&
            <>
              {/*Desktop*/}

              {/* PLAIN BLANK BACKDROP */}
              {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1100 900">
                <defs>
                  <linearGradient id="linear-gradient" x1="969.76" y1="979.94" x2="969.76" y2="69.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffe450" />
                    <stop offset=".63" stopColor="#f58742" />
                    <stop offset="1" stopColor="#e84d96" />
                  </linearGradient>
                </defs>
                <path className="cls-2" style={{ fill: "#a289d7" }} d="M956.05,922.44s2.85-139.67,128.27-133.97c0,0-68.41-96.91,22.8-156.77,91.21-59.86,118.19,100.58,118.19,100.58,0,0-41.42-156.62,53.07-226.51,94.49-69.9,170.86,75.07,170.86,75.07,0,0-102.25-236.87-9.06-287.35,93.19-50.48,240.75,63.42,236.87,126.85,0,0,34.95-174.74,128.14-174.74s160.5,78.96,160.5,78.96l.94,790.21-1100.21-1.9s-77.26-145.21,89.63-190.42Z" />
                <path className="cls-3" style={{ fill: "#a289d7" }} d="M1293.44,923.76s-3.65-139.67-164.17-133.97c0,0,79.84-66.25-36.9-126.11s-143.56,69.91-143.56,69.91c0,0,33.22-123.91-87.71-193.81-120.94-69.9-198.89,42.37-198.89,42.37,0,0,22.68-204.81-92.95-281.9-107.77-71.85-238.99-13.87-234.02,49.56,0,0-32.15-159.69-151.43-159.69S1.2,325.87,1.2,325.87l-1.2,790.21,1408.16-1.9s98.88-145.21-114.72-190.42Z" />

                <rect style={{ fill: "url(#linear-gradient)" }} className="cls-1" width="1939.51" height="1099.95" />
              </svg> */}

              {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="20 0 1100 900">
                <defs>
                  <style>
                  </style>
                  <linearGradient id="linear-gradient" x1="969.76" y1="979.94" x2="969.76" y2="69.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffe450" />
                    <stop offset=".63" stopColor="#f58742" />
                    <stop offset="1" stopColor="#e84d96" />
                  </linearGradient>
                </defs>
                <rect className="cls-1" style={{ fill: "url(#linear-gradient)" }} x="16.98" width="1939.51" height="1099.95" />
                <path className="cls-2" style={{ fill: "#a289d7" }} transform="translate(0,100), scale(.6, .6)" d="M956.05,922.44s2.85-139.67,128.27-133.97c0,0-68.41-96.91,22.8-156.77,91.21-59.86,118.19,100.58,118.19,100.58,0,0-41.42-156.62,53.07-226.51,94.49-69.9,170.86,75.07,170.86,75.07,0,0-102.25-236.87-9.06-287.35,93.19-50.48,240.75,63.42,236.87,126.85,0,0,34.95-174.74,128.14-174.74s160.5,78.96,160.5,78.96l.94,790.21-1100.21-1.9s-77.26-145.21,89.63-190.42Z" />
                <path className="cls-3" style={{ fill: "#a289d7" }} transform="translate(0,200), scale(.6, .6)" d="M1293.44,923.76s-3.65-139.67-164.17-133.97c0,0,79.84-66.25-36.9-126.11s-143.56,69.91-143.56,69.91c0,0,33.22-123.91-87.71-193.81-120.94-69.9-198.89,42.37-198.89,42.37,0,0,22.68-204.81-92.95-281.9-107.77-71.85-238.99-13.87-234.02,49.56,0,0-32.15-159.69-151.43-159.69S1.2,325.87,1.2,325.87l-1.2,790.21,1408.16-1.9s98.88-145.21-114.72-190.42Z" />
              </svg> */}

            </>
          }

          {/* //TODO: convert the mobile SVG from IMG into inline SVG */}
          {/* This is the mobile backdrop for the */}

        </div>






        {/* This container will render either the NavBar or the mobile NavBar */}
        <div id="nav-bar__sticky-container"
          className="fixed w-full top-0 z-100 h-[12vh]">
          {width > mobile_size_reference && <NavBar />}
          {width <= mobile_size_reference && <Render_MobileNav />}
        </div>




        <div className="absolute top-200 w-full" >

          {/* <NavBar /> */}

          <CountdownTimer />

          {width > mobile_size_reference &&
            <div className="mt-4">
              <TrifectaGraphic width={20} />
            </div>}
            {width <= mobile_size_reference &&
            <div className="-mb-2">
              <TrifectaGraphic width={40} />
            </div>}

          <SectionBase height={"100vh"} section_title="About" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>


            {width > mobile_size_reference &&
              <>
                <div className="w-full h-full relative">
                  <div className="bg-white inline-block p-5 rounded-xl shadow-xl absolute top-10 left-6">
                    <MESA_Color_Graphic width={28} />
                  </div>
                  <Image_Overlay source="./MESA_student_overlay1.jpg" opacity={100} float="right" display="inline" width="40%" height="90vh" margin="2em" />
                  <div className="bg-white inline-block p-5 rounded-xl shadow-xl absolute bottom-10 right-10">
                    <LACC_Color_Graphic width={22} />
                  </div>
                </div>
              </>
            }

            {width <= mobile_size_reference &&
              <>
                <section className="relative">
                  <div className="z-10 bg-white inline-block p-5 rounded-xl shadow-xl absolute top-10 left-6">
                    <MESA_Color_Graphic width={28} />
                  </div>

                  <Image_Overlay source="./MESA_student_overlay1.jpg" opacity={70} float="none" display="block" width="90%" height="90vh" margin="5%" />

                  <section>
                    <div className="bg-white inline-block p-5 rounded-xl shadow-xl absolute bottom-10 right-10">
                      <LACC_Color_Graphic width={22} />
                    </div>
                  </section>
                </section>
              </>
            }


          </SectionBase>
          <SectionBase height={"auto"} section_title="Schedule" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`} >
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>Schedule Pending...</h4>
            <p className="m-8 text-black text-2xl">
              Come back to discover the schedule of our sponsored workshops, events, and the feeding schedule
            </p>
            {/* <div className="p-4">
              <Schedule />
            </div> */}
          </SectionBase>

          <SectionBase height={"auto"} section_title="Location" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>Location</h4>

            <LocationMap />
          </SectionBase>
          <SectionBase height={"auto"} section_title="Sponsors" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>Sponsor Info Incoming...</h4>
          </SectionBase>

          <SectionBase height={"auto"} section_title="FAQ" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>FAQ Pending...</h4>
            <p className="m-8 text-black text-2xl">
              No questions please
            </p>

            {/* <FAQ_component /> */}
          </SectionBase>

          {width > mobile_size_reference &&
            <SectionBase height={"100"} section_title="Team" bg_color={TERTIARY_COLORS.PURPLE_2655.hex} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
              <TheTeam />
            </SectionBase>
          }

          {width <= mobile_size_reference &&
            <SectionBase height={"100"} section_title="Team" bg_color={TERTIARY_COLORS.PURPLE_2655.hex} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
              <TheTeam />
            </SectionBase>
          }
          <section className="m-10">
            <TrifectaGraphic width={100} />
          </section>
          <Footer />

        </div>
        <div style={{ backgroundColor: backgroundColor, position: 'fixed', height: "100vh", bottom: "0", width: "100%", zIndex: -11 }}>
          {/* This div only prevents a small white bar */}
        </div>





      </div>














    </>
  )
}

export default App;

const Footer = () => {
  return (


    <footer className=" dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://hackmesa.com/" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HackMESA 2025</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Resources</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                </li>
              </ul>
            </div> */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Follow us</h2>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="https://github.com/HACKMESA" className="hover:underline ">Github</a>
                </li>
                <li>
                  <a href="https://discord.com/invite/VU6anPtkMV" className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Social Media</h2>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Instagram</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">TikTok</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center text-white">2025 - <a href="https://www.lacc.edu/" className="hover:underline">Los Angeles City College</a> - <a href="https://www.laccd.edu/" className="hover:underline">Los Angeles Community College District</a>
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">

            <a href="https://discord.gg/VU6anPtkMV" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>

            <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>

          </div>
        </div>
      </div>
    </footer>

  )
}


