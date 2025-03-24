import { HackMESA_casing } from "@/lib/colors";

const MESA_grey = "white"

import "./NavBar.css"

const nav_element_style = { height: "3em", width: "10em", margin: "1em", fontSize: "1em" };

interface NavBarButtonProps {
    text: string,
    prop_id: string
}


const NavBarButton = (props: NavBarButtonProps) => {
    return (
        <a href={`#section-${props.text.toLowerCase()}`}>
            <button id={props.prop_id} style={nav_element_style}>{props.text}</button>
        </a>
    )
}

const NavBar = () => {
    return (
        <>
            <nav id="navbar" style={{ color: `#${MESA_grey}` }} >
                <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "900", fontSize: "1.5em" }}>{HackMESA_casing}</h4>
                <NavBarButton prop_id="nav__button1" text="About" />
                <NavBarButton prop_id="nav__button2" text="Schedule" />
                <NavBarButton prop_id="nav__button3" text="Location" />
                <NavBarButton prop_id="nav__button4" text="Sponsors" />
                {/* <Link to="/register"> */}
                    <button style={{ ...nav_element_style, border: "1px solid black", borderRadius: "8px" }}>Register Now</button>
                {/* </Link> */}
            </nav>
        </>
    );
}

export default NavBar;