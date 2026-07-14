"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
}

export function OptionCard({
  title,
  description,
  icon,
  emoji,
  selected,
  onClick,
  multiSelect = false,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left p-5 rounded-2xl border bg-zinc-900/60 backdrop-blur-sm select-none transition-all cursor-pointer flex items-center justify-between gap-4",
        selected
          ? "border-brand-lime bg-zinc-900 shadow-md shadow-lime-400/5"
          : "border-zinc-800 hover:border-zinc-700"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Ícone ou Emoji */}
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              selected
                ? "bg-brand-lime/10 text-brand-lime"
                : "bg-zinc-950 text-zinc-400"
            )}
          >
            {icon}
          </div>
        )}

        {emoji && (
          <div className="text-2xl w-10 h-10 flex items-center justify-center bg-zinc-950 rounded-xl select-none">
            {emoji}
          </div>
        )}

        {/* Texto do Card */}
        <div>
          <h3
            className={cn(
              "text-sm font-semibold transition-colors",
              selected ? "text-brand-lime" : "text-zinc-100"
            )}
          >
            {title}
          </h3>
          {description && (
            <p className="text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Caixa de seleção/Status Check */}
      <div className="flex items-center justify-center">
        {multiSelect ? (
          <div
            className={cn(
              "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
              selected
                ? "bg-brand-lime border-brand-lime text-zinc-950"
                : "border-zinc-700 bg-zinc-950"
            )}
          >
            {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        ) : (
          <div
            className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
              selected
                ? "border-brand-lime"
                : "border-zinc-700 bg-zinc-950"
            )}
          >
            {selected && (
              <div className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}
