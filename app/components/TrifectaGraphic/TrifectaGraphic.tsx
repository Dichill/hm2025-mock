import "./TrifectaGraphic.css";
import Image from "next/image";

interface TrifectaGraphicProps {
    width: number;
}

const TrifectaGraphic = (props: TrifectaGraphicProps) => {
    const logos = [
        "./LACC_BW_Logo.png",
        "LACCD_logo_lowRes.png",
        "MESA_logo.svg",
    ];
    const alt_text = [
        "Los Angeles City College Logo",
        "LACCD Logo",
        "MESA Logo; Math, Science, Engineering Achievement",
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
                                src={logo}
                                alt={`${alt_text[index]}`}
                                width={200}
                                height={200}
                                className="max-w-full max-h-full object-contain"
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
