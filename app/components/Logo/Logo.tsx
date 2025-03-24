import { SECONDARY_COLORS } from "@/lib/colors"
import Image from "next/image"

const UnderConstruction = () => {
  return (
    <Image src="./under_construction.svg" height={80} width={80} alt="A man digging, a symbol of a webpage under construction"/>
  )
}


interface LogoProps {
  size: number
}

const Logo = (props: LogoProps) => {

  //REMOVE THIS POINTLESS VARIABLE!
  const pointless_variable = props.size;
  console.log(pointless_variable)

  return (
    // <div className="flex justify-center items-center mt-15 -mb-10">
    <div style={{backgroundColor: SECONDARY_COLORS.YELLOW_107.hex}} className="pt-6 flex flex-col justify-center items-center mt-15 -mb-10">
      <UnderConstruction/>
      <div className="font-black p-4">
      Currently Under Construction
      </div>
      {/* <Image height={props.size} width={props.size} src="./Logo_filler.svg" alt="filler logo while under production" /> */}

    </div>
  

  // return (
    // <div className="flex justify-center items-center mt-15 -mb-10">
    //   <Image height={props.size} width={props.size} src="./Logo_filler.svg" alt="filler logo while under production" />

    // </div>
  )
}

export default Logo