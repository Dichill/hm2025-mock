interface Image_OverlayProps {
  width: string,
  height: string,
  margin: string,
  display: string,
  source: string,
  float: "left" | "right" | "none" | undefined,
  opacity: number
}

const Image_Overlay = (props: Image_OverlayProps) => {

  return (
    <img src={props.source} style={{opacity: `${props.opacity}%`, float: props.float, margin: props.margin, width: props.width, height: props.height, display: props.display}} className="object-cover" alt="MESA Student tinkering with sophisticated electronics" />
)
}

export default Image_Overlay
