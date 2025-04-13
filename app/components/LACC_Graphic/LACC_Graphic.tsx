import Image from "next/image";

interface LACC_GraphicProps {
    width: string | number;
}

const LACC_Graphic = (props: LACC_GraphicProps) => {
    return (
        <Image
            src="/LACC_BW_Logo.png"
            width={500}
            height={500}
            className="inline-block bg-blue-500"
            style={{ width: `${props.width}%` }}
            alt="Logo graphic for Los Angeles City College; the city's college; the logo contains a shooting star."
        />
    );
};

export default LACC_Graphic;
