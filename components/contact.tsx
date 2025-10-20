"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here (e.g., send to API)
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="min-h-screen py-20 md:py-32 container flex items-center">
      <div className="max-w-2xl mx-auto w-full text-center">
        <h2 className="text-4xl md:text-5xl font-sentient mb-6">
          Join the <i className="font-light">Waitlist</i>
        </h2>
        <p className="font-mono text-sm md:text-base text-foreground/60 mb-12 max-w-xl mx-auto">
          Be among the first to earn NAM Coins when we launch. Enter your email to get early access and updates.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 bg-background border border-foreground/20 rounded-md font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <Button type="submit" className="whitespace-nowrap">
              {submitted ? "Subscribed!" : "Join Waitlist"}
            </Button>
          </div>
        </form>

        {submitted && (
          <p className="mt-4 font-mono text-sm text-primary">
            Thanks for subscribing! We'll be in touch soon.
          </p>
        )}
      </div>
    </section>
  );
}
