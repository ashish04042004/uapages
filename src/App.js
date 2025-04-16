import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MasonryGrid from "./components/MasonryGrid";
import PinModal from "./components/PinModal";
import Dashboard from "./components/Dashboard";
import Explore from "./components/Explore";
import "./App.css";

function App() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pins = [
    {
      id: 1,
      title: "Mountain Landscape",
      description: "Beautiful mountain landscape with a lake view",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      user: "NatureLover",
      userAvatar: "https://ui-avatars.com/api/?name=Nature+Lover",
      likes: 245,
      comments: 32,
      tags: ["nature", "mountains", "travel"],
    },
    {
      id: 2,
      title: "Healthy Breakfast Ideas",
      description: "Start your day with these nutritious breakfast options",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      user: "HealthyEats",
      userAvatar: "https://ui-avatars.com/api/?name=Healthy+Eats",
      likes: 189,
      comments: 24,
      tags: ["food", "health", "breakfast"],
    },
    {
      id: 3,
      title: "Modern Living Room Design",
      description: "Minimalist approach to modern living spaces",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCsQV8LrYVblYd8mHkK7w-HH1GUZzLNKlvfA&s",
      user: "InteriorDesign",
      userAvatar: "https://ui-avatars.com/api/?name=Interior+Design",
      likes: 312,
      comments: 45,
      tags: ["interior", "design", "home"],
    },
    {
      id: 4,
      title: "Summer Fashion Trends",
      description: "Latest styles for the summer season",
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80",
      user: "FashionForward",
      userAvatar: "https://ui-avatars.com/api/?name=Fashion+Forward",
      likes: 278,
      comments: 37,
      tags: ["fashion", "summer", "trends"],
    },
    {
      id: 5,
      title: "DIY Home Projects",
      description: "Easy weekend projects to improve your home",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmv5cqPNBg6Ix9JOL9hqlW-H1AKt_Lcw5PuA&s",
      user: "DIYCrafter",
      userAvatar: "https://ui-avatars.com/api/?name=DIY+Crafter",
      likes: 156,
      comments: 19,
      tags: ["diy", "home", "crafts"],
    },
    {
      id: 6,
      title: "Urban Photography",
      description: "Capturing the essence of city life",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfo2pNmr1Uf2nByPAuYPBoEsw6f9zW0lBaA&s",
      user: "UrbanShots",
      userAvatar: "https://ui-avatars.com/api/?name=Urban+Shots",
      likes: 201,
      comments: 28,
      tags: ["photography", "urban", "city"],
    },
    {
      id: 7,
      title: "Workspace Setup Ideas",
      description:
        "Optimize your productivity with these workspace arrangements",
      image:
        "https://mark-cdn.bountixp.com/marketing-v2/wp-content/uploads/2021/10/90913081_m-1.jpg",
      user: "ProductivityPro",
      userAvatar: "https://ui-avatars.com/api/?name=Productivity+Pro",
      likes: 167,
      comments: 22,
      tags: ["workspace", "productivity", "setup"],
    },
    {
      id: 8,
      title: "Artistic Illustrations",
      description: "Hand-drawn digital illustrations with vibrant colors",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNdgpKj-uBLbR4z06r4JbTR3OEOgumQqvizw&s",
      user: "ArtisticSoul",
      userAvatar: "https://ui-avatars.com/api/?name=Artistic+Soul",
      likes: 289,
      comments: 41,
      tags: ["art", "illustration", "digital"],
    },
  ];

  const filteredPins = searchQuery
    ? pins.filter(
        (pin) =>
          pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pin.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : pins;

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  const handleCloseModal = () => {
    setSelectedPin(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                {isLoading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span>Loading pins...</span>
                  </div>
                ) : (
                  <MasonryGrid
                    pins={filteredPins}
                    onPinClick={handlePinClick}
                  />
                )}
              </main>
            }
          />
          <Route
            path="/explore"
            element={
              <main className="main-content">
                <Explore />
              </main>
            }
          />
          <Route
            path="/create"
            element={
              <main className="main-content">
                <h1>Create Pin</h1>
                {/* Add create pin form here */}
              </main>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {selectedPin && (
          <PinModal pin={selectedPin} onClose={handleCloseModal} />
        )}
      </div>
    </Router>
  );
}

export default App;
