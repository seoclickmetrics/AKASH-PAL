
import React, { useState } from 'react';
import { BlogPost, ContentStatus, ContentType, TopicCluster } from '../types';
import { Badge } from './ui/Badge';
import { Search, Plus, Filter, MoreVertical, ExternalLink, Calendar } from 'lucide-react';

interface InventoryProps {
  posts: BlogPost[];
  clusters: TopicCluster[];
  onAddPost: (post: Partial<BlogPost>) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ posts, clusters, onAddPost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by title or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5">
            <Filter className="w-4 h-4 text-slate-400 mr-2" />
            <select 
              className="bg-transparent text-sm focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              {Object.values(ContentStatus).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => onAddPost({})}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Blog</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Blog Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cluster</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 mb-0.5">{post.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-blue-600 font-medium">#{post.primaryKeyword}</span>
                        {post.url && (
                          <a href={post.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded">
                      {clusters.find(c => c.id === post.topicClusterId)?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={post.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Pub: {post.publishDate || 'TBD'}</span>
                      </div>
                      <span className="mt-0.5 opacity-60 italic">Updated: {post.lastUpdatedDate || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No blogs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
