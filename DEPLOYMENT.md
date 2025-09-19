# Vercel Deployment Guide for Secure Lease Haven

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" on the dashboard
3. Select "Import Git Repository"
4. Choose your GitHub account and select `secure-lease-haven` repository
5. Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**: `secure-lease-haven` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to your project settings and add these environment variables:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_sepolia_rpc_url_here

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=your_infura_api_key_here
```

**To add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add each variable with the values above
3. Make sure to set them for "Production", "Preview", and "Development"

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_CHAIN_ID` | 11155111 | Ethereum Sepolia Testnet Chain ID |
| `VITE_RPC_URL` | https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990 | RPC URL for blockchain connection |
| `VITE_WALLET_CONNECT_PROJECT_ID` | 2ec9743d0d0cd7fb94dee1a7e6d33475 | WalletConnect Project ID |
| `VITE_INFURA_API_KEY` | b18fb7e6ca7045ac83c41157ab93f990 | Infura API Key for additional RPC access |

## Post-Deployment Checklist

- [ ] Verify the application loads correctly
- [ ] Test wallet connection functionality
- [ ] Check that all environment variables are properly set
- [ ] Verify the favicon and meta tags are working
- [ ] Test responsive design on mobile devices
- [ ] Check console for any errors

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are properly installed
2. **Environment Variables**: Ensure all required variables are set in Vercel
3. **Wallet Connection Issues**: Verify WalletConnect Project ID is correct
4. **RPC Errors**: Check that RPC URLs are accessible and correct

### Debug Steps:

1. Check Vercel build logs for errors
2. Verify environment variables in Vercel dashboard
3. Test locally with `npm run dev` to ensure everything works
4. Check browser console for client-side errors

## Manual Deployment Commands

If you prefer to deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the build
npm run preview
```

## Continuous Deployment

Once connected to Vercel:
- Every push to the `main` branch will trigger an automatic deployment
- Pull requests will create preview deployments
- You can manually trigger deployments from the Vercel dashboard

## Support

For issues with:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Wallet Connection**: Check [RainbowKit Documentation](https://www.rainbowkit.com/docs)
- **FHE Integration**: Check [FHEVM Documentation](https://docs.fhevm.io/)

## Security Notes

- Never commit environment variables to the repository
- Use Vercel's environment variable system for sensitive data
- Regularly rotate API keys and tokens
- Monitor for any security vulnerabilities in dependencies
