import Link from "next/link"
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import {
  BookIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClipboardIcon,
  CommunityIcon,
  GemIcon,
  GrowthIcon,
  HandshakeIcon,
  MegaphoneIcon,
  TargetIcon,
  UserPlusIcon,
} from "@/components/home-icons"

const heroImage = "/images/home-hero-v2.webp"
const messageImage = "/images/home-message-v2.webp"

const activities = [
  {
    icon: CommunityIcon,
    title: "交流する",
    description: "卒業生同士の再会や情報交換を通して、つながりを深めます。",
    image: "/images/home-activity-1-v2.webp",
  },
  {
    icon: BookIcon,
    title: "学ぶ",
    description: "研修会や勉強会を通して、現場に活きる学びを共有します。",
    image: "/images/home-activity-2-v2.webp",
  },
  {
    icon: HandshakeIcon,
    title: "つながる",
    description: "世代を越えたネットワークから、新しい相談や活動のきっかけを。",
    image: "/images/home-activity-3-v2.webp",
  },
  {
    icon: GrowthIcon,
    title: "活躍する",
    description: "求人・キャリア情報を通して、卒業生の次の挑戦を応援します。",
    image: "/images/home-activity-4-v2.webp",
  },
]

const infoColumns = [
  {
    icon: MegaphoneIcon,
    title: "お知らせ",
    href: "/news",
    iconClass: "bg-[#FDECEF] text-[#E34D6B]",
    dotClass: "bg-[#E34D6B]",
    items: ["絆命会からの大切なお知らせ", "活動報告・会員向け案内", "最新のお知らせを確認する"],
  },
  {
    icon: CalendarIcon,
    title: "イベント",
    href: "/events",
    iconClass: "bg-[#F2ECFD] text-[#8D55C7]",
    dotClass: "bg-[#8D55C7]",
    items: ["交流会・研修会のご案内", "開催予定をチェック", "イベント情報を確認する"],
  },
  {
    icon: BriefcaseIcon,
    title: "求人情報",
    href: "/jobs",
    iconClass: "bg-[#E7F7F4] text-[#0B9A82]",
    dotClass: "bg-[#0B9A82]",
    items: ["絆命会会員専用の求人情報", "救急救命士向け求人を掲載", "求人情報ページを確認する"],
  },
]

const aboutItems = [
  { icon: TargetIcon, title: "目的", text: "卒業生同士の交流と支え合い" },
  { icon: CommunityIcon, title: "対象", text: "東洋医療専門学校 救急救命士学科 卒業生" },
  { icon: ClipboardIcon, title: "活動内容", text: "交流会・勉強会・情報発信・求人共有" },
  { icon: GemIcon, title: "入会メリット", text: "学び・情報収集・キャリア支援" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#112B3A]">
      <MainNav currentPage="ホーム" />

      <main>
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-[1440px] lg:min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-20 flex items-center px-6 py-16 sm:px-10 lg:px-12 lg:py-20 xl:px-16">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold tracking-[0.28em] text-[#18A99A]">TOYO EMS ALUMNI</p>
                <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-[-0.04em] text-[#102D3C] sm:text-6xl xl:text-[72px]">
                  つながる力が、
                  <span className="mt-2 block text-[#0B9A82]">命を支える。</span>
                </h1>
                <p className="mt-7 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                  東洋医療専門学校 救急救命士学科 同窓会「絆命会」は、
                  卒業生同士の交流、学び、キャリア、地域とのつながりを支える場です。
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#12B89E] to-[#087C73] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(8,124,115,0.22)] transition hover:-translate-y-0.5"
                  >
                    絆命会について
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#12B89E]/40 hover:text-[#087C73]"
                  >
                    最新イベントを見る
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="relative overflow-hidden bg-[#EDF6F5] bg-cover bg-center"
              style={{ backgroundImage: `url("${heroImage}")` }}
            >
              <img
                src={heroImage}
                alt="救急活動のイメージ"
                className="block h-[390px] w-full object-cover object-center lg:h-[560px]"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.92)_10%,rgba(255,255,255,0.58)_22%,rgba(255,255,255,0.20)_36%,rgba(255,255,255,0)_55%)]" />
              <div className="pointer-events-none absolute inset-y-0 left-[7%] w-[28%] bg-white/35 blur-3xl" />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-[#F7FBFC] py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#18A99A]">WHAT WE DO</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#112B3A] sm:text-4xl">絆命会でできること</h2>
              <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base">卒業後も、学び・交流・支え合いをつなぐ場です。</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <article
                    key={activity.title}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_26px_rgba(15,61,62,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(15,61,62,0.10)]"
                  >
                    <div className="p-5 pb-4">
                      <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F7F4] text-[#08A58E] shadow-[inset_0_0_0_1px_rgba(8,165,142,0.08)]">
                          <Icon className="h-9 w-9" />
                        </span>
                        <div>
                          <h3 className="text-xl font-black text-[#112B3A]">{activity.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-500">{activity.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mx-4 mb-4 overflow-hidden rounded-xl bg-[#EEF4F4]">
                      <img
                        src={activity.image}
                        alt={activity.title + "のイメージ"}
                        className="h-28 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#18A99A]">LATEST INFORMATION</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#112B3A] sm:text-4xl">最新情報</h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#087C73]">
                一覧を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {infoColumns.map((column) => {
                const Icon = column.icon
                return (
                  <div key={column.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,61,62,0.05)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={"flex h-10 w-10 items-center justify-center rounded-xl " + column.iconClass}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="text-xl font-black text-[#112B3A]">{column.title}</h3>
                      </div>
                      <Link href={column.href} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#087C73]">
                        一覧
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
                      {column.items.map((item) => (
                        <Link
                          key={item}
                          href={column.href}
                          className="flex items-center gap-3 py-3.5 text-sm font-semibold text-slate-600 transition hover:text-[#087C73]"
                        >
                          <span className={"h-1.5 w-1.5 shrink-0 rounded-full " + column.dotClass} />
                          <span>{item}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-[#F5FAFB] py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-10">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#18A99A]">ABOUT</p>
              <h2 className="mt-3 text-3xl font-black text-[#112B3A] sm:text-4xl">絆命会について</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                絆命会は、東洋医療専門学校 救急救命士学科の卒業生をつなぐ同窓会です。
                卒業後も交流や学び、キャリア支援を通して、仲間とのつながりを育んでいます。
              </p>
              <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#18A99A]/40 bg-white px-6 py-3 text-sm font-extrabold text-[#087C73] transition hover:bg-[#EAF7F5]"
              >
                詳しく見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {aboutItems.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,61,62,0.05)]"
                  >
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F7F4] text-[#08A58E]">
                      <Icon className="h-9 w-9" />
                    </span>
                    <h3 className="mt-4 text-lg font-black text-[#112B3A]">{item.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.88fr_1.12fr]">
            <div
              className="relative overflow-hidden bg-[#EDF3F4] bg-cover bg-center"
              style={{ backgroundImage: `url("${messageImage}")` }}
            >
              <img
                src={messageImage}
                alt="救急救命士のイメージ"
                className="block h-[310px] w-full object-cover object-center lg:h-[390px]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,49,57,0.08)_0%,rgba(6,49,57,0.02)_52%,rgba(255,255,255,0.42)_76%,rgba(255,255,255,0.98)_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-[4%] w-[24%] bg-white/35 blur-3xl" />
            </div>
            <div className="relative flex items-center bg-white px-7 py-12 sm:px-10 lg:px-14">
              <div className="pointer-events-none absolute inset-y-0 -left-20 hidden w-28 bg-white/70 blur-3xl lg:block" />
              <div className="relative max-w-2xl">
                <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#18A99A]">MESSAGE</p>
                <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.02em] text-[#112B3A] sm:text-4xl">
                  卒業して終わりではなく、
                  <span className="block">現場でつながり続ける。</span>
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  それぞれが異なる現場で働いていても、命を支える使命を持つ仲間であることは変わりません。
                  絆命会は、そのつながりを育み、支え合える場でありたいと考えています。
                </p>
                <Link
                  href="/about"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-[#112B3A] shadow-sm transition hover:-translate-y-0.5"
                >
                  絆命会について見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-r from-[#087C73] via-[#075D59] to-[#063E42] text-white">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_35%),radial-gradient(circle_at_80%_80%,white_0,transparent_35%)]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.02em]">絆命会と、もう一度つながろう</h2>
              <p className="mt-3 text-sm font-medium text-white/75">同じ志を持つ仲間たちと、これからも。</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D79A22] px-4 py-4 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                <UserPlusIcon className="h-6 w-6" />
                絆命会について
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-4 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                <CalendarIcon className="h-6 w-6" />
                イベントに参加する
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-4 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                <BriefcaseIcon className="h-6 w-6" />
                求人情報を見る
              </Link>
              <a
                href="https://lin.ee/Y8DHYjk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#11B89D] px-4 py-4 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2.3} />
                LINEで問い合わせ
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
