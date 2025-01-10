import {
  RiBuilding4Line,
  RiInformationLine,
  RiRocketLine,
  RiUser3Line,
  RiUserVoiceLine,
} from "@remixicon/react";
import { IFaqItem } from "./FAQ.types";

export enum FAQ_ENUM {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  INDICATION_OF_INTEREST = "Indication Of Interest",
  PROFILE_SETTINGS = "Profile Settings",
  ABOUT_US = "About Us",
}

export const FAQ_TYPE = [
  {
    key: FAQ_ENUM.PRIMARY,
    subtitle: "Understand how primary works",
    Icon: RiRocketLine,
  },
  {
    key: FAQ_ENUM.SECONDARY,
    subtitle: "Understand how secondary works",
    Icon: RiBuilding4Line,
  },
  {
    key: FAQ_ENUM.INDICATION_OF_INTEREST,
    subtitle: "Explore how Indications of Interest processes operate",
    Icon: RiUserVoiceLine,
  },
  {
    key: FAQ_ENUM.PROFILE_SETTINGS,
    subtitle: "Customize and manage your account preferences",
    Icon: RiUser3Line,
  },
  {
    key: FAQ_ENUM.ABOUT_US,
    subtitle: "Learn more about our mission and service",
    Icon: RiInformationLine,
  },
] as const;

export const FAQs_CONTENT: Record<FAQ_ENUM, IFaqItem[]> = {
  [FAQ_ENUM.PRIMARY]: [
    {
      title: "What is a primary transaction?",
      content:
        "A primary transaction refers to a fundraising deal initiated by the startup companies that Launch Point Limited works with for the issuance of new shares in their company.",
    },
    {
      title: "Where can I search for the primary transaction?",
      content:
        "All primary transactions are listed under the tab Primary on Launch Point's platform. You can only view the relevant primary transaction after becoming a client of Launch Point Limited.",
    },
    {
      title:
        "When do I require to pay if I would like to participate in a primary transaction?",
      content:
        "You will only be required to pay for the allocated amount after entering into legally binding contracts.",
    },
    {
      title: "What should I do if I have trouble placing the order demand?",
      content:
        "Please contact our sales representative directly to resolve the relevant issues.",
    },
    {
      title: "Who can participate in primary transactions?",
      content:
        "You can only participate in the relevant primary transactions after becoming a client of Launch Point Limited. You are also required to be verified as a Professional Investor as stated under the Securities and Futures Ordinance in Hong Kong.",
    },
  ],
  [FAQ_ENUM.SECONDARY]: [
    {
      title: "What is a secondary transaction?",
      content:
        "A secondary transaction refers to a bilateral deal for a specific startup company that is negotiated among buyer(s) and seller(s).",
    },
    {
      title: "Where can I search for the secondary transaction?",
      content:
        "All secondary transactions are listed under the tab Secondary on Launch Point's platform. You can only view the relevant secondary transaction after becoming a client of Launch Point Limited.",
    },
    {
      title:
        "When do I require to pay if I would like to participate in a secondary transaction?",
      content:
        "You will only be required to pay for the required amount after legally binding contracts are negotiated and executed among buyers and sellers.",
    },
    {
      title:
        "What should I do if I have trouble placing the indication of interest?",
      content:
        "Please contact our sales representative directly to resolve the relevant issues.",
    },
    {
      title: "Who can participate in secondary transactions?",
      content:
        "You can only participate in the relevant secondary transactions after becoming a client of Launch Point Limited. You are also required to be verified as a Professional Investor as stated under the Securities and Futures Ordinance in Hong Kong.",
    },
  ],
  [FAQ_ENUM.INDICATION_OF_INTEREST]: [
    {
      title: "What is an indication of interest or order demand?",
      content:
        'Indication Of Interest ("IOI") and/or Order Demand submitted on Launch Point\'s platform are indicative in nature.In each of the IOI and/or order demand submitted on our platform, you are only required to indicate your size of your intended notional amount and the price that you are willing to bid/ask for each of your respective relevant primary and/or secondary transactions.\n\nFor detailed explanation, please contact one of our sales representatives. We are more than happy to answer you with more details!',
    },
  ],

  [FAQ_ENUM.PROFILE_SETTINGS]: [
    {
      title:
        "If you experience any issues in your profile and/or logging into your Launch Point Account, please contact one of our sales representatives immediately. We will answer to you shortly!",
      content: "",
    },
  ],

  [FAQ_ENUM.ABOUT_US]: [
    {
      title: "Who we are?",
      content:
        "At Launch Point, we embody the strategic genesis where new ventures ascend toward success. As a strategic advisory firm, we aim to be the pivotal catalyst, nurturing connections between global investors and promising Asian enterprises. Our identity symbolizes the inception of growth, the cornerstone for collaborations that drive businesses forward while bridging diverse cultures and unlocking abundant opportunities. Launch Point represents the starting point of prosperous partnerships, igniting a journey toward shared success rooted in innovation, trust, and global synergy.\n\nLaunch Point Limited is Hong Kong’s first and only startup investment and trading platform licensed and regulated by the Securities and Futures Commission.",
    },
    {
      title: "Mission and Vision",
      content:
        '"Bridging diverse cultures and opportunities"\n\nWe strive to transcend boundaries, fostering connections that merge the strengths of various cultures with the limitless potential present in global markets with a focus on Asia. Our dedication lies in facilitating a seamless exchange where differences become strengths, enabling mutual understanding and harnessing the collective power of diverse perspectives. Through this bridge, we aim to unlock new avenues for growth, innovation, and collaboration, enriching the financial landscape while fostering a more interconnected and prosperous global community.\n\nOur vision is to be at the forefront of a global financial landscape where cultural diversity is respected and celebrated as a cornerstone of innovation and success. We envision a future where our relentless commitment to fostering connections and understanding between diverse cultures amplifies opportunities, driving sustainable growth and redefining the dynamics of global business. Through our unwavering dedication to bridging borders, our vision is to pave the way for a world where collaborative synergy transcends differences, leading to a more prosperous and interconnected global community.',
    },
    {
      title: "Our Services",
      content:
        "Our strategy at Launch Point revolves around catalyzing growth and fostering cross-cultural collaborations in alignment with our mission to ‘bridge diverse cultures and opportunities’. We aim to actualize this vision by offering a comprehensive suite of services spanning\n\nStartup Support and Advisory\nInstitutional Investor Advisory\nStrategic Corporate Advisory\nStartup Fundraising Introduction\nPrivate Market Introduction\n\nThrough strategic partnerships and insightful advisory, we empower Asian enterprises to navigate global markets, leveraging their unique strengths while providing global investors access to promising ventures. Our approach is rooted in cultivating deep relationships, facilitating seamless introductions, and delivering innovative solutions that drive financial success and cultivate a more interconnected, inclusive, and prosperous global economy.",
    },
  ],
};
