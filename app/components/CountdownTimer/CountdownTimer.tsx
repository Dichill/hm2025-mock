import {
    PRIMARY_COLORS,
    SECONDARY_COLORS,
    TERTIARY_COLORS,
} from "@/lib/colors";
import useWindowSize from "@/lib/useWindowSize";
import { JSX, useEffect, useState } from "react";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type TimeUnitProps = {
    value: number;
    label: string;
    isPrimary?: boolean;
    color: string;
};

function TimeUnit({
    value,
    label,
    isPrimary = false,
    color,
}: TimeUnitProps): JSX.Element {
    return (
        <div className="flex flex-col items-center">
            <div
                className={`font-bold rounded-lg ${
                    isPrimary ? "text-5xl p-3" : "text-3xl md:text-4xl p-2"
                }`}
                style={{ backgroundColor: color, color: "#FFFFFF" }}
            >
                {value.toString().padStart(2, "0")}
            </div>
            <div
                className={`font-bold capitalize text-black ${
                    isPrimary ? "text-lg ml-2 mt-1" : "text-xl mt-2"
                }`}
            >
                {label}
            </div>
        </div>
    );
}

function CountdownTimer(): JSX.Element {
    const { width } = useWindowSize();
    const isMobile = width <= 800;

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isComplete, setIsComplete] = useState(false);

    // Define color scheme
    const bgColor = "white"; // Darker grey background
    const timeUnitColors = [
        SECONDARY_COLORS.ORANGE_151.hex, // Days
        SECONDARY_COLORS.RHODAMINE_RED.hex, // Hours
        TERTIARY_COLORS.PURPLE_2655.hex, // Minutes
        SECONDARY_COLORS.YELLOW_116.hex, // Seconds
    ];

    useEffect(() => {
        const targetDate = new Date("2025-05-09T00:00:00-07:00"); // Target date: May 10, 2025 at midnight Pacific Time

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setIsComplete(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isComplete) {
        return (
            <div className="bg-gradient-to-r from-mesa-warm-red to-mesa-rhodamine text-white p-6 rounded-lg shadow-xl text-center">
                <div className="text-3xl font-bold animate-pulse">
                    The hackathon has started! 🚀
                </div>
            </div>
        );
    }

    if (isMobile) {
        return (
            <div
                className="shadow-xl rounded-md overflow-hidden"
                style={{ backgroundColor: bgColor }}
            >
                <div className="py-3 px-2 text-white">
                    <div className="flex justify-center items-center">
                        {Object.entries(timeLeft)
                            .filter(([key]) => key === "days")
                            .map(([key, value], index) => (
                                <TimeUnit
                                    key={key}
                                    value={value}
                                    label={key}
                                    isPrimary={true}
                                    color={timeUnitColors[index]}
                                />
                            ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center mt-2">
                        {Object.entries(timeLeft)
                            .filter(([key]) => key !== "days")
                            .map(([key, value], index) => (
                                <TimeUnit
                                    key={key}
                                    value={value}
                                    label={key}
                                    color={timeUnitColors[index + 1]}
                                />
                            ))}
                    </div>
                </div>
                <div
                    className="py-2 px-4 text-center"
                    style={{ backgroundColor: PRIMARY_COLORS.WARM_RED.hex }}
                >
                    <span className="text-lg font-bold text-white">
                        Join us May 9, 2025!
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="shadow-xl rounded-md overflow-hidden"
            style={{ backgroundColor: bgColor }}
        >
            <div className="py-4 px-4 text-white">
                <div className="grid grid-cols-4 gap-3 text-center">
                    {Object.entries(timeLeft).map(([key, value], index) => (
                        <div
                            key={key}
                            className="flex flex-col items-center transition-all duration-300 hover:scale-105"
                        >
                            <div
                                className="rounded-xl p-3 w-20 h-20 flex items-center justify-center shadow-md"
                                style={{
                                    backgroundColor: timeUnitColors[index],
                                }}
                            >
                                <span className="text-3xl font-bold text-white">
                                    {value.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <div className="text-lg mt-2 font-bold capitalize text-black">
                                {key}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="py-2 px-4 text-center"
                style={{ backgroundColor: PRIMARY_COLORS.WARM_RED.hex }}
            >
                <span className="text-lg font-bold text-white">
                    Join us May 9, 2025!
                </span>
            </div>
        </div>
    );
}

export default CountdownTimer;
