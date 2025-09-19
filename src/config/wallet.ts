import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from './env';

export const walletConfig = getDefaultConfig({
  appName: 'Secure Lease Haven',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});
