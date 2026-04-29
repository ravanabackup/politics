import { useEffect, useMemo, useState } from "react";

const fullCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 2,
});

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const partySpendList = [
  { name: "Bharatiya Janata Party", spend: "₹2,540,000,000" },
  {
    name: "Central Bureau of Communication (previously known as DAVP- Directorate of Advertising and Visual Publicity)",
    spend: "₹971,000,000",
  },
  { name: "Indian National Congress", spend: "₹869,000,000" },
  { name: "Populus Empowerment Network Private Limited", spend: "₹545,000,000" },
  { name: "INDIAN PAC CONSULTING PRIVATE LIMITED", spend: "₹357,000,000" },
  { name: "Way2News Private Limited", spend: "₹246,000,000" },
  { name: "Dravida Munnetra Kazhagam", spend: "₹215,000,000" },
  { name: "Biju Janata Dal", spend: "₹213,000,000" },
  { name: "D B Corp Limited", spend: "₹139,000,000" },
  { name: "Central Bureau of Communication", spend: "₹139,000,000" },
  { name: "Yuvajana Sramika Rythu Congress Party", spend: "₹129,000,000" },
  { name: "BHARAT RASHTRA SAMITHI", spend: "₹121,000,000" },
  { name: "T.V. TODAY NETWORK LIMITED", spend: "₹117,000,000" },
  { name: "ZEE Entertainment Enterprise Limited", spend: "₹95,400,000" },
  { name: "GIBBOUS FILMS PRIVATE LIMITED", spend: "₹88,500,000" },
  { name: "Directorate of Advertising and Visual Publicity", spend: "₹88,100,000" },
  {
    name: "Information and Cultural Affairs Department, Government of West Bengal",
    spend: "₹87,600,000",
  },
  { name: "All india anna dravida munnetra kazhagam", spend: "₹73,200,000" },
  { name: "PrimeTrace Technologies pvt ltd", spend: "₹68,300,000" },
  { name: "Angel One Limited", spend: "₹67,400,000" },
  { name: "Telugu Desam Party", spend: "₹65,000,000" },
  { name: "Directorate of Public Relations, Madhya Pradesh", spend: "₹64,900,000" },
  { name: "Spangle PR&Media Private Limited", spend: "₹63,000,000" },
  { name: "Andhra Pradesh Digital Corporation Limited", spend: "₹50,800,000" },
  { name: "Bombinate Technologies Pvt. Ltd.", spend: "₹50,700,000" },
  { name: "Directorate of Information (Dol), Government of Gujarat, Gandhinagar", spend: "₹47,600,000" },
  { name: "Zee Entertainment Enterprises Limited", spend: "₹43,900,000" },
  { name: "BMEG PRIVATE LIMITED", spend: "₹38,800,000" },
  { name: "DESIGNBOXED INNOVATIONS PRIVATE LIMITED", spend: "₹38,500,000" },
  { name: "Shree Cement Ltd", spend: "₹37,900,000" },
  { name: "YOptima Media Solutions Private Limited", spend: "₹37,800,000" },
  { name: "Samvad", spend: "₹37,300,000" },
  { name: "Information & Cultural Affairs Department, Government of West Bengal", spend: "₹36,600,000" },
  { name: "Electronics & Information Technology Department, Government of Odisha", spend: "₹36,400,000" },
  { name: "Auburn Digital Solutions Private Limited", spend: "₹33,300,000" },
  { name: "Aam Aadmi Party", spend: "₹32,100,000" },
  { name: "PUNJAB STATE MEDIA SOCIETY (PUNMEDIA)", spend: "₹31,700,000" },
  { name: "TIMES INTERNET LIMITED", spend: "₹31,200,000" },
  { name: "SIMPLESENSE ANALYTICS PRIVATE LIMITED", spend: "₹29,700,000" },
  { name: "GROUP M MEDIA INDIA PVT. LTD.", spend: "₹27,400,000" },
  { name: "DREAMWORTH SOLUTIONS PRIVATE LIMITED", spend: "₹22,600,000" },
  { name: "Ver Se Innovation Private Limited", spend: "₹22,300,000" },
  { name: "Kinesso India Private Limited", spend: "₹21,200,000" },
  { name: "Mediacom Communications Pvt Ltd", spend: "₹20,200,000" },
  { name: "Network18 Media and Investments Limited", spend: "₹19,100,000" },
  { name: "Inuxu Digital Media Technologies Private Limited", spend: "₹18,300,000" },
  { name: "Jagran Prakashan Limited", spend: "₹17,700,000" },
  { name: "ARHA MEDIA & BROADCASTING PRIVATE LIMITED", spend: "₹17,300,000" },
  { name: "Netflix Entertainment Service India LLP", spend: "₹17,200,000" },
  { name: "Everymedia Technologies Private Limited", spend: "₹17,100,000" },
  { name: "JIOSTAR INDIA PRIVATE LIMITED", spend: "₹16,900,000" },
  { name: "DEPARTMENT OF INFORMATION & PUBLIC RELATIONS (DIPR)", spend: "₹16,100,000" },
  { name: "Amazon Seller Services Private Limited", spend: "₹16,100,000" },
  { name: "INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS", spend: "₹16,000,000" },
  { name: "Gillette India Limited", spend: "₹15,300,000" },
  { name: "DIRECTORATE OF INFORMATION AND PUBLIC RELATIONS ASSAM", spend: "₹15,200,000" },
  { name: "Amazon Seller Services Pvt Ltd", spend: "₹13,900,000" },
  { name: "Aadhan Media Pvt. ltd.", spend: "₹13,600,000" },
  { name: "Joy Of Giving Global Foundation", spend: "₹13,500,000" },
  { name: "GSPK Consultancy Private Limited", spend: "₹12,900,000" },
  { name: "Buzz & Chatter Private Limited", spend: "₹12,600,000" },
  { name: "HIVEMINDS INNOVATIVE MARKET SOLUTIONS PRIVATE LIMITED", spend: "₹11,700,000" },
  { name: "Department of Information and Public Relations Tamil Nadu", spend: "₹11,200,000" },
  { name: "Adglobal 360 India Private Limited", spend: "₹11,200,000" },
  { name: "MyGov India", spend: "₹11,100,000" },
  { name: "Culver Max Entertainment Private Limited", spend: "₹10,800,000" },
  { name: "Maheshwari Publicity Service", spend: "₹10,600,000" },
  { name: "GroupM Media India Private Limited", spend: "₹10,600,000" },
  { name: "Bharatiya Janata party, Maharashtra", spend: "₹10,600,000" },
  { name: "THG Publishing Private Limited", spend: "₹10,000,000" },
  { name: "Shiromani Akali Dal", spend: "₹9,960,000" },
  { name: "Tamil Development and Information Department", spend: "₹9,460,000" },
  { name: "BRANDSUM TECH SOLUTIONS PRIVATE LIMITED", spend: "₹9,310,000" },
  { name: "DesignBoxed Creative INDIA PVT. LTD.", spend: "₹8,890,000" },
  { name: "Shashikant Anpat", spend: "₹8,800,000" },
  { name: "SOURAV GANDOTRA", spend: "₹8,670,000" },
  { name: "Nationalist Congress Party - Sharadchandra Pawar", spend: "₹8,480,000" },
  { name: "SAMVAD", spend: "₹7,850,000" },
  { name: "SUN PHARMACEUTICAL INDUSTRIES LIMITED", spend: "₹7,730,000" },
  { name: "CRAYONS.ADVERTISING Private Limited", spend: "₹7,510,000" },
  { name: "UltraTech Cement Limited", spend: "₹7,450,000" },
  { name: "social kinnect pvt ltd", spend: "₹6,920,000" },
  { name: "Mala Ram", spend: "₹6,730,000" },
  { name: "Information & Public Relation Department", spend: "₹6,370,000" },
  { name: "Atwias info solutions private limited", spend: "₹6,280,000" },
  { name: "Socheers Infotech Private Limited", spend: "₹6,110,000" },
  { name: "GREENSHOOTS MULTIMEDIA PRIVATE LIMITED", spend: "₹6,110,000" },
  { name: "Neomarqflare Solutions LLP", spend: "₹6,080,000" },
  { name: "TIPS MUSIC LIMITED", spend: "₹5,980,000" },
  { name: "RVR Networks India Pvt Ltd", spend: "₹5,850,000" },
  { name: "Pritham Yaramaka", spend: "₹5,650,000" },
  { name: "Everymedia Technologies Pvt Ltd.", spend: "₹5,410,000" },
  { name: "RSPL Limited", spend: "₹5,380,000" },
  { name: "CVR IDREAM MEDIA PRIVATE LIMITED", spend: "₹5,350,000" },
  { name: "White Rivers Media Solutions Private Limited", spend: "₹5,330,000" },
  { name: "Business Standard Private Limited", spend: "₹5,300,000" },
  { name: "DIVO TV PRIVATE LIMITED", spend: "₹5,240,000" },
  { name: "COMMUNIST PARTY OF INDIA (MARXIST)", spend: "₹5,100,000" },
];

const defaultLocations = [
  { state: "Pan-India", amount: "₹1,200,000,000" },
  { state: "Maharashtra", amount: "₹310,000,000" },
  { state: "Delhi", amount: "₹210,000,000" },
  { state: "Uttar Pradesh", amount: "₹180,000,000" },
];

const partyLocations: Record<string, { state: string; amount: string }[]> = {
  "Bharatiya Janata Party": [
    { state: "Uttar Pradesh", amount: "₹648,000,000" },
    { state: "Maharashtra", amount: "₹540,000,000" },
    { state: "Delhi", amount: "₹402,000,000" },
    { state: "Tamil Nadu", amount: "₹389,000,000" },
  ],
  "Indian National Congress": [
    { state: "Maharashtra", amount: "₹190,000,000" },
    { state: "Karnataka", amount: "₹160,000,000" },
    { state: "Rajasthan", amount: "₹140,000,000" },
    { state: "Uttar Pradesh", amount: "₹120,000,000" },
  ],
  "Aam Aadmi Party": [
    { state: "Delhi", amount: "₹98,000,000" },
    { state: "Punjab", amount: "₹72,000,000" },
    { state: "Haryana", amount: "₹38,000,000" },
    { state: "Gujarat", amount: "₹24,000,000" },
  ],
  "Dravida Munnetra Kazhagam": [
    { state: "Tamil Nadu", amount: "₹149,000,000" },
    { state: "Puducherry", amount: "₹36,000,000" },
    { state: "Kerala", amount: "₹20,000,000" },
    { state: "Delhi", amount: "₹10,000,000" },
  ],
  "Telugu Desam Party": [
    { state: "Andhra Pradesh", amount: "₹42,000,000" },
    { state: "Telangana", amount: "₹15,000,000" },
    { state: "Karnataka", amount: "₹5,000,000" },
    { state: "Tamil Nadu", amount: "₹3,000,000" },
  ],
};

const parseINR = (value: string) =>
  Number(value.replace(/[^0-9]/g, ""));

const buildSparkline = (data: number[]) => {
  if (data.length === 0) return "";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  return data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");
};

export default function App() {
  const [metrics, setMetrics] = useState({
    metaSpend: 184_520_000,
    googleSpend: 142_900_000,
    metaImpressions: 3_420_000_000,
    googleImpressions: 2_680_000_000,
    metaAds: 2380,
    googleAds: 1910,
    metaActive: 286,
    googleActive: 214,
    dailyChange: 2.8,
    weeklyChange: 9.6,
    shareMeta: 56.4,
    shareGoogle: 43.6,
    lastUpdated: new Date(),
  });

  const [metaHistory, setMetaHistory] = useState(
    Array.from({ length: 24 }, (_, index) => 178_500_000 + index * 260_000)
  );
  const [googleHistory, setGoogleHistory] = useState(
    Array.from({ length: 24 }, (_, index) => 137_800_000 + index * 210_000)
  );
  const [velocity, setVelocity] = useState({ meta: 0, google: 0 });
  const [range, setRange] = useState("1 month");
  const [selectedParty, setSelectedParty] = useState(partySpendList[0]?.name ?? "");

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => {
        const metaDelta = randomBetween(120_000, 420_000);
        const googleDelta = randomBetween(90_000, 320_000);
        const nextMetaSpend = prev.metaSpend + metaDelta;
        const nextGoogleSpend = prev.googleSpend + googleDelta;
        const metaImpressions =
          prev.metaImpressions + randomBetween(1_500_000, 3_800_000);
        const googleImpressions =
          prev.googleImpressions + randomBetween(1_200_000, 3_200_000);

        setMetaHistory((history) => [...history.slice(-23), nextMetaSpend]);
        setGoogleHistory((history) => [...history.slice(-23), nextGoogleSpend]);
        setVelocity({ meta: metaDelta / 4, google: googleDelta / 4 });

        return {
          ...prev,
          metaSpend: nextMetaSpend,
          googleSpend: nextGoogleSpend,
          metaImpressions,
          googleImpressions,
          metaAds: prev.metaAds + Math.round(randomBetween(1, 6)),
          googleAds: prev.googleAds + Math.round(randomBetween(1, 5)),
          metaActive: Math.max(180, prev.metaActive + Math.round(randomBetween(-2, 4))),
          googleActive: Math.max(
            160,
            prev.googleActive + Math.round(randomBetween(-2, 3))
          ),
          dailyChange: Math.min(
            4.5,
            Math.max(1.5, prev.dailyChange + randomBetween(-0.2, 0.25))
          ),
          weeklyChange: Math.min(
            12,
            Math.max(6, prev.weeklyChange + randomBetween(-0.3, 0.35))
          ),
          shareMeta: Math.min(
            64,
            Math.max(50, prev.shareMeta + randomBetween(-0.25, 0.25))
          ),
          shareGoogle: Math.min(
            50,
            Math.max(36, prev.shareGoogle + randomBetween(-0.25, 0.25))
          ),
          lastUpdated: new Date(),
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const totalSpend = useMemo(
    () => metrics.metaSpend + metrics.googleSpend,
    [metrics.metaSpend, metrics.googleSpend]
  );

  const totalImpressions = useMemo(
    () => metrics.metaImpressions + metrics.googleImpressions,
    [metrics.metaImpressions, metrics.googleImpressions]
  );

  const metaSparkline = useMemo(() => buildSparkline(metaHistory), [metaHistory]);
  const googleSparkline = useMemo(
    () => buildSparkline(googleHistory),
    [googleHistory]
  );

  const rangeFactor = useMemo(() => {
    switch (range) {
      case "1 day":
        return 0.03;
      case "1 week":
        return 0.25;
      default:
        return 1;
    }
  }, [range]);

  const formatFilteredSpend = (value: string) =>
    fullCurrencyFormatter.format(Math.round(parseINR(value) * rangeFactor));

  const selectedPartyData = useMemo(
    () => partySpendList.find((party) => party.name === selectedParty) ?? partySpendList[0],
    [selectedParty]
  );
  const selectedLocations = useMemo(
    () => partyLocations[selectedPartyData?.name ?? ""] ?? defaultLocations,
    [selectedPartyData]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f1a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-10 h-96 w-96 rounded-full bg-cyan-400/30 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/30 blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-400/25 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-2xl shadow-[0_20px_80px_rgba(8,15,40,0.35)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-[inset_0_1px_6px_rgba(255,255,255,0.4)]">
              <span className="text-xl">🧊</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-200/70">
                Liquid Glass Command Center
              </p>
              <h1 className="text-xl font-semibold">Indian Politics Team • Live Spend</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/20 px-4 py-2 text-sm text-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              Live sync active
            </div>
            <button className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm text-white/90 backdrop-blur">
              Export dashboard
            </button>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_30px_80px_rgba(8,15,40,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-200/70">
                    Cross-platform pulse
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Real-time spending visibility across Meta + Google
                  </h2>
                  <p className="mt-4 text-base text-slate-200/80">
                    Live aggregation from ad library and transparency feeds.
                    Auto-refreshing every 4 seconds to simulate streaming updates
                    for campaign governance.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-200/70">
                    <span>Filter window</span>
                    {[
                      { label: "One day", value: "1 day" },
                      { label: "One week", value: "1 week" },
                      { label: "One month", value: "1 month" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRange(option.value)}
                        className={`rounded-full border px-3 py-1 text-[11px] transition ${
                          range === option.value
                            ? "border-white/40 bg-white/20 text-white"
                            : "border-white/10 bg-white/10 text-slate-200/70 hover:border-white/30"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="hidden h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/15 text-4xl lg:flex">
                  ✨
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-sm text-slate-200/70">Total spend</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {fullCurrencyFormatter.format(totalSpend)}
                  </p>
                  <p className="mt-2 text-xs text-emerald-200">
                    +{metrics.dailyChange.toFixed(1)}% today
                  </p>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-sm text-slate-200/70">Total impressions</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {compactFormatter.format(totalImpressions)}
                  </p>
                  <p className="mt-2 text-xs text-indigo-200">
                    +{metrics.weeklyChange.toFixed(1)}% week-over-week
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-200/70">Meta spend</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
{fullCurrencyFormatter.format(metrics.metaSpend)}
                    </p>
                  </div>
                  <span className="rounded-full border border-sky-200/30 bg-sky-300/20 px-3 py-1 text-xs text-sky-100">
                    {metrics.shareMeta.toFixed(1)}% share
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-300/70">Active ads</p>
                    <p className="text-lg font-semibold text-white">
                      {metrics.metaActive}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-300/70">Velocity</p>
                    <p className="text-sm font-semibold text-emerald-200">
                      {fullCurrencyFormatter.format(velocity.meta)} / sec
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-200/70">Google spend</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
{fullCurrencyFormatter.format(metrics.googleSpend)}
                    </p>
                  </div>
                  <span className="rounded-full border border-amber-200/30 bg-amber-300/20 px-3 py-1 text-xs text-amber-100">
                    {metrics.shareGoogle.toFixed(1)}% share
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-300/70">Active ads</p>
                    <p className="text-lg font-semibold text-white">
                      {metrics.googleActive}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-300/70">Velocity</p>
                    <p className="text-sm font-semibold text-emerald-200">
                      {fullCurrencyFormatter.format(velocity.google)} / sec
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
                <p className="text-sm text-slate-200/70">Live refresh</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {timeFormatter.format(metrics.lastUpdated)}
                </p>
                <div className="mt-4">
                  <p className="text-xs text-slate-300/70">Ads indexed</p>
                  <p className="text-lg font-semibold text-white">
                    {compactFormatter.format(metrics.metaAds + metrics.googleAds)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Live spend curves</h3>
                <span className="text-xs text-slate-200/70">Last 2 hours</span>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm text-slate-200/70">
                    <span>Meta Ads</span>
                    <span>{fullCurrencyFormatter.format(metrics.metaSpend)}</span>
                  </div>
                  <svg
                    className="mt-3 h-20 w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      fill="none"
                      stroke="rgba(125,211,252,0.9)"
                      strokeWidth="3"
                      points={metaSparkline}
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-slate-200/70">
                    <span>Google Ads</span>
                    <span>{fullCurrencyFormatter.format(metrics.googleSpend)}</span>
                  </div>
                  <svg
                    className="mt-3 h-20 w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      fill="none"
                      stroke="rgba(253,186,116,0.9)"
                      strokeWidth="3"
                      points={googleSparkline}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl">
              <h3 className="text-lg font-semibold text-white">Transparency signals</h3>
              <div className="mt-5 space-y-4 text-sm text-slate-200/80">
                <div className="flex items-center justify-between">
                  <span>Meta library feed latency</span>
                  <span className="text-emerald-200">00:00:32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Google Ads spend update</span>
                  <span className="text-emerald-200">00:01:12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Budget anomaly checks</span>
                  <span className="text-amber-200">Low risk</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cross-platform overlap</span>
                  <span className="text-indigo-200">18% overlap</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Party-wise spend tracking
              </h3>
              <p className="mt-1 text-sm text-slate-200/70">
                Rolling {range} totals across Meta + Google.
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200/70">
              {range} filter
            </span>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3 max-h-[520px] overflow-auto pr-2">
              {partySpendList.map((party) => (
                <button
                  key={party.name}
                  onClick={() => setSelectedParty(party.name)}
                  className={`w-full rounded-3xl border p-5 text-left transition ${
                    selectedParty === party.name
                      ? "border-white/40 bg-white/25"
                      : "border-white/10 bg-white/10 hover:border-white/30"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">
                    {party.name}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-2xl font-semibold text-white">
                      {formatFilteredSpend(party.spend)}
                    </p>
                    <span className="text-xs text-emerald-200">Verified</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-200/70">
                    Spend captured in the last {range}.
                  </p>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                Location breakdown
              </p>
              <h4 className="mt-3 text-lg font-semibold text-white">
                {selectedPartyData?.name}
              </h4>
              <p className="mt-2 text-sm text-slate-200/70">
                Total spend: {formatFilteredSpend(selectedPartyData?.spend ?? "₹0")}
              </p>
              <div className="mt-5 space-y-3">
                {selectedLocations.map((location) => (
                  <div
                    key={`${selectedPartyData?.name}-${location.state}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                  >
                    <span className="text-sm text-white">{location.state}</span>
                    <span className="text-sm font-semibold text-emerald-200">
                      {formatFilteredSpend(location.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-200/60">
                Location splits are estimated from the transparency feed and
                refresh with the {range} filter.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl">
            <h3 className="text-xl font-semibold text-white">
              Campaign intelligence by region
            </h3>
            <p className="mt-2 text-sm text-slate-200/70">
              Derived from active ad impressions and spend velocity.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { state: "Tamil Nadu", spend: "₹1,390,000,000" },
                { state: "Maharashtra", spend: "₹810,000,000" },
                { state: "West Bengal", spend: "₹798,000,000" },
                { state: "Uttar Pradesh", spend: "₹648,000,000" },
                { state: "Telangana", spend: "₹530,000,000" },
                { state: "Bihar", spend: "₹498,000,000" },
                { state: "Delhi", spend: "₹475,000,000" },
                { state: "Andhra Pradesh", spend: "₹451,000,000" },
                { state: "Odisha", spend: "₹422,000,000" },
              ].map((item) => (
                <div
                  key={item.state}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5"
                >
                  <p className="text-sm text-slate-200/70">{item.state}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {formatFilteredSpend(item.spend)}
                  </p>
                  <p className="mt-1 text-xs text-emerald-200">High impact zone</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl">
            <h3 className="text-xl font-semibold text-white">Live alerts</h3>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "High-frequency spend spike",
                  description:
                    "Meta creative burst triggered in 3 metro districts. Suggested review within 10 min.",
                  tone: "text-rose-200",
                },
                {
                  title: "Search budget redistribution",
                  description:
                    "Google Ads shifting 6% budget from display to search.",
                  tone: "text-indigo-200",
                },
                {
                  title: "Fresh approvals",
                  description:
                    "74 new creatives cleared compliance in the last hour.",
                  tone: "text-emerald-200",
                },
              ].map((alert) => (
                <div
                  key={alert.title}
                  className="rounded-3xl border border-white/10 bg-white/10 p-4"
                >
                  <p className={`text-sm font-semibold ${alert.tone}`}>
                    {alert.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-200/70">
                    {alert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Spend governance timeline
              </h3>
              <p className="mt-1 text-sm text-slate-200/70">
                Unified view of Meta Ad Library + Google Ads Transparency Center.
              </p>
            </div>
            <button className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
              Download audit pack
            </button>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                time: "00:02",
                title: "Realtime compliance scan",
                note: "No flagged creatives. All disclosures present.",
              },
              {
                time: "00:07",
                title: "Budget pacing check",
                note: "Meta pacing +2.1% vs target. Google pacing +1.4%.",
              },
              {
                time: "00:11",
                title: "Regional impact update",
                note: "Northern belt impressions increased by 4.2%.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-xs text-slate-200/70">{item.time} ago</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-xs text-slate-200/70">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 px-6 py-4 text-xs text-slate-200/70 backdrop-blur-2xl">
          <p>
            Data stream is refreshed every 4 seconds. Connect API keys for
            authenticated, real-time spending telemetry.
          </p>
          <p>Last refresh {timeFormatter.format(metrics.lastUpdated)} · INR</p>
        </footer>
      </div>
    </div>
  );
}
