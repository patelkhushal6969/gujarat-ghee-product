"use client";

import { motion } from "framer-motion";
import { Droplet, Heart, Sun, Leaf } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function Features() {
    const stripRef = useRef<HTMLDivElement | null>(null);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const isJumpingRef = useRef(false);

    // remote videos
    const videos = [
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978670/video-1_htnesr.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978655/video-8_hy8eyn.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978639/video-10_t1tyio.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765979598/video-5_uvigsp.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978637/video-3_trodap.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978605/video-9_fssyh8.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978602/video-4_z0pifa.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978495/video-2_fvraed.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978470/video-7_gymg1q.mp4" },
        { src: "https://res.cloudinary.com/dydvej0ca/video/upload/v1765978300/video-6_txdjen.mp4" },
    ];

    // pointer drag - horizontal
    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        const el = stripRef.current;
        if (!el) return;
        isDownRef.current = true;
        el.setPointerCapture(e.pointerId);
        startXRef.current = e.clientX;
        scrollLeftRef.current = el.scrollLeft;
    }
    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!isDownRef.current) return;
        const el = stripRef.current;
        if (!el) return;
        e.preventDefault();
        const walk = (e.clientX - startXRef.current) * 1.2;
        el.scrollLeft = scrollLeftRef.current - walk;
    }
    function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
        isDownRef.current = false;
        const el = stripRef.current;
        if (el) el.releasePointerCapture?.(e.pointerId);
    }
    function scrollBy(dir: number) {
        const el = stripRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    }

    // infinite loop handler using 3x duplication (seamless jump without visible bounce)
    useEffect(() => {
        const el = stripRef.current;
        if (!el) return;

        const resetToMiddle = () => {
            requestAnimationFrame(() => {
                try {
                    // set to middle copy
                    el.scrollLeft = el.scrollWidth / 3;
                    // disable jump adjustments briefly while stabilizing
                    isJumpingRef.current = true;
                    setTimeout(() => (isJumpingRef.current = false), 40);
                } catch {}
            });
        };
        resetToMiddle();

        const onScroll = () => {
            if (isJumpingRef.current) return;
            const third = el.scrollWidth / 3;
            // epsilon to avoid flicker while user scrolls
            if (el.scrollLeft >= third * 2 - 1) {
                isJumpingRef.current = true;
                const newLeft = el.scrollLeft - third;
                el.style.scrollBehavior = "auto";
                el.scrollLeft = newLeft;
                requestAnimationFrame(() => {
                    el.style.scrollBehavior = "";
                    setTimeout(() => (isJumpingRef.current = false), 40);
                });
            } else if (el.scrollLeft <= 1) {
                isJumpingRef.current = true;
                const newLeft = el.scrollLeft + third;
                el.style.scrollBehavior = "auto";
                el.scrollLeft = newLeft;
                requestAnimationFrame(() => {
                    el.style.scrollBehavior = "";
                    setTimeout(() => (isJumpingRef.current = false), 40);
                });
            }
        };

        el.addEventListener("scroll", onScroll);
        window.addEventListener("resize", resetToMiddle);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", resetToMiddle);
        };
    }, [videos]);

    // play/pause visible videos and show per-video loading/error overlay
    useEffect(() => {
        const el = stripRef.current;
        if (!el) return;

        // Observe visibility and play/pause
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const v = entry.target as HTMLVideoElement;
                // only attempt play when at least 50% visible
                if (entry.intersectionRatio >= 0.5) {
                    // ensure muted (required for autoplay)
                    v.muted = true;
                    v.play().catch(() => {
                        // if play fails, leave paused; we still try to show loaded state if available
                    });
                } else {
                    try { v.pause(); } catch {}
                }
            });
        }, { threshold: [0.5] });

        // manage load/error UI via DOM (avoids extra rerenders)
        const onCanPlayThrough = (e: Event) => {
            const video = e.currentTarget as HTMLVideoElement;
            const wrapper = video.parentElement as HTMLElement | null;
            if (wrapper) wrapper.classList.add("is-ready");
            // try to play if visible
            video.play().catch(() => {});
        };
        const onError = (e: Event) => {
            const video = e.currentTarget as HTMLVideoElement;
            const wrapper = video.parentElement as HTMLElement | null;
            if (wrapper) wrapper.classList.add("is-error");
            console.warn("Video failed to load/play:", (video as HTMLVideoElement).src, e);
        };

        // observe all current videos (and re-observe on DOM changes)
        const observeAll = () => {
            const vids = Array.from(el.querySelectorAll("video")) as HTMLVideoElement[];
            vids.forEach(v => {
                io.observe(v);
                v.addEventListener("canplaythrough", onCanPlayThrough);
                v.addEventListener("error", onError);
                // if it already has enough data, mark it ready
                if (v.readyState >= 3) {
                    const wrapper = v.parentElement as HTMLElement | null;
                    if (wrapper) wrapper.classList.add("is-ready");
                }
            });
            return vids;
        };

        let observed = observeAll();

        // watch for DOM changes (duplication re-render) and re-bind
        const mo = new MutationObserver(() => {
            observed.forEach(v => {
                io.unobserve(v);
                v.removeEventListener("canplaythrough", onCanPlayThrough);
                v.removeEventListener("error", onError);
            });
            observed = observeAll();
        });
        mo.observe(el, { childList: true, subtree: true });

        return () => {
            observed.forEach(v => {
                io.unobserve(v);
                v.removeEventListener("canplaythrough", onCanPlayThrough);
                v.removeEventListener("error", onError);
            });
            io.disconnect();
            mo.disconnect();
        };
    }, [videos]);

    return (
        <section id="features" className="py-24 bg-white relative">
            <div className="container mx-auto px-6 md:px-20">

                {/* The Process Section */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-deep-brown mb-4">The Vedic Bilona Method</h2>
                        <p className="text-clay-red text-xl font-serif italic">પરંપરાગત રીત (Traditional Way)</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-clay-red/10"
                        >
                            <Image
                                src="/images/bilona-process.png"
                                alt="Bilona Process"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="space-y-6">
                            {[
                                { step: "1", title: "Milking", desc: "Hand-milked from free-grazing Gir Cows." },
                                { step: "2", title: "Curd Formation", desc: "Milk is boiled and set into curd in clay pots." },
                                { step: "3", title: "Bilona (Churning)", desc: "Curd is hand-churned bidirectionally to extract Makhan." },
                                { step: "4", title: "Heating", desc: "Makhan is slow-heated on wood fire to make Ghee." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-12 h-12 flex-shrink-0 bg-ghee-gold/20 rounded-full flex items-center justify-center text-clay-red font-serif font-bold text-lg">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif text-deep-brown">{item.title}</h4>
                                        <p className="text-deep-brown/70 text-sm font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* The Benefits Section - Card Design */}
                <div className="bg-cream/50 rounded-3xl p-8 md:p-16 border border-ghee-gold/10 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 opacity-10">
                        <svg width="200" height="200" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="#A0522D" />
                        </svg>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-deep-brown mb-4">Nature’s Golden Medicine</h2>
                        <p className="text-lg text-deep-brown/80">
                            According to Ayurveda, Desi Ghee is <span className="italic font-serif text-clay-red">'Rasayana'</span> — a rejuvenator.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {[
                            { icon: Heart, text: "Healthy Heart", sub: "Reduces bad cholesterol" },
                            { icon: Sun, text: "Immunity", sub: "Natural disease fighter" },
                            { icon: Leaf, text: "Digestion", sub: "Improves gut health" },
                            { icon: Droplet, text: "Skin Glow", sub: "Nourishes from within" }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-white p-6 rounded-xl border border-yellow-900/10 shadow-lg shadow-yellow-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-ghee-gold/10 rounded-full flex items-center justify-center mb-4 text-clay-red">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-serif font-medium text-deep-brown mb-1">{benefit.text}</h3>
                                <p className="text-sm text-deep-brown/60">{benefit.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* The Video Section */}
                <div className="mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-6"
                    >
                        <h3 className="text-3xl font-serif text-deep-brown mb-1">Featured Videos</h3>
                        <p className="text-deep-brown/70 text-sm">Swipe or use the arrows to browse</p>
                    </motion.div>

                    <div className="relative">
                        <div
                            ref={stripRef}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerLeave={() => (isDownRef.current = false)}
                            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory -mx-2 px-2 hide-scrollbar"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {Array(3).fill(null).flatMap((_, group) =>
                                videos.map((v, i) => {
                                    const idx = group * videos.length + i;
                                    return (
                                        <article
                                            key={idx}
                                            className="video-item flex-shrink-0 w-56 sm:w-64 md:w-72 snap-start bg-white rounded-xl overflow-hidden border border-ghee-gold/10 shadow-md relative"
                                        >
                                            {/* loading overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 pointer-events-none transition-opacity duration-200 opacity-100 video-overlay">
                                                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            </div>

                                            {/* error overlay - shown when load fails */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 hidden video-error">
                                                <span className="text-white text-sm">Unable to load</span>
                                            </div>

                                            <video
                                                src={v.src}
                                                crossOrigin="anonymous"
                                                // allow preload to improve chances of being playable
                                                preload="auto"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                // avoid majority of autoplay blocks by managing play via IntersectionObserver
                                                className="w-full aspect-[9/16] object-cover bg-black"
                                            />
                                        </article>
                                    );
                                })
                            )}
                        </div>
                        {/* arrows */}
                        <button
                            aria-label="Scroll left"
                            onClick={() => scrollBy(-1)}
                            className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md"
                        >
                            <svg className="w-4 h-4 text-deep-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>

                        <button
                            aria-label="Scroll right"
                            onClick={() => scrollBy(1)}
                            className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md"
                        >
                            <svg className="w-4 h-4 text-deep-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                    </div>
                </div>

            </div>

            {/* small CSS to hide overlays when ready / error - tailwind utilities not sufficient here without rerenders */}
            <style>{`
                /* when video wrapper gets 'is-ready' class we hide overlay */
                .video-item.is-ready .video-overlay { opacity: 0; visibility: hidden; pointer-events: none; }
                /* video-error class toggled on failure */
                .video-item.is-error .video-overlay { opacity: 0; visibility: hidden; }
                .video-item.is-error .video-error { display: flex; }
            `}</style>
        </section>
    );
}
