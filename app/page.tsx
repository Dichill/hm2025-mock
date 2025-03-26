"use client";

import { mobile_size_reference, PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import NavBar from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";
import MESA_Color_Graphic from "./components/MESA_Color_Graphic/MESA_Color_Graphic";
import LACC_Color_Graphic from "./components/LACC_Color_Graphic/LACC_Color_Graphic";
import Image_Overlay from "./components/Image_Overlay/Image_Overlay";
import useWindowSize from "@/lib/useWindowSize";

function App() {
  const { width } = useWindowSize();

  return (
    <div style={{backgroundColor: TERTIARY_COLORS.PURPLE_2655.hex}}>



      <NavBar />

      <HeroHeader />

      <CountdownTimer />
      <div className="p-10">
        <TrifectaGraphic />
      </div>
      <SectionBase section_title="About" bg_color={`${SECONDARY_COLORS.YELLOW_107.hex}`} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
    

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
      <SectionBase section_title="Schedule" bg_color={`${SECONDARY_COLORS.RHODAMINE_RED.hex}`} >
        {" "}
      </SectionBase>
      <SectionBase section_title="Location" bg_color={`${TERTIARY_COLORS.GREEN_367.hex}`}>
        {" "}
      </SectionBase>
      <SectionBase section_title="Sponsors" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
        {" "}
      </SectionBase>

      <SectionBase section_title="FAQ" bg_color={`${PRIMARY_COLORS.WARM_RED.hex}`}>
        {" "}
      </SectionBase>

      <SectionBase section_title="Team" bg_color={"white"} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
        {" "}
      </SectionBase>

      <footer style={{ padding: "3em" }}>

        <TrifectaGraphic />
      </footer>

    </div>
  )
}

export default App;
