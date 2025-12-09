"use client";

import { motion } from "framer-motion";
import { Droplet, Heart, Sun, Leaf } from "lucide-react";
import Image from "next/image";

export default function Features() {

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

            </div>
        </section>
    );
}
