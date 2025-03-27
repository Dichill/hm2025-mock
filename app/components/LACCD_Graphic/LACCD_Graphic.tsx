interface LACC_GraphicProps {
  width: string | number,
}

const LACCD_Graphic = (props: LACC_GraphicProps) => {
  return (

    <img src="./LACCD_logo_lowRes.png" className="inline-block bg-blue-500" style={{ width: `${props.width}%` }} alt="Logo graphic for Los Angeles Community College District" />


  )
}

export default LACCD_Graphic
