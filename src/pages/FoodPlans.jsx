// src/pages/FoodPlans.jsx
import { Search, Plus, Clock, Users, Flame } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FoodPlans() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("High Protein");

  const recipes = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      description: "Fresh mixed greens with grilled chicken breast and balsamic vinaigrette",
      image: "/recipes/chicken-salad.jpg",
      category: "Lunch",
      prepTime: "25 mins",
      servings: 2,
      calories: "380 cal",
      tags: ["High Protein", "Low Carb"]
    },
    {
      id: 2,
      name: "Berry Protein Bowl",
      description: "Protein-packed smoothie bowl topped with fresh berries and granola",
      image: "/recipes/berry-bowl.jpg",
      category: "Breakfast",
      prepTime: "10 mins",
      servings: 1,
      calories: "320 cal",
      tags: ["High Protein"]
    },
    {
      id: 3,
      name: "Quinoa Salmon Bowl",
      description: "Baked salmon with quinoa and roasted vegetables",
      image: "/recipes/salmon-bowl.jpg",
      category: "Dinner",
      prepTime: "35 mins",
      servings: 2,
      calories: "450 cal",
      tags: ["High Protein"]
    },
    {
      id: 4,
      name: "Avocado Toast",
      description: "Whole grain toast topped with smashed avocado and poached eggs",
      image: "/recipes/avocado-toast.jpg",
      category: "Breakfast",
      prepTime: "15 mins",
      servings: 1,
      calories: "340 cal",
      tags: ["High Protein"]
    },
    {
      id: 5,
      name: "Greek Yogurt Parfait",
      description: "Layered Greek yogurt with fresh berries and homemade granola",
      image: "/recipes/yogurt-parfait.jpg",
      category: "Snack",
      prepTime: "10 mins",
      servings: 1,
      calories: "280 cal",
      tags: ["High Protein"]
    }
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-5 lg:ml-5 mt-12 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 lg:mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-white m-0 mb-2">Recipe Library</h2>
          <p className="text-xs lg:text-sm text-[#888] m-0">Manage and browse all recipes available for coaches to use in client meal plans.</p>
        </div>
        <button 
          className="flex items-center gap-2 bg-[#f59e0b] text-[#1a1a1a] border-none px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white shadow-lg shadow-amber-500/30"
          onClick={() => navigate('/food-plans/add-recipe')}
        >
          <Plus size={16} className="lg:size-4" />
          <span>Add Recipe</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4 lg:mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 pl-10 lg:pl-12 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#252525]"
          />
        </div>
        <div className="flex gap-2 lg:gap-3 flex-wrap">
          <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b]">
            <option value="">All Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b]">
            <option value="">All Prep Times</option>
            <option value="quick">Under 15 mins</option>
            <option value="medium">15-30 mins</option>
            <option value="long">Over 30 mins</option>
          </select>
          <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b]">
            <option value="">All Nutrition Types</option>
            <option value="highprotein">High Protein</option>
            <option value="lowcarb">Low Carb</option>
            <option value="lowfat">Low Fat</option>
          </select>
          <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg transition-all duration-200 hover:text-white">
            ✕ Clear All
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 lg:gap-3 mb-4 lg:mb-6 flex-wrap">
        {["High Protein", "Low Carb", "Quick Meals", "Breakfast"].map(tag => (
          <button
            key={tag}
            className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
              activeFilter === tag 
                ? 'bg-[#f59e0b] text-[#1a1a1a] shadow-lg shadow-amber-500/30' 
                : 'bg-[#2a2a2a] text-[#ccc] border border-[#3a3a3a] hover:bg-[#333]'
            }`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Recipe Count */}
      <div className="text-[#888] text-xs lg:text-sm mb-4 lg:mb-6">
        Showing {filteredRecipes.length} of 100 recipes
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
            {/* Recipe Image */}
            <div className="relative h-32 lg:h-40 bg-gradient-to-br from-gray-700 to-gray-800">
              <span className="absolute top-3 left-3 bg-[#f59e0b] text-[#1a1a1a] px-2 py-1 rounded-lg text-xs font-semibold shadow-lg shadow-amber-500/30">
                {recipe.category}
              </span>
            </div>
            
            {/* Recipe Content */}
            <div className="p-4 lg:p-5">
              <h3 className="text-white font-semibold text-sm lg:text-base mb-2 line-clamp-1">{recipe.name}</h3>
              <p className="text-[#ccc] text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2">{recipe.description}</p>
              
              {/* Recipe Meta */}
              <div className="flex gap-3 lg:gap-4 mb-3 lg:mb-4">
                <span className="flex items-center gap-1 text-[#888] text-xs">
                  <Clock size={12} className="lg:size-3.5" />
                  {recipe.prepTime}
                </span>
                <span className="flex items-center gap-1 text-[#888] text-xs">
                  <Users size={12} className="lg:size-3.5" />
                  {recipe.servings} servings
                </span>
                <span className="flex items-center gap-1 text-[#888] text-xs">
                  <Flame size={12} className="lg:size-3.5" />
                  {recipe.calories}
                </span>
              </div>
              
              {/* Recipe Footer */}
              <div className="flex justify-between items-center">
                <div className="flex gap-1 lg:gap-2">
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
                    {recipe.tags[0]}
                  </span>
                  {recipe.tags[1] && (
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">
                      {recipe.tags[1]}
                    </span>
                  )}
                </div>
                <button className="bg-transparent border-none text-[#888] text-lg cursor-pointer transition-all duration-200 hover:text-[#f59e0b]">
                  ✎
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodPlans;