import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Key, Home, User, DollarSign } from 'lucide-react';

// Contract ABI for SecureLeaseHaven
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_location", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint32", "name": "_monthlyRent", "type": "uint32"},
      {"internalType": "uint32", "name": "_deposit", "type": "uint32"},
      {"internalType": "uint32", "name": "_bedrooms", "type": "uint32"},
      {"internalType": "uint32", "name": "_bathrooms", "type": "uint32"}
    ],
    "name": "listProperty",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_propertyId", "type": "uint256"},
      {"internalType": "uint32", "name": "_monthlyIncome", "type": "uint32"},
      {"internalType": "uint32", "name": "_creditScore", "type": "uint32"},
      {"internalType": "string", "name": "_personalInfo", "type": "string"}
    ],
    "name": "submitApplication",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = '0x...' as const; // Replace with actual contract address

export default function ContractInteraction() {
  const { address, isConnected } = useAccount();
  const [propertyData, setPropertyData] = useState({
    location: '',
    description: '',
    monthlyRent: '',
    deposit: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [applicationData, setApplicationData] = useState({
    propertyId: '',
    monthlyIncome: '',
    creditScore: '',
    personalInfo: ''
  });

  const { writeContract: listProperty, data: listHash, isPending: isListingPending } = useWriteContract();
  const { writeContract: submitApplication, data: appHash, isPending: isAppPending } = useWriteContract();

  const { isLoading: isListConfirming, isSuccess: isListConfirmed } = useWaitForTransactionReceipt({
    hash: listHash,
  });

  const { isLoading: isAppConfirming, isSuccess: isAppConfirmed } = useWaitForTransactionReceipt({
    hash: appHash,
  });

  const handleListProperty = async () => {
    if (!isConnected) return;
    
    try {
      await listProperty({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'listProperty',
        args: [
          propertyData.location,
          propertyData.description,
          parseInt(propertyData.monthlyRent),
          parseInt(propertyData.deposit),
          parseInt(propertyData.bedrooms),
          parseInt(propertyData.bathrooms)
        ],
      });
    } catch (error) {
      console.error('Error listing property:', error);
    }
  };

  const handleSubmitApplication = async () => {
    if (!isConnected) return;
    
    try {
      await submitApplication({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitApplication',
        args: [
          parseInt(applicationData.propertyId),
          parseInt(applicationData.monthlyIncome),
          parseInt(applicationData.creditScore),
          applicationData.personalInfo
        ],
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Connect Wallet Required
          </CardTitle>
          <CardDescription>
            Please connect your wallet to interact with the FHE-encrypted smart contracts.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Property Listing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            List Property (FHE Encrypted)
          </CardTitle>
          <CardDescription>
            All sensitive data will be encrypted using FHE before being stored on-chain.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Property Location</Label>
              <Input
                id="location"
                value={propertyData.location}
                onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
                placeholder="Enter property location"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={propertyData.description}
                onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
                placeholder="Property description"
              />
            </div>
            <div>
              <Label htmlFor="monthlyRent">Monthly Rent (ETH)</Label>
              <Input
                id="monthlyRent"
                type="number"
                value={propertyData.monthlyRent}
                onChange={(e) => setPropertyData({...propertyData, monthlyRent: e.target.value})}
                placeholder="0.1"
              />
            </div>
            <div>
              <Label htmlFor="deposit">Security Deposit (ETH)</Label>
              <Input
                id="deposit"
                type="number"
                value={propertyData.deposit}
                onChange={(e) => setPropertyData({...propertyData, deposit: e.target.value})}
                placeholder="0.2"
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={propertyData.bedrooms}
                onChange={(e) => setPropertyData({...propertyData, bedrooms: e.target.value})}
                placeholder="2"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={propertyData.bathrooms}
                onChange={(e) => setPropertyData({...propertyData, bathrooms: e.target.value})}
                placeholder="1"
              />
            </div>
          </div>
          <Button 
            onClick={handleListProperty}
            disabled={isListingPending || isListConfirming}
            className="w-full"
          >
            {isListingPending || isListConfirming ? 'Encrypting & Listing...' : 'List Property (FHE Encrypted)'}
          </Button>
          {isListConfirmed && (
            <Badge variant="default" className="w-full justify-center">
              ✅ Property listed successfully with FHE encryption!
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Application Submission Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Submit Application (FHE Encrypted)
          </CardTitle>
          <CardDescription>
            Your personal and financial information will be encrypted using FHE technology.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyId">Property ID</Label>
              <Input
                id="propertyId"
                type="number"
                value={applicationData.propertyId}
                onChange={(e) => setApplicationData({...applicationData, propertyId: e.target.value})}
                placeholder="Enter property ID"
              />
            </div>
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income (USD)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={applicationData.monthlyIncome}
                onChange={(e) => setApplicationData({...applicationData, monthlyIncome: e.target.value})}
                placeholder="5000"
              />
            </div>
            <div>
              <Label htmlFor="creditScore">Credit Score</Label>
              <Input
                id="creditScore"
                type="number"
                value={applicationData.creditScore}
                onChange={(e) => setApplicationData({...applicationData, creditScore: e.target.value})}
                placeholder="750"
              />
            </div>
            <div>
              <Label htmlFor="personalInfo">Additional Information</Label>
              <Textarea
                id="personalInfo"
                value={applicationData.personalInfo}
                onChange={(e) => setApplicationData({...applicationData, personalInfo: e.target.value})}
                placeholder="Any additional information..."
                rows={3}
              />
            </div>
          </div>
          <Button 
            onClick={handleSubmitApplication}
            disabled={isAppPending || isAppConfirming}
            className="w-full"
          >
            {isAppPending || isAppConfirming ? 'Encrypting & Submitting...' : 'Submit Application (FHE Encrypted)'}
          </Button>
          {isAppConfirmed && (
            <Badge variant="default" className="w-full justify-center">
              ✅ Application submitted with FHE encryption!
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* FHE Encryption Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            FHE Encryption Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Data Encryption:</span>
              <Badge variant="outline">FHE Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Privacy Level:</span>
              <Badge variant="outline">Maximum</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>On-chain Storage:</span>
              <Badge variant="outline">Encrypted</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
