export function Registry() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-primary leading-tight">Wedding Registry</h1>
        <div className="w-32 h-1 bg-primary/20 mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-card rounded-xl shadow-lg p-8 space-y-6">
        <p className="text-xl text-muted-foreground leading-relaxed">
          Thank you for thinking of us! Our registry information will be available soon.
        </p>
        <div className="bg-muted/50 rounded-lg p-6 border-l-4 border-l-primary">
          <p className="text-muted-foreground text-lg">
            We're currently setting up our registry. Please check back later for details.
          </p>
        </div>
      </div>
    </div>
  );
}
