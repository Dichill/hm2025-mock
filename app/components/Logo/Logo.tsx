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
  return (
  //   <div className="flex justify-center items-center mt-15 -mb-10">
  //     <UnderConstruction/>
  //     Currently Under Construction
  //     {/* <Image height={props.size} width={props.size} src="./Logo_filler.svg" alt="filler logo while under production" /> */}

  //   </div>
  // )

  // return (
    <div className="flex justify-center items-center mt-15 -mb-10">
      <Image height={props.size} width={props.size} src="./Logo_filler.svg" alt="filler logo while under production" />

    </div>
  )
}

export default Logo