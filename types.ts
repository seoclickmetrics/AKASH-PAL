
export enum ContentStatus {
  PLANNED = 'Planned',
  WRITING = 'Writing',
  PUBLISHED = 'Published',
  UPDATE_REQUIRED = 'Update Required'
}

export enum ContentType {
  GUIDE = 'Guide',
  LISTICLE = 'Listicle',
  HOW_TO = 'How-to'
}

export interface TopicCluster {
  id: string;
  name: string;
  parentTopicId?: string;
  description: string;
}

export interface BlogPost {
  id: string;
  url: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  topicClusterId: string;
  contentType: ContentType;
  status: ContentStatus;
  publishDate?: string;
  lastUpdatedDate?: string;
  seoNotes: string;
  incomingLinks: string[]; // IDs of other blogs linking here
  outgoingLinks: string[]; // IDs of other blogs this links to
}

export interface Reminder {
  id: string;
  blogId: string;
  type: 'update' | 'publish' | 'orphan' | 'inactive_cluster';
  message: string;
  dueDate: string;
  isRead: boolean;
}
