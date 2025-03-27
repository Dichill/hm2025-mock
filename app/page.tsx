"use client";

import { mobile_size_reference, PRIMARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import NavBar from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";
import MESA_Color_Graphic from "./components/MESA_Color_Graphic/MESA_Color_Graphic";
import LACC_Color_Graphic from "./components/LACC_Color_Graphic/LACC_Color_Graphic";
import Image_Overlay from "./components/Image_Overlay/Image_Overlay";
import useWindowSize from "@/lib/useWindowSize";
import TeamMateCard from "./components/TeamMateCard/TeamMateCard";
import Schedule from "./components/Schedule/Schedule";
import LocationMap from "./components/LocationMap/LocationMap";
import FAQ_component from "./components/FAQ_Component/FAQ_Component";

function App() {
  const { width } = useWindowSize();

  return (
    <>

      <div className="relative -top-10" style={{ backgroundColor: "#433966" }}>



        <NavBar />

        <HeroHeader />

        <CountdownTimer />
        {/* <div className="p-10">
          <TrifectaGraphic width={100} />
        </div> */}
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
          <div className="p-4">
            <Schedule />
          </div>
        </SectionBase>
        <SectionBase height={"50vh"} section_title="Location" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
          <LocationMap/>
        </SectionBase>
        <SectionBase height={"1em"} section_title="Sponsors" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
          {" "}
        </SectionBase>

        <SectionBase height={"120vh"} section_title="FAQ" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
          <FAQ_component />
        </SectionBase>

        {width > mobile_size_reference &&
          <SectionBase height={"100"} section_title="Team" bg_color={TERTIARY_COLORS.PURPLE_2655.hex} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
            <div className="flex justify-center  gap-5 p-6 ">
              <TeamMateCard />
              <TeamMateCard />
              <TeamMateCard />
              <TeamMateCard />
            </div>
          </SectionBase>
        }

        {width <= mobile_size_reference &&
          <SectionBase height={"100"} section_title="Team" bg_color={TERTIARY_COLORS.PURPLE_2655.hex} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
            <div className="flex justify-center flex-col gap-8 items-center p-6">
              <TeamMateCard />
              <TeamMateCard />
              <TeamMateCard />
              <TeamMateCard />
            </div>
          </SectionBase>
        }
        <section className="m-10">
          <TrifectaGraphic width={100}/>
        </section>
        <Footer />

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
            <a href="https://flowbite.com/" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">HackMESA</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Resources</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Follow us</h2>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                </li>
                <li>
                  <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Legal</h2>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center text-white">© 2023 <a href="https://www.lacc.edu/" className="hover:underline">Los Angeles City College</a>
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">

            <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Twitter page</span>
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