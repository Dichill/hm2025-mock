"use client";

import Image from "next/image";


interface SponsorCard__Props {
  image: string; // Path to the image
  alt: string; // Alt text for accessibility
}

const SponsorCard = (props: SponsorCard__Props) => {
  return (
    <div className="flex justify-center items-center bg-white rounded-2xl p-4">
      <Image
        style={{ margin: props.alt == "MESA Logo" ? "5em" : "1  em" }}
        src={props.image}
        alt={props.alt}
        width={400} // Adjust width as needed
        height={200} // Adjust height as needed
      />
    </div>
  );
};

const Sponsors = () => {
  const sponsorImages = [
    { src: "/MESA_Color_Logo1.svg", alt: "MESA Logo" },
    { src: "/sponsor_graphics/ec.webp", alt: "EC-Council Logo", },
    { src: "/sponsor_graphics/wss.webp", alt: "WSS Logo", },
    { src: "/sponsor_graphics/elac.webp", alt: "East Los Angeles College Logo", },
    { src: "/sponsor_graphics/lacc.webp", alt: "Los Angeles City College Logo", },
    { src: "/sponsor_graphics/laccd.webp", alt: "LA Community College District Logo", },
    { src: "/sponsor_graphics/lahc.webp", alt: "Los Angeles Harbor College Logo", },
    { src: "/sponsor_graphics/lamc.webp", alt: "Los Angeles Mission College Logo", },
    { src: "/sponsor_graphics/lavc.webp", alt: "Los Angeles Valley College Logo", },
  ]

  return (
    <>

      <div className="flex justify-center">
        <div id="contains_all_sponsors" className="w-full max-w-[1200px]">
          <style>
            {
              ` .sponsorCard {
                  margin-top: 1em;
                }
                `
            }
          </style>
          <div id="top_row_of_sponsors" className="w-full grid grid-cols-1 gap-4">
            <SponsorCard image={sponsorImages[0].src} alt={sponsorImages[0].alt} />
          </div>
          <div id="second_row_of_sponsors" className="w-full grid grid-cols-2 gap-4 sponsorCard">
            <SponsorCard image={sponsorImages[1].src} alt={sponsorImages[1].alt} />
            <SponsorCard image={sponsorImages[2].src} alt={sponsorImages[2].alt} />
          </div>
          <div id="third_row_of_sponsors" className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sponsorCard">
            <SponsorCard image={sponsorImages[3].src} alt={sponsorImages[3].alt} />
            <SponsorCard image={sponsorImages[4].src} alt={sponsorImages[4].alt} />
            <SponsorCard image={sponsorImages[5].src} alt={sponsorImages[5].alt} />
            <SponsorCard image={sponsorImages[6].src} alt={sponsorImages[6].alt} />
            <SponsorCard image={sponsorImages[7].src} alt={sponsorImages[7].alt} />
            <SponsorCard image={sponsorImages[8].src} alt={sponsorImages[8].alt} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Sponsors;