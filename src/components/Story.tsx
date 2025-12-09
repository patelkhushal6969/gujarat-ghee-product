"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Story() {
    return (
        <section id="story" className="py-24 bg-cream relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-ghee-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-clay-red/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 md:px-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Image/Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="order-2 md:order-1 relative"
                    >
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl border-4 border-white/30 rotate-[-1deg]">
                            <Image
                                src="/images/gir-cows.png"
                                alt="Gir Cows Grazing"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Caption Box */}
                        <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white/90 backdrop-blur-sm p-6 shadow-lg rounded-tl-3xl border-b-4 border-ghee-gold max-w-xs z-10">
                            <p className="font-serif text-xl italic text-clay-red mb-1">Gaumata</p>
                            <p className="text-sm text-deep-brown/80">Revered as the mother, the Gir cow connects us to our divine roots.</p>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="order-1 md:order-2 space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif text-deep-brown mb-2">The Origin</h2>
                            <h3 className="text-2xl font-serif text-clay-red italic font-normal">પવિત્ર ગીર ગાય (Holy Gir Cow)</h3>
                        </div>

                        <p className="text-lg text-deep-brown/80 leading-relaxed font-light">
                            Our journey begins in the heart of Gujarat, where the majestic Gir cows graze freely under the open sun. Unlike modern dairy farms, we believe in <span className="font-bold text-clay-red">Ahimsa</span> (non-violence) and traditional care.
                        </p>

                        <p className="text-lg text-deep-brown/80 leading-relaxed font-light">
                            The milk is not just an ingredient; it is a blessing. Rich in A2 protein, it forms the base of our golden elixir. We ensure that the calf gets its share first, preserving the cycle of nature and love.
                        </p>

                        <div className="pt-4 border-l-4 border-ghee-gold pl-6">
                            <p className="text-xl font-serif text-deep-brown italic">
                                "From our pastures to your plate, purity is our only promise."
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
