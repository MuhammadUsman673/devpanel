// src/pages/AddRecipe.jsx
import { Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const categories = [
    { icon: "🍳", name: "Breakfast", count: 23 },
    { icon: "🍱", name: "Lunch", count: 32 },
    { icon: "🍽️", name: "Dinner", count: 28 },
    { icon: "🍿", name: "Snacks", count: 15 }
  ];

  const recentRecipes = [
    { name: "Grilled Chicken Salad", category: "Lunch", calories: "380 cal" },
    { name: "Berry Protein Bowl", category: "Breakfast", calories: "" }
  ];

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "cups" }]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const removeInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  return (
    <div className="ml-5 lg:ml-5 mt-12 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-4 lg:gap-6">
        {/* Main Section */}
        <div className="flex-1 max-w-4xl">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-lg lg:text-xl font-bold text-white">Add New Recipe</h2>
          </div>

          <form className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 shadow-lg">
            {/* Recipe Name & Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Recipe Name</label>
                <input
                  type="text"
                  placeholder="Enter recipe name"
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Category</label>
                <select className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 cursor-pointer">
                  <option>Select category</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snacks</option>
                </select>
              </div>
            </div>

            {/* Prep Time, Cook Time & Servings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Prep Time (mins)</label>
                <input 
                  type="number" 
                  placeholder="15" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Cook Time (mins)</label>
                <input 
                  type="number" 
                  placeholder="20" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Servings</label>
                <input 
                  type="number" 
                  placeholder="4" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
            </div>

            {/* Recipe Image */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Recipe Image</label>
              <div className="border-2 border-dashed border-[#3a3a3a] rounded-lg p-8 lg:p-10 text-center bg-[#222] cursor-pointer transition-all duration-200 hover:border-amber-500 hover:bg-[#252525]">
                <Upload size={24} className="lg:size-8 text-[#666] mx-auto mb-3 lg:mb-4 transition-colors duration-200 group-hover:text-amber-500" />
                <p className="text-[#888] text-xs lg:text-sm mb-1 lg:mb-2">Click to upload or drag and drop</p>
                <span className="text-[#666] text-xs lg:text-sm">Max. file size: 10 MB</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Description</label>
              <textarea
                placeholder="Brief description of the recipe..."
                className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a] resize-vertical min-h-20"
                rows={3}
              />
            </div>

            {/* Ingredients */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Ingredients</label>
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 lg:gap-3 mb-3 lg:mb-4 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Ingredient name"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={ing.amount}
                    onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
                    className="w-full sm:w-24 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500"
                  />
                  <select 
                    value={ing.unit}
                    onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                    className="w-full sm:w-32 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="cups">cups</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="grams">grams</option>
                  </select>
                  <button 
                    type="button" 
                    onClick={() => removeIngredient(idx)}
                    className="w-8 h-8 lg:w-9 lg:h-9 bg-[#333] border-none rounded-lg text-red-400 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-105"
                  >
                    <Trash2 size={14} className="lg:size-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 bg-transparent border border-dashed border-[#3a3a3a] text-[#888] px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm transition-all duration-200 hover:border-amber-500 hover:text-white hover:bg-amber-500/5 w-fit"
                onClick={addIngredient}
              >
                <Plus size={14} className="lg:size-4" />
                Add Ingredient
              </button>
            </div>

            {/* Instructions */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Instructions</label>
              {instructions.map((inst, idx) => (
                <div key={idx} className="flex gap-2 lg:gap-3 mb-3 lg:mb-4 items-center animate-fadeIn">
                  <span className="w-7 h-7 lg:w-8 lg:h-8 bg-amber-500 text-[#1a1a1a] rounded-full flex items-center justify-center font-semibold text-xs lg:text-sm flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={`Step ${idx + 1} instructions...`}
                    value={inst}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeInstruction(idx)}
                    className="w-8 h-8 lg:w-9 lg:h-9 bg-[#333] border-none rounded-lg text-red-400 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-105"
                  >
                    <Trash2 size={14} className="lg:size-4" />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="flex items-center gap-2 bg-transparent border border-dashed border-[#3a3a3a] text-[#888] px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm transition-all duration-200 hover:border-amber-500 hover:text-white hover:bg-amber-500/5 w-fit"
                onClick={addInstruction}
              >
                <Plus size={14} className="lg:size-4" />
                Add Step
              </button>
            </div>

            {/* Nutrition Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Calories</label>
                <input 
                  type="number" 
                  placeholder="350" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Protein (g)</label>
                <input 
                  type="number" 
                  placeholder="25" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Carbs (g)</label>
                <input 
                  type="number" 
                  placeholder="30" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Fat (g)</label>
                <input 
                  type="number" 
                  placeholder="15" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 lg:gap-4 justify-end mt-6 lg:mt-8 flex-col sm:flex-row">
              <button
                type="button"
                className="bg-[#333] border border-[#3a3a3a] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-[#3a3a3a] hover:-translate-y-0.5 order-2 sm:order-1"
                onClick={() => navigate('/food-plans')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-amber-500 text-[#1a1a1a] border-none px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-amber-400 hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 order-1 sm:order-2"
              >
                Save Recipe
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="xl:w-80 flex-shrink-0 mt-6 xl:mt-12">
          {/* Recipe Categories */}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 mb-4 lg:mb-6 shadow-lg">
            <h3 className="text-white font-semibold text-sm lg:text-base mb-3 lg:mb-4">Recipe Categories</h3>
            <div className="flex flex-col gap-2 lg:gap-3">
              {categories.map((cat) => (
                <div 
                  key={cat.name} 
                  className="flex justify-between items-center p-3 bg-[#222] border border-[#333] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-amber-500 hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[#888]">{cat.icon}</span>
                    <span className="text-white text-xs lg:text-sm font-medium">{cat.name}</span>
                  </div>
                  <span className="bg-amber-500 text-[#1a1a1a] px-2 py-1 rounded-full text-xs font-semibold min-w-6 text-center shadow-lg shadow-amber-500/30">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Recipes */}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 shadow-lg">
            <h3 className="text-white font-semibold text-sm lg:text-base mb-3 lg:mb-4">Recent Recipes</h3>
            <div className="flex flex-col gap-3 lg:gap-4">
              {recentRecipes.map((recipe, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-[#222] border border-[#333] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-amber-500 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-500 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs lg:text-sm font-medium truncate">{recipe.name}</p>
                    <p className="text-[#888] text-xs lg:text-sm truncate">
                      {recipe.category} {recipe.calories}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;