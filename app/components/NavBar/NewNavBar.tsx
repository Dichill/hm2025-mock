import {
    PRIMARY_COLORS,
    SECONDARY_COLORS,
    TERTIARY_COLORS,
} from "@/lib/colors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NewNavBar = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const sections = ["about", "location", "sponsors", "faq", "team"];

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

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", checkIfMobile);
        checkIfMobile();

        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Smooth scroll function
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(`section-${sectionId}`);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="sticky top-4 z-50 px-4 md:px-8">
            {isMobile ? (
                <MobileNavbar
                    isOpen={mobileMenuOpen}
                    setIsOpen={setMobileMenuOpen}
                    activeSection={activeSection}
                    router={router}
                    scrollToSection={scrollToSection}
                />
            ) : (
                <DesktopNavbar
                    activeSection={activeSection}
                    router={router}
                    scrollToSection={scrollToSection}
                />
            )}
        </div>
    );
};

const DesktopNavbar = ({
    activeSection,
    router,
    scrollToSection,
}: {
    activeSection: string;
    router: ReturnType<typeof useRouter>;
    scrollToSection: (sectionId: string) => void;
}) => {
    return (
        <motion.div
            className="flex items-center justify-between rounded-full py-2 px-6 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="flex items-center justify-center">
                <Link href="/" className="flex items-center">
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="font-bold text-xl mb-1.5">HACK</span>
                        <Image
                            src="/MESA_logo.svg"
                            alt="HackMESA Logo"
                            width={80}
                            height={80}
                            className="mx-auto"
                        />
                    </motion.div>
                </Link>
            </div>
            <div className="flex justify-center items-center space-x-1">
                <NavLink
                    text="About"
                    isActive={activeSection === "about"}
                    scrollToSection={scrollToSection}
                />
                <NavLink
                    text="Location"
                    isActive={activeSection === "location"}
                    scrollToSection={scrollToSection}
                />
                <NavLink
                    text="Sponsors"
                    isActive={activeSection === "sponsors"}
                    scrollToSection={scrollToSection}
                />
                <NavLink
                    text="FAQ"
                    isActive={activeSection === "faq"}
                    scrollToSection={scrollToSection}
                />
                <NavLink
                    text="Team"
                    isActive={activeSection === "team"}
                    scrollToSection={scrollToSection}
                />
            </div>

            <motion.button
                className="relative overflow-hidden rounded-full px-6 py-2 font-bold text-white shadow-md"
                style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLORS.WARM_RED.hex}, ${SECONDARY_COLORS.RHODAMINE_RED.hex}, ${TERTIARY_COLORS.PURPLE_2655.hex})`,
                    backgroundSize: "200% 200%",
                }}
                initial={false}
                whileHover={{
                    scale: 1.05,
                    backgroundPosition: "right bottom",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => router.push("/dashboard")}
            >
                Dashboard
            </motion.button>
        </motion.div>
    );
};

const MobileNavbar = ({
    isOpen,
    setIsOpen,
    activeSection,
    router,
    scrollToSection,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    activeSection: string;
    router: ReturnType<typeof useRouter>;
    scrollToSection: (sectionId: string) => void;
}) => {
    return (
        <>
            {/* Mobile Navbar Header */}
            <motion.div
                className="flex items-center justify-between rounded-full py-2 px-4 bg-white/90 backdrop-blur-sm shadow-lg"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* Hamburger Button */}
                <motion.button
                    className="p-2 rounded-full bg-gray-100 text-gray-700"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Image
                        src="/menu_hamburger.svg"
                        alt="menu"
                        width={24}
                        height={24}
                    />
                </motion.button>

                {/* Apply Now Button */}
                <motion.button
                    className="relative overflow-hidden rounded-full px-4 py-1.5 font-bold text-white text-sm shadow-md"
                    style={{
                        background: `linear-gradient(135deg, ${PRIMARY_COLORS.WARM_RED.hex}, ${SECONDARY_COLORS.RHODAMINE_RED.hex}, ${TERTIARY_COLORS.PURPLE_2655.hex})`,
                        backgroundSize: "200% 200%",
                    }}
                    initial={false}
                    whileHover={{
                        scale: 1.05,
                        backgroundPosition: "right bottom",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => router.push("/dashboard")}
                >
                    Dashboard
                </motion.button>
            </motion.div>

            {/* Mobile Menu */}
            {isOpen && (
                <MobileMenu
                    setIsOpen={setIsOpen}
                    activeSection={activeSection}
                    router={router}
                    scrollToSection={scrollToSection}
                />
            )}
        </>
    );
};

const MobileMenu = ({
    setIsOpen,
    activeSection,
    router,
    scrollToSection,
}: {
    setIsOpen: (open: boolean) => void;
    activeSection: string;
    router: ReturnType<typeof useRouter>;
    scrollToSection: (sectionId: string) => void;
}) => {
    return (
        <motion.div
            className="absolute top-16 left-0 right-0 bg-white rounded-xl shadow-xl p-4 mt-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex flex-col space-y-2">
                <MobileNavLink
                    text="About"
                    isActive={activeSection === "about"}
                    onClick={() => {
                        scrollToSection("about");
                        setIsOpen(false);
                    }}
                />
                <MobileNavLink
                    text="Location"
                    isActive={activeSection === "location"}
                    onClick={() => {
                        scrollToSection("location");
                        setIsOpen(false);
                    }}
                />
                <MobileNavLink
                    text="Sponsors"
                    isActive={activeSection === "sponsors"}
                    onClick={() => {
                        scrollToSection("sponsors");
                        setIsOpen(false);
                    }}
                />
                <MobileNavLink
                    text="FAQ"
                    isActive={activeSection === "faq"}
                    onClick={() => {
                        scrollToSection("faq");
                        setIsOpen(false);
                    }}
                />
                <MobileNavLink
                    text="Team"
                    isActive={activeSection === "team"}
                    onClick={() => {
                        scrollToSection("team");
                        setIsOpen(false);
                    }}
                />

                {/* Mobile CTA Button */}
                <motion.button
                    className="w-full py-3 px-4 mt-2 rounded-full font-bold text-white"
                    style={{
                        background: `linear-gradient(135deg, ${PRIMARY_COLORS.WARM_RED.hex}, ${SECONDARY_COLORS.RHODAMINE_RED.hex}, ${TERTIARY_COLORS.PURPLE_2655.hex})`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        router.push("/dashboard");
                        setIsOpen(false);
                    }}
                >
                    Dashboard
                </motion.button>
            </div>
        </motion.div>
    );
};

const NavLink = ({
    text,
    isActive,
    scrollToSection,
}: {
    text: string;
    isActive: boolean;
    scrollToSection: (sectionId: string) => void;
}) => {
    return (
        <a
            href={`#section-${text.toLowerCase()}`}
            className="relative px-1"
            onClick={(e) => {
                e.preventDefault();
                scrollToSection(text.toLowerCase());
            }}
        >
            <motion.div
                className={`relative px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    isActive
                        ? "text-white"
                        : "text-gray-700 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: TERTIARY_COLORS.PURPLE_2655.hex,
                            zIndex: -1,
                        }}
                        layoutId="activeNavBackground"
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                        }}
                    />
                )}
                {text}
            </motion.div>
        </a>
    );
};

const MobileNavLink = ({
    text,
    isActive,
    onClick,
}: {
    text: string;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <a
            href={`#section-${text.toLowerCase()}`}
            className="block"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <motion.div
                className={`px-4 py-3 rounded-lg font-medium ${
                    isActive
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
                whileTap={{ scale: 0.98 }}
            >
                {text}
            </motion.div>
        </a>
    );
};

export default NewNavBar;
