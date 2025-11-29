import { Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExercise() {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState([]);
  const [steps, setSteps] = useState([]);

  const categories = [
    { icon: "🏋️", name: "Strength", count: 23 },
    { icon: "🏃", name: "Cardio", count: 32 },
    { icon: "🧘", name: "Flexibility", count: 28 },
    { icon: "🔥", name: "HIIT", count: 15 },
  ];

  const recentExercises = [
    { name: "Barbell Squat", category: "Strength", duration: "45 mins" },
    { name: "HIIT Cardio Blast", category: "Cardio", duration: "30 mins" },
  ];

  const addEquipment = () => {
    setEquipment([...equipment, { name: "", amount: "", unit: "" }]);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  return (
    <div className="ml-5 lg:ml-5 mt-2  lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-4 lg:gap-6">
        {/* Main Section */}
        <div className="flex-1 max-w-4xl">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-lg lg:text-xl font-bold text-white">Add New Exercise</h2>
          </div>

          <form className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 shadow-lg">
            {/* Exercise Name & Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Exercise Name</label>
                <input
                  type="text"
                  placeholder="Enter exercise name"
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Category</label>
                <select className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 cursor-pointer">
                  <option>Select category</option>
                  <option>Strength</option>
                  <option>Cardio</option>
                  <option>Flexibility</option>
                  <option>HIIT</option>
                </select>
              </div>
            </div>

            {/* Duration, Calories & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Duration (mins)</label>
                <input 
                  type="number" 
                  placeholder="30" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Calories Burned</label>
                <input 
                  type="number" 
                  placeholder="250" 
                  className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-xs lg:text-sm font-medium">Difficulty</label>
                <select className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 cursor-pointer">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            {/* Exercise Image */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Exercise Image</label>
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
                placeholder="Brief description of the exercise..."
                className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500 focus:bg-[#2a2a2a] resize-vertical min-h-20"
                rows={3}
              />
            </div>

            {/* Equipment Used */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Equipment Used</label>
              {equipment.map((eq, idx) => (
                <div key={idx} className="flex gap-2 lg:gap-3 mb-3 lg:mb-4 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Equipment name"
                    className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500"
                  />
                  <button 
                    type="button" 
                    className="w-8 h-8 lg:w-9 lg:h-9 bg-[#333] border-none rounded-lg text-red-400 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-105"
                  >
                    <Trash2 size={14} className="lg:size-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 bg-transparent border border-dashed border-[#3a3a3a] text-[#888] px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm transition-all duration-200 hover:border-amber-500 hover:text-white hover:bg-amber-500/5 w-fit"
                onClick={addEquipment}
              >
                <Plus size={14} className="lg:size-4" />
                Add Equipment
              </button>
            </div>

            {/* Exercise Steps */}
            <div className="flex flex-col gap-2 mb-4 lg:mb-6">
              <label className="text-[#888] text-xs lg:text-sm font-medium">Exercise Steps</label>
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-2 lg:gap-3 mb-3 lg:mb-4 items-center animate-fadeIn">
                  <span className="w-7 h-7 lg:w-8 lg:h-8 bg-amber-500 text-[#1a1a1a] rounded-full flex items-center justify-center font-semibold text-xs lg:text-sm flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={`Step ${idx + 1} instructions...`}
                    className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-amber-500"
                  />
                  <button 
                    type="button" 
                    className="w-8 h-8 lg:w-9 lg:h-9 bg-[#333] border-none rounded-lg text-red-400 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-105"
                  >
                    <Trash2 size={14} className="lg:size-4" />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="flex items-center gap-2 bg-transparent border border-dashed border-[#3a3a3a] text-[#888] px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm transition-all duration-200 hover:border-amber-500 hover:text-white hover:bg-amber-500/5 w-fit"
                onClick={addStep}
              >
                <Plus size={14} className="lg:size-4" />
                Add Step
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 lg:gap-4 justify-end mt-6 lg:mt-8 flex-col sm:flex-row">
              <button
                type="button"
                className="bg-[#333] border border-[#3a3a3a] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-[#3a3a3a] hover:-translate-y-0.5 order-2 sm:order-1"
                onClick={() => navigate("/exercise")}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-amber-500 text-[#1a1a1a] border-none px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-amber-400 hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 order-1 sm:order-2"
              >
                Save Exercise
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="xl:w-80 flex-shrink-0 mt-6 xl:mt-12">
          {/* Exercise Categories */}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 mb-4 lg:mb-6 shadow-lg">
            <h3 className="text-white font-semibold text-sm lg:text-base mb-3 lg:mb-4">Exercise Categories</h3>
            <div className="flex flex-col gap-2 lg:gap-3">
              {categories.map((cat) => (
                <div 
                  key={cat.name} 
                  className="flex justify-between items-center p-3 bg-[#222] border border-[#333] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-amber-500 hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{cat.icon}</span>
                    <span className="text-white text-xs lg:text-sm font-medium">{cat.name}</span>
                  </div>
                  <span className="bg-amber-500 text-[#1a1a1a] px-2 py-1 rounded-full text-xs font-semibold min-w-6 text-center">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Exercises */}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 shadow-lg">
            <h3 className="text-white font-semibold text-sm lg:text-base mb-3 lg:mb-4">Recent Exercises</h3>
            <div className="flex flex-col gap-3 lg:gap-4">
              {recentExercises.map((ex, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-[#222] border border-[#333] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-amber-500 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs lg:text-sm font-medium truncate">{ex.name}</p>
                    <p className="text-[#888] text-xs lg:text-sm truncate">
                      {ex.category} • {ex.duration}
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

export default AddExercise;