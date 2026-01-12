
import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost, TopicCluster } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async suggestContentIdeas(currentBlogs: BlogPost[], clusters: TopicCluster[]) {
    const prompt = `
      Based on the following existing blog posts and topic clusters, suggest 3 new blog post ideas to fill content gaps and build topical authority.
      
      Clusters: ${clusters.map(c => c.name).join(', ')}
      Existing Blogs: ${currentBlogs.map(b => b.title).join(', ')}
      
      For each suggestion, provide:
      1. Title
      2. Suggested Primary Keyword
      3. Topic Cluster (must be one from the list)
      4. Search Intent
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                primaryKeyword: { type: Type.STRING },
                topicCluster: { type: Type.STRING },
                intent: { type: Type.STRING }
              },
              required: ['title', 'primaryKeyword', 'topicCluster', 'intent']
            }
          }
        }
      });

      if (!response.text) return [];
      return JSON.parse(response.text.trim());
    } catch (error) {
      console.error("Error generating suggestions:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();
