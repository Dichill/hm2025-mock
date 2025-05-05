export interface TeamMember {
    name: string;
    role: string;
    image: string;
    description: string;
    linked_in: {
        hasLink: boolean;
        url: string;
    };
    school: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Dichill Tomarong",
        role: "Tech Lead",
        image: "/dichill_WR.jpg",
        description:
            "Software Engineer and aspiring entrepreneur. CEO of DashTech. Created Dash Software for LACC MESA's student sign-in system.",
        linked_in: {
            hasLink: true,
            url: "https://www.linkedin.com/in/dichill-tomarong-883b9729b/",
        },

        school: "LACC",
    },
    {
        name: "Fahat Yousuf",
        role: "Logistics Lead",
        description: "Computer science and Aerospace Major",
        image: "/fajat_WR.jpg",
        linked_in: {
            hasLink: true,
            url: "https://www.linkedin.com/in/fahatyousuf/",
        },
        school: "LACC",
    },
    {
        name: "Evelyn Toledo",
        role: "Marketing Lead",
        description:
            "Biology major active in MESA, supporting community and outreach through HackMESA’s marketing team and social media management",
        image: "/evelyn_WR.jpg",
        linked_in: {
            hasLink: false,
            url: "",
        },
        school: "ELAC",
    },
    {
        name: "Cash Webb",
        role: "Tech Team/Backend",
        description:
            "Computer Science major. CS lead for MESA Skills Lab at LAVC. CS and Math tutor for MESA",
        image: "/cash_WR.jpg",
        linked_in: {
            hasLink: false,
            url: "",
        },
        school: "LAVC",
    },
    {
        name: "Justin Dela Cruz",
        role: "Tech Team",
        description: "About info coming soon!",
        image: "",
        linked_in: {
            hasLink: false,
            url: "",
        },
        school: "CSULB",
    },
    {
        name: "Diego Cea",
        role: "Tech/Frontend Team",
        description:
            "Designer, mechanical engineering undergrad, former NASA & Caltech intern, currently tutoring STEM for MESA.",
        image: "/diego_WR.jpg",
        linked_in: {
            hasLink: true,
            url: "https://www.linkedin.com/in/ceadiego/",
        },
        school: "ELAC",
    },
    {
        name: "Mayra Saballos",
        role: "Volunteer",
        description: "About info coming soon!",
        image: "",
        linked_in: {
            hasLink: false,
            url: "",
        },
        school: "ELAC",
    },
    {
        name: "Bendiel Passos",
        role: "Logistics/Social Media Team",
        description:
            "I'm a Computer Engineering student at LACC who loves tech, creativity, and problem-solving. Excited to build, learn, and connect at this hackathon.",
        image: "/Ben_WR.jpg",
        linked_in: {
            hasLink: true,
            url: "https://www.linkedin.com/in/bendiel-passos-85173450/",
        },
        school: "LACC",
    },
    {
        name: "Jay Crawford",
        role: "Frontend",
        description:
            "Artist, programmer, and full time engineering student. Passionate about learning. CS Tutor for MESA.",
        image: "/jay_WR.jpg",
        linked_in: {
            hasLink: true,
            url: "https://www.linkedin.com/in/jay-crawford-prod/",
        },
        school: "LACC",
    },
    {
        name: "Andrea Castillo",
        role: "Designer/Tech Team",
        description: "Computer Engineer student, Currently Tutor for Mesa",
        image: "",
        linked_in: {
            hasLink: true,
            url: "https://www.linkedin.com/in/andrcas/",
        },
        school: "ELAC - CSULB",
    },
    {
        name: "Serena Kaldawi",
        role: "Marketing Team",
        description:
            "Student, experienced in outreach and content creation from working in the MESA program",
        image: "/serena_WR.jpg",
        linked_in: {
            hasLink: false,
            url: "",
        },
        school: "LAVC",
    },
];
