"use client";

import useWindowSize from "@/lib/useWindowSize";
import { mobile_size_reference } from "@/lib/colors";
import { useState } from "react";
import { TeamMember, teamMembers } from "@/lib/team_info";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/profile_filler.svg";

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const { width } = useWindowSize();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="w-full max-w-xs perspective-1000 p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div
                className={`relative w-full h-full transition-transform duration-200 transform-style-3d 
          ${(width < mobile_size_reference && isFlipped) || isHovered
                        ? "rotate-y-180"
                        : ""
                    }`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front of card */}
                <div className="w-full h-full backface-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <Image
                            className="mt-3 w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                            src={member.image == "" ? PLACEHOLDER_IMAGE : member.image}
                            width={96}
                            height={96}
                            alt={`portrait of ${member.name}`}
                        />
                        <h5 className="mb-1 text-xl text-center font-bold text-gray-900 dark:text-white">
                            {member.name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {member.role}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {member.school}
                        </span>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className="absolute top-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="flex flex-col">
                        <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            {member.name}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                            {member.description}
                        </p>

                    </div>

                    {/* Linked In Badge */}
                    {member.linked_in.hasLink && <>
                        <a aria-label={`${member.name}'s LinkedIn`} target="_blank" href={member.linked_in.url}>
                            <button className={`flex w-[80%] justify-center p-2 cursor-pointer absolute bottom-0`}>
                                <Image src="/LinkedIn_Logo.svg" alt="LinkedIn" width={140} height={140} />
                            </button>
                        </a></>}

                </div>
            </div>
        </div>
    );
};

const TheTeam = () => {
    const { width } = useWindowSize();

    return (
        <div className="w-full py-8">
            <div
                className={`grid gap-6 ${width > 1500
                    ? "grid-cols-4"
                    : width > mobile_size_reference
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    } justify-items-center`}
            >
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
};

export default TheTeam;
