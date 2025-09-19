import PropertyCard from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const PropertyGrid = () => {
  const properties = [
    {
      id: "1",
      image: property1,
      title: "Modern Downtown Loft",
      location: "Manhattan, New York",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      encrypted: true,
      available: true,
    },
    {
      id: "2", 
      image: property2,
      title: "Luxury Penthouse Suite",
      location: "SoHo, New York",
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      encrypted: true,
      available: true,
    },
    {
      id: "3",
      image: property1,
      title: "Contemporary Studio",
      location: "Brooklyn, New York",
      bedrooms: 1,
      bathrooms: 1,
      area: 750,
      encrypted: false,
      available: false,
    },
    {
      id: "4",
      image: property2,
      title: "Executive Corner Office Conversion",
      location: "Midtown, New York", 
      bedrooms: 2,
      bathrooms: 1,
      area: 950,
      encrypted: true,
      available: true,
    },
  ];

  return (
    <section id="properties" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium rental properties with revolutionary contract protection. 
            Terms remain confidential until you're ready to commit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/properties" className="text-electric hover:text-electric/80 font-semibold">
            View All Properties →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;