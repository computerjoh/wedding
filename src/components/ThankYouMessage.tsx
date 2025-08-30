export function ThankYouMessage({ name, attending }: { name: string; attending: string }) {
  return (
    <>
      <div className="bg-white p-6 rounded shadow text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Thanks for your RSVP, {name}!
        </h2>
        {attending === "yes" ? (
          <p>We're so excited to celebrate with you!</p>
        ) : (
          <p>Sorry you can't make it. We'll miss you!</p>
        )}
      </div>
    </>
  );
}
