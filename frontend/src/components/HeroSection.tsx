export function HeroSection({ weddingDate }: { weddingDate: string }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">John & Aria</h1>
      <p className="mb-8">
        We're getting married! Join us on {weddingDate} in Estes Park, CO.
      </p>
    </>
  );
}
