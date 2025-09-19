// Environment configuration
export const config = {
  chainId: import.meta.env.VITE_CHAIN_ID || 11155111,
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/your_infura_key',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your_walletconnect_project_id',
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'your_infura_api_key',
  alternativeRpcUrl: 'https://1rpc.io/sepolia'
} as const;
