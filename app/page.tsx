import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  Network,
  Newspaper,
  Sparkles,
  UsersRound,
} from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"

const activities = [
  {
    icon: UsersRound,
    title: "交流する",
    description: "同期・先輩・後輩との再会や情報交換を通して、卒業後のつながりを育みます。",
  },
  {
    icon: GraduationCap,
    title: "学ぶ",
    description: "研修会や勉強会など、現場に活きる学びを卒業後も共有できる場をつくります。",
  },
  {
    icon: Network,
    title: "つながる",
    description: "所属や世代を越えたネットワークから、相談や新しい活動のきっかけを生み出します。",
  },
  {
    icon: BriefcaseBusiness,
    title: "活躍する",
    description: "求人・キャリア情報を共有し、それぞれの現場で挑戦する卒業生を応援します。",
  },
]

const information = [
  {
    icon: Newspaper,
    eyebrow: "NEWS",
    title: "お知らせ",
    description: "絆命会からの大切なお知らせや活動報告を掲載しています。",
    href: "/news",
    link: "お知らせを見る",
  },
  {
    icon: CalendarDays,
    eyebrow: "EVENTS",
    title: "イベント",
    description: "交流会・研修会など、卒業生がつながるイベント情報をご案内します。",
    href: "/events",
    link: "イベントを見る",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "CAREER",
    title: "求人情報",
    description: "救急救命士としてのキャリアにつながる会員向け求人情報を掲載しています。",
    href: "/jobs",
    link: "求人情報を見る",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MainNav currentPage="ホーム" />

      <main>
        <section className="relative overflow-hidden border-b border-slate-100 bg-[#F7FAF9]">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#D8A54A]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#0F3D3E]/10 blur-3xl" />

          <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0F3D3E]/10 bg-white px-4 py-2 text-xs font-bold tracking-[0.14em] text-[#0F3D3E] shadow-sm">
                <HeartPulse className="h-4 w-4" />
                TOYO EMS ALUMNI NETWORK
              </div>

              <h1 className="text-balance text-5xl font-black leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
                つながる力が、
                <span className="mt-2 block text-[#0F3D3E]">命を支える。</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                東洋医療専門学校 救急救命士学科 同窓会「絆命会」は、
                卒業生同士の交流、学び、キャリア、そして地域とのつながりを支える場です。
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D3E] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0A3132] hover:shadow-md"
                >
                  絆命会について
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#0F3D3E]/30 hover:text-[#0F3D3E]"
                >
                  最新イベントを見る
                  <CalendarDays className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-slate-200 pt-6">
                {["交流", "学び", "キャリア"].map((item) => (
                  <div key={item}>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">KIZUNA</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative overflow-hidden rounded-[2.25rem] bg-[#0F3D3E] p-7 text-white shadow-[0_30px_80px_rgba(15,61,62,0.22)] sm:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[32px] border-white/5" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[40px] border-[#D8A54A]/10" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5 text-[#F1C36F]" />
                      KIZUNA MEIKAI
                    </span>
                    <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white p-2 shadow-lg">
                      <Image
                        src="/images/school-emblem.webp"
                        alt="東洋医療専門学校 校章"
                        width={88}
                        height={88}
                        className="h-20 w-20 object-contain"
                        priority
                      />
                    </span>
                  </div>

                  <div className="mt-16">
                    <p className="text-sm font-semibold text-white/55">東洋医療専門学校 救急救命士学科 同窓会</p>
                    <p className="mt-3 text-4xl font-black tracking-[0.08em] sm:text-5xl">絆命会</p>
                    <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                      卒業しても、現場で命と向き合う仲間であることは変わらない。
                      世代と所属を越えて、次のつながりへ。
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-2">
                    {[
                      { label: "CONNECT", value: "つながる" },
                      { label: "LEARN", value: "学ぶ" },
                      { label: "SUPPORT", value: "支える" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 sm:p-4">
                        <p className="text-[9px] font-bold tracking-[0.14em] text-[#F1C36F]">{item.label}</p>
                        <p className="mt-1 text-xs font-bold sm:text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F3F1] text-[#0F3D3E]">
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400">OUR MISSION</p>
                    <p className="mt-0.5 text-sm font-extrabold text-slate-800">救う仲間を、つなぐ。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-extrabold tracking-[0.2em] text-[#B47B1F]">WHAT WE DO</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">絆命会でできること</h2>
              <p className="mt-5 text-base leading-8 text-slate-500">
                卒業後も、学び・交流・支え合いを途切れさせないためのネットワークです。
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <article
                    key={activity.title}
                    className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0F3D3E]/20 hover:shadow-[0_18px_50px_rgba(15,61,62,0.10)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F3F1] text-[#0F3D3E] transition group-hover:bg-[#0F3D3E] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 text-xl font-black text-slate-900">{activity.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">{activity.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-[#F7FAF9] py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-extrabold tracking-[0.2em] text-[#B47B1F]">INFORMATION</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">最新情報へ</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">
                  お知らせ、イベント、求人情報。必要な情報へすぐアクセスできます。
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {information.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex min-h-64 flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0F3D3E]/20 hover:shadow-[0_18px_50px_rgba(15,61,62,0.10)]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F3D3E] text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-extrabold tracking-[0.18em] text-slate-400">{item.eyebrow}</span>
                    </div>
                    <h3 className="mt-7 text-2xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">{item.description}</p>
                    <span className="mt-7 inline-flex items-center gap-1 text-sm font-bold text-[#0F3D3E]">
                      {item.link}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-[#B47B1F]">ABOUT HANMEIKAI</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
                卒業して終わりではなく、
                <span className="mt-2 block text-[#0F3D3E]">現場でつながり続ける。</span>
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-500">
                絆命会は、東洋医療専門学校 救急救命士学科の卒業生をつなぐ同窓会です。
                それぞれの現場や地域で活躍する仲間が、必要なときに学び、相談し、支え合える関係を育てていきます。
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#0F3D3E]"
              >
                絆命会を詳しく知る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "PURPOSE", title: "交流と支え合い", text: "卒業生同士のつながりを、卒業後の力に。" },
                { label: "NETWORK", title: "世代を越える", text: "同期だけでなく、先輩・後輩ともつながるネットワーク。" },
                { label: "LEARNING", title: "学びを続ける", text: "救急現場に向き合うための知識と経験を共有。" },
                { label: "CAREER", title: "活躍を応援する", text: "求人やキャリア情報を通して次の挑戦を後押し。" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] bg-[#F7FAF9] p-6">
                  <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#B47B1F]">{item.label}</p>
                  <h3 className="mt-3 text-lg font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-6 sm:pb-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#0F3D3E] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[42px] border-white/5" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-extrabold tracking-[0.2em] text-[#F1C36F]">STAY CONNECTED</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">絆命会と、もう一度つながろう。</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                  イベントへの参加、求人情報、活動についてのご質問など、お気軽にお問い合わせください。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="https://lin.ee/Y8DHYjk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#0F3D3E] transition hover:bg-[#F3F7F6]"
                >
                  <MessageCircle className="h-4 w-4" />
                  LINEで問い合わせ
                </a>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10"
                >
                  イベントを見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
