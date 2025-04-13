import Image from "next/image";

interface MESA_GraphicProps {
    width: string | number;
}

const LACC_Color_Graphic = (props: MESA_GraphicProps) => {
    //pass the size in px through props.width

    return (
        <div className="z-1" style={{ width: `${props.width}vw` }}>
            <Image
                src="/LACC_logo_BR.jpg"
                width={500}
                height={500}
                alt="Los Angeles Community College Logo; the logo has a shooting star"
            />
        </div>
    );
};
export default LACC_Color_Graphic;
