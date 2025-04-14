import "./TrifectaGraphic.css";
import Image from "next/image";

interface TrifectaGraphicProps {
    width: number;
}

const TrifectaGraphic = (props: TrifectaGraphicProps) => {
    const logos = [
        {
            src: "/LACC_BW_Logo.png",
            alt: "Los Angeles City College Logo",
            width: 200,
            height: 200,
        },
        {
            src: "/LACCD_logo_lowRes.png",
            alt: "Los Angeles Community College District Logo",
            width: 200,
            height: 200,
        },
        {
            src: "/MESA_logo.svg",
            alt: "MESA Logo; Math, Science, Engineering Achievement",
            width: 200,
            height: 200,
        },
    ];

    return (
        <>
            <section className="invert flex justify-center opacity-50">
                <div className="w-[50%] h-[20vh] flex justify-around items-center p-5 box-border">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            style={{ maxWidth: `${props.width}%` }}
                            className="flex justify-center items-center flex-1"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="max-w-full max-h-full object-contain"
                                priority
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default TrifectaGraphic;

// <div className="w-full bg-black flex justify-center">
// <section style={{ width: "60vw" }}>
//   <div className=" flex bg-red-500">
//     {/* <div> */}<LACC_Graphic width={LACC_size} />{/* ß */}
//     {/* <div> */}<LACCD_Graphic width={LACCD_size} />{/* ß */}
//     {/* <div> */}<MESA_Graphic width={MESA_size} />{/* ß */}
//   </div>
// </section>
// </div>
