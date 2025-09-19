import { Button } from "@/components/ui/button";
import { Key, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section relative min-h-[80vh] flex items-center justify-center text-center text-white">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Secure Lease
            <span className="block gradient-text">Haven</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Decentralized rental platform with FHE encryption for secure and private property leasing. 
            Protect your data while finding the perfect rental property.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link to="/properties">
              <Button size="lg" className="wallet-connect text-lg px-8 py-4">
                Explore Properties
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/20 hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full bg-white/10 border border-white/20">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">FHE Encryption</h3>
              <p className="text-white/80 text-center">
                Advanced cryptographic protection for all sensitive data
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full bg-white/10 border border-white/20">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Privacy First</h3>
              <p className="text-white/80 text-center">
                Complete data protection with zero-knowledge architecture
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full bg-white/10 border border-white/20">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Automation</h3>
              <p className="text-white/80 text-center">
                Automated lease execution with blockchain security
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;