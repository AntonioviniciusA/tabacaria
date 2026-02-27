"use client";

import Image from "next/image";

interface LoadingSpinnerProps {
  src?: string;
  size?: number;
  rotationDuration?: number;
  pauseDuration?: number;
}

export function LoadingSpinner({
  src = "/loading_ursinho.png",
  size = 120,
  rotationDuration = 2,
  pauseDuration = 1,
}: LoadingSpinnerProps) {
  const totalDuration = rotationDuration + pauseDuration;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">

      {/* Imagem girando */}
      <div
        style={{
          width: size,
          height: size,
          animation: `spinPause ${totalDuration}s linear infinite`,
        }}
        className="relative"
      >
        <Image
          src={src}
          alt="Carregando"
          fill
          className="object-contain"
        />
      </div>

      {/* Texto moderno */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-green-400 bg-clip-text text-transparent animate-pulse">
          Preparando algo incrível
        </span>

        {/* Pontinhos animados */}
        <span className="flex">
          <span className="animate-bounce delay-0 text-purple-500">.</span>
          <span className="animate-bounce delay-150 text-violet-500">.</span>
          <span className="animate-bounce delay-300 text-green-400">.</span>
        </span>
      </div>

      <style jsx>{`
        @keyframes spinPause {
          0% {
            transform: rotate(0deg);
          }
          ${((rotationDuration / totalDuration) * 100).toFixed(2)}% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}