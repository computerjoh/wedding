export function ThankYouMessage({ name, attending }: { name: string; attending: string }) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-card p-8 rounded-xl shadow-lg text-center space-y-4 border-l-4 border-l-primary">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Thanks for your RSVP, {name}!
          </h2>
          {attending === "yes" ? (
            <p className="text-muted-foreground text-lg">We're so excited to celebrate with you!</p>
          ) : (
            <p className="text-muted-foreground text-lg">Sorry you can't make it. We'll miss you!</p>
          )}
        </div>
      </div>
    </div>
  );
}
