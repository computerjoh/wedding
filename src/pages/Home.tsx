import { ImageCarousel } from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";

// Create a downloadable .ics file content
const icsFileContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:John & Aria Wedding
DTSTART:20260724T200000Z
DTEND:20260724T230000Z
DESCRIPTION:Join us in Boulder, Colorado to celebrate John & Aria's wedding!
LOCATION:Boulder, Colorado
END:VEVENT
END:VCALENDAR`;

export function Home() {
  const weddingDate = "July 24, 2026";

  // Google Calendar URL
  const calendarUrl =
    "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NnFkOWE5NmMxZmczdHZjazc2cXAxY2dzN2kgam9obmtvcmhlbDFAbQ&tmsrc=johnkorhel1%40gmail.com";

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 mx-auto mb-16">
      <div className="text-center space-y-8 p-8 sm:p-12">
        {/* Names */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
            John & Aria
          </h1>
          <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full"></div>
        </div>

        {/* Celebration line */}
        <p className="text-xl sm:text-2xl text-primary font-medium">
          We're getting married!
        </p>

        {/* Date + Location */}
        <div className="space-y-1">
          <p className="text-lg sm:text-xl font-semibold text-primary">
            {weddingDate}
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Boulder, Colorado
          </p>
        </div>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Save the date — formal invitation to follow.
        </p>

        {/* Calendar Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 text-base shadow-sm hover:shadow-md transition-shadow"
          >
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
              Add to Google Calendar
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-full px-8 py-6 text-base shadow-sm hover:shadow-md transition-shadow"
          >
            <a href="/john-aria-wedding.ics" download>
              Download .ICS
            </a>
          </Button>
        </div>
      </div>
      {/* Carousel under the card */}
      <div className="mt-12">
        <ImageCarousel />
      </div>
    </div>
  );
}
