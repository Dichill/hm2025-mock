import { SECONDARY_COLORS } from "@/lib/colors";
import useWindowSize from "@/lib/useWindowSize";

interface SectionBase_HeroText_Props {
  text: string
}

const SectionBase_HeroText = (props: SectionBase_HeroText_Props) => {

  const {width} = useWindowSize();


  return (
    <h2 style={{ fontSize: width > 500 ? 100 : 50, fontWeight: "800", color: SECONDARY_COLORS.YELLOW_107.hex, textShadow: "10px 10px 10px black" }} className="text-white">{props.text}</h2>
  )
}

export default SectionBase_HeroText;
