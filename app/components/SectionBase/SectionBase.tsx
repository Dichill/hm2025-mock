interface SectionBaseProps {
  section_title: string,
  children: React.ReactNode,
  bg_color: string
}

const SectionBase = (props: SectionBaseProps) => {
  return (
    <>
      <div id={`section-${props.section_title.toLowerCase()}`} style={{ height: "100vh", backgroundColor: props.bg_color }}>
        <h2 style={{ fontSize: "4em", textAlign: "center" }}>{props.section_title}</h2>
        {props.children}</div></>
  )
}

export default SectionBase