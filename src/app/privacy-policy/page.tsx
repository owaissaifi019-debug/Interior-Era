export default function PrivacyPolicy() {
  return (
    <div className="pt-40 pb-24 min-h-screen container mx-auto px-6 md:px-12 max-w-4xl">
      <h1 className="font-serif text-4xl md:text-6xl font-medium mb-12">Privacy Policy</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-lg text-muted-foreground font-light leading-relaxed">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-6">At Interior Era, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
        
        <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">1. Information We Collect</h2>
        <p className="mb-6">We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
        
        <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">2. How We Use Your Information</h2>
        <p className="mb-6">We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        
        <h2 className="text-2xl font-serif text-foreground mt-12 mb-6">3. Contact Us</h2>
        <p>If you have questions or comments about this notice, you may email us at info@interiorera.com.</p>
      </div>
    </div>
  );
}
