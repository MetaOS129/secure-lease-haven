import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Secure Lease Haven" className="h-8 w-8" />
          <span className="text-xl font-bold">Secure Lease Haven</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
            Properties
          </Link>
          <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;