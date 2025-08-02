import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RsvpForm } from "@/components/RsvpForm";
import { ThankYouMessage } from "@/components/ThankYouMessage";

export default function Home() {
  const weddingDate = "(soon)";
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    attending: string;
  } | null>(null);

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    attending: string;
    message?: string;
  }) => {
    try {
      const API_URL = 'https://gdocs-passthrough.john3335.workers.dev';
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Submission failed:", error);
        alert("Something went wrong. Please try again.");
        return;
      }

      setSubmittedData({
        name: formData.name,
        attending: formData.attending,
      });
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto text-center">
        <HeroSection weddingDate={weddingDate} />
        <ImageCarousel />
        {!submittedData ? (
          <RsvpForm onSubmit={handleSubmit} />
        ) : (
          <ThankYouMessage
            name={submittedData.name}
            attending={submittedData.attending}
          />
        )}
      </div>
    </main>
  );
}
