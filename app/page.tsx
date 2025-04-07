"use client";

import { mobile_size_reference, PRIMARY_COLORS, SECONDARY_COLORS } from "@/lib/colors"

import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import NavBar, { Render_MobileNav } from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";
import MESA_Color_Graphic from "./components/MESA_Color_Graphic/MESA_Color_Graphic";
import LACC_Color_Graphic from "./components/LACC_Color_Graphic/LACC_Color_Graphic";
import Image_Overlay from "./components/Image_Overlay/Image_Overlay";
import useWindowSize from "@/lib/useWindowSize";
import LocationMap from "./components/LocationMap/LocationMap";
import FAQ_component from "./components/FAQ_Component/FAQ_Component";
import Logo from "./components/Logo/Logo";
import SVG_Window from "./components/SVG_Window/SVG_Window";
import TheTeam from "./components/TheTeam/TheTeam";
import { backgroundColor } from "@/lib/colors";
import Footer from "./components/Footer/Footer";
import SectionBase_HeroText from "./components/SectionBase_HeroText/SectionBase_HeroText";
import Mobile_SVG_Window from "./components/Mobile_SVG_Window/Mobile_SVG_Window";

import "./page_grid.css"
import { lacc, MESA } from "@/lib/link_base";

function App() {
  const { width, height } = useWindowSize();

  return (
    <>
      <html lang="en" />
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HackMESA 2025, Los Angeles Community College District Hackathon, May 9th and 10th 2025</title>
      </head>
      <div style={{ backgroundColor: backgroundColor }} id="page-backdrop">

        {/* This is the hero logo */}
        {width > mobile_size_reference &&
          <div id="hero-logo_container" className="z-100 flex justify-center absolute top-40 w-full">
            <Logo size={300} opacity="100%" />
          </div>}
        {width <= mobile_size_reference &&
          <div id="hero-logo_container" className="z-100 flex justify-center absolute top-40 w-full">
            {height > 540 && <Logo size={380} opacity="100%" />}
            {/* wierd but possible edge case */}
            {height <= 540 && <Logo size={200} opacity="100%" />}
          </div>}


        {/* Contains the hero SVG component */}
        <div className="relative h-screen">
          {width > mobile_size_reference &&
            <SVG_Window />}
          {width <= mobile_size_reference &&
            <Mobile_SVG_Window />}
        </div>

        {/* This is the jumbotron */}
        {width > mobile_size_reference &&
          <div id="header-container" style={{}} className="z-10 top-120 flex flex-col justify-center w-full">
            <HeroHeader />
          </div>}

        {width <= mobile_size_reference &&
          <div id="header-container" className=" z-10 top-130 flex flex-col justify-center w-full">
            <HeroHeader />
          </div>}

        {/* This container will render either the NavBar or the mobile NavBar */}
        <div id="nav-bar__sticky-container"
          className="fixed w-full top-0 z-100 h-[12vh]">
          {width > mobile_size_reference &&
            <>
              <nav>
                <NavBar />
              </nav>
              <div id="filler_for_mlh_badge" className="z-1 bg-white h-50 w-25 inline-block absolute right-10 top-0">
                <div className="absolute bottom-10 w-full">
                  <p className="text-center">MLH</p>
                </div>
              </div>
            </>
          }
          {width <= mobile_size_reference &&
            <>
              <nav><Render_MobileNav />
              </nav>
              <div id="filler_for_mlh_badge" className="z-1 bg-white h-50 w-25 inline-block absolute right-10 top-0">
                <div className="absolute bottom-10 w-full">
                  <p className="text-center">MLH</p>
                </div>
              </div>
            </>

          }
        </div>

        {/* This container renders everything below the hero area */}

        <div className={"w-full"} >
          <CountdownTimer />

          {width > mobile_size_reference &&
            <div className="mt-4">
              <TrifectaGraphic width={20} />
            </div>}
          {width <= mobile_size_reference &&
            <div className="-mb-2">
              <TrifectaGraphic width={40} />
            </div>}

          {/* About section Desktop */}
          <SectionBase height={"auto"} section_title="About" bg_color={backgroundColor} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
            {width > mobile_size_reference &&
              <>
                <SectionBase_HeroText text="About MESA" />

                <div id="area-in-question" className="">
                  <div id="about_image_elem">
                    <Image_Overlay source="./MESA_student_overlay1.jpg" opacity={100} float="right" display="inline" width="80%" height="90%" margin="2em" />

                  </div>

                  <span id="about_mesa_gr_elem_1" className="flex justify-center items-center">
                    <a href={MESA} target="new">
                      <div className="bg-white inline-block p-5 rounded-xl shadow-xl">
                        <MESA_Color_Graphic width={28} />
                      </div>
                    </a>
                  </span>

                  <span id="about_mesa_gr_elem_4">
                    <a href={lacc} target="new">
                      <div className=" bg-white inline-block p-5 rounded-xl shadow-xl float-right">
                        <LACC_Color_Graphic width={22} />
                      </div>
                    </a>
                  </span>

                  <span id="about_mesa_gr_elem_3">
                    <div className=" text-white p-4 m-2 text-xl">
                      <AboutMesaText />
                    </div>
                  </span>
                </div>
                <SectionBase_HeroText text="About the Hackathon" />

                <div className="border-solid border-2 text-white p-4 m-2 text-xl rounded-2xl">
                  <AboutMesaText />
                </div>
              </>
            }


            {/* About section Mobile */}

            {width <= mobile_size_reference &&
              <>
                <h2 style={{ fontSize: width > 500 ? 100 : 40, fontWeight: "800", color: SECONDARY_COLORS.YELLOW_107.hex, textShadow: "10px 10px 10px black" }} className="text-white">About MESA</h2>

                <section className="relative">

                  <a href={MESA} target="new">
                    <div className="z-10 bg-white inline-block p-5 rounded-xl shadow-xl absolute top-10 left-6">
                      <MESA_Color_Graphic width={28} />
                    </div>
                  </a>

                  <Image_Overlay source="./MESA_student_overlay1.jpg" opacity={70} float="none" display="block" width="90%" height="90vh" margin="5%" />

                  <section>
                    <a href={lacc} target="new">
                      <div className="bg-white inline-block p-5 rounded-xl shadow-xl absolute bottom-10 right-10">
                        <LACC_Color_Graphic width={22} />
                      </div>
                    </a>
                  </section>
                </section>
                <div className="border-solid border-2 text-white p-4 m-2 text-xl rounded-2xl">
                  <AboutMesaText />
                </div>
                <h2 style={{ fontSize: width > 500 ? 100 : 40, fontWeight: "800", color: SECONDARY_COLORS.YELLOW_107.hex, textShadow: "10px 10px 10px black" }} className="text-white">About Our Hackathon</h2>
                <div className="border-solid border-2 text-white p-4 m-2 text-xl rounded-2xl">
                  <AboutMesaText />
                </div>
              </>
            }
          </SectionBase>


          {/* Schedule section */}
          <SectionBase height={"auto"} section_title="Schedule" bg_color={backgroundColor}>
            <SectionBase_HeroText text="Schedule" />
            <div className="mb-30 mt-20 text-3xl text-center">
              Schedule coming soon...
              {/* <Schedule /> */}
            </div>
          </SectionBase>


          {/* Location section */}
          <SectionBase height={"auto"} section_title="Location" bg_color={backgroundColor}>
            <SectionBase_HeroText text="Location" />
            <LocationMap />
          </SectionBase>

          {/* Sponsors section */}
          <SectionBase height={"auto"} section_title="Sponsors" bg_color={backgroundColor}>
            <SectionBase_HeroText text="Sponsors" />
          </SectionBase>


          {/* Location section */}
          <SectionBase height={"auto"} section_title="FAQ" bg_color={backgroundColor}>
            <SectionBase_HeroText text="FAQ" />

            <FAQ_component />
          </SectionBase>


          {/* Team section */}
          <SectionBase height={"100"} section_title="Team" bg_color={backgroundColor} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
            <SectionBase_HeroText text="Team" />
            <TheTeam />
          </SectionBase>
          <section className="m-10">
            <TrifectaGraphic width={20} />
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


const AboutMesaText = () => {
  return (
    <>
      <p>
        <a target="new" href={MESA} className="underline">MESA’s community college level program</a> produces a population of transfer-ready students to advance their STEM educational journeys in 4-year university programs. If you are student interested in participating in MESA, please contact the local center director to get enrolled.
      </p>
      <p className="mt-4 font-bold">
        MESA serves about 5,700 community college students in California.
      </p>
    </>
  )
}