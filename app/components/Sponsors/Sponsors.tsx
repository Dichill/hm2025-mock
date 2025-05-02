"use client";

import { mobile_size_reference } from "@/lib/colors";
import { EC_Council_Link, elac, hologramLabs, kickpost, lacc, laccd, lahc, lamc, lavc, MESA, WSS_link } from "@/lib/link_base";
import useWindowSize from "@/lib/useWindowSize";
import Image from "next/image";
import { useState } from "react";

interface SponsorCard__Props {
    image: string; // Path to the image
    alt: string; // Alt text for accessibility
    url: string;
}

const SponsorCard = (props: SponsorCard__Props) => {
    const { width } = useWindowSize();
    const [imageError, setImageError] = useState<boolean>(false);

    // Simplified padding logic
    const getPadding = (): string => {
        if (props.alt === "MESA Logo") {
            return width > mobile_size_reference ? "2em" : "0em";
        } else {
            return width > mobile_size_reference ? "0em" : "1em";
        }
    };

    return (
        <a
            className="flex justify-center items-center bg-white rounded-2xl p-4"
            target="_blank"
            href={props.url}
        >
            <div className="">
                {!imageError ? (
                    <Image
                        style={{ padding: getPadding() }}
                        src={props.image}
                        alt={props.alt}
                        width={400}
                        height={200}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-[400px] h-[200px] flex items-center justify-center text-gray-500">
                        {props.alt}
                    </div>
                )}
            </div>
        </a>
    );
};

const Sponsors = () => {
  const sponsorImages = [
    { src: "/MESA_Color_Logo1.svg", alt: "MESA Logo", url: MESA },
    { src: "/sponsor_graphics/ec.webp", alt: "EC-Council Logo", url: EC_Council_Link },
    { src: "/sponsor_graphics/wss.webp", alt: "WSS Logo", url: WSS_link },
    { src: "/sponsor_graphics/elac.webp", alt: "East Los Angeles College Logo", url: elac },
    { src: "/sponsor_graphics/lacc.webp", alt: "Los Angeles City College Logo", url: lacc },
    { src: "/sponsor_graphics/laccd.webp", alt: "LA Community College District Logo", url: laccd },
    { src: "/sponsor_graphics/lahc.webp", alt: "Los Angeles Harbor College Logo", url: lahc },
    { src: "/sponsor_graphics/lamc.webp", alt: "Los Angeles Mission College Logo", url: lamc },
    { src: "/sponsor_graphics/lavc.webp", alt: "Los Angeles Valley College Logo", url: lavc },
    { src: "/sponsor_graphics/hologram_labs.webp", alt: "Hologram Labs Logo", url: hologramLabs },
    { src: "/sponsor_graphics/kickpost.webp", alt: "Kickpost Logo", url: kickpost },
  ]

    return (
        <>
            <div className="flex justify-center">
                <div
                    id="contains_all_sponsors"
                    className="w-full max-w-[1200px]"
                >
                    <style>
                        {` .sponsorCard {
                  margin-top: 1em;
                }
                `
            }
          </style>
          <div id="top_row_of_sponsors" className="w-full grid grid-cols-1 gap-4">
            <SponsorCard image={sponsorImages[0].src} alt={sponsorImages[0].alt} url={sponsorImages[0].url} />
          </div>
          <div id="second_row_of_sponsors" className="w-full grid grid-cols-2 gap-4 sponsorCard">
            <SponsorCard image={sponsorImages[1].src} alt={sponsorImages[1].alt} url={sponsorImages[1].url} />
            <SponsorCard image={sponsorImages[2].src} alt={sponsorImages[2].alt} url={sponsorImages[2].url} />
          </div>
          <div id="third_row_of_sponsors" className="w-full grid grid-cols-2 gap-4 sponsorCard">
            <SponsorCard image={sponsorImages[9].src} alt={sponsorImages[9].alt} url={sponsorImages[9].url} />
            <SponsorCard image={sponsorImages[10].src} alt={sponsorImages[10].alt} url={sponsorImages[10].url} />
          </div>
          <div id="fourth_row_of_sponsors" className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sponsorCard">
            <SponsorCard image={sponsorImages[3].src} alt={sponsorImages[3].alt} url={sponsorImages[3].url} />
            <SponsorCard image={sponsorImages[4].src} alt={sponsorImages[4].alt} url={sponsorImages[4].url} />
            <SponsorCard image={sponsorImages[5].src} alt={sponsorImages[5].alt} url={sponsorImages[5].url} />
            <SponsorCard image={sponsorImages[6].src} alt={sponsorImages[6].alt} url={sponsorImages[6].url} />
            <SponsorCard image={sponsorImages[7].src} alt={sponsorImages[7].alt} url={sponsorImages[7].url} />
            <SponsorCard image={sponsorImages[8].src} alt={sponsorImages[8].alt} url={sponsorImages[8].url} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Sponsors;
