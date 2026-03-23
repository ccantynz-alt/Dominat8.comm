export interface AutoPilotTask {
  id: string;
  projectId: string;
  type: "seo" | "performance" | "accessibility" | "content";
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
  createdAt: string;
  completedAt?: string;
}

export interface BusinessKit {
  id: string;
  name: string;
  category: string;
  description: string;
  includes: string[];
  estimatedTime: string;
}

export interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
