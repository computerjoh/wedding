import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RsvpForm } from "@/components/RsvpForm";
import { ThankYouMessage } from "@/components/ThankYouMessage";
import { client } from "./lib/api";

export default function Home() {
  const weddingDate = "(soon)";
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    attending: string;
  } | null>(null);

  async function handleSubmit(formData: {
    name: string
    email: string
    attending: string
  }) {
    const res = await client.rsvp.$post({
      json: {
        name: formData.name,
        email: formData.email,
        isAttending: formData.attending.toLowerCase() === 'yes',
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    const { rsvp } = await res.json()
    setSubmittedData({
      name: rsvp.name,
      attending: rsvp.is_attending ? 'yes' : 'no',
    })
  }

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
