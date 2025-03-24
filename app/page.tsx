"use client";

import { PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import MESA_Graphic from "./components/MESA_Graphic/MESA_Graphic"
import NavBar from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";

function App() {


  return (
    <>



        <NavBar />

        <HeroHeader />

        <CountdownTimer />
        <div className="p-10">
          <TrifectaGraphic />
        </div>
        <SectionBase section_title="About" bg_color={`${SECONDARY_COLORS.YELLOW_107.hex}`} alt_text_color={PRIMARY_COLORS.GREY_432.hex}>
          <MESA_Graphic width={200} />
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

    </>
  )
}

export default App;
