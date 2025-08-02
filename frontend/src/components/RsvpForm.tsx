import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function RsvpForm({
  rsvp,
  setRsvp,
  handleChange,
  handleSubmit,
}: {
  rsvp: { name: string; email: string; attending: string; message: string };
  setRsvp: React.Dispatch<React.SetStateAction<typeof rsvp>>;
  handleChange: (key: keyof typeof rsvp) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  const { name, email, attending, message } = rsvp;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow text-left space-y-4"
      name="rsvp"
    >
      <h2 className="text-2xl font-semibold text-center">RSVP</h2>

      <Input
        aria-label="Your Name"
        placeholder="Your Name"
        value={name}
        onChange={handleChange("name")}
        required
      />

      <Input
        type="email"
        aria-label="Your Email"
        placeholder="Your Email"
        value={email}
        onChange={handleChange("email")}
        required
      />

      <div>
        <Label className="block mb-2">Will you attend?</Label>
        <RadioGroup
          value={attending}
          onValueChange={(value) =>
            setRsvp((prev) => ({ ...prev, attending: value }))
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="attending-yes" />
            <Label htmlFor="attending-yes">Will attend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="attending-no" />
            <Label htmlFor="attending-no">Can't make it</Label>
          </div>
        </RadioGroup>
      </div>

      <Textarea
        aria-label="Leave a message"
        placeholder="Leave a message for the couple (optional)"
        value={message}
        onChange={handleChange("message")}
        rows={3}
      />

      <Button type="submit" className="w-full">
        Submit RSVP
      </Button>
    </form>
  );
}
