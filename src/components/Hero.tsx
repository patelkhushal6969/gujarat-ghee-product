"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-cream pt-20 pb-24 md:py-0">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-lippan-pattern z-0" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/50 to-transparent z-10" />

            <div className="container mx-auto px-4 md:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex-1 text-center md:text-left order-1 md:order-1 pt-8 md:pt-0"
                >
                    <span className="block text-clay-red font-bold tracking-widest uppercase text-xs md:text-sm mb-4">
                        Shuddh Desi • Ghar nu Swad
                    </span>
                    <h1 className="text-4xl md:text-7xl font-serif text-deep-brown leading-[1.1] mb-6">
                        Pure <span className="text-ghee-gold">Gold</span> from the Lands of <span className="italic text-clay-red">Gujarat</span>.
                    </h1>
                    <p className="text-base md:text-lg text-deep-brown/80 mb-8 max-w-lg mx-auto md:mx-0 font-light">
                        Hand-churned Bilona Ghee made from the milk of free-grazing Gir Cows. A spoon of tradition, a lifetime of health.
                    </p>

                    <motion.a
                        href="https://wa.me/917874779437?text=Kem%20cho!%20I%20am%20interested%20in%20the%20Gujarat%20Ghee%20Product.%20Please%20share%20the%20price%20and%20delivery%20details."
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="hidden md:inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        Inquire & Buy on WhatsApp
                        <ArrowRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 flex justify-center relative order-2 md:order-2"
                >
                    {/* Golden Glow Effect */}
                    <div className="absolute -inset-10 bg-ghee-gold/30 blur-3xl rounded-full" />

                    <div className="relative w-72 md:w-96 aspect-[4/5] rounded-2xl rotate-1 overflow-hidden shadow-2xl border-4 border-white/50">
                        <Image
                            src="/images/hero-jar.png"
                            alt="Gujarat Ghee Jar"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
