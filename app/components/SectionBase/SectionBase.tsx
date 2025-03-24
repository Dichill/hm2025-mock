interface SectionBaseProps {
  section_title: string,
  children: React.ReactNode,
  bg_color: string,
  alt_text_color?: string
}

const SectionBase = (props: SectionBaseProps) => {
  return (
    <>
      <div id={`section-${props.section_title.toLowerCase()}`} style={{ color: props.alt_text_color ? props.alt_text_color : "white", height: "100vh", backgroundColor: props.bg_color, scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "4em", textAlign: "center" }}>{props.section_title}</h2>
        {props.children}</div></>
  )
}

export default SectionBase