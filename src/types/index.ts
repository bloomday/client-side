export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type?: string;
  hosts: string[];
  slug: string;
  eventUrl: string;
  qrCode: string;
  allowCrowdfunding: boolean;
  invitees: string[];
  ivImage: string | null;
  contributions: any[];
  __v: number;
  totalAmount?: number;
  contributors?: number;
  score?: number;
  views?: number;
  gallery?: {
    uploadedBy: string;
    url: string;
    uploadedAt: string;
  }[];
} 