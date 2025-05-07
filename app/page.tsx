"use client";

import {
    mobile_size_reference,
    PRIMARY_COLORS,
    SECONDARY_COLORS,
} from "@/lib/colors";
import Image from "next/image";

import NewNavBar from "./components/NavBar/NewNavBar";
import SectionBase from "./components/SectionBase/SectionBase";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import TrifectaGraphic from "./components/TrifectaGraphic/TrifectaGraphic";
import MESA_Color_Graphic from "./components/MESA_Color_Graphic/MESA_Color_Graphic";
import Image_Overlay from "./components/Image_Overlay/Image_Overlay";
import useWindowSize from "@/lib/useWindowSize";
import LocationMap from "./components/LocationMap/LocationMap";
import FAQ_component from "./components/FAQ_Component/FAQ_Component";
import { tracks, sponsorChallenges } from "@/lib/tracks-data";

import SVG_Window from "./components/SVG_Window/SVG_Window";
import TheTeam from "./components/TheTeam/TheTeam";
import { backgroundColor } from "@/lib/colors";
import Footer from "./components/Footer/Footer";
import SectionBase_HeroText from "./components/SectionBase_HeroText/SectionBase_HeroText";
import Mobile_SVG_Window from "./components/Mobile_SVG_Window/Mobile_SVG_Window";

import "./page_grid.css";
import "./animations.css";
import { MESA, team_email } from "@/lib/link_base";
import { useEffect } from "react";
import { initScrollReveal, addRevealClasses } from "./scrollReveal";
import Sponsors from "./components/Sponsors/Sponsors";
import { motion } from "framer-motion";

function App() {
    const { width } = useWindowSize();

    // Animation variants for container elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Animation variants for individual card elements
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener(
                "click",
                function (this: HTMLAnchorElement, e: Event) {
                    e.preventDefault();
                    const targetId = this.getAttribute("href");
                    if (targetId) {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    }
                }
            );
        });

        addRevealClasses();
        const cleanupScrollReveal = initScrollReveal();

        return () => {
            cleanupScrollReveal();
        };
    }, []);

    return (
        <>
            {/* MLH Badge */}
            {width > mobile_size_reference && (
                <a
                    id="mlh-trust-badge"
                    style={{
                        display: "block",
                        maxWidth: "12%",
                        minWidth: "50px",
                        position: "fixed",
                        right: "0.5%",
                        top: "0",
                        width: "8%",
                        zIndex: "101",
                    }}
                    href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
                    target="_blank"
                >
                    <Image
                        src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
                        alt="Major League Hacking 2025 Hackathon Season"
                        width={150}
                        height={150}
                        style={{ width: "70%" }}
                    />
                </a>
            )}
            {width <= mobile_size_reference && (
                <a
                    id="mlh-trust-badge"
                    style={{
                        display: "block",
                        maxWidth: "16%",
                        minWidth: "70px",
                        position: "fixed",
                        right: "0.5%",
                        top: "0",
                        width: "8%",
                        zIndex: "101",
                    }}
                    href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
                    target="_blank"
                >
                    <Image
                        src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
                        alt="Major League Hacking 2025 Hackathon Season"
                        width={150}
                        height={150}
                        style={{ width: "70%" }}
                    />
                </a>
            )}

            {/* The "Body" is below */}
            <div
                style={{ backgroundColor: backgroundColor }}
                id="page-backdrop"
            >
                {/* Contains the hero SVG component */}

                {width > mobile_size_reference && <SVG_Window />}
                {width <= mobile_size_reference && (
                    <div className="">
                        <Mobile_SVG_Window />
                    </div>
                )}

                {/* This is the jumbotron */}
                {width > mobile_size_reference && (
                    <div
                        id="header-container"
                        style={{}}
                        className="z-10 relative -top-100 -mb-100 flex flex-col justify-center w-full animate-slideInFromBottom"
                    >
                        <HeroHeader />
                    </div>
                )}

                {width <= mobile_size_reference && (
                    <div
                        id="header-container"
                        className="z-10 relative -top-40 -mb-30 flex flex-col justify-center w-full animate-slideInFromBottom"
                    >
                        <HeroHeader />
                    </div>
                )}

                {/* This container will render either the NavBar or the mobile NavBar */}
                <div
                    id="nav-bar__sticky-container"
                    className="fixed w-[85%] top-0 md:left-1/2 md:-translate-x-1/2 left-4 z-103 flex justify-center items-center mt-5"
                >
                    <div className="w-full mx-auto px-4">
                        <NewNavBar />
                    </div>
                    {/* Keep the old NavBar commented out but available if needed
                    {width > mobile_size_reference && <NavBar />}
                    {width <= mobile_size_reference && (
                        <>
                            <nav>
                                <Render_MobileNav />
                            </nav>
                        </>
                    )}
                    */}
                </div>

                <div className="w-full bg-white py-8">
                    <style jsx>{`
                        .black-svg-section :global(.invert) {
                            filter: invert(
                                0
                            ); /* Prevent inversion to keep SVGs black */
                            opacity: 1 !important; /* Override opacity */
                        }
                    `}</style>
                    <div className="black-svg-section">
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
                    </div>
                </div>

                {/* This container renders everything below the hero area */}

                <div className={"w-full"}>
                    {/* <div className="animate-fadeIn">
                        <CountdownTimer />
                    </div> */}

                    {/* About section Desktop */}
                    <SectionBase
                        height={"auto"}
                        section_title="About"
                        bg_color={backgroundColor}
                        alt_text_color={PRIMARY_COLORS.GREY_432.hex}
                    >
                        {width > mobile_size_reference && (
                            <>
                                <div className="flex justify-center">
                                    <div className="rounded-xl p-3 pl-6 mb-10 pb-12 transition-all max-w-7xl duration-300">
                                        <SectionBase_HeroText text="About MESA" />

                                        <div id="about_grid">
                                            <div id="about_image_elem">
                                                <Image_Overlay
                                                    source="/MESA_student_overlay1.webp"
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
                                                    className="transition-transform hover:scale-105 duration-200"
                                                >
                                                    <div className="bg-white p-[2vw] pt-[1vw] inline-block rounded-xl shadow-xl hover:shadow-2xl">
                                                        <MESA_Color_Graphic />
                                                    </div>
                                                </a>
                                            </span>

                                            <span id="about_mesa_gr_elem_3">
                                                <div className="text-white p-6 m-2 text-xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-lg">
                                                    <AboutMesaText />
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <SectionBase_HeroText text="About the Hackathon" />

                                <div className="text-white p-6 m-2 mb-10 text-xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-lg max-w-4xl mx-auto transition-all hover:shadow-xl hover:scale-[1.01] duration-300">
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
                                        <div className="z-10 w-[50%] bg-white inline-block p-5 rounded-xl shadow-xl absolute top-10 left-6">
                                            <MESA_Color_Graphic />
                                        </div>
                                    </a>

                                    <Image_Overlay
                                        source="/MESA_student_overlay1.webp"
                                        opacity={70}
                                        float="none"
                                        display="block"
                                        width="90%"
                                        height="90vh"
                                        margin="5%"
                                    />
                                </section>
                                <div className="border-solid border-0 text-white p-6 m-4 text-xl rounded-2xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] shadow-lg">
                                    <AboutMesaText />
                                </div>
                                <h3
                                    style={{
                                        fontSize: width > 500 ? 60 : 40,
                                        fontWeight: "800",
                                        color: SECONDARY_COLORS.YELLOW_107.hex,
                                        textShadow: "10px 10px 10px black",
                                    }}
                                    className="text-center"
                                >
                                    About Our Hackathon
                                </h3>
                                <div className="border-solid border-0 text-white p-6 m-4 text-xl rounded-2xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] shadow-lg">
                                    <AboutHackathonText />
                                </div>
                            </>
                        )}
                    </SectionBase>

                    {/* Location section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Location"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Location" />
                        <div className="max-w-5xl mx-auto p-6 ">
                            <div className="bg-opacity-80 backdrop-blur-sm bg-[#564b79] flex justify-center rounded-xl shadow-xl p-6 mb-8 transform transition-all duration-300">
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="md:w-1/2 p-4">
                                        <h3 className="text-2xl font-bold text-[#FFE550] mb-2">
                                            Los Angeles City College
                                        </h3>
                                        <p className="text-xl text-white mb-4">
                                            Student Union Building
                                        </p>
                                        <div className="flex items-center mb-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#FFE550] mr-2"
                                            >
                                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                                <circle
                                                    cx="12"
                                                    cy="10"
                                                    r="3"
                                                ></circle>
                                            </svg>
                                            <p className="text-white">
                                                855 N. Vermont Avenue, Los
                                                Angeles California 90029
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <a
                                            href="https://maps.google.com/?q=855+N.+Vermont+Avenue,+Los+Angeles+California+90029"
                                            target="_blank"
                                            className="text-[#FFE550] underline flex items-center mb-4 hover:text-white transition-colors"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line
                                                    x1="10"
                                                    y1="14"
                                                    x2="21"
                                                    y2="3"
                                                ></line>
                                            </svg>
                                            Open in Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center rounded-xl overflow-hidden shadow-2xl hover-scale">
                                <LocationMap />
                            </div>
                        </div>
                    </SectionBase>

                    {/* Sponsors section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Sponsors"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Sponsors" />

                        <Sponsors />

                        <div className="flex justify-center p-10">
                            <a
                                href={`mailto:${team_email}`}
                                className="inline-block bg-[#FFE550] text-[#433966] font-bold py-3 px-6 rounded-full hover:bg-[#FFB607] transition-colors duration-300 text-center hover-scale"
                            >
                                Email Us To Become A Sponsor!
                            </a>
                        </div>
                    </SectionBase>

                    {/* Tracks section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Tracks"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Tracks" />

                        {/* Prizes information */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center mt-3 mb-8"
                        >
                            <div className="bg-gradient-to-r from-[rgb(var(--mesa-orange))] to-[rgb(var(--mesa-rhodamine))] text-white px-4 py-2 rounded-lg shadow-md">
                                <span className="font-bold">1st Place:</span>{" "}
                                $1,500
                            </div>
                            <div className="bg-gradient-to-r from-[rgb(var(--mesa-purple))] to-[rgb(var(--mesa-rhodamine))] text-white px-4 py-2 rounded-lg shadow-md">
                                <span className="font-bold">2nd Place:</span>{" "}
                                $1,000
                            </div>
                            <div className="bg-gradient-to-r from-[rgb(var(--mesa-green))] to-[rgb(var(--mesa-yellow-116))] text-white px-4 py-2 rounded-lg shadow-md">
                                <span className="font-bold">3rd Place:</span>{" "}
                                $500
                            </div>
                        </motion.div>

                        <div className="text-white p-6 m-2 mb-8 text-xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-lg max-w-4xl mx-auto">
                            <p className="text-center">
                                Choose from our main quest tracks or take on
                                sponsor challenges to win prizes! You can
                                combine sponsor challenges with main quest
                                tracks to maximize your chances of winning.
                            </p>
                        </div>

                        {/* Main Quest Tracks Section */}
                        <section className="max-w-7xl mx-auto mb-16">
                            <div className="flex items-center mb-6">
                                <div className="w-1.5 h-6 bg-[rgb(var(--mesa-purple))] rounded-full mr-3"></div>
                                <h2 className="text-2xl font-semibold text-white">
                                    Main Quest Tracks
                                </h2>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {tracks.map((track) => (
                                    <motion.div
                                        key={track.id}
                                        variants={cardVariants}
                                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div
                                                className={`w-12 h-12 bg-[rgb(var(--${track.color}))]/20 rounded-full flex items-center justify-center`}
                                            >
                                                <div
                                                    className={`text-[rgb(var(--${track.color}))]`}
                                                >
                                                    {track.icon}
                                                </div>
                                            </div>
                                            <h3 className="ml-3 text-lg font-medium text-black">
                                                {track.title}
                                            </h3>
                                        </div>
                                        <div className="text-gray-600 mb-5 flex-grow">
                                            <p className="font-medium text-black">
                                                {track.description}
                                            </p>
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Examples:
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                                    {track.examples.map(
                                                        (example, index) => (
                                                            <li key={index}>
                                                                {example}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        {/* Sponsor Challenges Section */}
                        <section className="max-w-7xl mx-auto">
                            <div className="flex items-center mb-6">
                                <div className="w-1.5 h-6 bg-[rgb(var(--mesa-yellow-116))] rounded-full mr-3"></div>
                                <h2 className="text-2xl font-semibold text-white">
                                    Sponsor Challenges
                                </h2>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {sponsorChallenges.map((challenge) => (
                                    <motion.div
                                        key={challenge.id}
                                        variants={cardVariants}
                                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div
                                                className={`w-12 h-12 bg-[rgb(var(--${challenge.color}))]/20 rounded-full flex items-center justify-center`}
                                            >
                                                {challenge.logo || (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`h-6 w-6 text-[rgb(var(--${challenge.color}))]`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <span className="text-sm text-gray-500">
                                                    {challenge.sponsor}
                                                </span>
                                                <h3 className="text-lg font-medium text-black">
                                                    {challenge.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="text-gray-600 mb-5 flex-grow">
                                            <p>{challenge.description}</p>
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Prizes:
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                                    {challenge.prizes.map(
                                                        (prize, index) => (
                                                            <li key={index}>
                                                                {prize}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        {challenge.sponsor ===
                                            "Major League Hacking" && (
                                            <motion.a
                                                href="https://hack.mlh.io/prizes"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={`cursor-pointer w-full py-2 bg-gradient-to-r from-[#FF7A00] to-[#FFA41D] text-white rounded-md font-medium mt-2 block text-center shadow-md hover:shadow-lg transition-all duration-200`}
                                            >
                                                Learn More
                                            </motion.a>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>
                    </SectionBase>

                    {/* FAQ section */}
                    <SectionBase
                        height={"auto"}
                        section_title="FAQ"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="FAQ" />
                        <div className="max-w-5xl mx-auto">
                            <FAQ_component />
                        </div>
                    </SectionBase>

                    {/* Team section */}
                    <SectionBase
                        height={"100"}
                        section_title="Team"
                        bg_color={backgroundColor}
                        alt_text_color={PRIMARY_COLORS.GREY_432.hex}
                    >
                        <SectionBase_HeroText text="Team" />
                        <div>
                            <TheTeam />
                        </div>
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
                    className="gradient-bg"
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
        <div style={{ lineHeight: "1.8" }}>
            <p>
                <a
                    target="new"
                    href={MESA}
                    className="text-[#FFE550] font-medium hover:text-white transition-colors hover:underline"
                >
                    MESA&apos;s community college level program
                </a>{" "}
                produces a population of transfer-ready students to advance
                their STEM educational journeys in 4-year university programs.
                If you are student interested in participating in MESA, please
                contact the local center director to get enrolled.
            </p>
            <p className="mt-4 font-bold text-center text-[#FFE550]">
                MESA serves about 5,700 community college students in
                California.
            </p>
        </div>
    );
};

const AboutHackathonText = () => {
    return (
        <div style={{ lineHeight: "1.8" }}>
            <p className="mt-4 font-bold text-center mb-5 text-[#FFE550] ">
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
                <a
                    target="new"
                    href={MESA}
                    className="text-[#FFE550] font-medium hover:text-white transition-colors hover:underline"
                >
                    MESA
                </a>
                , in conjunction with LACC, the LACCD Chancellor&apos;s Office,
                and our generous sponsors in the community.
            </p>
            <p className="mt-4 font-bold text-center mb-5 text-[#FFE550]">
                Teams will form, and this overnight event will culminate in
                hundreds of dollars in prizes!
            </p>
        </div>
    );
};
