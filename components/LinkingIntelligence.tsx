
import React, { useMemo } from 'react';
import { BlogPost, ContentStatus } from '../types';
import { Link2, Unlink, ArrowRightLeft, Target, PlusCircle } from 'lucide-react';

interface LinkingIntelligenceProps {
  posts: BlogPost[];
}

export const LinkingIntelligence: React.FC<LinkingIntelligenceProps> = ({ posts }) => {
  const publishedPosts = useMemo(() => posts.filter(p => p.status === ContentStatus.PUBLISHED), [posts]);
  const orphanPosts = useMemo(() => publishedPosts.filter(p => p.incomingLinks.length === 0), [publishedPosts]);
  
  // Simulated suggestion logic
  const suggestions = useMemo(() => {
    return publishedPosts.map(post => {
      // Find other posts in the same cluster that don't link to this one
      const potentialSource = publishedPosts.filter(p => 
        p.id !== post.id && 
        p.topicClusterId === post.topicClusterId &&
        !post.incomingLinks.includes(p.id)
      );
      
      return {
        target: post,
        suggestedSources: potentialSource.slice(0, 2)
      };
    }).filter(s => s.suggestedSources.length > 0);
  }, [publishedPosts]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Unlink className="w-5 h-5 text-red-500" />
            Orphan Pages ({orphanPosts.length})
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            These published pages have no incoming internal links, which hurts their SEO performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orphanPosts.map(post => (
            <div key={post.id} className="p-4 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm font-semibold text-slate-900 mb-1">{post.title}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Action Required</span>
                <button className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
                  Find links <ArrowRightLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
          {orphanPosts.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
              Zero orphan pages found. Excellent work!
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-500" />
            Smart Linking Suggestions
          </h3>
          <div className="space-y-4">
            {suggestions.slice(0, 5).map(s => (
              <div key={s.target.id} className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded text-blue-600 mt-1">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">Target Page</p>
                    <p className="text-sm font-semibold text-slate-900">{s.target.title}</p>
                  </div>
                </div>
                
                <div className="pl-11 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Suggested Sources</p>
                  {s.suggestedSources.map(source => (
                    <div key={source.id} className="flex items-center justify-between p-2 bg-white rounded border border-slate-200 text-xs">
                      <span className="text-slate-700 truncate mr-4">{source.title}</span>
                      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold whitespace-nowrap">
                        <PlusCircle className="w-3 h-3" /> Add Link
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Link Profile Analysis</h3>
          <div className="space-y-6">
            <div className="flex justify-around py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {posts.reduce((acc, p) => acc + p.outgoingLinks.length, 0)}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Total Internal Links</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {(posts.reduce((acc, p) => acc + p.outgoingLinks.length, 0) / Math.max(posts.length, 1)).toFixed(1)}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Links Per Post</p>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <h4 className="text-sm font-bold text-indigo-900 mb-2">Pro Tip: Anchor Text Optimization</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">
                When adding internal links, try using your target primary keywords as anchor text. 
                Our AI suggests using <span className="font-bold underline">"{posts[0]?.primaryKeyword}"</span> 
                when linking to your top-performing guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
