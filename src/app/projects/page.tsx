export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="font-serif text-5xl md:text-7xl mb-12">Selected Works</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mb-16">
          Explore our portfolio of curated interiors across residential and commercial sectors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-secondary mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl mb-1">Project Name {i}</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Location / Category</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
