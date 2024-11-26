//@ts-nocheck

import { Activity, Priority } from "@/types/type";

export const activities: Activity[] = [
  {
    id: "activity1",
    title: "Monthly Shopping List",
    items: [
      {
        id: "item1",
        activityId: "activity1",
        name: "Eggs",
        isCompleted: false,
        priority: Priority.MEDIUM,
        created_at: "2024-11-01T10:00:00Z",
        updated_at: "2024-11-01T10:00:00Z",
      },
      {
        id: "item2",
        activityId: "activity1",
        name: "Chicken",
        isCompleted: true,
        priority: Priority.HIGH,
        created_at: "2024-11-01T10:15:00Z",
        updated_at: "2024-11-01T10:15:00Z",
      },
    ],
    created_at: "2024-11-01T09:00:00Z",
    updated_at: "2024-11-01T09:00:00Z",
  },
  {
    id: "activity2",
    title: "Weekly To-Do List",
    items: [
      {
        id: "item3",
        activityId: "activity2",
        name: "Laundry",
        isCompleted: false,
        priority: Priority.LOW,
        created_at: "2024-11-02T08:00:00Z",
        updated_at: "2024-11-02T08:00:00Z",
      },
      {
        id: "item4",
        activityId: "activity2",
        name: "Grocery Shopping",
        isCompleted: true,
        priority: Priority.MEDIUM,
        created_at: "2024-11-02T08:30:00Z",
        updated_at: "2024-11-02T08:30:00Z",
      },
    ],
    created_at: "2024-11-02T07:00:00Z",
    updated_at: "2024-11-02T07:00:00Z",
  },
];
