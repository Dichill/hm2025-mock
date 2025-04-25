import { useState, useRef, useEffect } from "react";
import { darkenColor, SECONDARY_COLORS } from "@/lib/colors";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FAQ_component = () => {



    return (
        <section className="-mt-20 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
                    <div className="w-full">
                        <div className="lg:max-w-4xl mx-auto">
                            <div
                                className="accordion-group space-y-4"
                                data-accordion="default-accordion"
                            >
                                <FAQ_Question
                                    heading="Who is the Hackathon open to?"
                                    text="The 2025 Hackathon is open to all students, faculty, and staff in the Los Angeles Community College District. Whether you're a beginner or have prior coding experience, this event is designed to be inclusive and educational for everyone."
                                />

                                <FAQ_Question
                                    heading="How do I apply?"
                                    text="The registration portal is open!"
                                    special="register"
                                />

                                <FAQ_Question
                                    heading="Do I need to know how to code?"
                                    text="No prior coding experience is required! We welcome beginners and will have workshops and mentors available to help you learn and build your project. If you're new to coding, we'll make sure you're paired with experienced team members."
                                />

                                <FAQ_Question
                                    heading="What should I bring?"
                                    text="Participants should bring their laptop, charger, and any other devices or equipment they might need for development. We'll provide food, drinks, and a comfortable workspace for the duration of the event."
                                />

                                <FAQ_Question
                                    heading="How are teams formed?"
                                    text="Teams can be formed before the event or during our team formation session at the beginning of the hackathon. Teams should consist of 2-4 members. If you don't have a team, don't worry! We'll help you find one that matches your interests and skills."
                                />

                                <FAQ_Question
                                    heading="What are the prizes?"
                                    text="We'll be awarding hundreds of dollars in cash prizes for winning projects across multiple categories. There will also be special recognition for innovation, technical achievement, social impact, and design excellence."
                                />

                                <FAQ_Question
                                    heading="Is there a theme for the hackathon?"
                                    text="The hackathon theme will be announced at the opening ceremony. The theme provides a general direction but doesn't limit your creativity. You're welcome to interpret it in innovative ways for your project."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ_component;

interface FAQ_Question__Props {
    heading: string;
    text: string;
    special?: string;
}

const FAQ_Question = (props: FAQ_Question__Props) => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const router = useRouter();


    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [open, props.text]);

    return (
        <div
            className={`m-3 rounded-xl overflow-hidden transition-all duration-300 bg-opacity-80 backdrop-blur-sm bg-[#564b79] hover:shadow-lg ${open ? "shadow-xl" : "shadow"
                }`}
        >
            <button
                aria-controls="faq-question-content"
                className="w-full"
                onClick={() => setOpen(!open)}
            >
                <div
                    className={`accordion p-6 active transition-colors duration-300 ${open ? "bg-opacity-90" : ""
                        }`}
                >
                    <FAQ_Question_Header open={open} text={props.heading} />
                </div>
            </button>
            <div
                id="faq-question-content"
                className="transition-all duration-300 ease-in-out"
                style={{
                    maxHeight: open ? `${contentHeight}px` : "0",
                    opacity: open ? 1 : 0,
                    overflow: "hidden",
                }}
            >
                <div ref={contentRef} className="px-8 pb-8">
                    <p className="text-white text-lg font-normal leading-relaxed">
                        {props.text}
                    </p>
                    {
                        props.special == "register" &&
                        <div className="p-[1%] flex justify-center">

                            <motion.button
                                key="web-nav__register"
                                initial={false}

                                className={`float-right m-4 mt-3 text-white w-[70%] rounded-md drop-shadow-lg transition-colors duration-150`}
                                style={{
                                    cursor: "pointer",
                                    border: isHovering
                                        ? "0.17vw solid white"
                                        : `0.17vw solid ${darkenColor(SECONDARY_COLORS.ORANGE_151.hex, 30)}`,
                                }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    backgroundColor:
                                        !isHovering && !isPressed

                                            ? SECONDARY_COLORS.ORANGE_151.hex
                                            : isHovering && !isPressed
                                                ? darkenColor(
                                                    SECONDARY_COLORS.ORANGE_151.hex,
                                                    20
                                                )
                                                : darkenColor(
                                                    SECONDARY_COLORS.ORANGE_151.hex,
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
                                        padding: "1vh",
                                        color: darkenColor(SECONDARY_COLORS.ORANGE_151.hex, 65)
                                    }}
                                    className={`font-bold flex justify-center content-center`}
                                >
                                    Register
                                </p>
                            </motion.button>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

interface FAQ_Question_Header__Props {
    open: boolean;
    text: string;
}

const FAQ_Question_Header = (props: FAQ_Question_Header__Props) => {
    return (
        <div className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-white w-full">
            <h3
                className={`text-xl font-bold transition-colors duration-300 ${props.open
                    ? `text-[${SECONDARY_COLORS.YELLOW_107.hex}]`
                    : "text-white"
                    }`}
            >
                {props.text}
            </h3>
            <span
                className={`flex items-center justify-center p-1 w-auto h-auto rounded-full transition-all duration-300 ${props.open
                    ? `bg-[${SECONDARY_COLORS.YELLOW_107.hex}]`
                    : "bg-white bg-opacity-20"
                    }`}
            >
                <svg
                    className={`transition-transform duration-300 ${props.open ? "rotate-180 text-[#564b79]" : "text-white"
                        }`}
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </div>
    );
};
