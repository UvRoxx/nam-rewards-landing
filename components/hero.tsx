"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh justify-center items-center">
      <GL hovering={true} />

      <div className="text-center relative">
        <Pill className="mb-6">BETA COMING SOON</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Transform purchases <br />
          into <i className="font-light">collectible crypto</i>
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/80 dark:text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          Upload receipts, earn NAM Coins for free. The first crypto mined by your everyday spending, not capital-heavy processors.
        </p>

        <Link className="contents max-sm:hidden" href="https://t.me/NAM_Rewards" target="_blank" rel="noopener noreferrer">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Join Telegram]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="https://t.me/NAM_Rewards" target="_blank" rel="noopener noreferrer">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Join Telegram]
          </Button>
        </Link>
      </div>
    </div>
  );
}
