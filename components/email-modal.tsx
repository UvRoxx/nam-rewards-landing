"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: "app-store" | "google-play";
}

export function EmailModal({ isOpen, onClose, platform }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          platform,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setEmail("");
          setSubmitted(false);
          setError("");
          onClose();
        }, 2000);
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error submitting lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-background border border-foreground/10 rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-sentient mb-2">Coming Soon!</h2>
          <p className="font-mono text-sm text-foreground/70">
            Get notified when we launch on {platform === "app-store" ? "App Store" : "Google Play"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-foreground/40 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-mono">{error}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-black font-mono font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Notify Me"}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-mono text-sm text-foreground/80">
              Thanks! We'll notify you soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
