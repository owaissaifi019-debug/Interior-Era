export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="font-serif text-5xl md:text-7xl mb-12">About Studio</h1>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-square md:aspect-[3/4] w-full bg-secondary">
            {/* Placeholder for studio image */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-6">Designing experiences, not just spaces.</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Interior Era is a multi-disciplinary design studio specializing in high-end residential, commercial, and hospitality projects. Founded on the belief that our environments profoundly impact our well-being.
            </p>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              Our approach marries timeless elegance with modern functionality, creating spaces that feel curated, intentional, and unmistakably yours.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-muted pt-8">
              <div>
                <span className="text-4xl font-serif text-accent block mb-2">15+</span>
                <span className="text-sm tracking-widest uppercase text-muted-foreground">Years Experience</span>
              </div>
              <div>
                <span className="text-4xl font-serif text-accent block mb-2">120+</span>
                <span className="text-sm tracking-widest uppercase text-muted-foreground">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
