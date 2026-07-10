import type { BootLine, MetricStat, NavShortcut, RoadmapMilestone } from "./types";

export const SITE = {
  title: "Panic Point Games: Game Development Studio",
  description:
    "Panic Point Games — Game Development Studio. CRYODEATH VR, our first VR title to reach your headsets.",
  logo: "https://panicpointgames.com/wp-content/uploads/go-x/u/e7a6e5d7-bda1-46a4-84a9-0b5eeabb8e09/image-455x256.png",
  favicon:
    "https://panicpointgames.com/wp-content/uploads/go-x/u/2a7b0e59-6191-43dd-acce-aaf23a78eb3b/w32,h32,rtfit,bg,el1,ex1,fpng/image.png?v=1773124003032",
  copyright: "© 2020–2026 Panic Point Games. All rights reserved.",
} as const;

export const LINKS = {
  home: "/",
  cryodeathVr: "/cryodeath-vr/",
  pressKit: "/press-kit/",
  contactUs: "/contact-us/",
  cryodeathQuest: "/cryodeath-vr-quest/",
  privacyPolicy: "/contact-us/privacy-policy/",
  legalNotice: "/contact-us/legal-notice/",
  discord: "https://discord.gg/S99bRdH4Kp",
  steam: "https://store.steampowered.com/app/2205010/CRYODEATH_VR",
  twitchClips: "https://www.twitch.tv/directory/category/cryodeath-vr/clips",
  phone: "07879862714",
  phoneHref: "tel:07879862714",
  email: "Info@panicpointgames.com",
  emailHref: "mailto:Info@panicpointgames.com",
} as const;

export const VIDEOS = {
  questTeaser: "Hd4nn0O4-2k",
  cryodeath: "oOIPOIixWKc",
} as const;

export const BOOT_LINES: BootLine[] = [
  { text: "CRYO_SYS_ONLINE...", delay: 0 },
  { text: "INITIALIZING VECTOR MAPPER...", delay: 320 },
  { text: "MEMORY CORE BUFFER STABLE...", delay: 640 },
  { text: "CONNECTING TO RAVON_API...", delay: 960 },
];

export const BOOT_TITLE = "PANIC POINT GAMES";
export const BOOT_TITLE_DURATION_MS = 1800;

export const NAV_SHORTCUTS: NavShortcut[] = [
  {
    id: "home",
    label: "Home",
    icon: "home",
    title: "CRYO-COMMODORE",
    defaultWidth: 920,
    defaultHeight: 640,
  },
  {
    id: "cryodeath-vr",
    label: "CryoDeath VR",
    icon: "gamepad-2",
    title: "CRYODEATH VR — COMMAND DECK",
    defaultWidth: 880,
    defaultHeight: 680,
  },
  {
    id: "press-kit",
    label: "Press Kit",
    icon: "folder-open",
    title: "PRESS KIT ARCHIVE",
    defaultWidth: 720,
    defaultHeight: 520,
  },
  {
    id: "contact",
    label: "Contact Us",
    icon: "radio",
    title: "INTEGRATED COMS TERMINAL",
    defaultWidth: 860,
    defaultHeight: 720,
  },
  {
    id: "cryodeath-quest",
    label: "CryoDeath VR Quest",
    icon: "radar",
    title: "CRYODEATH QUEST TIMELINE",
    defaultWidth: 800,
    defaultHeight: 620,
  },
];

export const METRICS: MetricStat[] = [
  { value: 1, label: "Game Released" },
  { value: 3, label: "Active Projects" },
  { value: 10, label: "Team Members" },
];

export const ROADMAP: RoadmapMilestone[] = [
  { label: "Unreal Engine 5.7 upgrade", status: "complete" },
  { label: "Tutorial Overhaul 2.0", status: "complete" },
  { label: "Quest Standalone Edition", status: "development" },
];

export const HERO = {
  questTeaserTitle: "CRYODEATH VR Quest Launch Teaser",
  headline: "CRYODEATH VR Our First VR Title To Reach Your Headsets",
  steamCta: "Click To Check It Out!",
  tagline: "A hardcore sci-fi survival horror experience.",
  paragraphs: [
    "Awaken aboard a derelict spacecraft where life support has failed, systems are collapsing, and something is hunting you. Resources are scarce, the environment is lethal, and every decision matters.",
    "Explore a frozen, interconnected ship, restore critical systems, and survive long enough to uncover what went wrong — without becoming part of it.",
    "No hand-holding. No second chances.",
    "Just tension, immersion, and survival under pressure.",
    "Welcome aboard.",
  ],
} as const;

export const QUEST = {
  title: "Cryodeath Coming To Meta Quest Soon!",
  paragraphs: [
    "CryoDeath is under constant development, with major updates rolling out regularly and a huge wave of free new content released in December 2025.",
    "The game has undergone a complete transformation — a full-scale rework that has reshaped systems, visuals, and overall gameplay. And this is only the beginning.",
    "Looking ahead to Q1 2026, major work is already underway, including:",
    "Development on CryoDeath remains active, ambitious, and player-driven — with no plans to slow down.",
  ],
  discordCta: "CLICK HERE FOR DISCORD",
} as const;

export const WORLD = {
  title: "Dive into the World Of Panic Point Games",
  subtitle: "A New Era of Horror in Virtual Reality",
  clipsCta: "Click Me To Watch Some Of Our Favourite Cryodeath Clips !",
  image:
    "https://panicpointgames.com/wp-content/uploads/go-x/u/301da6f6-c435-41fc-98ab-4042029a91bf/l473,t0,w1122,h1080/image-768x739.png",
} as const;

export const CONTACT = {
  title: "Contact Details",
  telephone: "Telephone: 07879862714",
  email: "E-mail: Info@panicpointgames.com",
  supportLine: "For Support, Business or Job Applications",
  cta: "Contact us here!",
} as const;

export const FORM = {
  name: "Name",
  email: "E-mail",
  steam: "Steam ID / Meta Account Name",
  discord: "Discord Account Name",
  message: "Message",
  businessEnquiry: "Business Enquiry",
  lookingForWork: "Looking For Work",
  support: "Support",
  consent:
    "I hereby agree that this data will be stored and processed for the purpose of establishing contact. I am aware that I can revoke my consent at any time.",
  requiredError: "This field is required.",
  emailInvalid: "Please enter a valid e-mail address.",
  globalError: "* Please fill in all the required fields.",
  send: "Send",
  sendError: "Message could not be sent. Please try again later.",
  sendSuccess: "Your Message Has Been Sent To The Team!",
} as const;

export const VIDEO_CONSENT = {
  title: "We need your consent to load this video",
  body: "We use a third party service to embed video content that may collect data about your activity. Please review the details in the privacy policy and accept the service to view the video.",
  privacyPolicy: "Privacy Policy",
  accept: "Accept",
} as const;

export const TRANSLATOR_CONSENT = {
  title: "We need your consent to load the translations",
  body: "We use a third-party service to translate the website content that may collect data about your activity. Please review the details in the privacy policy and accept the service to view the translations.",
  decline: "Decline",
  accept: "Accept",
  enabled: "Website Translator service enabled.",
} as const;

export const COOKIE = {
  banner:
    "This site uses third-party website tracking technologies to provide and continually improve our services, I agree and may revoke or change my consent at any time with effect for the future.",
  privacyPolicy: "Privacy Policy",
  moreButton: "More",
  accept: "Accept",
  reject: "Reject",
  settingsTitle: "Privacy Settings",
  settingsDescription:
    "This tool helps you to select and deactivate various tags / trackers / analytic tools used on this website.",
  selectAll: "Select all services",
  saveSettings: "Save Settings",
  expandMore: "More",
  expandLess: "Less",
  services: {
    translator: {
      name: "Website Translator",
      description:
        "Enables third-party website translation services that may collect data about your activity.",
    },
    analytics: {
      name: "IONOS SiteAnalytics",
      description:
        "Collects anonymised website traffic and usage data to monitor performance and improve user experience.",
    },
    video: {
      name: "YouTube Video",
      description:
        "Embeds YouTube video content that may collect data about your activity when videos are played.",
    },
  },
  moduleTitle: "System Permissions Security Module",
} as const;

export const TRANSFER_LINES = [
  "ESTABLISHING SECURE UPLINK...",
  "ENCRYPTING PACKET STREAM [AES-4096]...",
  "ROUTING VIA RAVON_RELAY_NODE_07...",
  "HANDSHAKE ACKNOWLEDGED — COMS CHANNEL OPEN",
  "TRANSMISSION COMPLETE",
] as const;
