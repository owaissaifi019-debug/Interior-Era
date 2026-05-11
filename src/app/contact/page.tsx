export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-7xl mb-12 text-center">Get in Touch</h1>
        <form className="space-y-6 bg-white dark:bg-neutral-900 p-10 border border-muted dark:border-neutral-800 shadow-sm">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">First Name</label>
                            <input type="text" className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />

            </div>
            <div>
              <label className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">Last Name</label>
                            <input type="text" className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />

            </div>
          </div>
          <div>
            <label className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">Email</label>
            <input type="email" className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">Message</label>
            <textarea rows={4} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-4 hover:bg-accent hover:text-white transition-colors tracking-widest uppercase font-medium mt-8">
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
