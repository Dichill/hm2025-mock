import Image from "next/image";

interface LACC_GraphicProps {
    width: string | number;
}

const LACCD_Graphic = (props: LACC_GraphicProps) => {
    return (
        <Image
            src="/LACCD_logo_lowRes.png"
            width={500}
            height={500}
            className="inline-block bg-blue-500"
            style={{ width: `${props.width}%` }}
            alt="Logo graphic for Los Angeles Community College District"
        />
    );
};

export default LACCD_Graphic;
