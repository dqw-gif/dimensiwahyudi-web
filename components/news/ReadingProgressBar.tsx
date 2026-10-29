"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div 
            className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-slate-200/30"
            aria-hidden="true"
        >
            <motion.div 
                className="h-full bg-gradient-to-r from-[#005596] via-[#0077c8] to-sky-400 origin-left shadow-[0_0_8px_rgba(0,85,150,0.5)]"
                style={{ scaleX }}
            />
        </div>
    );
}
