"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StickyCTA() {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-ghee-gold/20 z-50 md:hidden pb-safe"
        >
            <a
                href="https://wa.me/919054453132?text=Kem%20cho!%20I%20am%20interested%20in%20the%20Gujarat%20Ghee%20Product.%20Please%20share%20the%20price%20and%20delivery%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white py-3 rounded-full font-medium shadow-lg"
            >
                Inquire & Buy on WhatsApp
                <ArrowRight className="w-4 h-4" />
            </a>
        </motion.div>
    );
}
