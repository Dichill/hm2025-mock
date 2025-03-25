interface MESA_GraphicProps {
  width: string | number;
}

const MESA_Graphic = (props: MESA_GraphicProps) => {
  //pass the size in px through props.width

  return (
    <div className="z-1" style={{width: `${props.width}px`}}>
    <img src="../MESA_logo.svg" alt="Logo graphic for MESA; An organization whose aim is to increase the number and percentage of underrepresented and/or low-income students attaining degrees and certificates in STEM"/>
    </div>
  )
}
export default MESA_Graphic;