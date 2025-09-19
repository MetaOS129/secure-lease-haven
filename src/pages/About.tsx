import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Hidden Rentals</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing the rental market by protecting both landlords and tenants 
              from market exploitation through encrypted contracts and blockchain technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                The traditional rental market is broken. Landlords face price undercutting from competitors 
                who peek at their terms, while tenants suffer from bidding wars and discriminatory pricing 
                based on their perceived wealth or desperation.
              </p>
              <p className="text-muted-foreground mb-4">
                Hidden Rentals solves this by keeping contract terms encrypted until both parties commit 
                to signing. This creates a fair marketplace where decisions are made based on property 
                quality and basic compatibility, not market manipulation.
              </p>
              <p className="text-muted-foreground">
                Our blockchain-based smart contracts ensure security, transparency after commitment, 
                and automated execution of terms without the need for traditional intermediaries.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-electric mr-3" />
                  <h3 className="text-xl font-semibold">Fair Market Access</h3>
                </div>
                <p className="text-muted-foreground">
                  Everyone gets equal access to rental opportunities without bias based on 
                  perceived financial status or market position.
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-electric mr-3" />
                  <h3 className="text-xl font-semibold">Market Protection</h3>
                </div>
                <p className="text-muted-foreground">
                  Prevent price manipulation, bidding wars, and unfair competitive advantages 
                  through encrypted contract terms.
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-electric mr-3" />
                  <h3 className="text-xl font-semibold">Trust & Security</h3>
                </div>
                <p className="text-muted-foreground">
                  Blockchain technology ensures contract security, automated execution, 
                  and tamper-proof records for all parties.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-electric/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience Fair Rentals?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of landlords and tenants who are already using Hidden Rentals 
              to create fairer, more secure rental agreements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/properties" 
                className="bg-electric hover:bg-electric/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse Properties
              </a>
              <a 
                href="/how-it-works" 
                className="border border-electric text-electric hover:bg-electric/10 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;