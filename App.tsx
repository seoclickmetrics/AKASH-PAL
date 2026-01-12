
import React, { useState, useMemo } from 'react';
import { BlogPost, TopicCluster, ContentStatus, ContentType } from './types';
import { MOCK_POSTS, MOCK_CLUSTERS } from './constants';
import { Inventory } from './components/Inventory';
import { Dashboard } from './components/Dashboard';
import { ClusterManager } from './components/ClusterManager';
import { LinkingIntelligence } from './components/LinkingIntelligence';
import { 
  LayoutDashboard, 
  Database, 
  Layers, 
  Calendar, 
  Link2, 
  Bell, 
  Search,
  Settings,
  User,
  Zap,
  Menu,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'clusters' | 'calendar' | 'linking'>('dashboard');
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [clusters] = useState<TopicCluster[]>(MOCK_CLUSTERS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAddPost = (postData: Partial<BlogPost>) => {
    const newPost: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: postData.title || 'New Blog Post',
      url: postData.url || '',
      primaryKeyword: postData.primaryKeyword || '',
      secondaryKeywords: [],
      topicClusterId: postData.topicClusterId || clusters[0]?.id || '',
      contentType: ContentType.GUIDE,
      status: ContentStatus.PLANNED,
      seoNotes: '',
      incomingLinks: [],
      outgoingLinks: [],
      ...postData
    };
    setPosts([newPost, ...posts]);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Database },
    { id: 'clusters', label: 'Topic Clusters', icon: Layers },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'linking', label: 'Linking Intelligence', icon: Link2 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-900 italic">clickBaaz</span>}
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
              {isSidebarOpen && <span>{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg">
            <Settings className="w-5 h-5 text-slate-400" />
            {isSidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <div className="pt-2 px-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User className="w-5 h-5" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">User</span>
                <span className="text-xs text-slate-500">Free Plan</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2 text-slate-500 ${isSidebarOpen ? 'hidden' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-800">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">
              <Zap className="w-4 h-4 fill-current" />
              clickBaaz AI
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === 'dashboard' && <Dashboard posts={posts} />}
            {activeTab === 'inventory' && <Inventory posts={posts} clusters={clusters} onAddPost={handleAddPost} />}
            {activeTab === 'clusters' && <ClusterManager posts={posts} clusters={clusters} />}
            {activeTab === 'linking' && <LinkingIntelligence posts={posts} />}
            
            {(activeTab === 'calendar') && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-md">
                  <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Coming Soon: Content Calendar</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    We're building a visual, drag-and-drop calendar for you to plan your publishing schedule in clickBaaz.
                  </p>
                  <button className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                    Notify Me
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
