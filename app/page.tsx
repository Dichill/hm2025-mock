"use client"

import {
    mobile_size_reference,
    PRIMARY_COLORS,
    SECONDARY_COLORS,
} from "@/lib/colors";
import Image from "next/image";

import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import NavBar, { Render_MobileNav } from "./components/NavBar/NavBar";
import SectionBase from "./components/SectionBase/SectionBase";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";
import MESA_Color_Graphic from "./components/MESA_Color_Graphic/MESA_Color_Graphic";
import LACC_Color_Graphic from "./components/LACC_Color_Graphic/LACC_Color_Graphic";
import Image_Overlay from "./components/Image_Overlay/Image_Overlay";
import useWindowSize from "@/lib/useWindowSize";
import LocationMap from "./components/LocationMap/LocationMap";
import FAQ_component from "./components/FAQ_Component/FAQ_Component";
import Logo from "./components/Logo/Logo";
import SVG_Window from "./components/SVG_Window/SVG_Window";
import TheTeam from "./components/TheTeam/TheTeam";
import { backgroundColor } from "@/lib/colors";
import Footer from "./components/Footer/Footer";
import SectionBase_HeroText from "./components/SectionBase_HeroText/SectionBase_HeroText";
import Mobile_SVG_Window from "./components/Mobile_SVG_Window/Mobile_SVG_Window";

import "./page_grid.css";
import { lacc, MESA } from "@/lib/link_base";

function App() {
    const { width, height } = useWindowSize();

    return (
        <>
            {/* MLH Badge */}
            {width > mobile_size_reference && (
                <a
                    id="mlh-trust-badge"
                    style={{
                        display: "block",
                        maxWidth: "15%",
                        minWidth: "60px",
                        position: "fixed",
                        right: "2%",
                        top: "0",
                        width: "10%",
                        zIndex: "101",
                    }}
                    href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
                    target="_blank"
                >
                    <Image
                        src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
                        alt="Major League Hacking 2025 Hackathon Season"
                        width={200}
                        height={200}
                        style={{ width: "100%" }}
                    />
                </a>
            )}
            {width <= mobile_size_reference && (
                <a
                    id="mlh-trust-badge"
                    style={{
                        display: "block",
                        maxWidth: "20%",
                        minWidth: "80px",
                        position: "fixed",
                        right: "3%",
                        top: "0",
                        width: "10%",
                        zIndex: "101",
                    }}
                    href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
                    target="_blank"
                >
                    <Image
                        src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
                        alt="Major League Hacking 2025 Hackathon Season"
                        width={200}
                        height={200}
                        style={{ width: "100%" }}
                    />
                </a>
            )}

            {/* The "Body" is below */}
            <div
                style={{ backgroundColor: backgroundColor }}
                id="page-backdrop"
            >
                {/* This is the hero logo */}
                {width > mobile_size_reference && (
                    <div
                        id="hero-logo_container"
                        className="z-100 flex justify-center absolute top-40 w-full"
                    >
                        <Logo size={300} opacity="100%" />
                    </div>
                )}
                {width <= mobile_size_reference && (
                    <div
                        id="hero-logo_container"
                        className="z-100 flex justify-center absolute top-40 w-full"
                    >
                        {height > 540 && <Logo size={380} opacity="100%" />}
                        {/* wierd but possible edge case */}
                        {height <= 540 && <Logo size={200} opacity="100%" />}
                    </div>
                )}

                {/* Contains the hero SVG component */}
                <div className="relative h-screen">
                    {width > mobile_size_reference && <SVG_Window />}
                    {width <= mobile_size_reference && <Mobile_SVG_Window />}
                </div>

                {/* This is the jumbotron */}
                {width > mobile_size_reference && (
                    <div
                        id="header-container"
                        style={{}}
                        className="z-10 top-120 flex flex-col justify-center w-full"
                    >
                        <HeroHeader />
                    </div>
                )}

                {width <= mobile_size_reference && (
                    <div
                        id="header-container"
                        className=" z-10 top-130 flex flex-col justify-center w-full"
                    >
                        <HeroHeader />
                    </div>
                )}

                {/* This container will render either the NavBar or the mobile NavBar */}
                <div
                    id="nav-bar__sticky-container"


                    className="fixed w-[85%] top-0 z-103 h-[16%] min-h-24 flex"

                >
                    {width > mobile_size_reference && <NavBar />}
                    {width <= mobile_size_reference && (
                        <>
                            <nav>
                                <Render_MobileNav />
                            </nav>
                        </>
                    )}
                </div>

                {/* This container renders everything below the hero area */}

                <div className={"w-full"}>
                    <CountdownTimer />

                    {width > mobile_size_reference && (
                        <div className="mt-4">
                            <TrifectaGraphic width={20} />
                        </div>
                    )}
                    {width <= mobile_size_reference && (
                        <div className="-mb-2">
                            <TrifectaGraphic width={40} />
                        </div>
                    )}

                    {/* About section Desktop */}
                    <SectionBase
                        height={"auto"}
                        section_title="About"
                        bg_color={backgroundColor}
                        alt_text_color={PRIMARY_COLORS.GREY_432.hex}
                    >
                        {width > mobile_size_reference && (
                            <>
                                <SectionBase_HeroText text="About MESA" />


                                <div
                                    id="area-in-question"
                                    className="transition-all hover:scale-[1.01] duration-300 hover-glow"
                                > 
     
                                
                                    <div id="about_image_elem">
                                        <Image_Overlay
                                            source="/MESA_student_overlay1.jpg"
                                            opacity={100}
                                            float="right"
                                            display="inline"
                                            width="80%"
                                            height="90%"
                                            margin="2em"
                                        />
                                    </div>

                                    <span
                                        id="about_mesa_gr_elem_1"
                                        className="flex justify-center items-center"
                                    >

                                        <a
                                            href={MESA}
                                            target="new"
                                            // className="transition-transform hover:scale-105 duration-200"
                                        >
                                    {/* ANIMATION NOTES:
                                    This element creates significant choppiness on hover for narrow screens. 
                                    We can solve it
                                    */}

                                            
                                            <div className="bg-white inline-block p-5 rounded-xl shadow-xl hover:shadow-2xl">

                                                <MESA_Color_Graphic
                                                    width={28}
                                                />
                                            </div>
                                        </a>
                                    </span>

                                    <span id="about_mesa_gr_elem_4">
                                        <a href={lacc} target="new">
                                            <div className=" bg-white inline-block p-5 rounded-xl shadow-xl float-right">
                                                <LACC_Color_Graphic
                                                    width={22}
                                                />
                                            </div>
                                        </a>
                                    </span>

                                    <span id="about_mesa_gr_elem_3">
                                        <div className=" text-white p-4 m-2 text-xl">
                                            <AboutMesaText />
                                        </div>
                                    </span>
                                </div>

                                <SectionBase_HeroText text="About the Hackathon" />

                                <div className=" text-white p-4 m-2 text-xl">
                                    <AboutHackathonText />
                                </div>
                            </>
                        )}

                        {/* About section Mobile */}

                        {width <= mobile_size_reference && (
                            <>
                                <h2
                                    style={{
                                        fontSize: width > 500 ? 60 : 40,
                                        fontWeight: "800",
                                        color: SECONDARY_COLORS.YELLOW_107.hex,
                                        textShadow: "10px 10px 10px black",
                                    }}
                                    className="text-center"
                                >
                                    About MESA
                                </h2>

                                <section className="relative">
                                    <a href={MESA} target="new">
                                        <div className="z-10 bg-white inline-block p-5 rounded-xl shadow-xl absolute top-10 left-6">
                                            <MESA_Color_Graphic width={28} />
                                        </div>
                                    </a>

                                    <Image_Overlay
                                        source="/MESA_student_overlay1.jpg"
                                        opacity={70}
                                        float="none"
                                        display="block"
                                        width="90%"
                                        height="90vh"
                                        margin="5%"
                                    />

                                    <section>
                                        <a href={lacc} target="new">
                                            <div className="bg-white inline-block p-5 rounded-xl shadow-xl absolute bottom-10 right-10">
                                                <LACC_Color_Graphic
                                                    width={22}
                                                />
                                            </div>
                                        </a>
                                    </section>
                                </section>
                                <div className="border-solid border-2 text-white p-4 m-2 text-xl rounded-2xl">
                                    <AboutMesaText />
                                </div>
                                <h2
                                    style={{
                                        fontSize: width > 500 ? 60 : 40,
                                        fontWeight: "800",
                                        color: SECONDARY_COLORS.YELLOW_107.hex,
                                        textShadow: "10px 10px 10px black",
                                    }}
                                    className="text-center"
                                >
                                    About Our Hackathon
                                </h2>
                                <div className="border-solid border-2 text-white p-4 m-2 text-xl rounded-2xl">
                                    <AboutHackathonText />
                                </div>
                            </>
                        )}
                    </SectionBase>

                    {/* Schedule section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Schedule"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Schedule" />
                        <div className="mb-30 mt-20 text-2xl text-center">
                            Schedule coming soon...
                            {/* <Schedule /> */}
                        </div>
                    </SectionBase>

                    {/* Location section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Location"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Location" />
                        <p className="text-center text-2xl">
                            The Los Angeles City College Student Services
                            Building
                        </p>
                        <p className="text-center text-2xl">
                            855 N. Vermont Avenue, Los Angeles California 90029
                        </p>
                        <div className="flex justify-center">
                            <LocationMap />
                        </div>
                    </SectionBase>

                    {/* Sponsors section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Sponsors"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Sponsors" />
                    </SectionBase>

                    {/* Location section */}
                    <SectionBase
                        height={"auto"}
                        section_title="FAQ"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="FAQ" />

                        <FAQ_component />
                    </SectionBase>

                    {/* Team section */}
                    <SectionBase
                        height={"100"}
                        section_title="Team"
                        bg_color={backgroundColor}
                        alt_text_color={PRIMARY_COLORS.GREY_432.hex}
                    >
                        <SectionBase_HeroText text="Team" />
                        <TheTeam />
                    </SectionBase>
                    <section className="m-10">
                        <TrifectaGraphic width={20} />
                    </section>
                    <Footer />
                </div>
                <div
                    style={{
                        backgroundColor: backgroundColor,
                        position: "fixed",
                        height: "100vh",
                        bottom: "0",
                        width: "100%",
                        zIndex: -11,
                    }}
                >
                    {/* This div only prevents a small white bar */}
                </div>
            </div>
        </>
    );
}

export default App;

const AboutMesaText = () => {
    return (
        <>
            <div style={{ lineHeight: "1.8" }}>
                <p>
                    <a target="new" href={MESA} className="underline">
                        MESA&apos;s community college level program
                    </a>{" "}
                    produces a population of transfer-ready students to advance
                    their STEM educational journeys in 4-year university
                    programs. If you are student interested in participating in
                    MESA, please contact the local center director to get
                    enrolled.
                </p>
                <p className="mt-4 font-bold text-center">
                    MESA serves about 5,700 community college students in
                    California.
                </p>
            </div>
        </>
    );
};

const AboutHackathonText = () => {
    return (
        <div style={{ lineHeight: "1.8" }}>
            <p className="mt-4 font-bold text-center mb-5">
                We are proud to present the very first Los Angeles City College
                & MESA HackMESA Hackathon! 🎉
            </p>
            <p>
                Open to LACCD students, this event will be an unforgettable
                evening of workshops, programming, teamwork, food, and
                sidequests!
            </p>
            <p>
                Our hackathon is hosted by{" "}
                <a target="new" href={MESA} className="underline">
                    MESA
                </a>
                , in conjunction with LACC, the LACCD Chancellor&apos;s Office,
                and our generous sponsors in the community.
            </p>
            <p className="mt-4 font-bold text-center mb-5">
                Teams will form, and this overnight event will culminate in
                hundreds of dollars in prizes!
            </p>
        </div>
    );
};

