

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
      <img style={{opacity: "70%"}} width={props.size} src="./sunset_sketch1.tiff" alt="HackMESA 2025 Logo; the logo has a cityscape, circuit designs, and it says 'Los Angeles Community College District, 2025 HackMESA.'" />
    </div>
  )
}

export default Logo