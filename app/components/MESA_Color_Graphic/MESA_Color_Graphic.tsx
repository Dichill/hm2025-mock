interface MESA_GraphicProps {
  width: string | number;
}

const MESA_Color_Graphic = (props: MESA_GraphicProps) => {
  //pass the size in px through props.width

  return (
    <div className="z-1" style={{width: `${props.width}vw`}}>
    <img src="../MESA_Color_Logo1.svg" alt="MESA Logo"/>
    </div>
  )
}
export default MESA_Color_Graphic;