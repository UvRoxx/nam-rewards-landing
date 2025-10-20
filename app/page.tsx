'use client'

import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Hero />
      <Footer />
      <Leva hidden />
    </>
  );
}
