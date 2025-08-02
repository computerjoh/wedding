export function HeroSection({ weddingDate }: { weddingDate: string }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-primary">John & Aria</h1>
      <p className="mb-8 text-foreground">
        We're getting married! Join us on {weddingDate} in Estes Park, CO.
      </p>
    </>
  );
}
