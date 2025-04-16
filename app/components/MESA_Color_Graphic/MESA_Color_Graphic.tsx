import Image from "next/image";


const MESA_Color_Graphic = () => {
    //pass the size in px through props.width

    return (
        <div className="z-1">
            <Image
                src="/MESA_Color_Logo1.svg"
                width={500}
                height={500}
                alt="MESA Logo"
            />
        </div>
    );
};
export default MESA_Color_Graphic;
