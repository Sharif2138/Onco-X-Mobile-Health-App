import React, { useState } from 'react';
import { Search, BookOpen, Activity, Heart, PieChart } from 'lucide-react';
const LearnPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  // Mock data for cancer information
  const categories = [{
    id: 'all',
    name: 'All',
    icon: <BookOpen className="w-5 h-5" />
  }, {
    id: 'types',
    name: 'Cancer Types',
    icon: <Activity className="w-5 h-5" />
  }, {
    id: 'prevention',
    name: 'Prevention',
    icon: <Heart className="w-5 h-5" />
  }, {
    id: 'statistics',
    name: 'Statistics',
    icon: <PieChart className="w-5 h-5" />
  }];
  const articles = [{
    id: 1,
    title: 'Understanding Breast Cancer',
    excerpt: 'Learn about symptoms, risk factors, and treatment options for breast cancer.',
    category: 'types',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 2,
    title: 'Lung Cancer: Signs and Symptoms',
    excerpt: 'Recognize early warning signs of lung cancer and when to see a doctor.',
    category: 'types',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-7b21e5afae2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 3,
    title: 'Cancer Prevention Through Diet',
    excerpt: 'How your food choices can help reduce your risk of developing cancer.',
    category: 'prevention',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 4,
    title: 'The Importance of Regular Screenings',
    excerpt: 'Why cancer screenings matter and recommended schedules based on age and risk factors.',
    category: 'prevention',
    imageUrl: 'https://images.unsplash.com/photo-1576671414121-aa0c8959622e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 5,
    title: 'Global Cancer Statistics 2023',
    excerpt: 'Latest data on cancer incidence, mortality, and trends worldwide.',
    category: 'statistics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }];
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cancer Knowledge Hub</h1>
        <p className="text-gray-600">
          Learn about cancer types, prevention, and treatment options
        </p>
      </div>
      <div className="mb-6">
        <div className="relative">
          <input type="text" placeholder="Search for topics..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
        </div>
      </div>
      <div className="mb-6 flex overflow-x-auto pb-2 gap-2">
        {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${activeCategory === category.id ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <span className="mr-1.5">{category.icon}</span>
            {category.name}
          </button>)}
      </div>
      {filteredArticles.length > 0 ? <div className="grid md:grid-cols-2 gap-4">
          {filteredArticles.map(article => <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-40 overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <button className="text-purple-600 font-medium hover:text-purple-800 transition">
                  Read More
                </button>
              </div>
            </div>)}
        </div> : <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">
            No Results Found
          </h3>
          <p className="text-gray-500 mt-1">
            Try adjusting your search or category filter
          </p>
        </div>}
    </div>;
};
export default LearnPage;