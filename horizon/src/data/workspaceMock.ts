// ─────────────────────────────────────────────────────────────
//  src/data/workspaceMock.ts
//
//  Dashboard, Projects, Analytics ke liye fake data.
//  Yeh data MSW handlers use karenge response mein.
// ─────────────────────────────────────────────────────────────

import type { Project, Activity, AnalyticsStat } from "../types";

// ─── Projects Mock Data ───────────────────────────────────────
export const mockProjects: Project[] = [
  {
    id:          1,
    name:        "Horizon Dashboard",
    description: "Main admin dashboard UI with analytics and settings.",
    status:      "active",
    progress:    72,
    dueDate:     "2026-09-15",
    team:        ["Adarsh", "Priya", "Rahul"],
  },
  {
    id:          2,
    name:        "API Integration Layer",
    description: "Connect frontend with backend REST APIs using Axios.",
    status:      "active",
    progress:    45,
    dueDate:     "2026-10-01",
    team:        ["Adarsh", "Vikram"],
  },
  {
    id:          3,
    name:        "Design System v2",
    description: "Reusable component library with Tailwind CSS.",
    status:      "completed",
    progress:    100,
    dueDate:     "2026-07-30",
    team:        ["Priya", "Neha"],
  },
  {
    id:          4,
    name:        "Mobile Responsive Fix",
    description: "Fix layout issues on small screens.",
    status:      "on-hold",
    progress:    20,
    dueDate:     "2026-11-01",
    team:        ["Rahul"],
  },
];

// ─── Activity Feed Mock Data ──────────────────────────────────
export const mockActivities: Activity[] = [
  {
    id:        1,
    user:      "Adarsh Singh",
    action:    "updated",
    target:    "Horizon Dashboard",
    timestamp: "2026-08-04T10:30:00Z",
  },
  {
    id:        2,
    user:      "Priya Sharma",
    action:    "created",
    target:    "Design System v2",
    timestamp: "2026-08-04T09:15:00Z",
  },
  {
    id:        3,
    user:      "Rahul Verma",
    action:    "completed",
    target:    "Mobile Responsive Fix task #12",
    timestamp: "2026-08-03T18:45:00Z",
  },
  {
    id:        4,
    user:      "Vikram Nair",
    action:    "deleted",
    target:    "Old API endpoint docs",
    timestamp: "2026-08-03T14:00:00Z",
  },
  {
    id:        5,
    user:      "Neha Gupta",
    action:    "updated",
    target:    "Color tokens in Design System",
    timestamp: "2026-08-02T11:20:00Z",
  },
];

// ─── Analytics Stats Mock Data ────────────────────────────────
export const mockAnalyticsStats: AnalyticsStat[] = [
  { label: "Total Projects", value: "12",    change: "+3",    trend: "up"      },
  { label: "Active Users",   value: "284",   change: "+12%",  trend: "up"      },
  { label: "Tasks Done",     value: "1,048", change: "+8%",   trend: "up"      },
  { label: "Pending Issues", value: "23",    change: "-5",    trend: "down"    },
];
