import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Properties</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our complete collection of premium rental properties with encrypted contract protection. 
              Find your perfect home while keeping terms confidential until you're ready to sign.
            </p>
          </div>
        </div>
        <PropertyGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Properties;