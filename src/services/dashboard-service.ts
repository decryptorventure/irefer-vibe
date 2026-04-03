import { ReactNode } from "react";

export interface DashboardStats {
  candidatesReferred: { total: number; trend: number; trendText: string };
  candidatesProcessing: { total: number; trend: number; trendText: string };
  candidatesOnboarded: { total: number; trend: number; trendText: string };
  points: { total: number; trend: number; trendText: string };
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  department: string;
  points: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface Activity {
  text: ReactNode;
  points: string | null;
  time: string;
  color: string;
  category: "all" | "today" | "yesterday" | "this_week";
}

export interface HotJob {
  title: string;
  department: string;
  reward: string;
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const mockStats: DashboardStats = {
  candidatesReferred: { total: 12, trend: 3, trendText: "+3 so với tháng trước" },
  candidatesProcessing: { total: 4, trend: 2, trendText: "+2 tuần này" },
  candidatesOnboarded: { total: 3, trend: 1, trendText: "+1 tháng này" },
  points: { total: 65, trend: 15, trendText: "+15 tuần này" }
};

export const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: "Hoàng Minh", department: "Phòng CNTT", points: 150, avatar: "HM" },
  { rank: 2, name: "Thùy Ngân", department: "Phòng Marketing", points: 120, avatar: "TN" },
  { rank: 3, name: "Phúc Long", department: "Phòng Kinh Doanh", points: 95, avatar: "PL" },
  { rank: 4, name: "Nguyễn Thành", department: "Phòng Kinh Doanh", points: 65, avatar: "NT", isCurrentUser: true },
  { rank: 5, name: "Bảo Trân", department: "Phòng HR", points: 60, avatar: "BT" },
];

export const mockHotJobs: HotJob[] = [
  { title: "Senior Backend Engineer", department: "Phòng CNTT · Hà Nội", reward: "+135 điểm" },
  { title: "Product Manager", department: "Phòng Sản Phẩm · TP.HCM", reward: "+135 điểm" },
  { title: "UI/UX Designer", department: "Phòng Thiết Kế · Remote", reward: "+135 điểm" },
  { title: "Data Scientist", department: "Phòng AI · Hà Nội", reward: "+135 điểm" },
];

export async function getDashboardStats(): Promise<DashboardStats> {
  if (USE_MOCK) return Promise.resolve(mockStats);
  throw new Error("No API implemented");
}

export async function getLeaderboard(): Promise<LeaderboardUser[]> {
  if (USE_MOCK) return Promise.resolve(mockLeaderboard);
  throw new Error("No API implemented");
}

export async function getHotJobs(): Promise<HotJob[]> {
  if (USE_MOCK) return Promise.resolve(mockHotJobs);
  throw new Error("No API implemented");
}
