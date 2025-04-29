import { motion } from "framer-motion";
import { discord } from "@/lib/link_base";

export default function DiscordCard() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(114, 137, 218, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    return (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col h-full"
        >
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#7289DA]/20 rounded-full flex items-center justify-center">
                    <svg
                        className="h-6 w-6 text-[#7289DA]"
                        fill="currentColor"
                        viewBox="0 0 800 619.27"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M674.09,61.76C623.21,39.47,569,23.86,513.09,14.78A4.06,4.06,0,0,0,508,17.89a283.26,283.26,0,0,0-12.52,25.79,756.83,756.83,0,0,0-227,0A260.86,260.86,0,0,0,256,17.89a4.2,4.2,0,0,0-5.09-3.11c-55.93,9.08-110.14,24.69-161,46.88a3.77,3.77,0,0,0-1.75,1.49C12.49,188.1-7.64,311,.93,432.4a4.41,4.41,0,0,0,1.65,3C79.94,485.17,155.19,510,229,525.48a4.12,4.12,0,0,0,4.46-1.47,294.34,294.34,0,0,0,25.44-41.43,4,4,0,0,0-2.22-5.61c-27.35-10.35-53.33-23-78.08-37.91a4.13,4.13,0,0,1-.38-6.36c5.25-3.93,10.5-8,15.56-12.22a3.79,3.79,0,0,1,4-1.37C365.63,481.15,534.38,481.15,701.58,420.1a3.79,3.79,0,0,1,4,1.37c5.06,4.13,10.31,8.29,15.56,12.22a4.13,4.13,0,0,1-.38,6.36c-24.75,14.49-50.73,27.56-78.08,37.81a4.07,4.07,0,0,0-2.22,5.71,300,300,0,0,0,25.43,41.33,4.08,4.08,0,0,0,4.47,1.47c74.07-15.53,149.32-40.33,226.68-90.14a4.14,4.14,0,0,0,1.65-3c10.37-143.36-17.39-265.69-87-390.24A3.29,3.29,0,0,0,674.09,61.76ZM266.4,354.53c-44.65,0-81.39-41-81.39-91.58s36.09-91.58,81.39-91.58c45.68,0,82.14,41.35,81.39,91.58C347.79,313.53,312.08,354.53,266.4,354.53Zm300.34,0c-44.65,0-81.39-41-81.39-91.58s36.09-91.58,81.39-91.58c45.68,0,82.14,41.35,81.39,91.58C648.13,313.53,612.42,354.53,566.74,354.53Z" />
                    </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium">
                    Join Our Discord Community
                </h3>
            </div>
            <div className="text-gray-600 mb-4 flex-grow">
                <p>
                    Connect with fellow hackers, mentors, and organizers. Get
                    real-time updates, find team members, and ask questions in
                    our Discord server.
                </p>
            </div>
            <motion.a
                href={discord}
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                className="w-full py-2 bg-[#7289DA]/10 text-[#7289DA] rounded-md font-medium mt-2 block text-center"
            >
                Join Discord
            </motion.a>
        </motion.div>
    );
}
