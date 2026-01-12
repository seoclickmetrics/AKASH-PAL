
import { ContentStatus, ContentType, BlogPost, TopicCluster } from './types';

export const MOCK_CLUSTERS: TopicCluster[] = [
  { id: '1', name: 'Technical SEO', description: 'Core technical foundations' },
  { id: '2', name: 'Content Marketing', description: 'Strategies for content growth' },
  { id: '3', name: 'Backlink Building', description: 'Off-page SEO tactics' },
];

export const MOCK_POSTS: BlogPost[] = [
  {
    id: 'b1',
    url: 'https://example.com/blog/core-web-vitals-guide',
    title: 'Complete Guide to Core Web Vitals',
    primaryKeyword: 'core web vitals guide',
    secondaryKeywords: ['lcp optimization', 'cls fix', 'fid metrics'],
    topicClusterId: '1',
    contentType: ContentType.GUIDE,
    status: ContentStatus.PUBLISHED,
    publishDate: '2023-10-15',
    lastUpdatedDate: '2024-01-20',
    seoNotes: 'Focus on mobile speed.',
    incomingLinks: ['b2'],
    outgoingLinks: ['b3']
  },
  {
    id: 'b2',
    url: 'https://example.com/blog/speed-tools-list',
    title: '10 Best Speed Testing Tools',
    primaryKeyword: 'speed testing tools',
    secondaryKeywords: ['pagespeed insights', 'gtmetrix'],
    topicClusterId: '1',
    contentType: ContentType.LISTICLE,
    status: ContentStatus.PUBLISHED,
    publishDate: '2023-11-01',
    lastUpdatedDate: '2023-11-01',
    seoNotes: 'Check affiliate links.',
    incomingLinks: [],
    outgoingLinks: ['b1']
  },
  {
    id: 'b3',
    url: 'https://example.com/blog/server-side-rendering-seo',
    title: 'How SSR Impacts SEO',
    primaryKeyword: 'ssr seo benefits',
    secondaryKeywords: ['client side vs server side'],
    topicClusterId: '1',
    contentType: ContentType.HOW_TO,
    status: ContentStatus.WRITING,
    seoNotes: 'Need developer interview.',
    incomingLinks: ['b1'],
    outgoingLinks: []
  },
  {
    id: 'b4',
    url: '',
    title: 'Upcoming Link Building Trends 2025',
    primaryKeyword: 'link building 2025',
    secondaryKeywords: ['digital pr', 'ai outreach'],
    topicClusterId: '3',
    contentType: ContentType.GUIDE,
    status: ContentStatus.PLANNED,
    publishDate: '2025-01-01',
    seoNotes: 'Seasonal post.',
    incomingLinks: [],
    outgoingLinks: []
  }
];
