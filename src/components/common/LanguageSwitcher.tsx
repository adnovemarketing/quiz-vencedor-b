"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { localeCookie, Locale } from "@/core/i18n/config";
import { cn } from "@/lib/utils";

const languageOptions = [
  { value: "en-gb", label: "English (UK)" },
  { value: "pt-br", label: "Português (Brasil)" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  
  const currentLocale = (params.locale as string) || "en-gb";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Atualiza cookie
    localeCookie.set(newLocale);

    // Substitui a localidade no pathname atual
    const segments = pathname.split("/");
    if (segments.length > 1 && (segments[1] === "en-gb" || segments[1] === "pt-br")) {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    
    const newPath = segments.join("/");
    const query = searchParams.toString();
    const targetUrl = `${newPath}${query ? `?${query}` : ""}`;

    setIsOpen(false);
    router.push(targetUrl);
  };

  const currentLabel = languageOptions.find((opt) => opt.value === currentLocale)?.label || "English (UK)";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:text-brand-lime hover:border-brand-lime text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-lime cursor-pointer select-none"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{currentLabel}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Language Selector"
          className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl z-50 overflow-hidden focus:outline-none"
        >
          {languageOptions.map((opt) => {
            const isSelected = opt.value === currentLocale;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleLanguageChange(opt.value as Locale)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLanguageChange(opt.value as Locale);
                  }
                }}
                className={cn(
                  "px-4 py-3 text-xs font-semibold cursor-pointer select-none outline-none transition-colors border-b border-zinc-900/60 last:border-0",
                  isSelected
                    ? "bg-brand-lime/10 text-brand-lime"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                )}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
