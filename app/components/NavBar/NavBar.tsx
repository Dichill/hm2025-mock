import { HackMESA_casing, mobile_size_reference, PRIMARY_COLORS, SECONDARY_COLORS } from "@/lib/colors";

import "./NavBar.css"
import useWindowSize from "@/lib/useWindowSize";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

//Components and Interfaces prefixed with Mobile- are mobile only;
//Components and Interfaces without prefix Mobile- are web only

interface MobileMenuButtonProps {
    open_nav: Dispatch<SetStateAction<boolean>>,

}

const MobileMenuButton = (props: MobileMenuButtonProps) => {
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
                    style={{ border: "2px solid #af4029" }}
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
};

interface MobileNavButtonProps {
    text: string,
    close_nav: Dispatch<SetStateAction<boolean>>
}

const MobileNavButton = (props: MobileNavButtonProps) => {

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
    const { width } = useWindowSize();
    const [mobileNav_open, set_mobile_nav_open] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false)

    if (width > mobile_size_reference) {

        //close the mobile nav if the screen size is changing
        //avoiding potentially unappealing side effects
        if (mobileNav_open) {
            set_mobile_nav_open(false);
        }




        //large screen
        return (
            <>
                <div id="nav__container" className="sticky top-2 z-100 bg-white shadow-lg rounded-lg m-2">
                    <div className="flex content-center items-center">
                        <h4 style={{ color: PRIMARY_COLORS.GREY_432.hex }} id="nav__logo" className="text-center">{HackMESA_casing}</h4>
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

                        className="float-right m-4 mt-3 border-2 border-solid text-white h-12 w-30 rounded-md bg-gray-50 text-black drop-shadow-lg transition-colors duration-150"
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
            </>
        );
    } else {
        //small screen
        return (
            <>
                {!mobileNav_open && <>


                    <MobileMenuButton open_nav={set_mobile_nav_open} />




                </>}
                {mobileNav_open &&
                    <div style={{ backgroundColor: PRIMARY_COLORS.WARM_RED.hex }} className="fixed top-0 z-1000 w-full">
                        <div className="flex ml-10 h-18 block items-center justify-end">
                            <button className="border-solid border-black border-1 mr-6 h-13 w-13" onClick={() => set_mobile_nav_open(false)} >X</button>
                        </div>
                        <MobileNavButton close_nav={set_mobile_nav_open} text="About" />
                        <MobileNavDivider />
                        <MobileNavButton close_nav={set_mobile_nav_open} text="Schedule" />
                        <MobileNavDivider />
                        <MobileNavButton close_nav={set_mobile_nav_open} text="Location" />
                        <MobileNavDivider />
                        <MobileNavButton close_nav={set_mobile_nav_open} text="Sponsors" />
                        <MobileNavDivider />
                        <MobileNavButton close_nav={set_mobile_nav_open} text="FAQ" />



                    </div>}
            </>
        )
    }
}

// const nav_element_style = { height: "3em", width: "10em", margin: "1em", fontSize: "1em" };


export default NavBar;