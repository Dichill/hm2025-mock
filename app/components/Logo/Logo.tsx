

// const UnderConstruction = () => {
//   return (
//     <Image src="./under_construction.svg" height={80} width={80} alt="A man digging, a symbol of a webpage under construction"/>
//   )
// }


interface LogoProps {
  size: number
}

const Logo = (props: LogoProps) => {
  return (
  //   <div className="flex justify-center items-center mt-15 -mb-10">
  //     <UnderConstruction/>
  //     Currently Under Construction
  //     {/* <Image height={props.size} width={props.size} src="./Logo_filler.svg" alt="filler logo while under production" /> */}

  //   </div>
  // )

  // return (
    <div className="flex justify-center items-center -mb-30">
      <img style={{opacity: "70%"}} width={props.size} src="./hackMESA_logo_1.png" alt="Logo Graphic for HackMESA 2025; LACCD Hackathon" />

    </div>
  )
}

export default Logo