"use client";

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
import "./animations.css";
import { lacc, MESA } from "@/lib/link_base";
import { useEffect } from "react";
import { initScrollReveal, addRevealClasses } from "./scrollReveal";

function App() {
    const { width, height } = useWindowSize();

    // Add smooth scrolling to all internal links
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

        // Initialize scroll reveal animations
        addRevealClasses();
        const cleanupScrollReveal = initScrollReveal();

        // Cleanup function
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
                        className="z-100 flex justify-center absolute top-40 w-full animate-fadeIn"
                    >
                        <Logo size={300} opacity="100%" />
                    </div>
                )}
                {width <= mobile_size_reference && (
                    <div
                        id="hero-logo_container"
                        className="z-100 flex justify-center absolute top-40 w-full animate-fadeIn"
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
                        className="z-10 top-120 flex flex-col justify-center w-full animate-slideInFromBottom"
                    >
                        <HeroHeader />
                    </div>
                )}

                {width <= mobile_size_reference && (
                    <div
                        id="header-container"
                        className="z-10 top-130 flex flex-col justify-center w-full animate-slideInFromBottom"
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
                    <div className="animate-fadeIn">
                        <CountdownTimer />
                    </div>

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
                                            className="transition-transform hover:scale-105 duration-200"
                                        >
                                            <div className="bg-white inline-block p-5 rounded-xl shadow-xl hover:shadow-2xl">
                                                <MESA_Color_Graphic
                                                    width={28}
                                                />
                                            </div>
                                        </a>
                                    </span>

                                    <span id="about_mesa_gr_elem_4">
                                        <a
                                            href={lacc}
                                            target="new"
                                            className="transition-transform hover:scale-105 duration-200"
                                        >
                                            <div className="bg-white inline-block p-5 rounded-xl shadow-xl hover:shadow-2xl float-right">
                                                <LACC_Color_Graphic
                                                    width={22}
                                                />
                                            </div>
                                        </a>
                                    </span>

                                    <span id="about_mesa_gr_elem_3">
                                        <div className="text-white p-6 m-2 text-xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-lg">
                                            <AboutMesaText />
                                        </div>
                                    </span>
                                </div>

                                <SectionBase_HeroText text="About the Hackathon" />

                                <div className="text-white p-6 m-2 text-xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-lg max-w-4xl mx-auto transition-all hover:shadow-xl hover:scale-[1.01] duration-300 hover-glow">
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
                                    <a
                                        href={MESA}
                                        target="new"
                                        className="transition-transform hover:scale-105 duration-200"
                                    >
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
                                        <a
                                            href={lacc}
                                            target="new"
                                            className="transition-transform hover:scale-105 duration-200"
                                        >
                                            <div className="bg-white inline-block p-5 rounded-xl shadow-xl absolute bottom-10 right-10">
                                                <LACC_Color_Graphic
                                                    width={22}
                                                />
                                            </div>
                                        </a>
                                    </section>
                                </section>
                                <div className="border-solid border-0 text-white p-6 m-4 text-xl rounded-2xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] shadow-lg hover-glow">
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
                                <div className="border-solid border-0 text-white p-6 m-4 text-xl rounded-2xl bg-opacity-80 backdrop-blur-sm bg-[#564b79] shadow-lg hover-glow">
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
                        <div className="mb-30 mt-12 p-10 max-w-4xl mx-auto">
                            <div className="bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-xl p-8 text-center hover-glow">
                                <div className="animate-pulse-custom mb-6">
                                    <div className="w-24 h-24 rounded-full bg-[#FFE550] mx-auto flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-[#433966]"
                                        >
                                            <rect
                                                width="18"
                                                height="18"
                                                x="3"
                                                y="4"
                                                rx="2"
                                                ry="2"
                                            ></rect>
                                            <line
                                                x1="16"
                                                x2="16"
                                                y1="2"
                                                y2="6"
                                            ></line>
                                            <line
                                                x1="8"
                                                x2="8"
                                                y1="2"
                                                y2="6"
                                            ></line>
                                            <line
                                                x1="3"
                                                x2="21"
                                                y1="10"
                                                y2="10"
                                            ></line>
                                            <path d="M8 14h.01"></path>
                                            <path d="M12 14h.01"></path>
                                            <path d="M16 14h.01"></path>
                                            <path d="M8 18h.01"></path>
                                            <path d="M12 18h.01"></path>
                                            <path d="M16 18h.01"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Schedule Coming Soon
                                </h2>
                                <p className="text-xl text-white opacity-80">
                                    We&apos;re finalizing an exciting lineup of
                                    workshops, activities, and events. Check
                                    back soon!
                                </p>
                            </div>
                        </div>
                    </SectionBase>

                    {/* Location section */}
                    <SectionBase
                        height={"auto"}
                        section_title="Location"
                        bg_color={backgroundColor}
                    >
                        <SectionBase_HeroText text="Location" />
                        <div className="max-w-5xl mx-auto p-6">
                            <div className="bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-xl p-6 mb-8 transform transition-all hover:scale-[1.01] duration-300">
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="md:w-1/2 p-4">
                                        <h3 className="text-2xl font-bold text-[#FFE550] mb-2">
                                            Los Angeles City College
                                        </h3>
                                        <p className="text-xl text-white mb-4">
                                            Student Services Building
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
                            <div className="rounded-xl overflow-hidden shadow-2xl hover-scale">
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
                        <div className="mb-30 mt-12 p-10 max-w-4xl mx-auto">
                            <div className="bg-opacity-80 backdrop-blur-sm bg-[#564b79] rounded-xl shadow-xl p-8 text-center hover-glow">
                                <div className="mb-6">
                                    <div className="w-24 h-24 rounded-full bg-[#FFE550] mx-auto flex items-center justify-center animate-pulse-custom">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-[#433966]"
                                        >
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                            <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                            <line
                                                x1="12"
                                                x2="12"
                                                y1="22"
                                                y2="12"
                                            ></line>
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Become a Sponsor
                                </h2>
                                <p className="text-xl text-white opacity-80 mb-6">
                                    Sponsor our hackathon and connect with
                                    talented STEM students. Help shape the
                                    future of technology.
                                </p>
                                <a
                                    href="#"
                                    className="inline-block bg-[#FFE550] text-[#433966] font-bold py-3 px-6 rounded-full hover:bg-[#FFB607] transition-colors duration-300 hover-scale"
                                >
                                    Get Sponsorship Info
                                </a>
                            </div>
                        </div>
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
                        <div className="hover-scale">
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
                    className="text-[#FFE550] hover:text-white transition-colors"
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
            <p className="mt-4 font-bold text-center mb-5 text-[#FFE550]">
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
                    className="text-[#FFE550] hover:text-white transition-colors"
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
