import {
    darkenColor,
    HackMESA_casing,
    SECONDARY_COLORS,
    TERTIARY_COLORS,
} from "@/lib/colors";

import "./NavBar.css";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useWindowSize from "@/lib/useWindowSize";

//Components and Interfaces prefixed with Mobile- are mobile only;
//Components and Interfaces without prefix Mobile- are web only

interface MobileNavClosed_Props {
    open_nav: Dispatch<SetStateAction<boolean>>;
}

const MobileNavClosed = (props: MobileNavClosed_Props) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isRegisterPressed, setIsRegisterPressed] = useState(false);

    return (
        <div className="fixed top-4 left-4 right-[200px] z-[150] flex justify-between items-center p-3 bg-white/90 backdrop-blur-sm shadow-md rounded-xl">
            <div className="flex items-center">
                <motion.button
                    key="mob-nav__menu"
                    initial={false}
                    className="flex items-center justify-center w-10 h-10 rounded-md bg-purple-100 shadow-sm"
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        backgroundColor: isPressed
                            ? darkenColor(TERTIARY_COLORS.PURPLE_2655.hex, 20)
                            : TERTIARY_COLORS.PURPLE_2655.hex,
                    }}
                    transition={{ duration: 0.1 }}
                    onClick={() => props.open_nav(true)}
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                >
                    <Image
                        src="/menu_hamburger.svg"
                        alt="Menu"
                        width={24}
                        height={24}
                        className="invert"
                    />
                </motion.button>
                <h1 className="ml-3 font-bold text-xl">{HackMESA_casing}</h1>
            </div>

            <motion.button
                key="mob-nav__register"
                initial={false}
                className="px-5 py-2 rounded-md font-medium text-white shadow-sm"
                whileTap={{ scale: 0.95 }}
                animate={{
                    backgroundColor: isRegisterPressed
                        ? darkenColor(SECONDARY_COLORS.ORANGE_151.hex, 20)
                        : SECONDARY_COLORS.ORANGE_151.hex,
                }}
                transition={{ duration: 0.1 }}
                onClick={() => (window.location.href = "/register")}
                onTouchStart={() => setIsRegisterPressed(true)}
                onTouchEnd={() => setIsRegisterPressed(false)}
                onMouseDown={() => setIsRegisterPressed(true)}
                onMouseUp={() => setIsRegisterPressed(false)}
            >
                Register Now
            </motion.button>
        </div>
    );
};

interface MobileNavOpen_Props {
    close_nav: Dispatch<SetStateAction<boolean>>;
}

const MobileNavOpen = (props: MobileNavOpen_Props) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <>
            <div className="h-[60px]">
                {/* Spacer to prevent content jump */}
            </div>
            <div className="fixed top-0 left-0 z-[150] w-full h-screen bg-gradient-to-b from-purple-600 to-purple-800">
                <div className="flex justify-between items-center p-4">
                    <h1 className="font-bold text-xl text-white">
                        {HackMESA_casing}
                    </h1>
                    <motion.button
                        key="mob-nav__close"
                        initial={false}
                        className="flex items-center justify-center w-10 h-10 rounded-md bg-white/20 text-white"
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            backgroundColor: isPressed
                                ? "rgba(255, 255, 255, 0.3)"
                                : "rgba(255, 255, 255, 0.2)",
                        }}
                        transition={{ duration: 0.1 }}
                        onClick={() => props.close_nav(false)}
                        onTouchStart={() => setIsPressed(true)}
                        onTouchEnd={() => setIsPressed(false)}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                    >
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
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </motion.button>
                </div>

                <nav className="mt-8">
                    <MobileNavItem close_nav={props.close_nav} text="About" />
                    <MobileNavItem
                        close_nav={props.close_nav}
                        text="Schedule"
                    />
                    <MobileNavItem
                        close_nav={props.close_nav}
                        text="Location"
                    />
                    <MobileNavItem
                        close_nav={props.close_nav}
                        text="Sponsors"
                    />
                    <MobileNavItem close_nav={props.close_nav} text="FAQ" />
                </nav>
            </div>
        </>
    );
};

interface MobileNavItemProps {
    text: string;
    close_nav: Dispatch<SetStateAction<boolean>>;
}

const MobileNavItem = (props: MobileNavItemProps) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <a
            href={`#section-${props.text.toLowerCase()}`}
            className="block"
            onClick={() => props.close_nav(false)}
        >
            <motion.div
                key={`mob-nav_item__${props.text}`}
                initial={false}
                className="py-4 px-8 text-white text-lg font-medium border-b border-white/10"
                animate={{
                    backgroundColor: isPressed
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                }}
                transition={{ duration: 0.1 }}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
            >
                {props.text}
            </motion.div>
        </a>
    );
};

export const Render_MobileNav = () => {
    const [mobileNav_open, set_mobile_nav_open] = useState(false);

    // Prevent body scroll when mobile nav is open
    useEffect(() => {
        if (mobileNav_open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileNav_open]);

    return (
        <div className="z-[150]">
            {!mobileNav_open && (
                <MobileNavClosed open_nav={set_mobile_nav_open} />
            )}
            {mobileNav_open && (
                <MobileNavOpen close_nav={set_mobile_nav_open} />
            )}
        </div>
    );
};

// **  End MOBILE; start Desktop  **

// Desktop Navigation Components
interface NavBarButtonProps {
    text: string;
    isActive?: boolean;
}

const NavBarButton = (props: NavBarButtonProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <a href={`#section-${props.text.toLowerCase()}`} className="px-2">
            <motion.div
                className={`py-2 px-4 text-base font-medium rounded-md transition-all duration-150 ${
                    props.isActive
                        ? "text-white bg-purple-600"
                        : "text-gray-700 hover:text-purple-800"
                }`}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                animate={{
                    backgroundColor: props.isActive
                        ? TERTIARY_COLORS.PURPLE_2655.hex
                        : isHovering
                        ? "rgba(162, 137, 215, 0.1)"
                        : "transparent",
                }}
            >
                {props.text}
            </motion.div>
        </a>
    );
};

const DesktopNavBar = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Track active section based on scroll position
    useEffect(() => {
        const sections = ["about", "schedule", "location", "sponsors", "faq"];

        const handleScroll = () => {
            const currentPos = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(`section-${section}`);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        currentPos >= offsetTop &&
                        currentPos < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-4 left-4 right-[200px] z-[150] bg-white/90 backdrop-blur-sm shadow-md rounded-xl mx-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">
                            {HackMESA_casing}
                        </h1>
                    </div>

                    <nav className="hidden md:flex space-x-1">
                        <NavBarButton
                            text="About"
                            isActive={activeSection === "about"}
                        />
                        <NavBarButton
                            text="Schedule"
                            isActive={activeSection === "schedule"}
                        />
                        <NavBarButton
                            text="Location"
                            isActive={activeSection === "location"}
                        />
                        <NavBarButton
                            text="Sponsors"
                            isActive={activeSection === "sponsors"}
                        />
                        <NavBarButton
                            text="FAQ"
                            isActive={activeSection === "faq"}
                        />
                    </nav>

                    <motion.button
                        key="desktop-nav__register"
                        initial={false}
                        className="px-5 py-2 rounded-md font-medium text-white shadow-sm"
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            backgroundColor: isPressed
                                ? darkenColor(
                                      SECONDARY_COLORS.ORANGE_151.hex,
                                      30
                                  )
                                : isHovering
                                ? darkenColor(
                                      SECONDARY_COLORS.ORANGE_151.hex,
                                      10
                                  )
                                : SECONDARY_COLORS.ORANGE_151.hex,
                        }}
                        transition={{ duration: 0.1 }}
                        onClick={() => (window.location.href = "/register")}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                        onTouchStart={() => setIsPressed(true)}
                        onTouchEnd={() => setIsPressed(false)}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                    >
                        Register
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

const NavBar = () => {
    const { width } = useWindowSize();
    const isMobile = width < 768; // Standard md breakpoint

    return isMobile ? <Render_MobileNav /> : <DesktopNavBar />;
};

export default NavBar;
