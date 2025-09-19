import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Search, FileCheck, Key } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Properties",
      description: "Search through our curated selection of premium rental properties. View photos, amenities, and basic details without revealing contract terms.",
    },
    {
      icon: Shield,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to access encrypted contract details. Your wallet serves as your secure identity and payment method.",
    },
    {
      icon: FileCheck,
      title: "View & Review",
      description: "Access encrypted contract terms including rent, deposit, and conditions. Review all details privately before making any commitment.",
    },
    {
      icon: Key,
      title: "Sign Contract",
      description: "When ready, sign the smart contract with your wallet. Terms become public only after both parties have committed to the agreement.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our revolutionary platform protects both landlords and tenants through encrypted contracts 
              and blockchain technology. Here's how the process works:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto rounded-full bg-electric/10 border-2 border-electric flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-electric" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-electric text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">Why Encrypted Contracts?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-electric">For Tenants</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• No bidding wars or price manipulation</li>
                  <li>• Fair access to rental terms</li>
                  <li>• Protection from discriminatory pricing</li>
                  <li>• Secure deposit handling via smart contracts</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-electric">For Landlords</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Prevent terms from being undercut by competitors</li>
                  <li>• Attract serious tenants only</li>
                  <li>• Reduced time wasters and market manipulation</li>
                  <li>• Automated contract execution and payments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;