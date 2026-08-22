import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Code, Smartphone, Globe, Briefcase, Mail, X, ChevronLeft, ChevronRight, Menu, ArrowUp } from 'lucide-react';

// Import foto profil
import profileImg from './assets/foto/foto-profile.jpeg';

// Import foto project - Peminjaman Buku
import pinjamBuku0 from './assets/foto/pinjambuku.jpeg';
import pinjamBuku1 from './assets/foto/pinjambuku1.jpeg';
import pinjamBuku2 from './assets/foto/pinjambuku2.jpeg';
import pinjamBuku3 from './assets/foto/pinjambuku3.jpeg';
import pinjamBuku4 from './assets/foto/pinjambuku4.jpeg';
import pinjamBuku5 from './assets/foto/pinjambuku5.jpeg';

// Import foto project - WhatsApp Broadcast API
import waBuktiTerkirim from './assets/foto/bukti-wa-terkirim.png';
import waProsesPengujian from './assets/foto/proses-pengujian.jpeg';
import waCredential from './assets/foto/credential-ekspose.jpeg';

// Import foto project - Kasir Seafood (Jhon)
import jhon0 from './assets/foto/jhon.jpeg';
import jhon1 from './assets/foto/jhon1.jpeg';
import jhon2 from './assets/foto/jhon2.jpeg';
import jhon3 from './assets/foto/jhon3.jpeg';
import jhon4 from './assets/foto/jhon4.jpeg';

/* ============================================================================
   Helper: fade/slide reveal on first scroll-into-view.
============================================================================ */
function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ============================================================================
   Helper: typewriter effect.
============================================================================ */
function Typewriter({ text, className = '', speed = 35, startDelay = 200 }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {shown}
      <span className="inline-block w-[3px] h-[0.85em] bg-sky-400 ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" />
    </span>
  );
}

/* ============================================================================
   Helper: magnetic + ripple button. Wraps any CTA so it pulls gently toward
   the cursor and produces a ripple + confetti burst on click.
============================================================================ */
function FXButton({ as: Tag = 'button', className = '', children, onFire, ...props }) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };

  const handleMouseLeave = () => {
    const node = ref.current;
    if (node) node.style.transform = 'translate(0px, 0px)';
  };

  const handleClick = (e) => {
    const node = ref.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    }
    if (onFire) onFire(e);
    if (props.onClick) props.onClick(e);
  };

  return (
    <Tag
      ref={ref}
      {...props}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden will-change-transform transition-transform duration-150 ease-out ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40 animate-[ripple_0.65s_ease-out_forwards]"
          style={{ left: r.x, top: r.y, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
        />
      ))}
    </Tag>
  );
}

/* ============================================================================
   Helper: 3D tilt + glare card, used to give project cards a "premium" feel.
============================================================================ */
function TiltCard({ children, className = '', onClick }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 10;
    const rotX = (0.5 - py) * 10;
    node.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    node.style.setProperty('--glare-x', `${px * 100}%`);
    node.style.setProperty('--glare-y', `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    const node = ref.current;
    if (node) node.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
      className={`relative ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(250px circle at var(--glare-x,50%) var(--glare-y,50%), rgba(56,189,248,0.14), transparent 60%)',
        }}
      />
    </div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroRef = useRef(null);

  const profile = {
    name: "Muhamad Daffa Cahyo Santoso",
    role: "Mahasiswa Sistem Informasi",
    university: "Universitas Pamulang",
    bio: "Saya senang membangun sesuatu yang orang lain bisa langsung pakai, dari aplikasi peminjaman buku sampai sistem kasir restoran. Saya banyak belajar lewat vibe coding, dan menurut saya itu bukan soal jalan pintas, tapi soal cepat paham cara sesuatu bekerja lewat eksperimen langsung.",
    skills: ["Flutter", "Dart", "HTML5", "CSS3", "JavaScript", "REST API", "Bug Hunting", "Git & GitHub"]
  };

  const projects = [
    {
      id: 1,
      category: "mobile",
      title: "Aplikasi Mobile Peminjaman Buku Online",
      tech: ["Flutter", "Dart", "UI/UX Design"],
      description: "Aplikasi peminjaman buku berbasis mobile dengan fitur autentikasi pengguna, pengajuan pinjaman dinamis, manajemen jadwal pengembalian, dan riwayat akun.",
      highlights: ["Layar Dashboard & Autentikasi", "Form Peminjaman & Fasilitas Tambahan", "Manajemen Profil Pengguna"],
      images: [pinjamBuku0, pinjamBuku1, pinjamBuku2, pinjamBuku3, pinjamBuku4, pinjamBuku5]
    },
    {
      id: 2,
      category: "web",
      title: "Integrasi WhatsApp Broadcast & Notification API",
      tech: ["REST API", "Qontak API", "cURL / Backend Integration"],
      description: "Sistem pengiriman notifikasi otomatis dan konfirmasi janji temu via WhatsApp Direct untuk instansi kesehatan (RSAB Harapan Kita) menggunakan API Qontak.",
      highlights: ["Automated Appointment Confirmation", "Custom Dynamic Template Mapping", "Secure Endpoint Integration"],
      images: [waBuktiTerkirim, waProsesPengujian, waCredential]
    },
    {
      id: 3,
      category: "mobile",
      title: "Aplikasi Kasir (POS) Jhon Seafood 68",
      tech: ["Flutter", "Dart", "UI/UX Design"],
      description: "Aplikasi point-of-sale berbasis mobile untuk restoran seafood, mendukung manajemen menu, pemrosesan pesanan dengan detail transaksi, serta laporan penjualan harian secara real-time.",
      highlights: [
        "Autentikasi Login Admin & Kasir",
        "Kelola Menu Makanan (Tambah/Edit/Hapus)",
        "Detail Transaksi (Nama Pelanggan, No. Meja, Metode Pembayaran)",
        "Laporan Penjualan Harian & Riwayat Transaksi"
      ],
      images: [jhon0, jhon1, jhon2, jhon3, jhon4]
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  const navLinks = [
    { href: '#about', label: 'Tentang' },
    { href: '#skills', label: 'Keahlian' },
    { href: '#projects', label: 'Portofolio' },
    { href: '#contact', label: 'Kontak' },
  ];

  // Active-section tracking for the nav underline.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll progress bar + back-to-top visibility.
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom cursor — desktop with a precise pointer only.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setCursorEnabled(true);

    let ringX = 0, ringY = 0, targetX = 0, targetY = 0, raf;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const over = (e) => {
      if (e.target.closest('button, a, [role="button"]')) setCursorHover(true);
    };
    const out = (e) => {
      if (e.target.closest('button, a, [role="button"]')) setCursorHover(false);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Cursor-follow glow behind hero copy.
  const handleHeroMouseMove = useCallback((e) => {
    const node = heroRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty('--glow-x', `${x}%`);
    node.style.setProperty('--glow-y', `${y}%`);
  }, []);

  // Light tilt on the profile photo.
  const handlePhotoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Confetti burst, fired from FXButton clicks.
  const fireConfetti = (e) => {
    const colors = ['#38bdf8', '#0ea5e9', '#7dd3fc', '#ffffff', '#38bdf866'];
    const originX = e.clientX;
    const originY = e.clientY;
    const pieces = Array.from({ length: 22 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: originX,
      y: originY,
      dx: (Math.random() - 0.5) * 260,
      dy: (Math.random() - 0.9) * 220,
      rot: Math.random() * 360,
      color: colors[i % colors.length],
      size: 5 + Math.random() * 5,
    }));
    setConfetti((c) => [...c, ...pieces]);
    setTimeout(() => {
      const ids = new Set(pieces.map((p) => p.id));
      setConfetti((c) => c.filter((p) => !ids.has(p.id)));
    }, 900);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const tickerSkills = useMemo(() => [...profile.skills, ...profile.skills], []);

  return (
    <div className={`min-h-screen bg-[#0d1321] text-white font-sans selection:bg-sky-500 selection:text-black relative overflow-x-hidden [scroll-behavior:smooth] ${cursorEnabled ? 'md:cursor-none' : ''}`}>

      {/* Local keyframes / one-off animation defs */}
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes ripple { from { width: 10px; height: 10px; margin-left: -5px; margin-top: -5px; opacity: 0.55; } to { width: 340px; height: 340px; margin-left: -170px; margin-top: -170px; opacity: 0; } }
        @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(60px,-40px) scale(1.15); } 66% { transform: translate(-40px,30px) scale(0.9); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-70px,50px) scale(0.85); } 66% { transform: translate(50px,-30px) scale(1.2); } }
        @keyframes blob3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,60px) scale(1.1); } }
        @keyframes twinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 0.9; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes confettiFall { to { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; } }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-sky-500 via-sky-300 to-sky-500 transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>

      {/* Custom cursor (desktop, fine pointer only) */}
      {cursorEnabled && (
        <>
          <div
            ref={cursorDotRef}
            className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-sky-400 pointer-events-none z-[70]"
            style={{ transform: 'translate(-100px,-100px)' }}
          ></div>
          <div
            ref={cursorRingRef}
            className="hidden md:block fixed top-0 left-0 rounded-full border border-sky-400/60 pointer-events-none z-[70] transition-[width,height,opacity] duration-200"
            style={{
              width: cursorHover ? 46 : 28,
              height: cursorHover ? 46 : 28,
              marginLeft: cursorHover ? -23 : -14,
              marginTop: cursorHover ? -23 : -14,
              opacity: 0.8,
              transform: 'translate(-100px,-100px)',
            }}
          ></div>
        </>
      )}

      {/* Confetti layer */}
      <div className="fixed inset-0 pointer-events-none z-[80]">
        {confetti.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-sm"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--rot': `${p.rot}deg`,
              animation: 'confettiFall 0.85s cubic-bezier(0.2,0.7,0.4,1) forwards',
            }}
          ></span>
        ))}
      </div>

      {/* Animated ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#17233d] via-[#0d1321] to-[#070a12]"></div>
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-sky-500/10 blur-[100px]" style={{ animation: 'blob1 22s ease-in-out infinite' }}></div>
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-sky-400/10 blur-[110px]" style={{ animation: 'blob2 26s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[340px] h-[340px] rounded-full bg-sky-300/8 blur-[100px]" style={{ animation: 'blob3 20s ease-in-out infinite' }}></div>

        {/* Twinkling particles */}
        {useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: 2 + Math.random() * 4,
          delay: Math.random() * 5,
        })), []).map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          ></span>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 border-b border-white/10 backdrop-blur-md bg-[#0d1321]/85 sticky top-0 px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-sm sm:text-base font-semibold tracking-wide flex items-center gap-2 truncate pr-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 animate-[twinkle_2.4s_ease-in-out_infinite]"></span>
            <span className="truncate">{profile.name}</span>
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm text-white/55 flex-shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 transition-colors ${isActive ? 'text-sky-400' : 'hover:text-sky-400'}`}
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[1.5px] bg-sky-500 transition-all duration-300 ease-out"
                    style={{ width: isActive ? '100%' : '0%' }}
                  ></span>
                </a>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-white/70 hover:text-sky-400 transition-colors flex-shrink-0"
            aria-label="Buka menu"
          >
            <span className="relative inline-block w-5 h-5">
              <Menu size={20} className={`absolute inset-0 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X size={20} className={`absolute inset-0 transition-all duration-200 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </span>
          </button>
        </div>

        <div
          className="md:hidden max-w-6xl mx-auto overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: mobileMenuOpen ? '260px' : '0px', opacity: mobileMenuOpen ? 1 : 0 }}
        >
          <div className="flex flex-col gap-1 text-sm text-white/60 border-t border-white/10 pt-3 mt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-1 transition-colors ${activeSection === link.href.slice(1) ? 'text-sky-400' : 'hover:text-sky-400'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="about"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16"
        style={{ '--glow-x': '20%', '--glow-y': '30%' }}
      >
        <div
          className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: 'radial-gradient(400px circle at var(--glow-x) var(--glow-y), rgba(56,189,248,0.08), transparent 70%)' }}
        ></div>

        <div className="flex-1 space-y-6 flex flex-col items-center text-center md:items-start md:text-left relative">
          <Reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 text-sky-400/90 text-[11px] sm:text-xs tracking-wide uppercase">
            {profile.university}
          </Reveal>
          <Reveal delay={80} as="h1" className="font-serif text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] min-h-[2.3em]">
            <Typewriter text="Halo, saya Muhamad Daffa Cahyo Santoso." />
          </Reveal>
          <Reveal delay={160} as="p" className="text-sm sm:text-base text-white/65 leading-relaxed max-w-lg break-words">
            {profile.bio}
          </Reveal>
          <Reveal delay={240} className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
            <FXButton
              as="a"
              href="#projects"
              onFire={fireConfetti}
              className="px-6 py-3 rounded-md bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] active:scale-[0.97] text-center inline-block"
            >
              Lihat Project
            </FXButton>
            <FXButton
              as="a"
              href="#contact"
              className="px-6 py-3 rounded-md border border-white/15 hover:border-sky-500/50 text-white/75 hover:text-white active:scale-[0.97] text-center inline-block"
            >
              Hubungi Saya
            </FXButton>
          </Reveal>
        </div>

        {/* Foto profil */}
        <div className="relative flex-shrink-0" style={{ perspective: '800px' }}>
          <div className="absolute -inset-3 rounded-xl bg-sky-500/20 blur-2xl opacity-60 animate-[twinkle_4s_ease-in-out_infinite]"></div>
          <div
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={resetTilt}
            className="relative w-44 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#131c2e] border border-white/10 rounded-md px-3 sm:px-4 py-2 text-[11px] sm:text-xs text-white/70 shadow-lg whitespace-nowrap">
            {profile.role}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-white/10">
        <Reveal as="h2" className="font-serif text-lg sm:text-xl font-bold mb-5 sm:mb-6 flex items-center gap-3 text-white/90">
          <Code size={18} className="text-sky-500" /> Yang saya kuasai
        </Reveal>

        {/* Static tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6">
          {profile.skills.map((skill, index) => (
            <Reveal key={index} delay={index * 45} as="span" className="inline-block px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-md border border-white/10 bg-white/[0.03] hover:border-sky-500/40 hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-all text-xs sm:text-sm text-white/75">
              {skill}
            </Reveal>
          ))}
        </div>

        {/* Infinite marquee ticker */}
        <div className="relative overflow-hidden border-t border-b border-white/10 py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-10 whitespace-nowrap w-max" style={{ animation: 'marquee 18s linear infinite' }}>
            {tickerSkills.map((skill, i) => (
              <span key={i} className="text-xs sm:text-sm text-white/30 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-500"></span> {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-7 sm:mb-9 gap-4">
          <Reveal>
            <h2 className="font-serif text-lg sm:text-xl font-bold flex items-center gap-3 text-white/90">
              <Briefcase size={18} className="text-sky-500" /> Beberapa hal yang sudah saya buat
            </h2>
            <p className="text-white/45 text-xs sm:text-sm mt-1.5">Klik salah satu untuk lihat tampilannya lebih dekat.</p>
          </Reveal>

          <div className="flex flex-wrap border border-white/10 p-1 rounded-md text-xs gap-1 w-full md:w-auto relative">
            {[
              { key: 'all', label: 'Semua' },
              { key: 'mobile', label: 'Mobile App' },
              { key: 'web', label: 'Bug Hunter' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 md:flex-none px-4 py-2 rounded transition-colors duration-200 whitespace-nowrap ${activeTab === tab.key ? 'bg-sky-500 text-black font-semibold' : 'text-white/50 hover:text-white'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 90} className={idx === 0 ? 'md:col-span-2' : ''}>
              <TiltCard onClick={() => openGallery(project)} className="group cursor-pointer h-full">
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.02] p-5 sm:p-6 flex flex-col justify-between hover:border-sky-500/35 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="p-2 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {project.category === 'mobile' ? <Smartphone size={18} /> : <Globe size={18} />}
                      </span>
                      {project.images && project.images.length > 0 && (
                        <span className="text-xs text-white/35">{project.images.length} foto</span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 transition-colors group-hover:text-sky-300">{project.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4 break-words">{project.description}</p>

                    <div className="space-y-1.5 mb-6">
                      <h4 className="text-[11px] uppercase tracking-wider text-white/35 font-semibold">Fitur utama</h4>
                      <ul className="text-xs text-white/55 space-y-1">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1 h-1 mt-1.5 rounded-full bg-sky-500 flex-shrink-0"></span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded border border-white/10 text-white/50 transition-colors group-hover:border-sky-500/25 group-hover:text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10">
        <Reveal className="max-w-xl mx-auto text-center space-y-4">
          <h2 className="font-serif text-white text-xl sm:text-2xl font-bold">Ada yang bisa dikerjakan bareng?</h2>
          <p className="text-white/55 text-sm">
            Saya terbuka untuk kesempatan magang, proyek lepas, atau kolaborasi pengembangan perangkat lunak.
          </p>
          <div className="pt-4 flex flex-col items-center gap-3">
            <FXButton
              as="a"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=daffacahyo1@gmail.com&su=Halo%2C%20Saya%20Ingin%20Berkolaborasi"
              target="_blank"
              rel="noopener noreferrer"
              onFire={fireConfetti}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] active:scale-[0.97]"
            >
              <Mail size={18} /> Kirim Email
            </FXButton>
            <p className="text-white/35 text-sm break-all">daffacahyo1@gmail.com</p>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 text-center py-6 text-xs text-white/35">
        © 2026 Daffa Cahyo.
      </footer>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-sky-500 text-black shadow-lg hover:bg-sky-400 hover:-translate-y-1 active:scale-90 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp size={18} />
      </button>

      {/* Gallery Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-10"
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-3xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeGallery}
              className="absolute -top-10 right-0 sm:-top-12 md:top-0 md:-right-12 text-white hover:text-sky-400 hover:rotate-90 transition-all duration-300 p-2 z-20"
            >
              <X size={26} />
            </button>

            <div className="text-center mb-3 sm:mb-4 px-10">
              <h3 className="text-sm sm:text-lg font-semibold text-white">{selectedProject.title}</h3>
              <p className="text-xs text-white/40 mt-1">{currentImageIndex + 1} / {selectedProject.images.length}</p>
            </div>

            <div className="relative w-full flex items-center justify-center">
              {selectedProject.images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-1 sm:left-0 sm:-translate-x-2 md:-translate-x-12 z-10 p-1.5 sm:p-2 rounded-full bg-[#131c2e]/90 border border-white/10 hover:bg-sky-500 hover:text-black hover:scale-110 text-white transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              <img
                key={currentImageIndex}
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                className="max-h-[55vh] sm:max-h-[65vh] md:max-h-[70vh] w-auto max-w-full rounded-lg border border-white/10 shadow-2xl object-contain"
              />

              {selectedProject.images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-1 sm:right-0 sm:translate-x-2 md:translate-x-12 z-10 p-1.5 sm:p-2 rounded-full bg-[#131c2e]/90 border border-white/10 hover:bg-sky-500 hover:text-black hover:scale-110 text-white transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {selectedProject.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-2 px-2">
                {selectedProject.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      i === currentImageIndex ? 'border-sky-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}