import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type RsvpData = {
  name: string;
  email: string;
  attending: string;
  message: string;
};

export function RsvpForm({
  rsvp,
  setRsvp,
  handleChange,
  handleSubmit,
}: {
  rsvp: RsvpData;
  setRsvp: React.Dispatch<React.SetStateAction<RsvpData>>;
  handleChange: (
    key: keyof RsvpData
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  const { name, email, attending, message } = rsvp;
  const [submitting, setSubmitting] = useState(false);

  const wrappedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      handleSubmit(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={wrappedSubmit}
      className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      name="rsvp"
    >
      <h2 className="text-3xl font-bold text-center text-primary">RSVP</h2>
      <p className="text-center text-muted-foreground">
        Let us know if you'll be joining us on our big day!
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          aria-label="Your Name"
          placeholder="Your Name"
          value={name}
          onChange={handleChange("name")}
          autoComplete="name"
          required
        />

        <Input
          type="email"
          aria-label="Your Email"
          placeholder="Your Email"
          value={email}
          onChange={handleChange("email")}
          autoComplete="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          required
        />
      </div>

      <div>
        <Label htmlFor="attending" className="block mb-2 font-medium">
          Can you celebrate with us?
        </Label>
        <Select
          value={attending}
          onValueChange={(value) =>
            setRsvp((prev) => ({ ...prev, attending: value }))
          }
        >
          <SelectTrigger id="attending" className="w-full">
            <SelectValue placeholder="Yes, we’ll be there!" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Absolutely, can't wait!</SelectItem>
            <SelectItem value="no">Sadly, can't make it</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        aria-label="Leave a message"
        placeholder="Leave a message for the couple (optional)"
        value={message}
        onChange={handleChange("message")}
        rows={3}
      />

      <Button type="submit" className="w-full" disabled={submitting}>
        Send My RSVP 💌
      </Button>
    </form>
  );
}
