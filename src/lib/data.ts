import content from "./content.json";
import heroArtist from "@/assets/hero-artist.jpg";
import { seeded } from "./format";

export type Country = { code: string; name: string; flag: string };

const FALLBACK_COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "GLOBAL", name: "Global", flag: "🌍" },
];

export type Artist = {
  id: string;
  name: string;
  country: string;
  genres: string[];
  label: string;
  verified: boolean;
  monthlyListeners: number;
  followers: number;
  bio: string;
  image: string;
  cover: string;
  socials: { spotify?: string; apple?: string; instagram?: string; twitter?: string };
};

export type Song = {
  id: string;
  rank: number;
  prevRank: number | null;
  peak: number;
  weeks: number;
  title: string;
  artistId: string;
  artistName: string;
  featured?: string[];
  albumId?: string;
  label: string;
  genre: string;
  release: string;
  isrc: string;
  score: number;
  streams: number;
  artwork: string;
  image?: string;
  producers: string[];
  writers: string[];
  breakdown: { platform: string; value: number; color: string }[];
  history: { week: string; rank: number; score: number }[];
  daily: { day: string; streams: number }[];
};

export type Album = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  release: string;
  label: string;
  genre: string;
  streams: number;
  peak: number;
  weeks: number;
  rank: number;
  prevRank: number | null;
  certification: string;
  artwork: string;
  tracklist: { n: number; title: string; duration: string; streams: number }[];
};

type ContentFile = {
  COUNTRIES?: Country[];
  ARTISTS?: Artist[];
  SONGS?: Song[];
  ALBUMS?: Album[];
  HOME_CONTENT?: {
    chartTitle: string;
    chartSubtitle: string;
    showChartNumbers: boolean;
    newsTitle: string;
    newsSubtitle: string;
    livePulseTitle: string;
    livePulseSubtitle: string;
    livePulseItems: { tag: string; title: string; detail: string }[];
  };
  NEWS?: { id: string; title: string; excerpt: string; date: string; category: string }[];
  AWARDS_2026?: { category: string; nominees: string[] }[];
  CHART_METRICS?: { name: string; value: number; color: string }[];
};

const json = content as ContentFile;

export const COUNTRIES: Country[] = json.COUNTRIES ?? FALLBACK_COUNTRIES;

const ARTWORK_PALETTES = [
  "from-rose-600 via-red-700 to-neutral-900",
  "from-amber-500 via-red-600 to-neutral-900",
  "from-fuchsia-600 via-purple-800 to-neutral-900",
  "from-emerald-500 via-teal-700 to-neutral-900",
  "from-sky-500 via-indigo-700 to-neutral-900",
  "from-orange-500 via-rose-700 to-neutral-900",
  "from-yellow-400 via-orange-600 to-neutral-900",
  "from-lime-500 via-emerald-700 to-neutral-900",
  "from-pink-500 via-rose-700 to-neutral-900",
  "from-slate-400 via-slate-700 to-neutral-900",
];

const artworkFor = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return ARTWORK_PALETTES[Math.abs(h) % ARTWORK_PALETTES.length];
};

const FALLBACK_ARTISTS: Artist[] = [
  { id: "davido", name: "Davido", country: "NG", genres: ["Afrobeats", "Afropop"], label: "DMW / Sony", verified: true, monthlyListeners: 28400000, followers: 12100000, bio: "Nigerian-American singer, songwriter and producer. One of the pioneers of the global Afrobeats movement.", image: "", cover: "", socials: {} },
  { id: "shallipopi", name: "Shallipopi", country: "NG", genres: ["Afrobeats", "Street Pop"], label: "Plutomania", verified: true, monthlyListeners: 14800000, followers: 4200000, bio: "Benin City-born street-pop phenom leading the new Naija wave.", image: "", cover: "", socials: {} },
  { id: "olamide", name: "Olamide", country: "NG", genres: ["Afrobeats", "Hip Hop"], label: "YBNL Nation", verified: true, monthlyListeners: 19200000, followers: 8400000, bio: "YBNL boss and a defining voice of the Lagos street-hop era.", image: "", cover: "", socials: {} },
  { id: "burna-boy", name: "Burna Boy", country: "NG", genres: ["Afro-fusion"], label: "Spaceship / Atlantic", verified: true, monthlyListeners: 34100000, followers: 15600000, bio: "Grammy-winning African Giant fusing Afrobeats, dancehall and jazz.", image: "", cover: "", socials: {} },
  { id: "ayra-starr", name: "Ayra Starr", country: "NG", genres: ["Afropop"], label: "Mavin Records", verified: true, monthlyListeners: 22700000, followers: 6900000, bio: "Mavin's Celestial Being — voice of a new generation of African pop.", image: "", cover: "", socials: {} },
  { id: "boy-spyce", name: "Boy Spyce", country: "NG", genres: ["Afropop"], label: "Mavin Records", verified: true, monthlyListeners: 6800000, followers: 1800000, bio: "Mavin-signed rising talent redefining melodic Afropop.", image: "", cover: "", socials: {} },
  { id: "kizz-daniel", name: "Kizz Daniel", country: "NG", genres: ["Afropop"], label: "FLYBOY INC.", verified: true, monthlyListeners: 20400000, followers: 5500000, bio: "Buga hitmaker with a global run of Afropop anthems.", image: "", cover: "", socials: {} },
  { id: "asake", name: "Asake", country: "NG", genres: ["Afrobeats", "Amapiano"], label: "YBNL / EMPIRE", verified: true, monthlyListeners: 25600000, followers: 7300000, bio: "Mr. Money — the log-drum-driven face of modern Afrobeats.", image: "", cover: "", socials: {} },
  { id: "ruger", name: "Ruger", country: "NG", genres: ["Afro-dancehall"], label: "Jonzing World", verified: true, monthlyListeners: 12900000, followers: 3400000, bio: "Eye-patched dancehall-tinged Afropop star.", image: "", cover: "", socials: {} },
  { id: "rema", name: "Rema", country: "NG", genres: ["Afrobeats"], label: "Mavin / Jonzing", verified: true, monthlyListeners: 41200000, followers: 11800000, bio: "Calm Down superstar — the biggest Afrobeats crossover of the streaming era.", image: "", cover: "", socials: {} },
  { id: "chris-brown", name: "Chris Brown", country: "US", genres: ["R&B"], label: "RCA", verified: true, monthlyListeners: 58400000, followers: 41200000, bio: "Grammy-winning R&B superstar.", image: "", cover: "", socials: {} },
  { id: "wizkid", name: "Wizkid", country: "NG", genres: ["Afrobeats"], label: "Starboy / RCA", verified: true, monthlyListeners: 26100000, followers: 9800000, bio: "Starboy — one of the architects of Afrobeats to the world.", image: "", cover: "", socials: {} },
  { id: "tems", name: "Tems", country: "NG", genres: ["Alté", "R&B"], label: "RCA", verified: true, monthlyListeners: 24800000, followers: 5100000, bio: "Grammy & Oscar-nominated singer-producer.", image: "", cover: "", socials: {} },
  { id: "black-sherif", name: "Black Sherif", country: "GH", genres: ["Drill", "Highlife"], label: "Empire", verified: true, monthlyListeners: 9700000, followers: 2100000, bio: "Ghanaian drill-highlife pioneer.", image: "", cover: "", socials: {} },
  { id: "tyla", name: "Tyla", country: "ZA", genres: ["Amapiano", "Pop"], label: "Epic", verified: true, monthlyListeners: 31400000, followers: 6600000, bio: "South African Grammy winner spreading Amapiano worldwide.", image: "", cover: "", socials: {} },
];

export const ARTISTS: Artist[] = json.ARTISTS ?? FALLBACK_ARTISTS;

const FALLBACK_HOME_CONTENT = {
  chartTitle: "Frosh Top 100",
  chartSubtitle: "Week 20, 2026 · Updated Sunday",
  showChartNumbers: true,
  newsTitle: "Live News TV",
  newsSubtitle: "Fresh stories, drops, and chart moments from the Frosh newsroom.",
  livePulseTitle: "Live Music Pulse",
  livePulseSubtitle: "Scrolling updates from the culture.",
  livePulseItems: [
    { tag: "Now Playing", title: "Burna Boy teases a new visual drop", detail: "Fan reactions are already climbing." },
    { tag: "Chart Move", title: "Ayra Starr is closing in on the top tier", detail: "Momentum keeps building across the board." },
    { tag: "Breaking", title: "Amapiano is trending across the globe", detail: "New playlists are driving a fresh wave." },
  ],
};

const FALLBACK_NEWS = [
  { id: "n1", title: "Burna Boy Announces New Album 'No Sign of Weakness'", excerpt: "The African Giant returns with an eight-track project featuring…", date: "May 20, 2026", category: "Breaking" },
  { id: "n2", title: "Ayra Starr Wins Best African Act at 2026 BET Awards", excerpt: "The Mavin star takes home her first BET trophy in Los Angeles.", date: "May 19, 2026", category: "Awards" },
  { id: "n3", title: "Davido's '5IVE' Debuts at #1 on Frosh Top 100", excerpt: "Biggest opening week of 2026 with 8.4M weighted units.", date: "May 18, 2026", category: "Chart News" },
  { id: "n4", title: "Amapiano Streams Cross 12B on Frosh Global Index", excerpt: "The South African-born genre continues its explosive global takeover.", date: "May 15, 2026", category: "Analysis" },
  { id: "n5", title: "Interview: Tyla on Turning 'Water' Into A Global Movement", excerpt: "Our long-form sit-down with the Grammy-winning Amapiano-pop star.", date: "May 12, 2026", category: "Interviews" },
  { id: "n6", title: "Review: Asake's 'Lungu Boy' Is A Coronation", excerpt: "YBNL's Mr. Money delivers his most refined statement yet.", date: "May 10, 2026", category: "Reviews" },
];

const FALLBACK_AWARDS_2026 = [
  { category: "Song of the Year", nominees: ["5IVE — Davido", "KAI — Olamide", "MY DARLING — Burna Boy", "PRESSURE — Ayra Starr", "OGECHI — Boy Spyce"] },
  { category: "Album of the Year", nominees: ["Timeless — Davido", "I Told Them... — Burna Boy", "Work Of Art — Asake", "Ravage — Rema", "Mr. Money With The Vibe — Asake"] },
  { category: "Artist of the Year", nominees: ["Davido", "Burna Boy", "Rema", "Ayra Starr", "Asake"] },
  { category: "Best New Artist", nominees: ["Shallipopi", "Boy Spyce", "Odumodublvck", "Bloody Civilian", "Qing Madi"] },
  { category: "Producer of the Year", nominees: ["Magicsticks", "P.Priime", "London", "Sarz", "Kel P"] },
];

const FALLBACK_CHART_METRICS = [
  { name: "Streaming", value: 60, color: "var(--color-primary)" },
  { name: "Airplay", value: 20, color: "oklch(0.78 0.16 75)" },
  { name: "Sales", value: 10, color: "oklch(0.72 0.17 155)" },
  { name: "TikTok", value: 5, color: "oklch(0.65 0.18 265)" },
  { name: "YouTube", value: 5, color: "oklch(0.7 0.18 320)" },
];

export const HOME_CONTENT = json.HOME_CONTENT ?? FALLBACK_HOME_CONTENT;
export const NEWS = json.NEWS ?? FALLBACK_NEWS;
export const AWARDS_2026 = json.AWARDS_2026 ?? FALLBACK_AWARDS_2026;
export const CHART_METRICS = json.CHART_METRICS ?? FALLBACK_CHART_METRICS;

const rng = seeded(1337);

const SONG_TITLES = [
  "5IVE", "LAHO", "KAI", "MY DARLING", "PRESSURE", "OGECHI", "TWE TWE", "AS IT DEY GO",
  "SUNDAY", "GRATEFUL", "MMS", "HIGHER", "OZEBA", "COMMOTION", "OVER", "AGO",
  "GIDI", "CITY BOYS", "TESTED, APPROVED & TRUSTED", "LONELY AT THE TOP",
  "UNAVAILABLE", "MILLION DOLLAR", "SITY", "AMAPIANO GRACE", "HOLY GHOST FIRE",
  "STAND STRONG", "BUGA", "COUGH", "ROCKSTAR", "TIWA", "SOWETO", "MONALISA",
  "IWA", "CALM DOWN", "LAST LAST", "SITY 2", "ADURA", "FAVOUR", "BLESSINGS",
  "FEVER", "RUNAWAY", "OTILE", "SISI", "LAGOS", "ZAZOO", "PORTABLE",
  "SUGARCANE", "OVERDOSE", "AZUL", "NOBODY"
];

const LABELS = ["DMW", "Mavin Records", "YBNL", "Starboy", "Spaceship", "Chocolate City", "EMPIRE", "Plutomania", "RCA", "Atlantic", "Jonzing World", "Native Records"];
const GENRES = ["Afrobeats", "Afropop", "Amapiano", "Hip Hop", "R&B", "Alté", "Highlife", "Drill", "Afro-fusion"];
const PLATFORMS = [
  { name: "Streaming", color: "var(--color-primary)" },
  { name: "Airplay", color: "oklch(0.78 0.16 75)" },
  { name: "Sales", color: "oklch(0.72 0.17 155)" },
  { name: "TikTok", color: "oklch(0.65 0.18 265)" },
  { name: "YouTube", color: "oklch(0.7 0.18 320)" },
];

function makeHistory(currentRank: number, weeks: number): Song["history"] {
  const out: Song["history"] = [];
  let r = Math.min(100, currentRank + Math.floor(rng() * 40) + 10);
  for (let i = weeks; i > 0; i--) {
    r = Math.max(1, Math.min(100, r + Math.round((rng() - 0.55) * 8)));
    if (i === 1) r = currentRank;
    out.push({
      week: `W${52 - i}`,
      rank: r,
      score: Math.max(20, 100 - r * 0.7 + (rng() - 0.5) * 8),
    });
  }
  return out;
}
function makeDaily(base: number): Song["daily"] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((d) => ({ day: d, streams: Math.round(base * (0.7 + rng() * 0.6)) }));
}

function makeBreakdown(): Song["breakdown"] {
  const weights = PLATFORMS.map(() => 5 + rng() * 40);
  const sum = weights.reduce((a, b) => a + b, 0);
  return PLATFORMS.map((p, i) => ({ platform: p.name, value: Math.round((weights[i] / sum) * 100), color: p.color }));
}

const FALLBACK_SONGS: Song[] = Array.from({ length: 100 }, (_, i) => {
  const rank = i + 1;
  const title = SONG_TITLES[i % SONG_TITLES.length] + (i >= SONG_TITLES.length ? " II" : "");
  const artist = ARTISTS[i % ARTISTS.length];
  const weeks = 1 + Math.floor(rng() * 30);
  const prev = rng() > 0.2 ? Math.max(1, Math.min(100, rank + Math.round((rng() - 0.4) * 12))) : null;
  const peak = Math.max(1, Math.min(rank, Math.floor(rng() * rank) || 1));
  const streams = Math.round(300000 + (100 - rank) * 180000 + rng() * 200000);
  const score = Math.max(20, 100 - rank * 0.72 + rng() * 3);
  return {
    id: `song-${rank}`,
    rank,
    prevRank: prev,
    peak,
    weeks,
    title,
    artistId: artist.id,
    artistName: artist.name,
    label: LABELS[Math.floor(rng() * LABELS.length)],
    genre: GENRES[Math.floor(rng() * GENRES.length)],
    release: `2024-${String(1 + Math.floor(rng() * 12)).padStart(2, "0")}-${String(1 + Math.floor(rng() * 28)).padStart(2, "0")}`,
    isrc: `NGA1A24${String(100000 + Math.floor(rng() * 899999))}`,
    score: Math.round(score * 100) / 100,
    streams,
    artwork: artworkFor(title + artist.id),
    image: rank === 1 ? heroArtist : undefined,
    producers: ["Magicsticks", "P.Priime", "London", "Sarz"].slice(0, 1 + Math.floor(rng() * 3)),
    writers: [artist.name, "Kel P", "Boi-1da"].slice(0, 1 + Math.floor(rng() * 2)),
    breakdown: makeBreakdown(),
    history: makeHistory(rank, Math.min(weeks, 20)),
    daily: makeDaily(streams / 7),
  };
});

export const SONGS: Song[] = json.SONGS ?? FALLBACK_SONGS;

const FALLBACK_ALBUMS: Album[] = ARTISTS.slice(0, 12).map((a, i) => {
  const tracks = 8 + Math.floor(rng() * 8);
  const streams = 40000000 + Math.floor(rng() * 200000000);
  const rank = i + 1;
  return {
    id: `album-${a.id}`,
    title: ["Timeless", "Work Of Art", "I Told Them...", "Rave & Roses", "Mr. Money With The Vibe", "Love, Damini", "Made In Lagos", "Playboy", "Boy Alone", "Nectar", "Ravage", "The Rebirth"][i] ?? `Album ${i + 1}`,
    artistId: a.id,
    artistName: a.name,
    release: `2024-0${(i % 9) + 1}-15`,
    label: a.label,
    genre: a.genres[0],
    streams,
    peak: 1 + Math.floor(rng() * 5),
    weeks: 4 + Math.floor(rng() * 40),
    rank,
    prevRank: Math.max(1, rank + Math.round((rng() - 0.5) * 4)),
    certification: ["Diamond", "3x Platinum", "2x Platinum", "Platinum", "Gold"][Math.floor(rng() * 5)],
    artwork: artworkFor(a.id + "album"),
    tracklist: Array.from({ length: tracks }, (_, t) => ({
      n: t + 1,
      title: SONG_TITLES[(i * 3 + t) % SONG_TITLES.length],
      duration: `${2 + Math.floor(rng() * 3)}:${String(10 + Math.floor(rng() * 50)).padStart(2, "0")}`,
      streams: Math.floor(500000 + rng() * 80000000),
    })),
  };
});

export const ALBUMS: Album[] = json.ALBUMS ?? FALLBACK_ALBUMS;

export const gainers = [...SONGS].sort((a, b) => (b.prevRank ?? 100) - (a.prevRank ?? 100) - (b.rank - a.rank)).slice(0, 5);
export const drops = [...SONGS].filter(s => s.prevRank && s.prevRank < s.rank).sort((a,b)=> (b.rank-(b.prevRank??0))-(a.rank-(a.prevRank??0))).slice(0,5);

export const getSong = (id: string) => SONGS.find(s => s.id === id);
export const getArtist = (id: string) => ARTISTS.find(a => a.id === id);
export const getAlbum = (id: string) => ALBUMS.find(a => a.id === id);
export const songsByArtist = (id: string) => SONGS.filter(s => s.artistId === id);
export const albumsByArtist = (id: string) => ALBUMS.filter(a => a.artistId === id);
export const getAppleMusicSearchUrl = (title: string, artist: string) => {
  const query = `${title} ${artist}`.trim();
  return `https://music.apple.com/search?term=${encodeURIComponent(query)}`;
};
