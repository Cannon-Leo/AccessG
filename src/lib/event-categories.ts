export type EventCategoryItem = {
  label: string;
  description: string;
  emoji: string;
};

export type EventCategory = {
  slug: string;
  label: string;
  title: string;
  blurb: string;
  items: EventCategoryItem[];
};

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    slug: "live-music",
    label: "Music",
    title: "Live Music & Concerts",
    blurb: "Stadium tours, festivals, raves, and intimate acoustic shows.",
    items: [
      {
        label: "Stadium & Arena Tours",
        description: "Large-scale, high-concurrency ticketing for global artists.",
        emoji: "🏟️",
      },
      {
        label: "Music Festivals",
        description: "Multi-day, multi-stage events requiring robust offline pass scanning.",
        emoji: "🎪",
      },
      {
        label: "Electronic & EDM",
        description: "High-energy raves, DJ sets, and synth-wave events.",
        emoji: "🎧",
      },
      {
        label: "Hip-Hop & Afrobeats",
        description: "Global chart-toppers and cultural music events.",
        emoji: "🎤",
      },
      {
        label: "Intimate & Acoustic",
        description: "Small-venue, limited-capacity live bands and solo artists.",
        emoji: "🎸",
      },
    ],
  },
  {
    slug: "nightlife",
    label: "Nightlife",
    title: "Nightlife & Experiences",
    blurb: "Warehouse raves, club nights, VIP tables, and boat parties.",
    items: [
      {
        label: "Underground Raves",
        description: "Secret warehouse parties and techno nights.",
        emoji: "🏭",
      },
      {
        label: "Club Nights",
        description: "Standard nightclub guestlists, general admission, and VIP access.",
        emoji: "🪩",
      },
      {
        label: "VIP & Table Service",
        description: "Premium bookings, bottle service reservations, and cabana access.",
        emoji: "🥂",
      },
      {
        label: "Themed Parties",
        description: "Y2K nights, masquerades, and seasonal club events.",
        emoji: "🎭",
      },
      {
        label: "Boat Parties & Cruises",
        description: "Off-grid mobile venues where offline QR validation is strictly required.",
        emoji: "🛳️",
      },
    ],
  },
  {
    slug: "tech-web3",
    label: "Tech & Web3",
    title: "Tech, Web3 & Business",
    blurb: "Hackathons, crypto mixers, pitch nights, and masterclasses.",
    items: [
      {
        label: "Hackathons & Bootcamps",
        description: "Developer summits and engineering workshops.",
        emoji: "💻",
      },
      {
        label: "Web3 & Crypto Mixers",
        description: "Token-gated real-world events, NFT gallery launches, and DAO meetups.",
        emoji: "🪙",
      },
      {
        label: "Startup Pitch Nights",
        description: "Founder networking, VC panels, and accelerator demo days.",
        emoji: "🚀",
      },
      {
        label: "Masterclasses",
        description: "Exclusive industry training and high-ticket seminars.",
        emoji: "🎓",
      },
    ],
  },
  {
    slug: "arts-culture",
    label: "Arts & Culture",
    title: "Arts, Culture & Lifestyle",
    blurb: "Runway shows, gallery openings, tastings, and theatre.",
    items: [
      {
        label: "Fashion & Runway",
        description: "Designer drop events, fashion weeks, and private trunk shows.",
        emoji: "👗",
      },
      {
        label: "Art Exhibitions",
        description: "Gallery openings, immersive digital art shows, and museum late-nights.",
        emoji: "🖼️",
      },
      {
        label: "Culinary & Tasting",
        description: "Exclusive wine tastings, private chef pop-ups, and gastronomy tours.",
        emoji: "🍷",
      },
      {
        label: "Comedy & Theater",
        description: "Stand-up specials, improv nights, and stage plays.",
        emoji: "🎭",
      },
    ],
  },
  {
    slug: "studio",
    label: "Studio",
    title: "Studio Events (Private & Invite-Only)",
    blurb:
      "Gated, hidden, or age-restricted events unlocked with a studio code.",
    items: [
      {
        label: "Exclusive Afterparties",
        description: "Post-concert, invite-only gatherings for VIPs and artists.",
        emoji: "🎉",
      },
      {
        label: "Secret Location Pop-Ups",
        description:
          "Events where the venue address is only revealed to the digital pass holder 24 hours before the event.",
        emoji: "📍",
      },
      {
        label: "Members-Only Gatherings",
        description: "Private social club mixers and syndicate meetings.",
        emoji: "🔐",
      },
      {
        label: "Adult & Alternative Lifestyle (18+/21+)",
        description:
          "Burlesque shows, cabaret, erotic art exhibitions, kink/fetish community mixers, and private adult entertainment events.",
        emoji: "🍸",
      },
      {
        label: "High-Stakes & Elite",
        description:
          "Private poker nights, luxury car rallies, and ultra-high-net-worth (UHNW) auctions.",
        emoji: "🃏",
      },
    ],
  },
];
