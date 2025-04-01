"use client";

import { mobile_size_reference, PRIMARY_COLORS } from "@/lib/colors"

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
import Footer from "./components/Footer/Footer";
import SectionBase_HeroText from "./components/SectionBase_HeroText";

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

        {/* Contains the hero SVG component */}
        <div className="relative h-screen">
          <SVG_Window />
        </div>

        {/* This container will render either the NavBar or the mobile NavBar */}
        <div id="nav-bar__sticky-container"
          className="fixed w-full top-0 z-100 h-[12vh]">
          {width > mobile_size_reference && <NavBar />}
          {width <= mobile_size_reference && <Render_MobileNav />}
        </div>

        {/* This container renders everything below the hero area */}
        <div className="absolute top-200 w-full" >
          <CountdownTimer />

          {width > mobile_size_reference &&
            <div className="mt-4">
              <TrifectaGraphic width={20} />
            </div>}
          {width <= mobile_size_reference &&
            <div className="-mb-2">
              <TrifectaGraphic width={40} />
            </div>}

          {/* About section */}
          <SectionBase height={"100vh"} section_title="About" bg_color={backgroundColor} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
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


          {/* Schedule section */}
          <SectionBase height={"auto"} section_title="Schedule" bg_color={backgroundColor}>
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>Schedule Pending...</h4>
            <SectionBase_HeroText text="Schedule" />

            <p className="m-8 text-black text-2xl">
              Come back to discover the schedule of our sponsored workshops, events, and the feeding schedule
            </p>
            {/* <div className="p-4">
              <Schedule />
            </div> */}
          </SectionBase>


          {/* Location section */}
          <SectionBase height={"auto"} section_title="Location" bg_color={backgroundColor}>
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>Location</h4>
            <SectionBase_HeroText text="Location" />
            <LocationMap />
          </SectionBase>

          {/* Sponsors section */}
          <SectionBase height={"auto"} section_title="Sponsors" bg_color={backgroundColor}>
            <SectionBase_HeroText text="Sponsors" />
          </SectionBase>


          {/* Location section */}
          <SectionBase height={"auto"} section_title="FAQ" bg_color={backgroundColor}>
            <h4 className="font-bold text-4xl text-center p-4" style={{ color: backgroundColor }}>FAQ Pending...</h4>
            <SectionBase_HeroText text="FAQ" />
            <p className="m-8 text-black text-2xl">
              No questions please
            </p>
            {/* <FAQ_component /> */}
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

