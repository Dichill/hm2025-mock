import { PRIMARY_COLORS } from "@/lib/colors";
import useWindowSize from "@/lib/useWindowSize";
import { JSX, useEffect, useState } from "react";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};


function CountdownTimer(): JSX.Element {
    const { width } = useWindowSize();

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const targetDate = new Date("2025-05-10T00:00:00-07:00"); // Target date: May 10, 2025 at midnight Pacific Time

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
            <div className="text-2xl font-bold text-primary">
                The hackathon has started! 🚀
            </div>
        );
    }

    if (!isComplete && width > 800) {
        return (
            <div className="shadow-xl" style={{ backgroundColor: `${PRIMARY_COLORS.WARM_RED.hex}`, color: "white", display: "flex", justifyContent: "center", paddingBottom: "1em" ,paddingTop: "20px"}}>
                <div style={{ width: "80%" }} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {Object.entries(timeLeft).map(([key, value]) => (
                        <div key={key} className="flex flex-col items-center">
                            <div className="text-3xl md:text-4xl font-bold rounded-xl p-4 w-full md:min-w-[100px]">
                                {value.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xl mt-2 font-bold capitalize text-white">
                                {key}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (!isComplete && width <= 800) {
        return (

            <div className="shadow-xl" style={{ backgroundColor: `${PRIMARY_COLORS.WARM_RED.hex}`, color: "white", justifyContent: "center", paddingBottom: "1em" }}>
                <div className="">
                    {Object.entries(timeLeft).filter(([key]) => key == "days").map(([key, value]) => (
                        <div key={key} className="flex flex-col items-center">
                            <div className="text-5xl font-bold rounded-xl p-4">
                                {value.toString().padStart(2, "0")} 
                                <p className="inline text-lg capitalize ml-5 relative -top-2">{key}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 text-center">

                    {Object.entries(timeLeft).filter(([key]) => key != "days").map(([key, value]) => (
                        <div key={key} className="flex flex-col items-center">
                            <div className="text-3xl md:text-4xl font-bold rounded-xl p-4 w-full md:min-w-[100px]">
                                {value.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xl -mt-3 font-bold text-white">
                                {key}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }
}


export default CountdownTimer;
