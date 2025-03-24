import { HackMESA_casing, mobile_size_reference, PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS } from "@/lib/colors";

import "./NavBar.css"
import useWindowSize from "@/lib/useWindowSize";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";


const nav_element_style = { height: "3em", width: "10em", margin: "1em", fontSize: "1em", cursor: "pointer"};



interface NavBarButtonProps {
    text: string,
    prop_id: string
}


import { motion } from "framer-motion";

interface MobileMenuButtonProps {
    open_nav: Dispatch<SetStateAction<boolean>>
}

const MobileMenuButton = (props: MobileMenuButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <motion.button
            // className="px-6 py-3 text-white bg-blue-500 rounded-full shadow-lg"
            className="border-2 border-solid border-white fixed top-0 m-3 inline-flex h-15 w-15 items-center justify-center rounded-full bg-gray-50 text-black drop-shadow-lg transition-colors duration-150 hover:bg-gray-200"

            whileTap={{ scale: 0.95 }}
            animate={{ backgroundColor: isPressed ? "#336600" : `${TERTIARY_COLORS.GREEN_367.hex}` }} // Darkens when pressed
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
    );
};




const NavBarButton = (props: NavBarButtonProps) => {
    return (
        <a href={`#section-${props.text.toLowerCase()}`}>
            <button id={props.prop_id} style={nav_element_style}>{props.text}</button>
        </a>
    )
}

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
        <div className="h-1" style={{backgroundColor: SECONDARY_COLORS.YELLOW_116.hex}}></div>
    )
}

const NavBar = () => {
    const { width } = useWindowSize();

    const [mobileNav_open, set_mobile_nav_open] = useState(false);


    if (width > mobile_size_reference) {


        //close the mobile nav if the screen size is changing
        //avoiding potentially unappealing side effects
        if (mobileNav_open) {
            set_mobile_nav_open(false);
        }


        //large screen
        return (
            <>
                <nav id="navbar" style={{ color: `${PRIMARY_COLORS.GREY_432.hex}` }} >
                    <h4 className="flex justify-center items-center font-black text-[1.5em]">{HackMESA_casing}</h4>
                    <NavBarButton prop_id="nav__button1" text="About" />
                    <NavBarButton prop_id="nav__button2" text="Schedule" />
                    <NavBarButton prop_id="nav__button3" text="Location" />
                    <NavBarButton prop_id="nav__button4" text="Sponsors" />
                    <NavBarButton prop_id="nav__button5" text="FAQ" />
                    {/* <Link to="/register"> */}
                    <button className="border-solid border-black border-2 m-4 w-3/4 rounded-lg bg-red-500" >Register Now</button>
                    {/* </Link> */}
                </nav>
            </>
        );
    } else {
        //small screen
        return (
            <>
                {!mobileNav_open && <MobileMenuButton open_nav={set_mobile_nav_open} />}
                {mobileNav_open &&
                    <div className="fixed top-0 z-1000 bg-red-500 w-full">
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