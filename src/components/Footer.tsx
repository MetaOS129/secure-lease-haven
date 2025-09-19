import skyline from "@/assets/skyline.png";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Animated city skyline */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <img 
          src={skyline} 
          alt="City Skyline"
          className="h-full w-full object-cover skyline-animate"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Hidden Rentals</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Revolutionizing real estate rentals with encrypted contracts and 
              blockchain security. Protecting both landlords and tenants from market exploitation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-electric transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-electric transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-electric transition-colors">Browse Properties</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">List Property</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-electric transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">API</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60">
            © 2024 Hidden Rentals. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-primary-foreground/60">Powered by</span>
            <span className="gradient-text font-semibold">Blockchain Technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;