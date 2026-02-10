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
} from "lucide-react";

/* ─────────────────────────────────────────────
   Utility: Animated counter
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Background: Scanning Grid Effect
   ───────────────────────────────────────────── */
function ScanGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), rgba(20,184,166,0.3), transparent)",
          boxShadow: "0 0 20px 2px rgba(56,189,248,0.15)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(20,184,166,0.2), rgba(56,189,248,0.2), transparent)",
          boxShadow: "0 0 15px 1px rgba(20,184,166,0.1)",
        }}
        animate={{ left: ["-5%", "105%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      {/* Radial glow top */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-sky-500/5 blur-[120px]" />
      {/* Radial glow bottom-right */}
      <div className="absolute -bottom-40 right-0 w-[600px] h-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Floating particles (subtle)
   ───────────────────────────────────────────── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sky-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section wrapper with fade-in
   ───────────────────────────────────────────── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Feature card
   ───────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <FadeInSection delay={delay}>
      <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/20 hover:bg-white/[0.04]">
        <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-sky-500/10 to-teal-500/10 p-3 ring-1 ring-white/[0.05]">
          <Icon className="h-6 w-6 text-sky-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 40px rgba(56,189,248,0.04)" }}
        />
      </div>
    </FadeInSection>
  );
}

/* ─────────────────────────────────────────────
   Step card for "How it works"
   ───────────────────────────────────────────── */
function StepCard({
  num,
  title,
  desc,
  icon: Icon,
  delay,
}: {
  num: number;
  title: string;
  desc: string;
  icon: React.ElementType;
  delay: number;
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

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
export default function LoreAnchorLP() {
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailError, setEmailError] = useState("");

  const waitlistCount = useCountUp(1243, 2200);
  const detectionCount = useCountUp(58420, 2500);
  const creatorCount = useCountUp(1243, 2000);

  const referralLink = "https://lore-anchor.com/join?ref=user_xyz";
  const queuePosition = 4521;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("有効なメールアドレスを入力してください。");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSigned(true);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(
    "自分のイラストを守るためにLore-Anchorに登録した。AIが巡回して守ってくれるらしい。招待枠あるので興味ある人はここからどうぞ👇 #LoreAnchor\n" +
      referralLink
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white selection:bg-sky-500/30">
      <ScanGrid />
      <FloatingParticles />

      {/* ── Nav ── */}
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
          /* ═══════════════════════════════════════
             STATE A : Pre-Signup
             ═══════════════════════════════════════ */
          <motion.div
            key="pre"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Hero ── */}
            <section className="relative z-10 px-6 pb-20 pt-24 md:pt-32">
              <div className="mx-auto max-w-4xl text-center">
                {/* Badge */}
                <FadeInSection>
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-sm text-sky-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>クリエイターのためのAI防衛システム</span>
                  </div>
                </FadeInSection>

                {/* H1 */}
                <FadeInSection delay={0.1}>
                  <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                    あなたの作品を、
                    <br />
                    <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      AIが24時間365日
                    </span>
                    <br />
                    巡回して守ります。
                  </h1>
                </FadeInSection>

                {/* Subtitle */}
                <FadeInSection delay={0.2}>
                  <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                    Lore-Anchorは、イラストレーター・漫画家のための自動防衛システム。
                    <br className="hidden md:block" />
                    無断転載・不正学習を検知し、ワンクリックで権利保護のアクションへ。
                  </p>
                </FadeInSection>

                {/* Form */}
                <FadeInSection delay={0.3}>
                  <form
                    id="signup"
                    onSubmit={handleSubmit}
                    className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500/40 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:brightness-110 disabled:opacity-70"
                    >
                      {loading ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          ウェイティングリストに参加
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </form>
                  {emailError && (
                    <p className="mt-2 text-sm text-red-400">{emailError}</p>
                  )}
                </FadeInSection>

                {/* Social proof */}
                <FadeInSection delay={0.4}>
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Users className="h-4 w-4 text-sky-500/60" />
                    <span>
                      現在{" "}
                      <span ref={waitlistCount.ref} className="font-semibold text-slate-300">
                        {waitlistCount.count.toLocaleString()}
                      </span>{" "}
                      人のクリエイターが待機中
                    </span>
                  </div>
                </FadeInSection>
              </div>
            </section>

            {/* ── Stats bar ── */}
            <FadeInSection>
              <section className="relative z-10 border-y border-white/[0.04] bg-white/[0.01] py-12">
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 sm:grid-cols-3">
                  {[
                    {
                      label: "不正利用を検知済み",
                      value: detectionCount,
                      suffix: "件+",
                      icon: AlertTriangle,
                    },
                    {
                      label: "参加クリエイター",
                      value: creatorCount,
                      suffix: "人+",
                      icon: Users,
                    },
                    {
                      label: "平均検知速度",
                      value: { count: 2.4, ref: null as unknown },
                      suffix: "時間",
                      icon: Clock,
                      static: true,
                    },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <s.icon className="mb-2 h-5 w-5 text-sky-500/50" />
                      <span className="text-3xl font-bold text-white">
                        {s.static
                          ? "2.4"
                          : (s.value as ReturnType<typeof useCountUp>).count.toLocaleString()}
                        <span className="ml-1 text-lg text-sky-400">{s.suffix}</span>
                      </span>
                      <span className="mt-1 text-sm text-slate-500">{s.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>

            {/* ── Features ── */}
            <section className="relative z-10 px-6 py-24">
              <div className="mx-auto max-w-6xl">
                <FadeInSection>
                  <div className="mb-14 text-center">
                    <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                      なぜ<span className="text-sky-400">Lore-Anchor</span>なのか
                    </h2>
                    <p className="text-slate-400">
                      あなたの作品を守る、3つのコアテクノロジー
                    </p>
                  </div>
                </FadeInSection>
                <div className="grid gap-6 md:grid-cols-3">
                  <FeatureCard
                    icon={ScanSearch}
                    title="AIクローラーによる24/7巡回"
                    desc="独自のAIエージェントがWeb全体を常時スキャン。SNS、画像サイト、AI学習データセットまで幅広くカバーし、あなたの作品の無断使用を自動で検知します。"
                    delay={0}
                  />
                  <FeatureCard
                    icon={Fingerprint}
                    title="改ざん不可能な証拠保全"
                    desc="不正利用を検知した瞬間、スクリーンショット・URL・タイムスタンプを暗号化して記録。法的措置にも耐えうる確実な証拠をあなたの代わりに保全します。"
                    delay={0.1}
                  />
                  <FeatureCard
                    icon={Zap}
                    title="ワンクリック権利保護アクション"
                    desc="DMCA削除申請の自動生成、プラットフォームへの通報、弁護士への証拠パッケージ送付まで。複雑な法的手続きをワンクリックでスタートできます。"
                    delay={0.2}
                  />
                </div>
              </div>
            </section>

            {/* ── How it works ── */}
            <section className="relative z-10 px-6 py-24">
              <div className="mx-auto max-w-5xl">
                <FadeInSection>
                  <div className="mb-14 text-center">
                    <h2 className="mb-3 text-3xl font-bold md:text-4xl">仕組み</h2>
                    <p className="text-slate-400">たった3ステップで、あなたの作品は守られます</p>
                  </div>
                </FadeInSection>
                <div className="grid gap-10 md:grid-cols-3">
                  <StepCard
                    num={1}
                    icon={FileSearch}
                    title="作品を登録"
                    desc="ポートフォリオやSNSアカウントを連携するだけ。AIがあなたの画風と作品を学習します。"
                    delay={0}
                  />
                  <StepCard
                    num={2}
                    icon={Globe}
                    title="AIが自動巡回"
                    desc="24時間365日、AIエージェントがWeb上を巡回。類似画像や無断転載を即座に検出します。"
                    delay={0.15}
                  />
                  <StepCard
                    num={3}
                    icon={ShieldCheck}
                    title="検知 → 即アクション"
                    desc="不正利用を検知したら即座に通知。ワンクリックで削除申請・証拠保全を実行します。"
                    delay={0.3}
                  />
                </div>
              </div>
            </section>

            {/* ── CTA repeat ── */}
            <section className="relative z-10 px-6 pb-32 pt-12">
              <FadeInSection>
                <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.06] bg-gradient-to-br from-sky-500/5 to-teal-500/5 p-10 text-center backdrop-blur-sm md:p-14">
                  <Lock className="mx-auto mb-5 h-10 w-10 text-sky-400/70" />
                  <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                    今すぐ守りを始めましょう
                  </h2>
                  <p className="mb-8 text-slate-400">
                    無料のウェイティングリストに参加して、
                    <br className="hidden md:block" />
                    サービス開始時に最速でアクセスを手に入れてください。
                  </p>
                  <button
                    onClick={() => {
                      document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
                    }}
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
          /* ═══════════════════════════════════════
             STATE B : Post-Signup (Viral)
             ═══════════════════════════════════════ */
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 px-6 py-24 md:py-32"
          >
            <div className="mx-auto max-w-xl text-center">
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-500 shadow-xl shadow-sky-500/25"
              >
                <ShieldCheck className="h-10 w-10 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-3 text-3xl font-extrabold md:text-4xl"
              >
                登録完了
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-10 text-slate-400"
              >
                あなたの順位は{" "}
                <span className="text-2xl font-bold text-sky-400">
                  #{queuePosition.toLocaleString()}
                </span>{" "}
                番です。
              </motion.p>

              {/* Referral Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-left backdrop-blur-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-sky-400" />
                  <h3 className="text-lg font-semibold">優先アクセス権を手に入れよう</h3>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  同じ悩みを持つクリエイター仲間を
                  <span className="font-semibold text-white"> 3人招待 </span>
                  すると、あなたと友人のアカウントを
                  <span className="font-semibold text-sky-400">「優先アクセス権」</span>
                  へアップグレードします。
                </p>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-400">招待進捗</span>
                    <span className="font-medium text-white">0 / 3</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: "0%" }}
                    />
                  </div>
                </div>

                {/* Referral link */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    あなたの招待リンク
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 truncate rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300">
                      {referralLink}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium transition hover:bg-white/10"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-400">コピー済</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          コピー
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Share button */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:brightness-110"
                >
                  <Twitter className="h-4 w-4" />
                  X (Twitter) でシェアする
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-6xl px-6">
          © 2026 Lore-Anchor. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
