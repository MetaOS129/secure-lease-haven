import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContractInteraction from "@/components/ContractInteraction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">FHE-Encrypted Smart Contracts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Interact with our FHE-enabled smart contracts to list properties and submit applications 
                with complete data privacy protection.
              </p>
            </div>
            <ContractInteraction />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
