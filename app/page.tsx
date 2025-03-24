"use client"

import { PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import { HackMESA_casing } from "@/lib/colors"
import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import LACC_Graphic from "./components/LACC_Graphic/LACC_Graphic"
import LACCD_Graphic from "./components/LACCD_Graphic/LACCD_Graphic"
import MESA_Graphic from "./components/MESA_Graphic/MESA_Graphic"
import NavBar from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"


const HeroHeader = () => {
  return (
    <header style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "5em", fontWeight: "900", color: `${PRIMARY_COLORS.GREY_432.hex}` }}>{HackMESA_casing} 2025</h1>
    </header>
  )
}

const Trifecta_Graphic = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <div><LACC_Graphic width={240} /></div>
        <div><LACCD_Graphic width={180} /></div>
        <div style={{ position: "relative", top: "15px" }}><MESA_Graphic width={260} /></div>
      </div></>
  )
}

function App() {

  return (
    <>

      <NavBar/>
      <HeroHeader />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-block" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1em" }}>
            <MESA_Graphic width={150} />
            <p style={{ fontSize: "2em", position: "relative", top: "-6px", paddingLeft: "7px" }}>sponsored Hackathon</p>
          </div>
        </div>
      </div>

      <Trifecta_Graphic />


      <div style={{marginTop: "3em", marginBottom: "10em"}}><CountdownTimer /></div>
      <SectionBase section_title="About" bg_color={`${SECONDARY_COLORS.YELLOW_107.hex}`}>
        <MESA_Graphic width={200} />
      </SectionBase>
      <SectionBase section_title="Schedule" bg_color={`${SECONDARY_COLORS.RHODAMINE_RED.hex}`} >
        stuff
      </SectionBase>
      <SectionBase section_title="Location" bg_color={`${TERTIARY_COLORS.GREEN_367.hex}`}>
        stuff
      </SectionBase>
      <SectionBase section_title="Sponsors" bg_color={`${TERTIARY_COLORS.PURPLE_2655.hex}`}>
        stuff
      </SectionBase>

      <footer style={{ padding: "3em" }}>

        <Trifecta_Graphic />
      </footer>
    </>
  )
}

export default App
