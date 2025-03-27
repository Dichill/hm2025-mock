interface LACC_GraphicProps {
  width: string | number
}

const LACC_Graphic = (props: LACC_GraphicProps) => {
  return (
    <img src="./LACC_BW_Logo.png" style={{ width: `${props.width}px`, display: "inline-block" }} alt="Logo graphic for Los Angeles City College; the city's college; the logo contains a shooting star."/>
  )
}

export default LACC_Graphic;
