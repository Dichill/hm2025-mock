import { SECONDARY_COLORS } from "@/lib/colors";

interface SectionBase_HeroText_Props {
  text: string
}

const SectionBase_HeroText = (props: SectionBase_HeroText_Props) => {
  return (
    <h2 style={{ fontSize: 100, fontWeight: "800", color: SECONDARY_COLORS.YELLOW_107.hex, textShadow: "10px 10px 10px black" }} className="text-white">{props.text}</h2>
  )
}

export default SectionBase_HeroText;
