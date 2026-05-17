import React, { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    price: "",
    rating: "5",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/home-data")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      })
      .catch((err) => console.error("Error fetching data from server:", err));
  }, [activeTab]);

  // Handle Form Input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler (Synchronized with your Express Backend)
 const handleFormSubmit = (e) => {
  e.preventDefault();
  
  // 1. Validation check (ensure nothing is empty)
  if (!formData.title || !formData.city || !formData.price || !formData.image) {
    alert("Please fill in all fields!");
    return;
  }

  // ==================== EDIT MODE (PUT) ====================
  if (editingId) {
    // Pack the modified data up to send to backend
    const updatedPayload = {
      title: formData.title,
      city: formData.city,
      price: Number(formData.price),
      rating: Number(formData.rating),
      image: formData.image
    };

    // Send data to the backend PUT route with the target home's ID in the URL
    fetch(`http://localhost:3000/home-data/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPayload)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert(result.message); // Alerts: "Home updated on backend successfully!"
          
          // Reset edit states, clear form, and go back to dashboard
          setEditingId(null);
          setFormData({ title: "", city: "", price: "", rating: "5", image: "" });
          setActiveTab("your-homes"); // Changing this tab automatically refetches fresh data from server!
        }
      })
      .catch((err) => {
        console.error("Error updating home data:", err);
        alert("Could not update data on backend server.");
      });

  // ==================== ADD MODE (POST) ====================
  } else {
    const homePayload = {
      title: formData.title,
      city: formData.city,
      price: Number(formData.price),
      rating: Number(formData.rating),
      image: formData.image
    };

    fetch("http://localhost:3000/home-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(homePayload)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert(result.message); // Alerts: "Home added to list successfully!"
          
          // Reset form inputs and view the dashboard list
          setFormData({ title: "", city: "", price: "", rating: "5", image: "" });
          setActiveTab("your-homes");
        }
      })
      .catch((err) => {
        console.error("Error posting home data:", err);
        alert("Could not save to backend server.");
      });
  }
};

  const startEdit = (home) => {
    setFormData(home);
    setEditingId(home.id);
    setActiveTab("add-home"); // Send user back to the form tab
  };

 const deleteHome = (id) => {
  if (window.confirm("Are you sure you want to delete this property from the server?")) {
    
    // Send a DELETE request to your Express server URL
    fetch(`http://localhost:3000/home-data/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert(result.message); // "Home deleted from backend array!"
          
          // Now update the screen state so it disappears instantly without a refresh
          setListings(listings.filter(home => home.id !== id));
        }
      })
      .catch((err) => console.error("Error deleting home from server:", err));
  }
};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* ==================== NAVBAR ==================== */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Branding */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <span className="text-red-500 text-3xl font-black tracking-tight">airbnb</span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Clone</span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-1 sm:gap-4">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-red-500 text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab("add-home"); setEditingId(null); setFormData({title:"", city:"", price:"", rating:"5", image:""}); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'add-home' ? 'bg-red-500 text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {editingId ? "✏️ Edit Home" : "➕ Add Home"}
            </button>
            <button 
              onClick={() => setActiveTab("your-homes")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'your-homes' ? 'bg-red-500 text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Your Homes ({listings.length})
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== CONTENT BODY ==================== */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* TAB 1: HOME SCREEN */}
        {activeTab === "home" && (
          <div className="text-center py-16 px-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl text-white shadow-xl">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Welcome to Your Next Adventure ❤️
            </h1>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto font-light mb-8">
              Find cozy mountain cabins, luxury beachside villas, and spaces designed specifically for travelers looking for a home away from home.
            </p>
            <button 
              onClick={() => setActiveTab("your-homes")}
              className="bg-white text-red-600 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-red-50 transition"
            >
              Explore Properties
            </button>
          </div>
        )}

        {/* TAB 2: ADD / EDIT HOME FORM */}
        {activeTab === "add-home" && (
          <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {editingId ? "Modify Property Details" : "List Your Property"}
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              {editingId ? "Update your listing information below." : "Fill out the fields to showcase your home on our platform."}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Property Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleInputChange}
                  placeholder="e.g., Luxury Penthouse Suite"
                  className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City Location</label>
                  <input 
                    type="text" name="city" value={formData.city} onChange={handleInputChange}
                    placeholder="e.g., Mumbai"
                    className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price per Night (₹)</label>
                  <input 
                    type="number" name="price" value={formData.price} onChange={handleInputChange}
                    placeholder="e.g., 2500"
                    className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Rating</label>
                  <select 
                    name="rating" value={formData.rating} onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Star)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Star)</option>
                    <option value="3">⭐⭐⭐ (3 Star)</option>
                    <option value="2">⭐⭐ (2 Star)</option>
                    <option value="1">⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Image URL Source</label>
                <input 
                  type="url" name="image" value={formData.image} onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition text-sm text-blue-600"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold hover:opacity-95 shadow-md transition-all mt-4"
              >
                {editingId ? "Save Real Estate Update" : "List Property Live"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: YOUR HOMES GRID DISPLAY */}
        {activeTab === "your-homes" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Hosted Spaces</h2>
              <p className="text-gray-500 text-sm mt-1">Manage, adjust pricing, or remove your listings from the marketplace.</p>
            </div>

            {listings.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl bg-white">
                <span className="text-5xl block mb-3">🏡</span>
                <p className="text-gray-500 font-medium text-lg">No properties listed yet.</p>
                <button 
                  onClick={() => setActiveTab("add-home")}
                  className="mt-4 text-red-500 font-bold hover:underline"
                >
                  Create your first listing now &rarr;
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map((home) => (
                  <div key={home.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                    
                    {/* Card Thumbnail Image */}
                    <div className="h-52 w-full overflow-hidden bg-gray-100 relative">
                      <img 
                        src={home.image} 
                        alt={home.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format&fit=crop"; }}
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full shadow-sm text-gray-700">
                        ⭐ {home.rating}.0
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 truncate max-w-[200px]">{home.title}</h3>
                        <span className="text-gray-400 text-sm font-medium">{home.city}</span>
                      </div>
                      <p className="text-gray-900 font-extrabold text-base mb-5">
                        ₹{home.price.toLocaleString("en-IN")} <span className="text-gray-500 font-normal text-xs">/ night</span>
                      </p>

                      {/* Action Interface Area */}
                      <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                        <button 
                          onClick={() => startEdit(home)}
                          className="bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
                        >
                          ✏️ Edit Listing
                        </button>
                        <button 
                          onClick={() => deleteHome(home.id)}
                          className="bg-red-50 text-red-600 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100 transition"
                        >
                          🗑️ Delete Listing
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}