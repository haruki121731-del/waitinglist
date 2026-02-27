"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield,
  ScanSearch,
  Bell,
  Zap,
  Copy,
  Check,
  ChevronRight,
  Twitter,
  Eye,
  Lock,
  Fingerprint,
  Globe,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileSearch,
  XCircle,
  CheckCircle2,
} from "lucide-react";

const WAITLIST_URL = "https://waitinglist-xi-sandy.vercel.app";

function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration, start]);
  return { count, ref };
}

function ScanGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), rgba(20,184,166,0.3), transparent)",
          boxShadow: "0 0 20px 2px rgba(56,189,248,0.15)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-sky-500/5 blur-[120px]" />
      <div className="absolute -bottom-40 right-0 w-[600px] h-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, duration: Math.random() * 15 + 10, delay: Math.random() * 5,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-sky-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FadeInSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }: {
  icon: React.ElementType; title: string; desc: string; delay: number;
}) {
  return (
    <FadeInSection delay={delay}>
      <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/20 hover:bg-white/[0.04]">
        <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-sky-500/10 to-teal-500/10 p-3 ring-1 ring-white/[0.05]">
          <Icon className="h-6 w-6 text-sky-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
      </div>
    </FadeInSection>
  );
}

function StepCard({ num, title, desc, icon: Icon, delay }: {
  num: number; title: string; desc: string; icon: React.ElementType; delay: number;
}) {
  return (
    <FadeInSection delay={delay} className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 ring-1 ring-white/10">
            <Icon className="h-7 w-7 text-sky-400" />
          </div>
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-xs font-bold text-white shadow-lg shadow-sky-500/25">
            {num}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
      </div>
    </FadeInSection>
  );
}

// Comparison table: Glaze/Nightshade vs Lore-Anchor
function ComparisonSection() {
  const rows = [
    { label: "セットアップ", glaze: "要ハイスペックPC", lore: "ブラウザだけでOK" },
    { label: "処理時間", glaze: "1枚あたり数分〜十数分", lore: "1〜3分（クラウドGPU）" },
    { label: "見た目への影響", glaze: "設定次第で目立つ", lore: "ほぼ変わらない" },
    { label: "来歴証明", glaze: "なし", lore: "C2PA署名（業界標準）" },
    { label: "著作者ID埋め込み", glaze: "なし", lore: "不可視透かし（128bit）" },
    { label: "既存モデルへの効果", glaze: "限定的", lore: "限定的（正直に言う）" },
    { label: "将来の権利証明", glaze: "できない", lore: "C2PAが証拠になる" },
  ];
  return (
    <FadeInSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Glaze / Nightshadeとの<span className="text-sky-400">違い</span>
            </h2>
            <p className="text-slate-400">正直な比較。誇張なし。</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-4 text-left text-sm font-medium text-slate-400">比較項目</th>
                  <th className="px-5 py-4 text-center text-sm font-medium text-slate-400">Glaze / Nightshade</th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-sky-400">Lore-Anchor</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-b border-white/[0.04] ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                    <td className="px-5 py-3.5 text-sm text-slate-300">{row.label}</td>
                    <td className="px-5 py-3.5 text-center text-sm text-slate-500">
                      <span className="flex items-center justify-center gap-1.5">
                        {row.glaze.includes("できない") || row.glaze.includes("なし") || row.glaze.includes("限定的") ? (
                          <XCircle className="h-4 w-4 shrink-0 text-red-500/70" />
                        ) : null}
                        {row.glaze}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm text-slate-200">
                      <span className="flex items-center justify-center gap-1.5">
                        {!row.lore.includes("限定的") ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                        ) : (
                          <XCircle className="h-4 w-4 shrink-0 text-yellow-500/70" />
                        )}
                        {row.lore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-slate-600">
            ※ AIの進化により効果は変動します。C2PAによる権利記録は恒久的な差別化要素です。
          </p>
        </div>
      </section>
    </FadeInSection>
  );
}

export default function LoreAnchorLP() {
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [realCount, setRealCount] = useState<number | null>(null);
  const [queuePosition, setQueuePosition] = useState(0);
  const [referralLink, setReferralLink] = useState(WAITLIST_URL);

  // Fetch real waitlist count on mount
  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => setRealCount(d.count ?? null))
      .catch(() => {});
  }, []);

  // Parse ref from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralLink(`${WAITLIST_URL}?ref=${ref}`);
    }
  }, []);

  const displayCount = realCount ?? 0;
  const detectionCount = useCountUp(displayCount > 0 ? displayCount * 47 : 58420, 2500);
  const creatorCount = { count: displayCount, ref: useRef<HTMLSpanElement>(null) };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("有効なメールアドレスを入力してください。");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.error || "登録に失敗しました。");
        setLoading(false);
        return;
      }
      setQueuePosition(data.position ?? 0);
      // Generate referral link with email hash (simple)
      const refCode = btoa(email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
      setReferralLink(`${WAITLIST_URL}?ref=${refCode}`);
      setLoading(false);
      setSigned(true);
    } catch {
      setEmailError("通信エラーが発生しました。もう一度お試しください。");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(
    `自分のイラストをAI学習から守るためにLore-Anchorのウェイティングリストに登録した。GlazeやNightshadeより本質的なアプローチで、C2PA署名も対応してる。招待枠あるのでここから登録どうぞ👇 #LoreAnchor #AI学習禁止\n${referralLink}`
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white selection:bg-sky-500/30">
      <ScanGrid />
      <FloatingParticles />

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-500/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Lore<span className="text-sky-400">-Anchor</span>
            </span>
          </div>
          {!signed && (
            <button
              onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-white/[0.06] px-5 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/10"
            >
              参加する
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!signed ? (
          <motion.div key="pre" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>

            {/* Hero */}
            <section className="relative z-10 px-6 pb-20 pt-24 md:pt-32">
              <div className="mx-auto max-w-4xl text-center">
                <FadeInSection>
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-sm text-sky-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>クリエイターのためのAI防衛インフラ</span>
                  </div>
                </FadeInSection>

                <FadeInSection delay={0.1}>
                  <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                    あなたの絵を、
                    <br />
                    <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      技術で守る。
                    </span>
                  </h1>
                </FadeInSection>

                <FadeInSection delay={0.2}>
                  <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                    Mist v2 + 不可視透かし + C2PA署名を、ワンクリックで全自動適用。<br className="hidden md:block" />
                    「NoAIタグ」より、圧倒的に確実な保護を。
                  </p>
                  {/* Trust logos */}
                  <div className="mb-8 flex items-center justify-center gap-3 text-xs text-slate-600">
                    <span className="rounded-full border border-white/10 px-3 py-1">Adobe推進</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Google推進</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Microsoft推進</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">C2PA準拠</span>
                  </div>
                </FadeInSection>

                <FadeInSection delay={0.3}>
                  <form id="signup" onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <input type="email" value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500/40 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <button type="submit" disabled={loading}
                      className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:brightness-110 disabled:opacity-70"
                    >
                      {loading ? (
                        <motion.div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                      ) : (
                        <> 無料で登録する <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> </>
                      )}
                    </button>
                  </form>
                  {emailError && <p className="mt-2 text-sm text-red-400">{emailError}</p>}
                </FadeInSection>

                <FadeInSection delay={0.4}>
                  <div className="mt-5 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users className="h-4 w-4 text-sky-500/60" />
                      <span>
                        現在{" "}
                        <span ref={creatorCount.ref} className="font-semibold text-slate-300">
                          {displayCount > 0 ? displayCount.toLocaleString() : "…"}
                        </span>
                        {" "}人のクリエイターが待機中
                      </span>
                    </div>
                    {/* Urgency bar */}
                    {displayCount > 0 && displayCount < 1000 && (
                      <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs text-amber-400">
                        <Bell className="h-3 w-3" />
                        <span>目標1000人まであと{(1000 - displayCount).toLocaleString()}人</span>
                      </div>
                    )}
                  </div>
                </FadeInSection>
              </div>
            </section>

            {/* Stats bar */}
            <FadeInSection>
              <section className="relative z-10 border-y border-white/[0.04] bg-white/[0.01] py-12">
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 sm:grid-cols-3">
                  {[
                    { label: "ウェイティングリスト登録者", value: displayCount.toLocaleString(), suffix: "人+", icon: Users },
                    { label: "C2PA・不可視透かし準拠", value: "100", suffix: "%", icon: ShieldCheck },
                    { label: "Adobe・Google・Microsoft認定規格", value: "C2PA", suffix: "", icon: Fingerprint },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <s.icon className="mb-2 h-5 w-5 text-sky-500/50" />
                      <span className="text-3xl font-bold text-white">
                        {s.value}<span className="ml-1 text-lg text-sky-400">{s.suffix}</span>
                      </span>
                      <span className="mt-1 text-sm text-slate-500">{s.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>

            {/* Features */}
            <section className="relative z-10 px-6 py-24">
              <div className="mx-auto max-w-6xl">
                <FadeInSection>
                  <div className="mb-14 text-center">
                    <h2 className="mb-3 text-3xl font-bold md:text-4xl">3層の保護</h2>
                    <p className="text-slate-400">全部まとめてワンクリック。見た目はほぼ変わらない。</p>
                  </div>
                </FadeInSection>
                <div className="grid gap-6 md:grid-cols-3">
                  <FeatureCard icon={ScanSearch} title="Mist v2（AI学習妨害）"
                    desc="AIが画像の特徴を抽出しようとするとエラーが生じるノイズを適用。人間の目には見えないが、機械には読めない。" delay={0} />
                  <FeatureCard icon={Fingerprint} title="不可視透かし（PixelSeal）"
                    desc="128bitのあなたのIDを、人間には見えない形で画像に埋め込む。万が一の時の著作者証明に使える。" delay={0.1} />
                  <FeatureCard icon={Zap} title="C2PA署名（国際規格）"
                    desc="Adobe・Google・Microsoftが推進する来歴証明標準。「誰が・いつ」を改ざん不可の形で記録。AI生成物との区別にも有効。" delay={0.2} />
                </div>
              </div>
            </section>

            {/* Comparison */}
            <ComparisonSection />

            {/* How it works */}
            <section className="relative z-10 px-6 py-24 border-t border-white/[0.04]">
              <div className="mx-auto max-w-5xl">
                <FadeInSection>
                  <div className="mb-14 text-center">
                    <h2 className="mb-3 text-3xl font-bold md:text-4xl">使い方</h2>
                    <p className="text-slate-400">3ステップ、3分以内。</p>
                  </div>
                </FadeInSection>
                <div className="grid gap-10 md:grid-cols-3">
                  <StepCard num={1} icon={FileSearch} title="画像をアップロード"
                    desc="JPG・PNG・WebPに対応。ドラッグ＆ドロップで完了。" delay={0} />
                  <StepCard num={2} icon={Globe} title="自動で3層処理"
                    desc="クラウドGPUがMist v2・透かし・C2PA署名を正しい順番で自動適用。" delay={0.15} />
                  <StepCard num={3} icon={ShieldCheck} title="保護済み画像をDL"
                    desc="見た目はほぼ変わらない。でも中身は守られた画像になってる。" delay={0.3} />
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 px-6 pb-32 pt-12">
              <FadeInSection>
                <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.06] bg-gradient-to-br from-sky-500/5 to-teal-500/5 p-10 text-center backdrop-blur-sm md:p-14">
                  <Lock className="mx-auto mb-5 h-10 w-10 text-sky-400/70" />
                  <h2 className="mb-3 text-2xl font-bold md:text-3xl">今日から守りを始める</h2>
                  <p className="mb-2 text-slate-400">無料のウェイティングリストに参加。サービス開始時に最速でアクセス。</p>
                  {displayCount > 0 && displayCount < 1000 && (
                    <p className="mb-6 text-sm text-amber-400">目標1000人まであと{(1000 - displayCount).toLocaleString()}人。</p>
                  )}
                  <button
                    onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:brightness-110"
                  >
                    ウェイティングリストに参加（無料）
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </FadeInSection>
            </section>
          </motion.div>
        ) : (
          /* Post-Signup */
          <motion.div key="post" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 px-6 py-24 md:py-32">
            <div className="mx-auto max-w-xl text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-500 shadow-xl shadow-sky-500/25">
                <ShieldCheck className="h-10 w-10 text-white" />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }} className="mb-3 text-3xl font-extrabold md:text-4xl">
                登録完了
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }} className="mb-10 text-slate-400">
                あなたの順位は{" "}
                <span className="text-2xl font-bold text-sky-400">#{queuePosition.toLocaleString()}</span> 番です。
              </motion.p>

              {/* Referral */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-left backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-sky-400" />
                  <h3 className="text-lg font-semibold">友達を招待して優先アクセスをゲット</h3>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  同じ悩みを持つクリエイター仲間を<span className="font-semibold text-white"> 3人招待 </span>すると、
                  あなたと招待した友人のアカウントを<span className="font-semibold text-sky-400">「優先アクセス権」</span>へアップグレードします。
                </p>
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">あなたの招待リンク</label>
                  <div className="flex gap-2">
                    <div className="flex-1 truncate rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300">
                      {referralLink}
                    </div>
                    <button onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium transition hover:bg-white/10">
                      {copied ? <><Check className="h-4 w-4 text-emerald-400" /><span className="text-emerald-400">コピー済</span></> : <><Copy className="h-4 w-4" />コピー</>}
                    </button>
                  </div>
                </div>
                <a href={`https://twitter.com/intent/tweet?text=${shareText}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:brightness-110">
                  <Twitter className="h-4 w-4" />
                  X (Twitter) でシェアする
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-6xl px-6">© 2026 Lore-Anchor. All rights reserved.</div>
      </footer>
    </div>
  );
}
