export type ActivityColor = 'green' | 'blue' | 'orange' | 'yellow';
export type ActivityCategory = 'today' | 'yesterday' | 'this_week' | 'earlier';

export interface ActivityItem {
  id: string;
  actorName: string;
  action: string;
  targetName?: string;
  points?: number;
  timeAgo: string;
  color: ActivityColor;
  category: ActivityCategory;
}
