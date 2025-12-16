export type RoleType = "FAN" | "COLLABORATOR" | "ARTIST_ADMIN" | "ADMIN";

export const universes = [
  {
    slug: "worm",
    name: "WORM",
    manifesto:
      "WORM is the iridescent nightlife organism: part warehouse hymn, part whispered confession. Everything wriggles toward light. We chase the bass until it becomes a heartbeat. We archive the sweat, the neon notes, the afterimage of bodies in communion. We reject beige. We refuse quiet. We remix every myth until it shimmers.",
    paletteNotes: "oil slick black, ultraviolet ink, chrome edges",
    accentColor: "#0f172a",
    signerAddress: "0x0000000000000000000000000000000000W0RM",
  },
  {
    slug: "tarns",
    name: "TARNS",
    manifesto:
      "TARNS is alpine pop-minimalism: breath held above mirror lakes, precision-cut melodies, couture silence. Each drop is a shard of glacier light. Every lyric is distilled until only the mineral remains. We honor discipline, discipline, discipline. We archive restraint. We leave fingerprints on steel.",
    paletteNotes: "winter white, ink graphite, lapis accent",
    accentColor: "#1d3b5c",
    signerAddress: "0x00000000000000000000000000000000TARNS",
  },
];

export const releases = {
  worm: [
    {
      title: "Pulse Archive 001",
      date: new Date("2024-08-04"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#0f172a"/><circle cx="90" cy="90" r="60" fill="none" stroke="#9ca3af" stroke-width="7"/><path d="M20 120 Q80 40 140 130 T300 70" fill="none" stroke="#a855f7" stroke-width="6"/><text x="24" y="158" fill="#e5e7eb" font-family="Arial" font-size="16">worm / pulse archive</text></svg>',
      description: "Warehouse hymns pressed into ink. Live-to-tape synth confessions with tactile percussion.",
    },
    {
      title: "Chromatic Honey",
      date: new Date("2024-10-12"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#111827"/><rect x="40" y="40" width="240" height="100" fill="none" stroke="#fcd34d" stroke-width="6"/><circle cx="160" cy="90" r="36" fill="#fca5a5"/><text x="56" y="160" fill="#fcd34d" font-family="Georgia" font-size="15">chromatic honey — live resin edits</text></svg>',
      description: "Pop-hooks dipped in resin. Elastic melodies stretched over metallic drum design.",
    },
    {
      title: "Neon Psalm",
      date: new Date("2025-01-22"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#0b1120"/><polygon points="40,150 160,20 280,150" fill="none" stroke="#38bdf8" stroke-width="6"/><text x="50" y="165" fill="#38bdf8" font-family="Bodoni MT" font-size="18">Neon Psalm</text></svg>',
      description: "Devotional club ballads. Vocoders meet string quartets inside a breathing bassline.",
    },
    {
      title: "Slick Bloom",
      date: new Date("2025-03-02"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#0f172a"/><ellipse cx="160" cy="90" rx="120" ry="60" fill="none" stroke="#10b981" stroke-width="5"/><text x="120" y="98" fill="#10b981" font-family="Arial Black" font-size="20">SLICK</text><text x="120" y="118" fill="#6ee7b7" font-family="Arial" font-size="12">BLOOM</text></svg>',
      description: "Sweaty florals. Percussive scent studies that bloom with every replay.",
    },
  ],
  tarns: [
    {
      title: "Glacier Etude",
      date: new Date("2024-07-01"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#f8fafc"/><path d="M30 140 L110 60 L170 120 L260 40" stroke="#0f172a" stroke-width="5" fill="none"/><circle cx="250" cy="130" r="18" fill="#1d3b5c"/><text x="36" y="164" fill="#0f172a" font-family="Times New Roman" font-size="16">Glacier Etude</text></svg>',
      description: "Chamber pop carved from ice. Glassy plucks and disciplined crescendos.",
    },
    {
      title: "Lacustrine",
      date: new Date("2024-11-15"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#e2e8f0"/><rect x="60" y="40" width="200" height="100" fill="none" stroke="#1f2937" stroke-width="4"/><line x1="60" y1="90" x2="260" y2="90" stroke="#1f2937" stroke-width="3" stroke-dasharray="8 6"/><circle cx="160" cy="90" r="22" fill="#0ea5e9"/><text x="72" y="158" fill="#0f172a" font-family="Bodoni MT" font-size="14">lacustrine / still water pop</text></svg>',
      description: "Still-water melodies. Slow-release hooks with mirrored vocal stacks.",
    },
    {
      title: "Steel Veil",
      date: new Date("2025-02-10"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#f1f5f9"/><path d="M50 140 Q160 20 270 140" stroke="#111827" stroke-width="4" fill="none"/><rect x="130" y="70" width="60" height="80" fill="#1f2937" opacity="0.15"/><text x="120" y="158" fill="#111827" font-family="Didot" font-size="16">Steel Veil</text></svg>',
      description: "Muted maximalism. Metallic harmonics under whispered percussion.",
    },
    {
      title: "Suture Air",
      date: new Date("2025-03-18"),
      coverSvg:
        '<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#e5e7eb"/><line x1="40" y1="40" x2="280" y2="140" stroke="#334155" stroke-width="3"/><line x1="40" y1="140" x2="280" y2="40" stroke="#334155" stroke-width="3"/><text x="110" y="92" fill="#0f172a" font-family="Bodoni MT" font-size="20">Suture</text><text x="135" y="118" fill="#1d3b5c" font-family="IBM Plex Mono" font-size="12">AIR</text></svg>',
      description: "Breathing between beats. Surgical vocal stacks sewn over brushed snares.",
    },
  ],
};

export const products = [
  {
    slug: "worm-kinetic-pack",
    title: "WORM Kinetic Pack",
    description: "Personalized song stem bundle tuned for warehouse systems, with cover art and staging notes.",
    universeSlug: "worm",
    priceCents: 4200,
    images: [
      '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="220" fill="#0f172a"/><text x="30" y="60" fill="#f8fafc" font-family="Bodoni MT" font-size="32">KINETIC</text><text x="30" y="96" fill="#a855f7" font-family="IBM Plex Mono" font-size="12">worm pop package</text><circle cx="280" cy="110" r="52" fill="none" stroke="#a855f7" stroke-width="7"/></svg>',
    ],
  },
  {
    slug: "worm-night-viz",
    title: "Night Viz Treatment",
    description: "Immersive video treatment with light plot, fashion notes, and live projection loops.",
    universeSlug: "worm",
    priceCents: 5200,
    images: [
      '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="220" fill="#0b1120"/><rect x="40" y="40" width="280" height="140" fill="none" stroke="#f97316" stroke-width="5"/><text x="60" y="190" fill="#f97316" font-family="Arial" font-size="16">Night Viz / live visuals draft</text></svg>',
    ],
  },
  {
    slug: "worm-press-kit",
    title: "Club Press Kit",
    description: "Editorial press kit with kinetic typography, release copy, and signature palette guide.",
    universeSlug: "worm",
    priceCents: 1800,
    images: [
      '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="220" fill="#111827"/><text x="40" y="80" fill="#10b981" font-family="Arial Black" font-size="28">PRESS /</text><text x="40" y="120" fill="#6ee7b7" font-family="IBM Plex Mono" font-size="12">worm editorial drop</text></svg>',
    ],
  },
  {
    slug: "tarns-field-kit",
    title: "TARNS Field Kit",
    description: "On-site photoshoot blueprint with alpine mood boards, color grades, and shot math.",
    universeSlug: "tarns",
    priceCents: 3600,
    images: [
      '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="220" fill="#e2e8f0"/><text x="42" y="70" fill="#0f172a" font-family="Didot" font-size="28">FIELD KIT</text><text x="42" y="102" fill="#1d3b5c" font-family="IBM Plex Mono" font-size="12">tarns alpine study</text><rect x="220" y="50" width="90" height="120" fill="#1d3b5c" opacity="0.18"/></svg>',
    ],
  },
  {
    slug: "tarns-linen-edits",
    title: "Linen Edits",
    description: "Minimalist song edits with string overdubs, couture lyric sheet, and vinyl mockup.",
    universeSlug: "tarns",
    priceCents: 2800,
    images: [
      '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="220" fill="#f1f5f9"/><circle cx="100" cy="110" r="56" fill="#0ea5e9" opacity="0.18"/><text x="180" y="120" fill="#0f172a" font-family="Bodoni MT" font-size="24">Linen</text><text x="180" y="150" fill="#1d3b5c" font-family="IBM Plex Mono" font-size="12">edits / chamber pop</text></svg>',
    ],
  },
  {
    slug: "tarns-precision-pack",
    title: "Precision Pack",
    description: "Discipline-first vocal comping, lyric atelier, and cinematic score cues.",
    universeSlug: "tarns",
    priceCents: 4400,
    images: [
      '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><rect width="360" height="220" fill="#e5e7eb"/><rect x="60" y="50" width="240" height="40" fill="#0f172a"/><text x="70" y="78" fill="#f8fafc" font-family="Arial" font-size="18">Precision Pack</text><line x1="60" y1="130" x2="300" y2="130" stroke="#1d3b5c" stroke-width="4"/></svg>',
    ],
  },
];

export const collaboratorProfiles = [
  {
    displayName: "Mara Volt",
    bio: "Lighting designer translating bass frequencies into kinetic strobes.",
    disciplines: ["Light Design", "Visual Systems"],
    location: "Berlin",
    website: "https://volt.studio",
    portfolioItemsJson: [
      { title: "Chromatic Pulse", note: "Immersive LED sculpture for warehouse residencies." },
      { title: "Shadow Stitch", note: "Projection-mapped garments for TARNS alpine set." },
    ],
  },
  {
    displayName: "Enea Park",
    bio: "Song architect balancing brutalist drums with glassy falsetto stacks.",
    disciplines: ["Production", "Vocal Design"],
    location: "Seoul",
    website: "https://enea.audio",
    portfolioItemsJson: [
      { title: "Helix Choir", note: "Layered choirs processed through modular verbs." },
      { title: "Steel Bloom", note: "TARNS micro-score with origami strings." },
    ],
  },
  {
    displayName: "Vela Armand",
    bio: "Couture stylist crafting runway-grade silhouettes for stage.",
    disciplines: ["Styling", "Creative Direction"],
    location: "Paris",
    website: "https://vela.studio",
    portfolioItemsJson: [
      { title: "Ink Folds", note: "Pleated black latex set with chrome piping for WORM." },
      { title: "Lapis Quiet", note: "Alpine monochrome layering for TARNS premiere." },
    ],
  },
  {
    displayName: "Sura Inez",
    bio: "Motion director choreographing cameras like dancers.",
    disciplines: ["Video", "Choreography"],
    location: "Mexico City",
    website: "https://sura.video",
    portfolioItemsJson: [
      { title: "Axis Run", note: "One-shot steadicam sprint through neon corridor." },
      { title: "Glacier Breath", note: "Drone ballet over frozen tarn, synced to strings." },
    ],
  },
  {
    displayName: "Kei Harlow",
    bio: "Full-stack technologist building interaction layers for live shows.",
    disciplines: ["Engineering", "Interaction"],
    location: "Toronto",
    website: "https://kei.systems",
    portfolioItemsJson: [
      { title: "Stamp Engine", note: "On-chain signature visualizer for studiio drops." },
      { title: "Signal Weave", note: "Networked MIDI lighting for WORM underground." },
    ],
  },
  {
    displayName: "Nia Row",
    bio: "Photographer capturing stillness in kinetic spaces.",
    disciplines: ["Photography"],
    location: "New York",
    website: "https://nia.studio",
    portfolioItemsJson: [
      { title: "Echo Portraits", note: "Portraits printed on mirrored acrylic." },
      { title: "Quiet Flash", note: "Flash photography of midnight rehearsals." },
    ],
  },
];

export const demoUsers: { email: string; role: RoleType; name: string }[] = [
  { email: "fan@studi.io", role: "FAN", name: "Demo Fan" },
  { email: "collab@studi.io", role: "COLLABORATOR", name: "Demo Collaborator" },
  { email: "artist@studi.io", role: "ARTIST_ADMIN", name: "Demo Artist Admin" },
  { email: "admin@studi.io", role: "ADMIN", name: "Platform Admin" },
];
