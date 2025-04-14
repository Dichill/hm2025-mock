import {
    darkenColor,
    HackMESA_casing,
    PRIMARY_COLORS,
    SECONDARY_COLORS,
    TERTIARY_COLORS,
} from "@/lib/colors";

import "./NavBar.css";
// import useWindowSize from "@/lib/useWindowSize";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

//Components and Interfaces prefixed with Mobile- are mobile only;
//Components and Interfaces without prefix Mobile- are web only

interface MobileNavClosed_Props {
    open_nav: Dispatch<SetStateAction<boolean>>;
}

const MobileNavClosed = (props: MobileNavClosed_Props) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="sticky top-0 z-100">
                {/*Hamburger Menu Button*/}
                <motion.button
                    key="mob-nav__menu"
                    initial={false}
                    className="m-4 border-2 border-solid border-white h-15 w-15 rounded-full bg-gray-50 text-black drop-shadow-lg transition-colors duration-150 hover:bg-gray-200"
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        backgroundColor: isPressed ? darkenColor(TERTIARY_COLORS.PURPLE_2655.hex, 50) : `${TERTIARY_COLORS.PURPLE_2655.hex}`,
                    }} // Darkens when pressed
                    transition={{ duration: 0.05 }}
                    onClick={() => props.open_nav(true)}
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                >
                    <div className="flex justify-center content-center ">
                        {/*This hamburger icon is generously provided by Font Awesome*/}
                        <Image
                            className="invert"
                            src="/menu_hamburger.svg"
                            alt="menu button"
                            width={30}
                            height={30}
                        />
                    </div>
                </motion.button>

                {/*Register Now Button */}
                <motion.button
                    key="mob-nav__register"
                    initial={false}
                    className="float-right m-4 mt-5 border-2 border-solid text-white h-12 w-30 rounded-md bg-gray-50  drop-shadow-lg transition-colors duration-150 hover:bg-gray-200"
                    style={{ border: "2px solid white" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        backgroundColor: isPressed2
                            ? darkenColor(PRIMARY_COLORS.WARM_RED.hex, 50)
                            : PRIMARY_COLORS.WARM_RED.hex,
                    }} // Darkens when pressed
                    transition={{ duration: 0.05 }}
                    onTouchStart={() => setIsPressed2(true)}
                    onTouchEnd={() => setIsPressed2(false)}
                    onMouseDown={() => setIsPressed2(true)}
                    onMouseUp={() => setIsPressed2(false)}
                    onClick={() => router.push("/register")}
                >
                    <p className="font-bold flex justify-center content-center">
                        Register Now
                    </p>
                </motion.button>
            </div>
        </>
    );
};

interface MobileNavOpen_Props {
    close_nav: Dispatch<SetStateAction<boolean>>;
}

//Mobile Navigation when
const MobileNavOpen = (props: MobileNavOpen_Props) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <>
            <div className="h-23">
                {/* This is here just so that there is no sudden empty space behind the menu when the mobile nav is opened */}
            </div>
            <div
                style={{ backgroundColor: SECONDARY_COLORS.RHODAMINE_RED.hex }}
                className="fixed top-0 z-1000 w-full"
            >
                <motion.button
                    key="mob-nav__menu"
                    initial={false}
                    style={{
                        borderColor: isPressed
                            ? "white"
                            : darkenColor("purple", 50),
                        color: isPressed
                            ? "white"
                            : darkenColor(SECONDARY_COLORS.RHODAMINE_RED.hex, 50),
                    }}
                    className="m-4 h-13 w-13 border-solid font-black border-4 text-2xl float-right transition-colors duration-150"
                    animate={{
                        backgroundColor: isPressed
                            ? darkenColor(SECONDARY_COLORS.RHODAMINE_RED.hex, 50)
                            : SECONDARY_COLORS.RHODAMINE_RED.hex,
                    }} // Darkens when pressed
                    // "#336600" : `${TERTIARY_COLORS.GREEN_367.hex}` ternary If you want to do green
                    transition={{ duration: 0.05 }}
                    onClick={() => props.close_nav(false)}
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                >
                    <div className="text-white">X</div>
                </motion.button>

                <MobileNavOpen_Button
                    close_nav={props.close_nav}
                    text="About"
                />
                <MobileNavDivider />
                <MobileNavOpen_Button
                    close_nav={props.close_nav}
                    text="Schedule"
                />
                <MobileNavDivider />
                <MobileNavOpen_Button
                    close_nav={props.close_nav}
                    text="Location"
                />
                <MobileNavDivider />
                <MobileNavOpen_Button
                    close_nav={props.close_nav}
                    text="Sponsors"
                />
                <MobileNavDivider />
                <MobileNavOpen_Button close_nav={props.close_nav} text="FAQ" />
            </div>
        </>
    );
};

interface MobileNavOpen_Button_Props {
    text: string;
    close_nav: Dispatch<SetStateAction<boolean>>;
}

const MobileNavOpen_Button = (props: MobileNavOpen_Button_Props) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <a href={`#section-${props.text.toLowerCase()}`}>
            <motion.button
                key={`mob-nav_item__${props.text}`}
                initial={false}
                className="w-full p-6 transition-colors text-2xl font-medium duration-150 active:text-white"
                animate={{
                    backgroundColor: isPressed
                        ? darkenColor(SECONDARY_COLORS.RHODAMINE_RED.hex, 50)
                        : SECONDARY_COLORS.RHODAMINE_RED.hex,
                }} // Darkens when pressed
                // "#336600" : `${TERTIARY_COLORS.GREEN_367.hex}` ternary If you want to do green
                transition={{ duration: 0.05 }}
                onClick={() => props.close_nav(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
            >
                <div>
                    {/*This hamburger icon is generously provided by Font Awesome*/}
                    {props.text}
                </div>
            </motion.button>
        </a>
    );
};

//Hamburger Nav Divider
const MobileNavDivider = () => {
    return <div className="h-1" style={{ backgroundColor: "white" }}></div>;
};

export const Render_MobileNav = () => {
    const [mobileNav_open, set_mobile_nav_open] = useState(false);
    return (
        <div className="sticky top-0 z-1000">
            {!mobileNav_open && (
                <>
                    <MobileNavClosed open_nav={set_mobile_nav_open} />
                </>
            )}
            {mobileNav_open && (
                <>
                    <MobileNavOpen close_nav={set_mobile_nav_open} />
                </>
            )}
        </div>
    );
};

// **  End MOBILE; start Desktop  **

const DT_base_fontSize = "2vw";

interface NavBarButtonProps {
    text: string;
}

const NavBarButton = (props: NavBarButtonProps) => {
    return (
        <a className="" href={`#section-${props.text.toLowerCase()}`}>
            <button
                style={{ fontSize: DT_base_fontSize }}
                className="h-[98%] w-[98%] font-bold cursor-pointer navBarButton"
            >
                {props.text}
            </button>
        </a>
    );
};

//TODO: NavBar is not responsive in a way that looks healthy; fix
const NavBar = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();

    //large screen
    return (
        <div
            style={{ backgroundColor: TERTIARY_COLORS.PURPLE_2655.hex }}
            className=" sticky shadow-lg rounded-lg top-2 z-100 w-full m-2"
        >
            <div id="nav__container" className="h-full">
                <div className="flex content-center items-center">
                    <h4
                        id="nav__logo"
                        style={{ fontSize: DT_base_fontSize }}
                        className="color-black text-justify w-full"
                    >
                        {HackMESA_casing}
                    </h4>
                </div>
                <nav id="nav__routes" className="inline">
                    <NavBarButton text="About" />
                    <NavBarButton text="Schedule" />
                    <NavBarButton text="Location" />
                    <NavBarButton text="Sponsors" />
                    <NavBarButton text="FAQ" />
                </nav>

                <div
                    id="nav__register"
                    className="flex justify-center items-center"
                >
                    <motion.button
                        key="web-nav__register"
                        initial={false}
                        className={`float-right m-4 mt-3 border-solid border-[0.5vh] text-white w-[90%] rounded-md bg-gray-50 drop-shadow-lg transition-colors duration-150`}
                        style={{
                            cursor: "pointer",
                            border: isHovering
                                ? "0.5vh solid white"
                                : `0.5vh solid ${darkenColor("white", 40)}`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            backgroundColor:
                                !isHovering && !isPressed
                                    ? PRIMARY_COLORS.WARM_RED.hex
                                    : isHovering && !isPressed
                                        ? darkenColor(
                                            PRIMARY_COLORS.WARM_RED.hex,
                                            20
                                        )
                                        : darkenColor(
                                            PRIMARY_COLORS.WARM_RED.hex,
                                            50
                                        ),
                        }} // Darkens when pressed
                        transition={{ duration: 0.05 }}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                        onTouchStart={() => setIsPressed(true)}
                        onTouchEnd={() => setIsPressed(false)}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                        onClick={() => router.push("/register")}
                    >
                        <p
                            style={{
                                fontSize: DT_base_fontSize,
                                padding: "1vh",
                            }}
                            className="font-bold flex justify-center content-center"
                        >
                            Register
                        </p>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
