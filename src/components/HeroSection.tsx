export function HeroSection({ weddingDate }: { weddingDate: string }) {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-primary leading-tight">John & Aria</h1>
        <div className="w-32 h-1 bg-primary/20 mx-auto rounded-full"></div>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        We're getting married! Join us on <span className="text-primary font-medium">{weddingDate}</span> in Estes Park, CO.
      </p>
    </div>
  );
}
