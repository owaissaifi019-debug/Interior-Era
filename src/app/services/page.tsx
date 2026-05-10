export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="font-serif text-5xl md:text-7xl mb-12">Our Services</h1>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="bg-secondary/30 p-12">
            <h3 className="text-2xl font-serif mb-4">Interior Architecture</h3>
            <p className="text-muted-foreground leading-relaxed">
              We rework spaces from the ground up, focusing on structural elements, flow, and integration of high-end materials.
            </p>
          </div>
          <div className="bg-secondary/30 p-12">
            <h3 className="text-2xl font-serif mb-4">Furnishing & Styling</h3>
            <p className="text-muted-foreground leading-relaxed">
              Curating bespoke furniture, art, and accessories to bring personality and warmth to your environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
