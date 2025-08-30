import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RsvpForm } from "@/components/RsvpForm";
import { ThankYouMessage } from "@/components/ThankYouMessage";
import { supabase } from "./lib/supabase";

export default function Home() {
  const weddingDate = "(soon)";
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    attending: string;
  } | null>(null);


  async function handleSubmit(formData: {
    name: string
    email: string
    attending: string // "yes" | "no"
  }) {
    const is_attending = formData.attending.toLowerCase() === 'yes'

    const { data, error } = await supabase
      .from('wedding_rsvps')
      .upsert(
        {
          name: formData.name.trim(),
          email: formData.email.toLowerCase(),
          is_attending,
        },
        { onConflict: 'email' }
      )
      .select()
      .single()

    if (error) throw new Error(error.message)

    setSubmittedData({
      name: data.name,
      attending: data.is_attending ? 'yes' : 'no',
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
