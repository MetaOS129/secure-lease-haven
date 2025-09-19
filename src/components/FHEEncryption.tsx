import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Key, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface FHEEncryptionProps {
  isEncrypting: boolean;
  encryptionStep: string;
  progress: number;
}

export default function FHEEncryption({ isEncrypting, encryptionStep, progress }: FHEEncryptionProps) {
  const [encryptionSteps] = useState([
    { id: 'init', name: 'Initialize FHE Context', description: 'Setting up homomorphic encryption parameters' },
    { id: 'encrypt', name: 'Encrypt Sensitive Data', description: 'Converting plaintext to encrypted format' },
    { id: 'validate', name: 'Validate Encryption', description: 'Ensuring data integrity and security' },
    { id: 'prepare', name: 'Prepare for On-chain', description: 'Formatting encrypted data for blockchain' },
    { id: 'submit', name: 'Submit to Contract', description: 'Sending encrypted data to smart contract' },
    { id: 'confirm', name: 'Confirm Transaction', description: 'Waiting for blockchain confirmation' }
  ]);

  const getStepIcon = (stepId: string, currentStep: string) => {
    if (stepId === currentStep) {
      return <AlertCircle className="h-4 w-4 text-electric animate-pulse" />;
    }
    if (encryptionSteps.indexOf(encryptionSteps.find(s => s.id === stepId)!) < encryptionSteps.indexOf(encryptionSteps.find(s => s.id === currentStep)!)) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <Lock className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-electric" />
          FHE Encryption Process
        </CardTitle>
        <CardDescription>
          Real-time encryption status using Fully Homomorphic Encryption technology
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Encryption Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step */}
        {isEncrypting && (
          <div className="bg-electric/10 border border-electric/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-electric animate-spin" />
              <div>
                <p className="font-semibold text-electric">Encrypting Data...</p>
                <p className="text-sm text-muted-foreground">{encryptionStep}</p>
              </div>
            </div>
          </div>
        )}

        {/* Encryption Steps */}
        <div className="space-y-3">
          {encryptionSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg border">
              {getStepIcon(step.id, encryptionStep)}
              <div className="flex-1">
                <p className="font-medium">{step.name}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {step.id === encryptionStep && (
                <Badge variant="outline" className="text-electric border-electric">
                  Current
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Encryption Status */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              <Lock className="h-3 w-3 mr-1" />
              Privacy Level
            </Badge>
            <p className="text-sm font-semibold text-electric">Maximum</p>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              <Shield className="h-3 w-3 mr-1" />
              Security
            </Badge>
            <p className="text-sm font-semibold text-green-600">FHE Protected</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
