interface MESA_GraphicProps {
  width: string | number;
}

const MESA_Graphic = (props: MESA_GraphicProps) => {
  //pass the size in px through props.width

  return (

    <img src="../MESA_logo.svg" className="inline-block bg-blue-500" style={{ width: `${props.width}%`, backgroundColor: "white" }} alt="MESA Logo" />


  )
}
export default MESA_Graphic;