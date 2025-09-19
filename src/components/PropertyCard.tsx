import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Lock, MapPin, Bed, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  encrypted: boolean;
  available: boolean;
}

const PropertyCard = ({ 
  id, 
  image, 
  title, 
  location, 
  bedrooms, 
  bathrooms, 
  area, 
  encrypted, 
  available 
}: PropertyCardProps) => {
  return (
    <div className="property-card property-hover overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {encrypted && (
            <Badge className="bg-electric text-electric-foreground">
              <Lock className="h-3 w-3 mr-1" />
              Encrypted
            </Badge>
          )}
          {available && (
            <Badge className="bg-success text-success-foreground">
              Available
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-property-card-foreground">{title}</h3>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{area} sq ft</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Contract Terms</span>
            {encrypted ? (
              <div className="flex items-center text-electric">
                <Lock className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Hidden</span>
              </div>
            ) : (
              <div className="flex items-center text-success">
                <Eye className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Visible</span>
              </div>
            )}
          </div>

          <a href="/view-contract">
            <Button className="w-full wallet-connect">
              {encrypted ? "View & Sign Contract" : "View Details"}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;