"use client";

import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-deep-brown text-cream pt-16 pb-24 md:pb-8 border-t border-ghee-gold/30">
            <div className="container mx-auto px-6 md:px-20">

                <div className="grid md:grid-cols-3 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-serif text-ghee-gold">Gujarat Ghee Product</h2>
                        <p className="text-cream/80 font-light max-w-xs leading-relaxed">
                            Bringing the purity of traditional Bilona Ghee from the pastures of Gir to your kitchen.
                            <br /><span className="italic text-clay-red/90">Shudh. Desi. Sattvic.</span>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-serif text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-cream/70 font-light">
                            <li><a href="#home" className="hover:text-ghee-gold transition-colors">Home</a></li>
                            <li><a href="#story" className="hover:text-ghee-gold transition-colors">Our Story</a></li>
                            <li><a href="#features" className="hover:text-ghee-gold transition-colors">Benefits</a></li>
                            <li><a href="#contact" className="hover:text-ghee-gold transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div>
                        <h3 className="text-xl font-serif text-white mb-6">Connect With Us</h3>

                        <div className="space-y-4 mb-8 text-cream/80 font-light">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-clay-red shrink-0 mt-1" />
                                <span>123, Gir Forest Road,<br />Junagadh, Gujarat - 362001</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-clay-red shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-ghee-gold">+91 98765 43210</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-clay-red shrink-0" />
                                <a href="mailto:hello@gujaratghee.com" className="hover:text-ghee-gold">hello@gujaratghee.com</a>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clay-red hover:text-white transition-all text-cream">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clay-red hover:text-white transition-all text-cream">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/40 font-light">
                    <span>© {new Date().getFullYear()} Gujarat Ghee Product. All rights reserved.</span>
                    <span>Made with ❤️ in Gujarat</span>
                </div>
            </div>
        </footer>
    );
}
