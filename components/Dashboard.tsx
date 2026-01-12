
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BlogPost, ContentStatus } from '../types';
import { CheckCircle2, FileText, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface DashboardProps {
  posts: BlogPost[];
}

export const Dashboard: React.FC<DashboardProps> = ({ posts }) => {
  const statusCounts = posts.reduce((acc, post) => {
    acc[post.status] = (acc[post.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#10b981', '#3b82f6', '#94a3b8', '#f59e0b'];

  const orphanCount = posts.filter(p => p.incomingLinks.length === 0 && p.status === ContentStatus.PUBLISHED).length;
  const publishedCount = posts.filter(p => p.status === ContentStatus.PUBLISHED).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<CheckCircle2 className="text-green-500" />} label="Total Published" value={publishedCount} />
        <StatCard icon={<FileText className="text-blue-500" />} label="Currently Writing" value={statusCounts[ContentStatus.WRITING] || 0} />
        <StatCard icon={<AlertCircle className="text-amber-500" />} label="Update Required" value={statusCounts[ContentStatus.UPDATE_REQUIRED] || 0} />
        <StatCard icon={<LinkIcon className="text-red-400" />} label="Orphan Pages" value={orphanCount} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Content Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Internal Linking Health</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-600">Linking Coverage</span>
                <span className="text-sm font-bold text-slate-900">{Math.round(((posts.length - orphanCount) / posts.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${((posts.length - orphanCount) / posts.length) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-slate-500 mb-2">Recent Reminders</h4>
              <ul className="text-sm space-y-2">
                {posts.filter(p => p.status === ContentStatus.UPDATE_REQUIRED).slice(0, 3).map(p => (
                  <li key={p.id} className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Update due: {p.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
    <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);
