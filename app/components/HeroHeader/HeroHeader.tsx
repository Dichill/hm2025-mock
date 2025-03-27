
import useWindowSize from "@/lib/useWindowSize";
import { mobile_size_reference } from "@/lib/colors";
import Logo from "../Logo/Logo";
// import MESA_Graphic from "../MESA_Graphic/MESA_Graphic";

const HeroHeader = () => {
  const {/* height */ width } = useWindowSize();

  let variable_style;

  if (width > mobile_size_reference) {
    variable_style = "bg-[url(/BG_sunset_sketch.jpg)] bg-cover bg-center"
  } else {
    variable_style = "bg-[url(/sunset_sketch1.jpg)] bg-cover bg-center"
  }

  return (
    <div className={variable_style}>
      {width < mobile_size_reference &&
        <Logo opacity="0%" size={350} />
      }
      {width >= mobile_size_reference && <>
        <div className="mb-4 -mt-10">
          <Logo opacity="100%" size={500} />
        </div>
      </>}
      <div className="text-center -mb-35" style={{ marginTop: width > mobile_size_reference ? "0em" : "4em" }}>
        <p className="font-bold" style={{ fontSize: width > mobile_size_reference ? "6em" : "4em" }}>May 9th-10th</p>
      </div>
      <div className="flex justify-center mb-10">
        <div className="inline-block">
          <div className="block mt-20 justify-center items-center padding-2">
              <>
                <div className="-ml-2 flex flex-row">

                  {/* <MESA_Graphic width={150} /> */}

                  <p className="inline text-4xl relative mt-[10] pl-1 h-10">{/* sponsored */}</p>
                </div>
                <p className="text-6xl -mt-5 font-black text-center">Hackathon</p>
                <p className="text-2xl text-center font-black">open to LACCD students</p>
                </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader