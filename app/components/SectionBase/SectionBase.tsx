import { backgroundColor } from "@/lib/colors"

//darkenColor is a function created to build the border color; it's currently not implemented here

interface SectionBaseProps {
  section_title: string,
  children: React.ReactNode,
  bg_color: string,
  alt_text_color?: string,
  height: string,
}

const SectionBase = (props: SectionBaseProps) => {

  return (
    <>
      <div className="border-3 shadow-xl scroll-mt-25 m-4" id={`section-${props.section_title.toLowerCase()}`} style={{ color: props.alt_text_color ? props.alt_text_color : "white", backgroundColor: props.bg_color, height: props.height, borderColor: backgroundColor }}>
        {/* <h2 style={{ fontSize: "4em", textAlign: "center" }}>{props.section_title}</h2> */}
        {props.children}</div></>
  )
}

export default SectionBase