"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWrapperProps {
  src?: string;
  alt: string;
  aspectRatio: "1/1" | "3/4" | "4/5" | "16/9" | "3/2" | "4/3" | "vertical" | "horizontal";
  placeholderText: string;
  aiPrompt?: string;
  fileName?: string;
  fallbackSvg?: React.ReactNode;
  className?: string;
  overlayClass?: string;
}

export function ImageWrapper({
  src,
  alt,
  aspectRatio,
  placeholderText,
  aiPrompt,
  fileName,
  fallbackSvg,
  className,
  overlayClass,
}: ImageWrapperProps) {
  const [imageExists, setImageExists] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!src) {
      const timer = setTimeout(() => {
        setImageExists(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, [src]);

  // Map aspect ratio to Tailwind classes
  const aspectClasses = {
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
    "4/5": "aspect-[4/5]",
    "16/9": "aspect-[16/9]",
    "3/2": "aspect-[3/2]",
    "4/3": "aspect-[4/3]",
    vertical: "aspect-[2/3]",
    horizontal: "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 select-none flex flex-col justify-center items-center transition-all duration-300",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {imageExists && src ? (
        // Renderização da Imagem Definitiva
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("w-full h-full object-cover animate-[fadeIn_0.4s_ease-out]", overlayClass)}
        />
      ) : fallbackSvg ? (
        // Fallback para os SVGs customizados do Quiz (Mantém a alta qualidade visual atual)
        <div className="w-full h-full flex items-center justify-center p-4 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-teal/5 opacity-40 pointer-events-none" />
          <div className="w-full h-full flex items-center justify-center">
            {fallbackSvg}
          </div>
          {/* Indicador sutil de que é um slot substituível */}
          <div className="absolute bottom-2.5 right-2.5 z-20">
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-zinc-500 hover:text-brand-lime transition-colors cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            {showTooltip && aiPrompt && (
              <div className="absolute bottom-7 right-0 z-30 w-64 bg-zinc-950 border border-zinc-900 p-3 rounded-xl shadow-2xl animate-[fadeIn_0.15s_ease-out] text-left">
                <span className="text-[9px] font-heading font-black text-brand-lime uppercase tracking-widest block mb-1">
                  AI Generation Prompt
                </span>
                <p className="text-[10px] text-zinc-300 leading-normal mb-2">
                  {aiPrompt}
                </p>
                {fileName && (
                  <span className="text-[8px] font-mono text-zinc-500 block border-t border-zinc-900 pt-1.5">
                    File: public/assets/{fileName}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Placeholder visualmente rico para fotos que não possuem SVG
        <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-zinc-950/90 pointer-events-none" />
          
          <div className="flex justify-between items-center w-full z-10">
            <span className="text-[8px] font-heading font-black text-brand-teal uppercase tracking-widest bg-brand-teal/10 px-2 py-0.5 rounded-md border border-brand-teal/10">
              Placeholder
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-1 rounded-md bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-brand-lime transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              {showTooltip && aiPrompt && (
                <div className="absolute right-0 top-7 z-30 w-64 bg-zinc-950 border border-zinc-900 p-3 rounded-xl shadow-2xl animate-[fadeIn_0.15s_ease-out] text-left">
                  <span className="text-[9px] font-heading font-black text-brand-lime uppercase tracking-widest block mb-1">
                    AI Generation Prompt
                  </span>
                  <p className="text-[10px] text-zinc-300 leading-normal mb-2">
                    {aiPrompt}
                  </p>
                  {fileName && (
                    <span className="text-[8px] font-mono text-zinc-500 block border-t border-zinc-900 pt-1.5">
                      File: public/assets/{fileName}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-10 h-10 rounded-full bg-zinc-900/80 flex items-center justify-center border border-zinc-800 text-zinc-500">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-zinc-300 font-heading max-w-[200px] mt-1 leading-normal">
              {placeholderText}
            </span>
          </div>

          <div className="z-10 w-full">
            {fileName && (
              <span className="text-[8.5px] font-mono text-zinc-500 block bg-zinc-950/80 py-1 px-2.5 rounded-md border border-zinc-900/80">
                {fileName.split("/").pop()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 1. QuestionHeroImage - Top visual placement (Layout B)
export function QuestionHeroImage(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="16/9" className={cn("w-full shadow-lg border-zinc-900/80", props.className)} />;
}

// 2. QuestionSideImage - Side visual placement (Layout A)
export function QuestionSideImage(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="4/5" className={cn("w-full shadow-lg border-zinc-900/80", props.className)} />;
}

// 3. OptionImage - Inside single alternative card (Layout C)
export function OptionImage(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return (
    <ImageWrapper
      {...props}
      aspectRatio="1/1"
      className={cn("w-full rounded-xl border-zinc-900/60 bg-zinc-950/20", props.className)}
      overlayClass="h-full object-cover"
    />
  );
}

// 4. TransitionImage - Full transition page visual showcase
export function TransitionImage(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="16/9" className={cn("w-full shadow-2xl border-zinc-900/80", props.className)} />;
}

// 5. ResultImage - Weight calibration and charts
export function ResultImage(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="4/3" className={cn("w-full border-zinc-900/80", props.className)} />;
}

// 6. OfferHeroImage - Checkout bundle cover/banner
export function OfferHeroImage(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="3/2" className={cn("w-full border-zinc-900/80", props.className)} />;
}

// 7. ProductMockup - Ebook / smartphone screen plans
export function ProductMockup(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="3/4" className={cn("w-full border-zinc-900/80 shadow-2xl", props.className)} />;
}

// 8. TestimonialPhoto - User avatar inside feedback
export function TestimonialPhoto(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return (
    <ImageWrapper
      {...props}
      aspectRatio="1/1"
      className={cn("w-10 h-10 rounded-full border-zinc-800 bg-zinc-900 shrink-0", props.className)}
    />
  );
}

// 9. BenefitIllustration - Checklist tiny graphics
export function BenefitIllustration(props: Omit<ImageWrapperProps, "aspectRatio">) {
  return <ImageWrapper {...props} aspectRatio="1/1" className={cn("w-12 h-12 rounded-xl border-zinc-900 bg-zinc-950/20", props.className)} />;
}
