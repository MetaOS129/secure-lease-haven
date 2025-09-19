import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, Unlock, FileText, DollarSign, Calendar, Shield } from "lucide-react";
import { useState } from "react";

const ViewContract = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);

  const connectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true);
  };

  const signContract = () => {
    // Simulate contract signing
    setContractSigned(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">View & Sign Contract</h1>
            <p className="text-xl text-muted-foreground">
              Review the encrypted contract terms and sign when ready
            </p>
          </div>

          {/* Property Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Property: Modern Downtown Loft
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Manhattan, New York</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold">2 bed • 2 bath • 1,200 sq ft</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="bg-success text-success-foreground">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Connection */}
          {!walletConnected ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-electric" />
                  Connect Wallet to View Contract Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Connect your Web3 wallet to decrypt and view the full contract terms. 
                  Your wallet will serve as your digital signature for this agreement.
                </p>
                <Button onClick={connectWallet} className="wallet-connect">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Contract Terms */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Unlock className="h-5 w-5 text-success" />
                    Contract Terms
                    <Badge className="bg-success text-success-foreground ml-2">Decrypted</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-electric" />
                        <span className="font-semibold">Monthly Rent</span>
                      </div>
                      <p className="text-2xl font-bold text-electric">$3,500 / month</p>
                      
                      <Separator />
                      
                      <div>
                        <p className="font-semibold mb-2">Security Deposit</p>
                        <p className="text-lg">$7,000 (2 months)</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold mb-2">Lease Duration</p>
                        <p className="text-lg">12 months</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-electric" />
                        <span className="font-semibold">Available From</span>
                      </div>
                      <p className="text-lg">January 1, 2024</p>
                      
                      <Separator />
                      
                      <div>
                        <p className="font-semibold mb-2">Pet Policy</p>
                        <p className="text-lg">Small pets allowed (+$200/month)</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold mb-2">Utilities</p>
                        <p className="text-lg">Tenant responsible</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Additional Terms</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• No smoking allowed in the unit</li>
                      <li>• Maximum 2 occupants</li>
                      <li>• 60-day notice required for lease termination</li>
                      <li>• Landlord covers building maintenance and repairs</li>
                      <li>• Tenant responsible for minor fixtures and appliances</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Contract Info */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-electric" />
                    Smart Contract Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Automated Features</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Monthly rent collection</li>
                        <li>• Security deposit escrow</li>
                        <li>• Lease expiration notifications</li>
                        <li>• Dispute resolution process</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Protection</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Immutable contract terms</li>
                        <li>• Transparent transaction history</li>
                        <li>• Multi-signature security</li>
                        <li>• Automated refund processing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sign Contract */}
              {!contractSigned ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to Sign?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      By signing this contract, you agree to all terms and conditions. 
                      The security deposit will be held in escrow until lease completion.
                    </p>
                    <div className="flex gap-4">
                      <Button onClick={signContract} className="wallet-connect">
                        Sign Contract & Pay Deposit
                      </Button>
                      <Button variant="outline">
                        Download Terms (PDF)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-success">
                  <CardHeader>
                    <CardTitle className="text-success">Contract Signed Successfully!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Your contract has been signed and recorded on the blockchain. 
                      You will receive a confirmation email with all details.
                    </p>
                    <div className="flex gap-4">
                      <Button className="wallet-connect">
                        View Transaction
                      </Button>
                      <Button variant="outline">
                        Download Signed Contract
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewContract;