"use client"

import { PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors"

import { HackMESA_casing } from "@/lib/colors"
import CountdownTimer from "./components/CountdownTimer/CountdownTimer"
import LACC_Graphic from "./components/LACC_Graphic/LACC_Graphic"
import LACCD_Graphic from "./components/LACCD_Graphic/LACCD_Graphic"
import MESA_Graphic from "./components/MESA_Graphic/MESA_Graphic"
import NavBar from "./components/NavBar/NavBar"
import SectionBase from "./components/SectionBase/SectionBase"
import useWindowSize from "@/lib/useWindowSize"


export const mobile_size_reference = 800;

const HeroHeader = () => {
  const {/* height */ width } = useWindowSize();

  return (
    <>
      <header style={{ textAlign: "center", marginTop: width > mobile_size_reference ? "0em" : "4em" }}>
        <h1 style={{ fontSize: width > mobile_size_reference ? "5em" : "2em", fontWeight: "900", color: `${PRIMARY_COLORS.GREY_432.hex}` }}>{HackMESA_casing} 2025</h1>
      </header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-block" }}>
          <div style={{ display: width > mobile_size_reference ? "flex" : "block", justifyContent: "center", alignItems: "center", padding: "1em" }}>
            {width > mobile_size_reference && <MESA_Graphic width={150} />}
            {width <= mobile_size_reference && <div style={{ display: "flex", justifyContent: "center" }}><MESA_Graphic width={150} /></div>}



            <p style={{ fontSize: width > mobile_size_reference ? "2em" : "1em", position: "relative", top: "-6px", paddingLeft: "7px" }}>sponsored, LACCD student Hackathon</p>
          </div>
        </div>
      </div></>
  )
}

const Trifecta_Graphic = () => {
  const {/* height */ width } = useWindowSize();

  if (width > mobile_size_reference) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
          <div><LACC_Graphic width={240} /></div>
          <div><LACCD_Graphic width={180} /></div>
          <div style={{ position: "relative", top: "15px" }}><MESA_Graphic width={260} /></div>
        </div></>
    )
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <div><LACC_Graphic width={100} /></div>
        <div><LACCD_Graphic width={100} /></div>
        <div style={{ position: "relative", top: "15px" }}><MESA_Graphic width={100} /></div>
      </div></>
  )
}

function App() {
  const {/* height */ width } = useWindowSize();




  return (
    <>
      {/* {width + " " + height} */}

      {width > 800 && <NavBar />}
      <HeroHeader />



      <Trifecta_Graphic />


      <div style={{ marginTop: "3em", marginBottom: "10em" }}><CountdownTimer /></div>
      <SectionBase section_title="About" bg_color={`${SECONDARY_COLORS.YELLOW_107.hex}`}>
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

      <footer style={{ padding: "3em" }}>

        <Trifecta_Graphic />
      </footer>
    </>
  )
}

export default App
