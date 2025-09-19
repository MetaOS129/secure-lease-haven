import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Wallet, FileCheck, Key, Lock, Zap, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Properties",
      description: "Browse our FHE-encrypted property listings. View photos, amenities, and location details while sensitive terms remain encrypted.",
    },
    {
      icon: Wallet,
      title: "Connect Web3 Wallet",
      description: "Connect your Rainbow, MetaMask, or other Web3 wallet to access encrypted contract details and manage your identity securely.",
    },
    {
      icon: FileCheck,
      title: "Review Encrypted Terms",
      description: "Access FHE-encrypted contract terms including rent, deposit, and conditions. All sensitive data remains private until commitment.",
    },
    {
      icon: Key,
      title: "Execute Smart Contract",
      description: "Sign the FHE-enabled smart contract with your wallet. Terms become public only after both parties have committed to the agreement.",
    },
  ];

  const features = [
    {
      icon: Lock,
      title: "FHE Encryption",
      description: "Fully Homomorphic Encryption ensures all sensitive data remains encrypted during processing and storage.",
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Automated lease execution, payment processing, and contract management through blockchain technology.",
    },
    {
      icon: Users,
      title: "Reputation System",
      description: "Encrypted reputation tracking for both landlords and tenants, building trust without compromising privacy.",
    },
    {
      icon: DollarSign,
      title: "Secure Payments",
      description: "Blockchain-secured deposits and rent payments with automated refund capabilities and dispute resolution.",
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
              Our revolutionary FHE-encrypted platform protects both landlords and tenants through 
              advanced cryptography and blockchain technology. Here's how the process works:
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="text-center space-y-4 border-2 hover:border-electric/50 transition-colors">
                <CardHeader>
                  <div className="relative mx-auto">
                    <div className="w-16 h-16 mx-auto rounded-full bg-electric/10 border-2 border-electric flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-electric" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 w-8 h-8 bg-electric text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FHE Technology Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">FHE Technology Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto rounded-full bg-electric/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-electric" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-electric/5 to-primary/5 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Why FHE-Encrypted Contracts?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-electric flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    For Tenants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>No bidding wars or price manipulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Fair access to rental terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Protection from discriminatory pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Secure deposit handling via smart contracts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-electric flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    For Landlords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Prevent terms from being undercut by competitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Attract serious tenants only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Reduced time wasters and market manipulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <span>Automated contract execution and payments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technical Details */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">FHE Encryption Process</CardTitle>
              <CardDescription className="text-center">
                Understanding how Fully Homomorphic Encryption protects your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-electric/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-electric" />
                  </div>
                  <h3 className="font-semibold">Data Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    All sensitive information is encrypted using FHE before storage
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-electric/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-electric" />
                  </div>
                  <h3 className="font-semibold">Secure Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Computations performed on encrypted data without decryption
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-electric/10 flex items-center justify-center">
                    <Key className="h-6 w-6 text-electric" />
                  </div>
                  <h3 className="font-semibold">Result Decryption</h3>
                  <p className="text-sm text-muted-foreground">
                    Only authorized parties can decrypt final results
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;