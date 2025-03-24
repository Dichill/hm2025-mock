interface LACC_GraphicProps {
  width: string | number,
}

const LACCD_Graphic = (props: LACC_GraphicProps) => {
  return (
    <img src="./LACCD_logo_lowRes.jpg" style={{ width: `${props.width}px` }} alt="Logo graphic for Los Angeles Community College District" />
  )
}

export default LACCD_Graphic
