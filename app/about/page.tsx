import Link from "next/link"
import { ArrowRight, BookOpen, Handshake, HeartPulse, MessageCircle, Network, UsersRound } from "lucide-react"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import { PublicPageHeader } from "@/components/public-page"

const pillars = [
  { icon: UsersRound, title: "交流", text: "世代や所属を越えて、卒業生同士がつながる機会をつくります。" },
  { icon: BookOpen, title: "学び", text: "研修会や情報共有を通して、救急救命士としての成長を支えます。" },
  { icon: Network, title: "ネットワーク", text: "現場・学校・地域をつなぐ、頼れる同窓生ネットワークを育てます。" },
  { icon: Handshake, title: "支え合い", text: "キャリアや活動の相談、後輩支援など、仲間同士で支え合います。" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#112B3A]">
      <MainNav currentPage="絆命会について" />
      <PublicPageHeader
        eyebrow="ABOUT HANMEIKAI"
        title="絆命会について"
        description="卒業してからも、同じ志を持つ仲間とつながり続ける。絆命会は、東洋医療専門学校 救急救命士学科の卒業生による同窓会です。"
        icon={<HeartPulse className="h-6 w-6" />}
      />

      <main>
        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="rounded-3xl bg-gradient-to-br from-[#083F43] to-[#0B6F68] p-8 text-white shadow-[0_18px_50px_rgba(8,63,67,0.16)] sm:p-10">
              <p className="text-xs font-extrabold tracking-[0.22em] text-[#8EE2D6]">OUR PURPOSE</p>
              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">救命の志を、<br />卒業後もつなぐ。</h2>
              <p className="mt-6 text-sm font-medium leading-7 text-white/80 sm:text-base">
                在学中に培った「命をつなぐ」使命感と仲間との絆を大切にしながら、
                現場で活躍する卒業生同士が世代を越えてつながり合える場を目指しています。
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,61,62,0.06)] sm:p-10">
              <p className="text-base font-medium leading-8 text-slate-600">
                絆命会（はんめいかい）は、東洋医療専門学校 救急救命士学科の卒業生によって組織された同窓会です。
                卒業後も、現場で活躍する仲間たちと情報交換を行ったり、後輩を支援する活動を通じて、
                救急救命士としての専門性や人間性をさらに高めることを目的としています。
              </p>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                研修会・交流会・学校行事への協力などを通じて、「救命の志」を共有する仲間との絆を深め、
                社会に貢献できる強いネットワークを築いていきます。
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-[#F7FBFC] py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#18A99A]">WHAT WE VALUE</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] sm:text-4xl">絆命会が大切にすること</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {pillars.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,61,62,0.05)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F7F4] text-[#08A58E]">
                    <Icon className="h-7 w-7" strokeWidth={2.3} />
                  </span>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <h2 className="text-3xl font-black sm:text-4xl">絆命会は、みんなで育てる同窓会です。</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              一人ひとりの参加と協力が、新しい交流や学びにつながります。気軽に情報交換できる場所として、これからも一緒に育てていきましょう。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="https://lin.ee/Y8DHYjk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#12B89E] to-[#087C73] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(8,124,115,0.20)]">
                <MessageCircle className="h-4 w-4" />
                LINEで問い合わせ
              </a>
              <Link href="/events" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 text-sm font-extrabold text-slate-700 hover:border-[#12B89E]/40 hover:text-[#087C73]">
                イベントを見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
