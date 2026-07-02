import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, ArrowRight, Tag, AlertTriangle, AlertCircle } from 'lucide-react';
import { Carousel } from '../components/carousel';

// --- Hooks & Helper Components ---

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  const style = delay ? { animationDelay: `${delay}ms` } : {};
  return (<div ref={ref} className={`${className} ${isVisible ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`} style={style}>{children}</div>);
};

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  formatter?: (val: number) => string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = "", decimals = 0, formatter }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) { setHasAnimated(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);
  useEffect(() => {
    if (!hasAnimated) return;
    let startTime: number | null = null;
    const duration = 2000;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = value * ease;
      const formatted = formatter ? formatter(currentVal) : currentVal.toFixed(decimals);
      setDisplayValue(formatted);
      if (progress < 1) { requestAnimationFrame(animate); }
    };
    requestAnimationFrame(animate);
  }, [hasAnimated, value, decimals, formatter]);
  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// --- Page Components ---

function Navbar({ onRegister }: { onRegister: () => void }) {
  return (
    <nav className="flex items-center justify-between px-6 py-5 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="font-bold text-xl tracking-tighter cursor-pointer text-foreground"><span>NAIK</span><span className="text-indigo-500">LVL.</span></div>
      <div className="flex items-center gap-3">
        <button 
          onClick={onRegister} 
          className="text-xs font-bold bg-primary text-primary-foreground px-5 py-2 rounded-xl transition-all duration-300 hover:bg-primary/90 active:scale-95 hover:-translate-y-px shadow-lg shadow-primary/20"
        >
          Daftar Sekarang
        </button>
      </div>
    </nav>
  );
}

function MainHeroSection({ onNavigate }: { onNavigate: () => void }) {
  const stats = [
    { value: 10000, label: "PENGGUNA", suffix: "+", formatter: (val: number) => Math.floor(val).toLocaleString('id-ID') },
    { value: 500, label: "JAM MATERI", suffix: "+", formatter: (val: number) => Math.floor(val).toString() },
    { value: 25, label: "MENTOR AHLI", suffix: "+", formatter: (val: number) => Math.floor(val).toString() },
    { value: 4.9, label: "RATING", suffix: "/5", decimals: 1 }
  ];
  return (
    <div className="text-center transition-colors duration-300 bg-background pt-12">
      <h1 className="text-[34px] font-bold leading-[1.1] mb-8 tracking-tight text-foreground drop-shadow-lg px-6">Cetak Satu Juta <br/>Investor Baru</h1>
      <div className="relative mx-2 aspect-video mb-8 p-[0.5px] bg-[linear-gradient(315deg,#4f46e5_10%,rgba(79,70,229,0.35)_25%,#4f46e5_40%,rgba(79,70,229,0.35)_55%,#4f46e5_70%,transparent_100%)] overflow-hidden shadow-lg shadow-indigo-500/10">
        <div className="w-full h-full overflow-hidden bg-muted"><iframe className="w-full h-full object-cover" src="https://www.youtube.com/embed/M7fiObo_jWI?controls=1&rel=0&modestbranding=1" title="NAIKLVL Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
      </div>
      <div className="flex flex-col gap-3.5 px-6 mb-12"><button onClick={onNavigate} className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl text-[14px] hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">Mulai Belajar Sekarang<ChevronRight size={16} strokeWidth={3} /></button></div>
      
      <div className="w-full px-4">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 py-8 border-y border-border relative">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                    <span className="text-[26px] font-extrabold text-foreground leading-none mb-1.5 tracking-tighter">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} formatter={stat.formatter}/>
                    </span>
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">{stat.label}</span>
                </div>
            ))}
            <div className="absolute top-1/2 left-8 right-8 h-px bg-border -translate-y-1/2"></div>
            <div className="absolute top-8 bottom-8 left-1/2 w-px bg-border -translate-x-1/2"></div>
        </div>
      </div>

    </div>
  );
}

function PricingSection({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div id="pricing" className="w-full max-w-md mx-auto relative px-4 pb-20 pt-8 bg-background transition-colors duration-300">
      <header className="mb-10 text-center relative px-2"><h2 className="text-[28px] font-bold tracking-tight text-foreground leading-tight">Daftar & <span className="text-indigo-500">Join Sekarang</span></h2></header>
      
      <div className="p-[1.5px] rounded-3xl bg-[linear-gradient(135deg,#6366f1,rgba(0,0,0,0)_35%,#4f46e5_50%,rgba(0,0,0,0)_65%,#6366f1)] dark:bg-[linear-gradient(135deg,#6366f1,#171717_35%,#4f46e5_50%,#171717_65%,#6366f1)] shadow-[0_0_60px_5px_rgba(79,70,229,0.3)]">
        <div className="relative bg-card rounded-[22.5px] overflow-hidden transition-colors duration-300">
          <div className="p-6 relative z-10">
            <div className="font-bold text-2xl tracking-tighter text-foreground mb-4">
              <span>NAIK</span><span className="text-indigo-500">LVL.</span>
            </div>
            <p className="text-card-foreground text-sm font-medium tracking-wide mb-4 uppercase">Akses Premium Selamanya</p>
            <div className="mb-1"><span className="text-destructive line-through text-lg font-medium">Rp999.000</span></div>
            <div className="mb-6"><span className="text-foreground text-4xl font-extrabold tracking-tight">RP99.000</span></div>
            <div className="space-y-4"><div><label className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ml-1"><Tag size={10} />Kode Promo</label><div className="flex gap-2 h-11"><input type="text" placeholder="Masukkan kode..." className="flex-1 bg-muted border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground" /><button className="bg-card hover:bg-muted text-foreground text-xs font-bold uppercase tracking-wider px-5 rounded-xl border border-border transition-colors">Apply</button></div></div><button onClick={onNavigate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg h-14 rounded-xl shadow-[0_4px_20px_rgba(79,70,229,0.4)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group border-t border-white/10"><span>BAYAR SEKARANG</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button><p className="text-center text-muted-foreground text-[10px]">Akses otomatis terbuka setelah pembayaran berhasil</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurriculumSection({ onNavigate }: { onNavigate: () => void }) {
  const UnicodeCheckmarkIcon = (props: any) => (
    <div {...props}>
        <span className="text-[1.2em] font-bold leading-none">✔</span>
    </div>
  );
  
  const cardData = [
    {
      title: "Peta Jalan Investasi Jelas",
      desc: <>Lupakan kebingungan. Kami telah menyusun <span className="font-semibold text-white bg-indigo-600/80 px-1">blueprint investasi langkah-demi-langkah</span>, dari nol hingga mahir, memastikan setiap keputusanmu strategis dan terarah.</>,
      icon: AlertTriangle,
      iconColor: "text-indigo-500",
      subPoints: [
        "Kurikulum belajar yang sangat runut",
        "Materi dari dasar fundamental hingga mahir",
        "Fokus pada studi kasus nyata di market",
        "Progress tracking untuk memantau perkembangan",
      ],
      imageUrl: "https://i.imghippo.com/files/FokJ5327sE.png",
      borderGradient: "bg-[linear-gradient(135deg,#4f46e5_10%,rgba(79,70,229,0.35)_25%,#4f46e5_40%,rgba(79,70,229,0.35)_55%,#4f46e5_70%,transparent_100%)]"
    },
    {
      title: "Didampingi Mentor Praktisi",
      desc: <>Anda tidak akan sendirian. Dapatkan <span className="font-semibold text-white bg-indigo-600/80 px-1">bimbingan personal dari para ahli</span> yang telah terbukti di market, mengubah ketakutan menjadi keuntungan yang terukur.</>,
      icon: AlertCircle,
      iconColor: "text-indigo-500",
      subPoints: [
        "Bimbingan intensif dari mentor praktisi",
        "Analisis portofolio rutin setiap bulan",
        "Manajemen risiko terukur dan profesional",
        "Validasi strategi trading secara langsung",
      ],
      imageUrl: "https://i.imghippo.com/files/UigB2182wY.png",
      borderGradient: "bg-[linear-gradient(225deg,#4f46e5_10%,rgba(79,70,229,0.35)_25%,#4f46e5_40%,rgba(79,70,229,0.35)_55%,#4f46e5_70%,transparent_100%)]"
    },
    {
      title: "Gabung Komunitas Eksklusif",
      desc: <>Bertumbuh bersama lebih cepat. Masuki <span className="font-semibold text-white bg-indigo-600/80 px-1">lingkaran investor yang saling mendukung</span>, berbagi insight, dan bergerak maju menuju kebebasan finansial bersama-sama.</>,
      icon: UnicodeCheckmarkIcon,
      iconColor: "text-indigo-500",
      subPoints: [
        "Komunitas investor aktif terbesar",
        "Diskusi & networking exclusives 24/7",
        "Update market & peluang profit harian",
        "Berbagi signal dan alpha yang akurat",
      ],
      imageUrl: "https://i.imghippo.com/files/jIkw5674ljw.png",
      borderGradient: "bg-[linear-gradient(45deg,#6366f1_5%,transparent_20%,#6366f1_40%,rgba(99,102,241,0.35)_60%,#6366f1_85%,transparent_100%)]"
    }
  ];

  const CardSectionContent = ({ title, desc, icon: Icon, iconColor, subPoints, imageUrl }: any) => {
    const titleParts = title.split(' ');
    const lastPart = titleParts.pop();
    const firstPart = titleParts.join(' ');

    return (
        <div>
            {/* Image Inside Card Content - Clean & Professional */}
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-muted shadow-inner">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-foreground text-[25px] font-black leading-tight tracking-tight text-left mb-3">
                {firstPart} <span className="text-indigo-500">{lastPart}</span>
            </h3>
            <div className="space-y-4">
                <p className="text-card-foreground/90 text-[17px] leading-relaxed font-normal tracking-tight">
                    {desc}
                </p>
                <ul className="space-y-4 border-t border-border pt-4">
                    {subPoints.map((point: string, spIdx: number) => (
                        <li key={spIdx} className="flex items-start gap-3.5 group">
                            <Icon
                                className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5 flex items-center justify-center`}
                            />
                            <span className="text-card-foreground text-[15.5px] leading-relaxed font-semibold">
                                {point}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
  };
  
  return (
    <div className="relative pb-16 pt-12 bg-background transition-colors duration-300">
      <div className="px-5 space-y-12">
        {cardData.map((card, index) => (
          <div key={index} className="relative">
            {/* Standard Card Border Gradient */}
            <div className={`p-[1px] rounded-2xl ${card.borderGradient}`}>
              <div className="bg-card px-4 pt-6 pb-6 rounded-[23px]">
                <CardSectionContent {...card} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function LearningModulesSection() {
  const modules = [
    { title: "Personal Finance", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto-format&fit=crop", desc1: <>Modul ini dirancang untuk membantu kalian membangun <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">fondasi keuangan yang sehat</span> melalui pengelolaan uang yang bijak.</>, desc2: <>Pelajari kebiasaan menabung konsisten, dana darurat, serta cara cerdas <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">mengatur cashflow</span> bulanan.</> },
    { title: "Capital Market", image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1000&auto-format&fit=crop", desc1: <>Pahami cara kerja pasar modal Indonesia (IHSG). Kenali instrumen investasi seperti <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">Saham, Obligasi, and Reksadana</span> secara mendalam.</>, desc2: <>Modul ini membahas regulasi, sesuai pasar, and langkah awal <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">memulai investasi dengan aman</span>.</> },
    { title: "Fundamental Analysis", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto-format&fit=crop", desc1: <>Belajar cara menilai kesehatan perusahaan melalui laporan keuangan. Temukan <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">saham 'salah harga'</span> (undervalued) untuk investasi jangka panjang.</>, desc2: <>Fokus pada <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">rasio-rasio penting</span> seperti PER, PBV, ROE, and analisis makro ekonomi.</> },
    { title: "Technical Analysis", image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto-format&fit=crop", desc1: <>Kuasai seni membaca grafik harga. Pelajari <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">Support & Resistance</span>, Trendline, and pola candlestick untuk menentukan waktu beli terbaik.</>, desc2: <>Cocok untuk kalian yang ingin <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">mengoptimalkan entry point</span> dalam trading maupun investasi aktif.</> },
    { title: "Money Management", image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000&auto-format&fit=crop", desc1: <>Kunci keberhasilan investor bukan hanya pada teknik, tapi pada <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">pengelolaan risiko</span>. Pelajari position sizing and risk/reward ratio.</>, desc2: <>Bangun <span className="font-semibold text-white bg-indigo-600 px-1 rounded-sm">psikologi trading yang kuat</span> agar tidak mudah panik saat pasar sedang volatil.</> }
  ];
  return (
    <div className="relative pt-6 pb-12 bg-background transition-colors duration-300 border-b border-border">
      <div className="py-6 px-6 bg-background/90 backdrop-blur-md sticky top-[70px] z-40 border-t border-border flex justify-center transition-colors duration-300 shadow-sm"><h2 className="text-[28px] font-bold tracking-tight text-center text-foreground"><span>Modul </span><span className="text-indigo-500">Pembelajaran</span></h2></div>
      <div className="flex flex-col gap-0 relative mt-4">{modules.map((module, index) => {
        const titleParts = module.title.split(' ');
        const firstPart = titleParts.slice(0, 1).join(' ');
        const lastPart = titleParts.slice(1).join(' ');
        
        return (
          <div key={index} className="flex pl-2 pr-3 relative">
            <div className="flex flex-col items-center mr-3 pt-1">
              <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
                <span className="text-[22px] text-indigo-500">✔</span>
              </div>
              {index !== modules.length - 1 && (<div className="w-[1.5px] h-full bg-border mt-2 min-h-[50px] transition-colors duration-300"></div>)}
            </div>
            <RevealOnScroll delay={index * 80} className="flex-1 pb-14">
              <div className="relative w-full h-[180px] rounded-xl mb-5 shadow-lg p-[0.5px] bg-[linear-gradient(135deg,#4f46e5_10%,rgba(79,70,229,0.35)_25%,#4f46e5_40%,rgba(79,70,229,0.35)_55%,#4f46e5_70%,transparent_100%)]">
                <div className="relative w-full h-full rounded-[11.5px] overflow-hidden bg-card group">
                  <img src={module.image} alt={`${module.title}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                    <span className="text-indigo-400 font-extrabold text-[10px] tracking-wider uppercase mb-2">NAIKLVL</span>
                    <h4 className="text-white text-[22px] font-bold leading-tight tracking-tight drop-shadow-lg">{module.title}</h4>
                  </div>
                </div>
              </div>
              <div className="text-foreground text-[15px] leading-relaxed font-normal tracking-tight text-left space-y-3">
                <h4 className="text-2xl font-bold text-foreground -mt-1 mb-3">
                    {firstPart}
                    {lastPart && <span className="text-indigo-500"> {lastPart}</span>}
                </h4>
                <p>{module.desc1}</p>
                <p>{module.desc2}</p>
              </div>
            </RevealOnScroll>
          </div>
        );
      })}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border bg-background text-center relative z-10 transition-colors duration-300">
      <div className="mb-6"><span className="font-bold text-xl tracking-tighter text-foreground"><span>NAIK</span><span className="text-indigo-500">LVL.</span></span></div>
      <p className="text-muted-foreground text-[11px]">&copy; {new Date().getFullYear()} PT NAIKLVL Indonesia. All rights reserved.</p>
    </footer>
  );
}

const Landing = () => {
  const navigate = useNavigate();
  const handleNavigate = () => { navigate('/courses'); };
  const handleRegister = () => { const element = document.getElementById('pricing'); if (element) { element.scrollIntoView({ behavior: 'smooth' }); } };
  return (
    <div className="bg-background text-foreground font-sans max-w-md mx-auto overflow-hidden relative selection:bg-indigo-600 selection:text-white transition-colors duration-300">
      <div className="min-h-screen">
        <Navbar onRegister={handleRegister} />
        <main>
          <MainHeroSection onNavigate={handleNavigate} />
          <CurriculumSection onNavigate={handleRegister} />
          <LearningModulesSection />
          <PricingSection onNavigate={handleRegister} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;