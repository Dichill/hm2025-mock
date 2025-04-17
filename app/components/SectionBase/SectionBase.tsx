import { backgroundColor, mobile_size_reference, sectionBase_side_padding_desktop, sectionBase_side_padding_mobile } from "@/lib/colors"
import useWindowSize from "@/lib/useWindowSize"

//darkenColor is a function created to build the border color; it's currently not implemented here

interface SectionBaseProps {
  section_title: string,
  children: React.ReactNode,
  bg_color: string,
  alt_text_color?: string,
  height: string,
}

const SectionBase = (props: SectionBaseProps) => {
  const { width } = useWindowSize();

  return (
    <>
      <div className="border-3 scroll-mt-10 mb-10 mt-10" id={`section-${props.section_title.toLowerCase()}`} style={{ padding: width > mobile_size_reference ? "3rem" : "1rem", boxShadow: "10px 10px 20px rgba(0,0,0,.6)", marginRight: width > mobile_size_reference ? `${sectionBase_side_padding_desktop}%` : `${sectionBase_side_padding_mobile}%`, marginLeft: width > mobile_size_reference ? `${sectionBase_side_padding_desktop}%` : `${sectionBase_side_padding_mobile}%`, color: props.alt_text_color ? props.alt_text_color : "white", backgroundColor: props.bg_color, height: props.height, borderColor: backgroundColor }}>
        {/* <h2 style={{ fontSize: "4em", textAlign: "center" }}>{props.section_title}</h2> */}
        {props.children}</div></>
  )
}

export default SectionBase