"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizLayoutProps {
  children: React.ReactNode;
  stepKey: string; // Para controlar animações de transição de etapa
}

export function QuizLayout({ children, stepKey }: QuizLayoutProps) {
  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 py-8 md:py-12 max-w-lg w-full mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepKey}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="w-full flex flex-col gap-6"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
