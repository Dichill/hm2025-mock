import LACCD_Graphic from "../LACCD_Graphic/LACCD_Graphic";
import LACC_Graphic from "../LACC_Graphic/LACC_Graphic";
import MESA_Graphic from "../MESA_Graphic/MESA_Graphic";
import { mobile_size_reference } from "@/lib/colors";
import useWindowSize from "@/lib/useWindowSize";

const TrifectaGraphic = () => {
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
        <div style={{ position: "relative", top: "9px" }}><MESA_Graphic width={110} /></div>
      </div></>
  )
}

export default TrifectaGraphic