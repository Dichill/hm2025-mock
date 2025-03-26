interface MESA_GraphicProps {
  width: string | number;
}

const MESA_Graphic = (props: MESA_GraphicProps) => {
  //pass the size in px through props.width

  return (
    <div className="z-1" style={{width: `${props.width}px`}}>
    <img src="../MESA_logo.svg" alt="MESA Logo"/>
    </div>
  )
}
export default MESA_Graphic;