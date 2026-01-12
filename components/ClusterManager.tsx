
import React from 'react';
import { BlogPost, TopicCluster, ContentStatus } from '../types';
import { Layers, ChevronRight, Activity, Zap } from 'lucide-react';

interface ClusterManagerProps {
  posts: BlogPost[];
  clusters: TopicCluster[];
}

export const ClusterManager: React.FC<ClusterManagerProps> = ({ posts, clusters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clusters.map(cluster => {
        const clusterPosts = posts.filter(p => p.topicClusterId === cluster.id);
        const publishedCount = clusterPosts.filter(p => p.status === ContentStatus.PUBLISHED).length;
        const progress = (publishedCount / Math.max(clusterPosts.length, 1)) * 100;

        return (
          <div key={cluster.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-indigo-100 rounded text-indigo-600">
                  <Layers className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  progress === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {progress === 100 ? 'Complete' : 'In Progress'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{cluster.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{cluster.description}</p>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
                  <span>Cluster Health</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Top Pages</p>
                {clusterPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="flex items-center justify-between text-sm py-1">
                    <span className="text-slate-700 truncate flex-1 mr-2">{post.title}</span>
                    <Activity className={`w-3 h-3 ${post.status === ContentStatus.PUBLISHED ? 'text-green-500' : 'text-slate-300'}`} />
                  </div>
                ))}
                {clusterPosts.length > 3 && (
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center mt-2">
                    View all {clusterPosts.length} posts <ChevronRight className="w-3 h-3" />
                  </button>
                )}
                {clusterPosts.length === 0 && (
                  <div className="py-4 text-center text-slate-400 text-xs italic">
                    No posts in this cluster yet.
                  </div>
                )}
              </div>

              <button className="mt-6 w-full flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors">
                <Zap className="w-3 h-3" /> AI Plan Next Post
              </button>
            </div>
          </div>
        );
      })}
      
      {/* Create New Cluster UI */}
      <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-500">
        <div className="p-3 bg-slate-100 rounded-full mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <span className="font-bold text-sm">Create Topic Cluster</span>
        <span className="text-xs mt-1">Build your topical authority</span>
      </button>
    </div>
  );
};
