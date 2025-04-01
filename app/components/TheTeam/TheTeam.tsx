"use client";

import useWindowSize from "@/lib/useWindowSize";
import { mobile_size_reference } from "@/lib/colors";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "SpongeBob SquarePants",
    role: "Lead Jellyfisher",
    image: "/sb.jpg",
    description: "SpongeBob is a dedicated jellyfisher with over 10 years of experience in the field."
  },
  {
    name: "Patrick Star",
    role: "Jellyfish Expert",
    image: "/patrick.jpg",
    description: "Patrick brings his unique perspective to jellyfishing, specializing in rare jellyfish species."
  },
  {
    name: "Squidward Tentacles",
    role: "Technical Director",
    image: "/squidward.jpg",
    description: "Squidward oversees all technical aspects of our jellyfishing operations."
  },
  {
    name: "Mr. Krabs",
    role: "Project Manager",
    image: "/krabs.jpg",
    description: "Mr. Krabs manages our resources and ensures we stay on budget."
  }
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full max-w-xs perspective-1000 p-4"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped(true)}
      onTouchEnd={() => setIsFlipped(false)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div className="w-full h-full backface-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <img 
              className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" 
              src={member.image} 
              alt={member.name} 
            />
            <h5 className="mb-1 text-xl text-center font-bold text-gray-900 dark:text-white">
              {member.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {member.role}
            </span>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute top-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              About {member.name}
            </h5>
            <p className="text-gray-600 dark:text-gray-300">
              {member.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TheTeam = () => {
  const { width } = useWindowSize();

  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Our Team
      </h2>
      <div className={`grid gap-6 ${width > mobile_size_reference ? 'grid-cols-4' : 'grid-cols-1'} justify-items-center`}>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TheTeam; 