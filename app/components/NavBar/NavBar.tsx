import { HackMESA_casing, PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors";

import "./NavBar.css"
// import useWindowSize from "@/lib/useWindowSize";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

//Components and Interfaces prefixed with Mobile- are mobile only;
//Components and Interfaces without prefix Mobile- are web only

interface MobileNavClosed_Props {
    open_nav: Dispatch<SetStateAction<boolean>>
}

const MobileNavClosed = (props: MobileNavClosed_Props) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);

    return (
        <>
            <div className="sticky top-0 z-100">
                <motion.button
                    key="mob-nav__menu"
                    initial={false}

                    className="m-4 border-2 border-solid border-white h-15 w-15 rounded-full bg-gray-50 text-black drop-shadow-lg transition-colors duration-150 hover:bg-gray-200"

                    whileTap={{ scale: 0.95 }}
                    animate={{ backgroundColor: isPressed ? "#af4029" : `${SECONDARY_COLORS.ORANGE_151.hex}` }} // Darkens when pressed
                    // "#336600" : `${TERTIARY_COLORS.GREEN_367.hex}` ternary If you want to do green
                    transition={{ duration: 0.05 }}
                    onClick={() => props.open_nav(true)}
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                >
                    <div className="flex justify-center content-center ">
                        {/*This hamburger icon is generously provided by Font Awesome*/}
                        <Image className="invert" src="./menu_hamburger.svg" alt="menu button" width={30} height={30} />
                    </div>
                </motion.button>
                <motion.button
                    key="mob-nav__register"
                    initial={false}
                    className="float-right m-4 mt-5 border-2 border-solid text-white h-12 w-30 rounded-md bg-gray-50 text-black drop-shadow-lg transition-colors duration-150 hover:bg-gray-200"
                    style={{ border: "2px solid white" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ backgroundColor: isPressed2 ? "#af4029" : `${SECONDARY_COLORS.ORANGE_151.hex}` }} // Darkens when pressed
                    transition={{ duration: 0.05 }}
                    onTouchStart={() => setIsPressed2(true)}
                    onTouchEnd={() => setIsPressed2(false)}
                    onMouseDown={() => setIsPressed2(true)}
                    onMouseUp={() => setIsPressed2(false)}
                >
                    <p className="font-bold flex justify-center content-center">
                        Register Now
                    </p>
                </motion.button>

            </div></>
    );
}

interface MobileNavOpen_Props {
    set_mobile_nav_open: Dispatch<SetStateAction<boolean>>
}

const MobileNavOpen = (props: MobileNavOpen_Props) => {
    return (
        <>
            <div className="h-23">
                {/* This is here just so that there is no jumpiness when the mobile nav is opened */}
            </div>
            <div style={{ backgroundColor: PRIMARY_COLORS.WARM_RED.hex }} className="fixed top-0 z-1000 w-full">
                <div className="flex ml-10 h-18 items-center justify-end">
                    <button className="border-solid border-black border-1 mr-6 h-13 w-13" onClick={() => props.set_mobile_nav_open(false)} >X</button>
                </div>
                <MobileNavOpen_Button close_nav={props.set_mobile_nav_open} text="About" />
                <MobileNavDivider />
                <MobileNavOpen_Button close_nav={props.set_mobile_nav_open} text="Schedule" />
                <MobileNavDivider />
                <MobileNavOpen_Button close_nav={props.set_mobile_nav_open} text="Location" />
                <MobileNavDivider />
                <MobileNavOpen_Button close_nav={props.set_mobile_nav_open} text="Sponsors" />
                <MobileNavDivider />
                <MobileNavOpen_Button close_nav={props.set_mobile_nav_open} text="FAQ" />
            </div></>
    )
}

interface MobileNavOpen_Button_Props {
    text: string,
    close_nav: Dispatch<SetStateAction<boolean>>
}

const MobileNavOpen_Button = (props: MobileNavOpen_Button_Props) => {

    return (
        <a href={`#section-${props.text.toLowerCase()}`}>
            <button onClick={() => props.close_nav(false)} className="h-18 block text-xl w-full">
                <p className="text-left ml-10 font-bold">
                    {props.text}
                </p>
            </button>
        </a>
    )
}

const MobileNavDivider = () => {
    return (
        <div className="h-1" style={{ backgroundColor: SECONDARY_COLORS.YELLOW_116.hex }}></div>
    )
}

export const Render_MobileNav = () => {
    const [mobileNav_open, set_mobile_nav_open] = useState(false);
    return (
        <div className="sticky top-0 z-100">
            {!mobileNav_open && <>
                <MobileNavClosed open_nav={set_mobile_nav_open} />
            </>}
            {mobileNav_open &&
                <>
                    <MobileNavOpen set_mobile_nav_open={set_mobile_nav_open} />
                </>}
        </div>
    )
}






// **  End MOBILE; start Desktop  **

interface NavBarButtonProps {
    text: string,
}

const NavBarButton = (props: NavBarButtonProps) => {
    return (
        <a href={`#section-${props.text.toLowerCase()}`}>
            <button className="h-[98%] w-[98%] cursor-pointer navBarButton">{props.text}</button>
        </a>
    )
}


const NavBar = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false)

        return (
            <div id="nav__container" className="sticky z-100 h-full shadow-lg rounded-lg m-[1%]" style={{ backgroundColor: TERTIARY_COLORS.PURPLE_2655.hex }} >
                <div id="nav__logo-container" className="flex content-center items-center">
                    <h4 id="nav__logo" className="text-center color-black md:text-3xl 2xl:text-4xl  sm:text-2xs w-full">{HackMESA_casing}</h4>
                    {/* USED FOR TESTING FONT SIZE ON RESPONSIVE 2xl:text-white text-black sm:text-blue-500 */}
                </div>
                <nav id="nav__routes" className="inline" >
                    <NavBarButton text="About" />
                    <NavBarButton text="Schedule" />
                    <NavBarButton text="Location" />
                    <NavBarButton text="Sponsors" />
                    <NavBarButton text="FAQ" />
                </nav>

                <motion.button
                    key="web-nav__register"
                    initial={false}

                    className="float-right m-4 mt-3 border-2 border-solid text-black h-12 w-30 rounded-md bg-gray-50 drop-shadow-lg transition-colors duration-150"
                    style={{ border: "2px solid #af4029" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ backgroundColor: !isHovering && !isPressed ? SECONDARY_COLORS.ORANGE_151.hex : isHovering && !isPressed ? "#af4029" : "#822d18" }} // Darkens when pressed
                    transition={{ duration: 0.05 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                >
                    <p className="font-bold flex justify-center content-center">
                        Register Now
                    </p>
                </motion.button>
            </div>
        );
}





export default NavBar;