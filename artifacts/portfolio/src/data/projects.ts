export type Project = {
  slug: string; name: string; category: string; summary: string; role: string;
  stack: string[]; context: string; features: string[]; takeaway: string;
  live?: string; source?: string; image?: string; tone: string;
};
export const projects: Project[] = [
  {
    slug: "aucis", name: "AUCIS Recruitment", category: "Society website",
    summary: "A digital front door for the society I help lead.",
    role: "Developer & AUCIS Vice President", stack: ["Website", "Recruitment", "Society leadership"],
    context: "I built the recruitment website for the Air University Computing and Innovation Society at AU AAC, Kamra. As Vice President, this is both a development project and a contribution to my own community.",
    features: ["A dedicated website for society recruitment", "A public destination for students interested in AUCIS", "Built and deployed for use by the society"],
    takeaway: "Taking a project beyond coursework and building for a community I am part of.",
    live: "https://aucis-recruitment.vercel.app/", image: "aucis.png", tone: "blue",
  },
  {
    slug: "inventory", name: "Inventory System", category: "Desktop application",
    summary: "Business software that connects stock, sales, and reporting.",
    role: "Developer", stack: ["Java", "MySQL", "CSV reports"],
    context: "A desktop inventory management project that brings product records, sales reporting, and pricing into one application. It demonstrates the database and business-logic side of my development work.",
    features: ["MySQL integration for persistent inventory data", "CSV report generation and automated sales reporting", "Dynamic pricing with discount management"],
    takeaway: "Connecting a desktop interface to persistent data and practical business workflows.",
    source: "https://github.com/tayyab602/Inventory-System", tone: "sand",
  },
  {
    slug: "ypdc", name: "YPDC Recruitment", category: "Paid client project",
    summary: "A recruitment website delivered for another campus society.",
    role: "Website developer", stack: ["Website", "Client work", "Recruitment"],
    context: "Built for the YPDC society at Air University AAC, Kamra, as a paid project for a friend. A chance to apply my web development skills to someone else's project and deliver a usable website.",
    features: ["A dedicated recruitment website for YPDC AU AACK", "Delivered as paid client work", "Publicly deployed and accessible to prospective members"],
    takeaway: "Building for a client adds a different perspective: the work needs to serve their purpose.",
    live: "https://recruitment-ypdc-au-aack.vercel.app/", image: "ypdc.png", tone: "green",
  },
  {
    slug: "tictactoe", name: "Tic Tac Toe Pro", category: "Game development",
    summary: "A familiar game, with more room to play.",
    role: "Developer", stack: ["Flutter", "Dart", "Game AI"],
    context: "My Flutter game includes local multiplayer and AI opponents. This portfolio embeds a web build of that original Flutter app, with an added optional five-round ranked challenge and a shared leaderboard.",
    features: ["Original app: PvP and PvE with three AI difficulty levels", "Original app: hints, move history, and 3Ãƒâ€”3 to 5Ãƒâ€”5 boards", "Browser edition: five 3Ãƒâ€”3 rounds, server-validated scores, and difficulty-specific rankings"],
    takeaway: "Explore the source for the full Flutter project, or play the same Flutter game here.",
    source: "https://github.com/tayyab602/tictactoe-pro-ultimate", image: "tictactoe.png", tone: "orange",
  },
  {
    slug: "numzoo", name: "Numzoo", category: "Android game",
    summary: "Another side of my work: games built for Android.",
    role: "Developer", stack: ["Android", "Game development"],
    context: "Numzoo is an Android game I developed. Its source repository is private; this project is included here as part of my mobile development work.",
    features: ["An Android game project", "Independently developed", "Private source repository"],
    takeaway: "Interested in this project? Get in touch to learn more.", tone: "lilac",
  },
];
