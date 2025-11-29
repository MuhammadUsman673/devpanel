import React, { useState } from 'react';
import { Search, Clock, Flame, TrendingUp, Plus, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Exercise() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState(['Strength']);
  const [sortBy, setSortBy] = useState('newest');

  const exercises = [
    {
      id: 1,
      name: 'Barbell Squat',
      description: 'Compound lower body exercise targeting quads, glutes, and core muscles',
      duration: '45 mins',
      difficulty: 'Intermediate',
      calories: 350,
      category: 'Strength',
      tag: 'Lower Body',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum calorie burn and endurance',
      duration: '30 mins',
      difficulty: 'Advanced',
      calories: 420,
      category: 'Cardio',
      tag: 'Full Body',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'Yoga Flow Sequence',
      description: 'Gentle flowing movements to improve flexibility and reduce stress',
      duration: '60 mins',
      difficulty: 'Beginner',
      calories: 180,
      category: 'Flexibility',
      tag: 'Full Body',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      name: 'Deadlift Mastery',
      description: 'Perfect your deadlift form with progressive loading and technique drills',
      duration: '50 mins',
      difficulty: 'Advanced',
      calories: 380,
      category: 'Strength',
      tag: 'Lower Body',
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 5,
      name: 'Core Power Circuit',
      description: 'Intense core workout targeting abs, obliques, and lower back stability',
      duration: '25 mins',
      difficulty: 'Intermediate',
      calories: 220,
      category: 'Strength',
      tag: 'Core',
      image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
      id: 6,
      name: 'Swimming Intervals',
      description: 'Pool-based cardio workout with varied strokes and intensity levels',
      duration: '40 mins',
      difficulty: 'Intermediate',
      calories: 310,
      category: 'Cardio',
      tag: 'Full Body',
      image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const filterOptions = ['Strength', 'Cardio', 'Flexibility', 'HIIT'];

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-emerald-500/20 text-emerald-400';
      case 'Intermediate': return 'bg-amber-500/20 text-amber-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredExercises = selectedFilters.length > 0
    ? exercises.filter(ex => selectedFilters.includes(ex.category))
    : exercises;

  return (
    <div className="ml-5 lg:ml-5 mt-2  lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white m-0">Exercise Library</h1>
            <p className="text-xs lg:text-sm text-[#888] m-0 mt-2">
              Manage and browse all exercises available for coaches to use in client workout plans.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-[#f59e0b] text-[#1a1a1a] border-none px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white shadow-lg shadow-amber-500/30"
            onClick={() => navigate('/exercise/add-exercise')}
          >
            <Plus size={16} className="lg:size-4" />
            Add Exercise
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-wrap">
            <div className="relative flex-1 min-w-[200px] mr-4 lg:mr-16">
              <Search size={18} className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="text"
                placeholder="Search exercises..."
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 pl-10 lg:pl-12 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b]"
              />
            </div>
            <select 
              className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] min-w-[180px] flex-shrink-0"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">All Categories</option>
              <option value="popular">Popular</option>
              <option value="duration">By Duration</option>
            </select>
            <select className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] min-w-[180px] flex-shrink-0">
              <option>All Prep Times</option>
              <option>Quick (0-30 mins)</option>
              <option>Medium (30-60 mins)</option>
              <option>Long (60+ mins)</option>
            </select>
            <select className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] min-w-[180px] flex-shrink-0">
              <option>All Difficulty Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-3 lg:gap-4 flex-wrap">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                  selectedFilters.includes(filter)
                    ? 'bg-[#f59e0b] text-[#1a1a1a]'
                    : 'bg-[#1a1a1a] text-white border border-[#3a3a3a] hover:bg-[#2a2a2a]'
                }`}
              >
                {filter}
              </button>
            ))}
            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer transition-all duration-200 hover:text-white"
              >
                <X size={16} className="lg:size-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Count and Sort */}
        <div className="flex justify-between items-center mb-6 lg:mb-8 flex-wrap gap-4">
          <p className="text-xs lg:text-sm text-[#888]">
            Showing {filteredExercises.length} of {exercises.length} exercises
          </p>
          <select 
            className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="popular">Sort by: Popular</option>
            <option value="duration">Sort by: Duration</option>
            <option value="difficulty">Sort by: Difficulty</option>
          </select>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden transition-all duration-200 hover:border-amber-500/50 hover:scale-105 cursor-pointer">
              {/* Exercise Image/Gradient */}
              <div 
                className="h-40 lg:h-48 relative"
                style={{ background: exercise.image }}
              >
                <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                  {exercise.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent opacity-60"></div>
              </div>

              {/* Exercise Details */}
              <div className="p-4 lg:p-5">
                <h3 className="text-white font-semibold text-sm lg:text-base mb-2 transition-colors duration-200 group-hover:text-amber-400 line-clamp-1">
                  {exercise.name}
                </h3>
                <p className="text-[#888] text-xs lg:text-sm mb-4 line-clamp-2">
                  {exercise.description}
                </p>

                {/* Stats */}
                <div className="flex gap-3 lg:gap-4 mb-4">
                  <span className="flex items-center gap-1 text-[#888] text-xs">
                    <Clock size={12} className="lg:size-3.5" />
                    {exercise.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[#888] text-xs">
                    <Flame size={12} className="lg:size-3.5" />
                    {exercise.calories} cal
                  </span>
                </div>

                {/* Tags */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <button className="bg-transparent border-none p-1.5 rounded-lg cursor-pointer transition-all duration-200 text-[#888] hover:bg-[#333] hover:text-[#f59e0b]">
                    <TrendingUp size={14} className="lg:size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}