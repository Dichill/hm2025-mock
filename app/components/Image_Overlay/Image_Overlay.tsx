import Image from "next/image";

interface Image_OverlayProps {
    width: string;
    height: string;
    margin: string;
    display: string;
    source: string;
    float: "left" | "right" | "none" | undefined;
    opacity: number;
}

const Image_Overlay = (props: Image_OverlayProps) => {
    return (
        <Image
            src={props.source}
            alt="MESA Student tinkering with sophisticated electronics"
            width={parseInt(props.width) || 500}
            height={parseInt(props.height) || 500}
            style={{
                opacity: `${props.opacity}%`,
                float: props.float,
                margin: props.margin,
                width: props.width,
                height: props.height,
                display: props.display,
            }}
            className="object-cover"
        />
    );
};

export default Image_Overlay;
