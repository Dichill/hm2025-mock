import Image from "next/image";

interface MESA_GraphicProps {
    width: string | number;
}

const MESA_Graphic = (props: MESA_GraphicProps) => {
    //pass the size in px through props.width
    return (
        <Image
            src="/MESA_logo.svg"
            width={500}
            height={500}
            className="inline-block bg-blue-500"
            style={{ width: `${props.width}%`, backgroundColor: "white" }}
            alt="MESA Logo"
        />
    );
};

export default MESA_Graphic;
