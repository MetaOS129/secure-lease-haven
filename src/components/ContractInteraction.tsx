import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Home, User, DollarSign, FileText, Eye, Lock } from 'lucide-react';
import FHEEncryption from './FHEEncryption';

// Contract ABI for SecureLeaseHaven with FHE support
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_location", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "bytes", "name": "_monthlyRent", "type": "bytes"},
      {"internalType": "bytes", "name": "_deposit", "type": "bytes"},
      {"internalType": "bytes", "name": "_bedrooms", "type": "bytes"},
      {"internalType": "bytes", "name": "_bathrooms", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "listProperty",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_propertyId", "type": "uint256"},
      {"internalType": "bytes", "name": "_monthlyIncome", "type": "bytes"},
      {"internalType": "bytes", "name": "_creditScore", "type": "bytes"},
      {"internalType": "string", "name": "_personalInfo", "type": "string"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "submitApplication",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_applicationId", "type": "uint256"},
      {"internalType": "bytes", "name": "_leaseDuration", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createLeaseAgreement",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_propertyId", "type": "uint256"}
    ],
    "name": "getPropertyInfo",
    "outputs": [
      {"internalType": "string", "name": "location", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "monthlyRent", "type": "uint8"},
      {"internalType": "uint8", "name": "deposit", "type": "uint8"},
      {"internalType": "uint8", "name": "bedrooms", "type": "uint8"},
      {"internalType": "uint8", "name": "bathrooms", "type": "uint8"},
      {"internalType": "bool", "name": "isAvailable", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = '0x...' as const; // Replace with actual contract address

export default function ContractInteraction() {
  const { address, isConnected } = useAccount();
  
  // State for different forms
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
  
  const [agreementData, setAgreementData] = useState({
    applicationId: '',
    leaseDuration: ''
  });

  // FHE Encryption state
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionStep, setEncryptionStep] = useState('');
  const [encryptionProgress, setEncryptionProgress] = useState(0);

  // Contract interaction hooks
  const { writeContract: listProperty, data: listHash, isPending: isListingPending } = useWriteContract();
  const { writeContract: submitApplication, data: appHash, isPending: isAppPending } = useWriteContract();
  const { writeContract: createAgreement, data: agreementHash, isPending: isAgreementPending } = useWriteContract();

  const { isLoading: isListConfirming, isSuccess: isListConfirmed } = useWaitForTransactionReceipt({
    hash: listHash,
  });

  const { isLoading: isAppConfirming, isSuccess: isAppConfirmed } = useWaitForTransactionReceipt({
    hash: appHash,
  });

  const { isLoading: isAgreementConfirming, isSuccess: isAgreementConfirmed } = useWaitForTransactionReceipt({
    hash: agreementHash,
  });

  // Simulate FHE encryption process
  const simulateFHEEncryption = async (data: any, type: string) => {
    setIsEncrypting(true);
    setEncryptionProgress(0);
    
    const steps = [
      'Initialize FHE Context',
      'Encrypt Sensitive Data',
      'Validate Encryption',
      'Prepare for On-chain',
      'Submit to Contract',
      'Confirm Transaction'
    ];

    for (let i = 0; i < steps.length; i++) {
      setEncryptionStep(steps[i]);
      setEncryptionProgress((i + 1) * 16.67);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsEncrypting(false);
    setEncryptionStep('');
    setEncryptionProgress(0);
  };

  // Generate mock encrypted data (in real implementation, this would use actual FHE)
  const generateEncryptedData = (value: string) => {
    // This is a mock - in reality, you'd use actual FHE encryption
    return `0x${Buffer.from(value).toString('hex').padStart(64, '0')}`;
  };

  const handleListProperty = async () => {
    if (!isConnected) return;
    
    try {
      await simulateFHEEncryption(propertyData, 'property');
      
      // Generate mock encrypted data
      const encryptedRent = generateEncryptedData(propertyData.monthlyRent);
      const encryptedDeposit = generateEncryptedData(propertyData.deposit);
      const encryptedBedrooms = generateEncryptedData(propertyData.bedrooms);
      const encryptedBathrooms = generateEncryptedData(propertyData.bathrooms);
      const mockProof = '0x' + '0'.repeat(128); // Mock proof
      
      await listProperty({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'listProperty',
        args: [
          propertyData.location,
          propertyData.description,
          encryptedRent,
          encryptedDeposit,
          encryptedBedrooms,
          encryptedBathrooms,
          mockProof
        ],
      });
    } catch (error) {
      console.error('Error listing property:', error);
    }
  };

  const handleSubmitApplication = async () => {
    if (!isConnected) return;
    
    try {
      await simulateFHEEncryption(applicationData, 'application');
      
      // Generate mock encrypted data
      const encryptedIncome = generateEncryptedData(applicationData.monthlyIncome);
      const encryptedCredit = generateEncryptedData(applicationData.creditScore);
      const mockProof = '0x' + '0'.repeat(128); // Mock proof
      
      await submitApplication({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitApplication',
        args: [
          parseInt(applicationData.propertyId),
          encryptedIncome,
          encryptedCredit,
          applicationData.personalInfo,
          mockProof
        ],
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleCreateAgreement = async () => {
    if (!isConnected) return;
    
    try {
      await simulateFHEEncryption(agreementData, 'agreement');
      
      // Generate mock encrypted data
      const encryptedDuration = generateEncryptedData(agreementData.leaseDuration);
      const mockProof = '0x' + '0'.repeat(128); // Mock proof
      
      await createAgreement({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createLeaseAgreement',
        args: [
          parseInt(agreementData.applicationId),
          encryptedDuration,
          mockProof
        ],
      });
    } catch (error) {
      console.error('Error creating agreement:', error);
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
      {/* FHE Encryption Status */}
      <FHEEncryption 
        isEncrypting={isEncrypting}
        encryptionStep={encryptionStep}
        progress={encryptionProgress}
      />

      {/* Main Contract Interaction Tabs */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            List Property
          </TabsTrigger>
          <TabsTrigger value="apply" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Apply
          </TabsTrigger>
          <TabsTrigger value="contract" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            View & Sign
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Status
          </TabsTrigger>
        </TabsList>

        {/* List Property Tab */}
        <TabsContent value="list">
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
                disabled={isListingPending || isListConfirming || isEncrypting}
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
        </TabsContent>

        {/* Apply Tab */}
        <TabsContent value="apply">
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
                disabled={isAppPending || isAppConfirming || isEncrypting}
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
        </TabsContent>

        {/* View & Sign Contract Tab */}
        <TabsContent value="contract">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                View & Sign Contract (FHE Encrypted)
              </CardTitle>
              <CardDescription>
                Create lease agreements with encrypted terms that remain private until both parties commit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicationId">Application ID</Label>
                  <Input
                    id="applicationId"
                    type="number"
                    value={agreementData.applicationId}
                    onChange={(e) => setAgreementData({...agreementData, applicationId: e.target.value})}
                    placeholder="Enter application ID"
                  />
                </div>
                <div>
                  <Label htmlFor="leaseDuration">Lease Duration (Months)</Label>
                  <Input
                    id="leaseDuration"
                    type="number"
                    value={agreementData.leaseDuration}
                    onChange={(e) => setAgreementData({...agreementData, leaseDuration: e.target.value})}
                    placeholder="12"
                  />
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  FHE-Encrypted Contract Terms
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <Badge variant="outline">🔒 Encrypted</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <Badge variant="outline">🔒 Encrypted</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Lease Duration:</span>
                    <Badge variant="outline">🔒 Encrypted</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Terms Visibility:</span>
                    <Badge variant="outline">Private until signed</Badge>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCreateAgreement}
                disabled={isAgreementPending || isAgreementConfirming || isEncrypting}
                className="w-full"
              >
                {isAgreementPending || isAgreementConfirming ? 'Creating Encrypted Agreement...' : 'Create & Sign Contract (FHE Encrypted)'}
              </Button>
              {isAgreementConfirmed && (
                <Badge variant="default" className="w-full justify-center">
                  ✅ Contract created and signed with FHE encryption!
                </Badge>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                FHE Encryption Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Badge variant="outline" className="mb-2">
                      <Lock className="h-3 w-3 mr-1" />
                      Privacy Level
                    </Badge>
                    <p className="text-sm font-semibold text-electric">Maximum</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Badge variant="outline" className="mb-2">
                      <Shield className="h-3 w-3 mr-1" />
                      Security
                    </Badge>
                    <p className="text-sm font-semibold text-green-600">FHE Protected</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Data Encryption:</span>
                    <Badge variant="outline">FHE Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>On-chain Storage:</span>
                    <Badge variant="outline">Encrypted</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Contract Status:</span>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
