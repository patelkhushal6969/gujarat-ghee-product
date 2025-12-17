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

    const videos = [
        { src: "/videos/video-1.mp4" },
        { src: "/videos/video-2.mp4" },
        { src: "/videos/video-3.mp4" },
        { src: "/videos/video-10.mp4" },
        { src: "/videos/video-5.mp4" },
        { src: "/videos/video-6.mp4" },
        { src: "/videos/video-7.mp4" },
        { src: "/videos/video-8.mp4" },
        { src: "/videos/video-9.mp4" },
        { src: "/videos/video-4.mp4" },
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

    // infinite loop handler using 3x duplication
    useEffect(() => {
        const el = stripRef.current;
        if (!el) return;
        // start from middle copy
        const resetToMiddle = () => {
            // small RAF to wait layout
            requestAnimationFrame(() => {
                try {
                    el.scrollLeft = el.scrollWidth / 3;
                } catch {}
            });
        };
        resetToMiddle();

        const onScroll = () => {
            if (isJumpingRef.current) return; // ignore while we adjust
            const third = el.scrollWidth / 3;
            // small epsilon to avoid micro-flips
            if (el.scrollLeft >= third * 2 - 1) {
                isJumpingRef.current = true;
                const newLeft = el.scrollLeft - third;
                // perform instant jump (disable smooth scrolling briefly)
                el.style.scrollBehavior = "auto";
                el.scrollLeft = newLeft;
                requestAnimationFrame(() => {
                    el.style.scrollBehavior = "";
                    // allow a short grace before re-enabling adjustments
                    setTimeout(() => (isJumpingRef.current = false), 50);
                });
            } else if (el.scrollLeft <= 1) {
                isJumpingRef.current = true;
                const newLeft = el.scrollLeft + third;
                el.style.scrollBehavior = "auto";
                el.scrollLeft = newLeft;
                requestAnimationFrame(() => {
                    el.style.scrollBehavior = "";
                    setTimeout(() => (isJumpingRef.current = false), 50);
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
                            {Array(3).fill(null).flatMap(() => videos).map((v, i) => (
                                <article
                                    key={i}
                                    className="flex-shrink-0 w-56 sm:w-64 md:w-72 snap-start bg-white rounded-xl overflow-hidden border border-ghee-gold/10 shadow-md"
                                >
                                    <video
                                        src={v.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="w-full aspect-[9/16] object-cover bg-black"
                                    />
                                </article>
                            ))}
                        </div>
                        <style jsx global>{`
                            .hide-scrollbar::-webkit-scrollbar { display: none; }
                            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                        `}</style>

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
        </section>
    );
}
