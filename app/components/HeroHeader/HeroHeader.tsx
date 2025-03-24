
import useWindowSize from "@/lib/useWindowSize";
import { mobile_size_reference } from "@/lib/colors";
import { PRIMARY_COLORS } from "@/lib/colors";
import Logo from "../Logo/Logo";
import MESA_Graphic from "../MESA_Graphic/MESA_Graphic";

const HeroHeader = () => {
  const {/* height */ width } = useWindowSize();

  return (
    <>
      {width < mobile_size_reference &&
        <Logo size={350} />
      }
      {width >= mobile_size_reference && <>
        <div className="mb-20 -mt-10">
          <Logo size={500} />
        </div>
      </>}
      <header style={{ textAlign: "center", marginTop: width > mobile_size_reference ? "0em" : "4em" }}>
        {/* <h1 style={{ fontSize: width > mobile_size_reference ? "5em" : "2em", fontWeight: "900", color: `${PRIMARY_COLORS.GREY_432.hex}` }}>{HackMESA_casing} 2025</h1> */}
        <p style={{ color: PRIMARY_COLORS.GREY_432.hex, fontSize: width > mobile_size_reference ? "2em" : "1.5em", fontWeight: "600" }}>May 10th and 11th</p>
      </header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-block" }}>
          <div style={{ display: width > mobile_size_reference ? "flex" : "block", justifyContent: "center", alignItems: "center", padding: "1em" }}>
            {width > mobile_size_reference && <MESA_Graphic width={150} />}
            {width <= mobile_size_reference && <div style={{ display: "flex", justifyContent: "center" }}><MESA_Graphic width={150} /></div>}
            <p style={{ fontSize: width > mobile_size_reference ? "2em" : "1em", position: "relative", top: "-6px", paddingLeft: "7px" }}>sponsored, LACCD student Hackathon</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroHeader