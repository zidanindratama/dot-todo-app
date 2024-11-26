export type Activity = {
  id: string;
  title: string;
  items: Item[];
  created_at: string;
  updated_at: string;
};

export type Item = {
  id: string;
  activityId: string;
  name: string;
  isCompleted: boolean;
  priority: Priority;
  created_at: string;
  updated_at: string;
};

export enum Priority {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}
