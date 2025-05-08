import React from "react";

/**
 * Interface defining a track with its details
 */
export type Track = {
    id: string;
    title: string;
    description: string;
    examples: string[];
    icon: React.ReactNode;
    color: string;
};

/**
 * Interface defining a sponsor challenge with its details
 */
export type SponsorChallenge = {
    id: string;
    sponsor: string;
    title: string;
    description: string;
    prizes: string[];
    color: string;
    logo?: React.ReactNode;
};

/**
 * Main quest tracks data
 */
export const tracks: Track[] = [
    {
        id: "accessibility",
        title: "Accessibility",
        description: "Empower every user!",
        examples: [
            "Live-captioning apps",
            "Accessible navigation tools",
            "Inclusive websites",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
            </svg>
        ),
        color: "mesa-purple",
    },
    {
        id: "artists",
        title: "Artists",
        description: "Build tools that amplify creativity!",
        examples: [
            "AI art generators",
            "Music composition apps",
            "Design platforms",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
        color: "mesa-warm-red",
    },
    {
        id: "athletes",
        title: "Athletes",
        description: "Supercharge athletic performance!",
        examples: [
            "Fitness wearables",
            "Team strategy analyzers",
            "Injury prevention apps",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
        color: "mesa-orange",
    },
    {
        id: "wildcard",
        title: "Original Idea (Wildcard)",
        description: "Got something totally different in mind?",
        examples: [
            "Submit under 'Other' and you'll be considered for Best in Original Idea!",
            "We love out-of-the-box thinking!",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
            </svg>
        ),
        color: "mesa-green",
    },
];

/**
 * Sponsor challenges data
 */
export const sponsorChallenges: SponsorChallenge[] = [
    {
        id: "ec-council",
        sponsor: "EC-Council",
        title: "Capture the Flag",
        description:
            "This 60-minute CTF will take place in a virtualized cyber range and is activated through a code-based system. Participants can choose one challenge, Kernel, Policy, or Careless with access granted for 7 days. See the Events page to register!",
        prizes: ["Certification vouchers", "CTF completion badges"],
        color: "mesa-warm-red",
    },
    {
        id: "holo",
        sponsor: "Hologram Labs",
        title: "Build a UI Interface for an Autonomous Agent",
        description:
            "Your challenge is to build a user-facing application that connects to an autonomous agent via a provided API endpoint. The agent supports HTTP streaming responses and acts as a multiserver MCP client, capable of connecting to any MCP server that exposes tools via SSE transport. Your app should consume the stream, parse the chunks of data in real time, and provide a smooth interface for interacting with the agent. Bonus points for teams that also implement a simple MCP server exposing tools.",
        prizes: [
            "$100 Amazon gift card",
            "$100 in Holo api credits",
            "Hologram t-shirt",
        ],
        color: "mesa-purple",
    },
    {
        id: "mlh-gemini",
        sponsor: "Major League Hacking",
        title: "Best Use of Gemini API",
        description:
            "It's time to push the boundaries of what's possible with AI using Google Gemini. Build AI-powered apps that make your friends say WHOA.",
        prizes: ["Google Swag", "Recognition from MLH"],
        color: "mesa-yellow-116",
    },
    {
        id: "tech-domain",
        sponsor: "Major League Hacking",
        title: "Best .Tech Domain Name",
        description:
            "Make your Team's Achievements timeless: Win a .Tech Domain Name for up to 10 years to Showcase and Expand Your Project.",
        prizes: [
            "Blue Snowball Microphone",
            "Free .Tech Domain Name for up to 10 years",
        ],
        color: "mesa-grey",
    },
    {
        id: "mongodb",
        sponsor: "Major League Hacking",
        title: "Best Use of MongoDB Atlas",
        description:
            "MongoDB Atlas takes the leading modern database and makes it accessible in the cloud! Get started with a $50 credit for students or sign up for the Atlas free forever tier.",
        prizes: ["M5GO IoT Starter Kit for you and each member of your team"],
        color: "mesa-green",
    },
    {
        id: "wss",
        sponsor: "WSS",
        title: "Shop the Future Challenge",
        description:
            "WSS wants to better understand and serve their customers—whether they're online, in-store, or on social media. Your mission is to build a prototype that helps WSS gather insights from customer feedback across different channels or predict future product trends using AI modeling. You can approach this challenge from one of these angles: Voice of the Customer (design a dashboard that pulls customer sentiment from sources like social media, surveys, or reviews), Trend Prediction (use AI to analyze product data, social buzz, or mock purchase histories to forecast popular items or styles), or Retail Intelligence (create a tool that helps WSS spot and respond to shifts in consumer behavior or economic pressures).",
        prizes: ["To be announced"],
        color: "mesa-warm-red",
    },
];
