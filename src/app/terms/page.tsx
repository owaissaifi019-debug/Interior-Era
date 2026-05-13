export default function TermsOfService() {
  return (
    <div className="pt-40 pb-24 min-h-screen container mx-auto px-6 md:px-12 max-w-4xl">
      <h1 className="font-serif text-4xl md:text-6xl font-medium mb-12">Terms of Service</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-lg text-muted-foreground font-light leading-relaxed">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-6">These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Interior Era ("Company", “we”, “us”, or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</p>
        
        <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">1. Intellectual Property Rights</h2>
        <p className="mb-6">Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.</p>
        
        <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">2. User Representations</h2>
        <p className="mb-6">By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
        
        <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">3. Contact Us</h2>
        <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at info@interiorera.com.</p>
      </div>
    </div>
  );
}
