import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RsvpForm } from "@/components/RsvpForm";
import { ThankYouMessage } from "@/components/ThankYouMessage";

export default function Home() {
  const weddingDate = "(soon)";
  const [rsvp, setRsvp] = useState({
    name: "",
    email: "",
    attending: "yes",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (key: keyof typeof rsvp) =>
      (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setRsvp((prev) => ({ ...prev, [key]: e.target.value }));
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const API_URL = 'https://gdocs-passthrough.john3335.workers.dev';
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvp),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Submission failed:", error);
        alert("Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
    }
  };


  const { name, attending } = rsvp;

  return (
    <main className="min-h-screen bg-pink-50 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto text-center">
        <HeroSection weddingDate={weddingDate} />
        <ImageCarousel />
        {!submitted ? (
          <RsvpForm
            rsvp={rsvp}
            setRsvp={setRsvp}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <ThankYouMessage name={name} attending={attending} />
        )}
      </div>
    </main>
  );
}
