import React from "react";
import PlantCard from "../components/PlantCard";
import TestimonialCard from "../components/TestimonialCard";

const trendingPlants = [
  {
    name: "Aglaonema plant",
    price: "Rs. 300/-",
    img: "https://images.unsplash.com/photo-1598899134739-24c46f58e79d?w=400",
  },
  {
    name: "Plantain Lilies",
    price: "Rs. 380/-",
    img: "https://images.unsplash.com/photo-1613470207922-9ffb2d5639b2?w=400",
  },
  {
    name: "Cactus",
    price: "Rs. 259/-",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400",
  },
];

export default function Home() {
  return (
    <div className="px-6 sm:px-12 py-10 space-y-20">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6">
          Earth’s Exhale
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          “Earth Exhale” symbolizes the purity and vitality of the Earth’s
          natural environment and its essential role in sustaining life.
        </p>
        <div className="space-x-6">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-white">
            Buy Now
          </button>
          <button className="border border-green-500 px-6 py-2 rounded-full hover:bg-green-600">
            Live Demo
          </button>
        </div>
      </section>

      {/* Trending Plants */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Trendy Plants
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {trendingPlants.map((plant) => (
            <PlantCard key={plant.name} {...plant} />
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-10">
          Customer Reviews
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <TestimonialCard name="Shelly Russel" review="Absolutely love my plants!" />
          <TestimonialCard name="Lula Rolfson" review="Beautiful and fresh greens." />
          <TestimonialCard name="Carol Huels" review="Worth every penny!" />
        </div>
      </section>

      {/* O2 Plants */}
      <section className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-10 rounded-2xl text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Best O₂ Plants</h2>
        <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
          Oxygen-producing plants help filter toxins from the air, making your
          home cleaner and fresher. Explore our O₂ collection!
        </p>
        <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full">
          Explore
        </button>
      </section>
    </div>
  );
}
