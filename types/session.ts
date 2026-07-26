export interface SessionMetricPoint {
  label: string;
  engagement: number;
  clarity: number;
  pacing: number;
}

export interface SessionSummary {
  engagement: number;
  clarity: number;
  pacing: number;
}

export interface Session {
  id: string;
  student: string;
  date: string;
  topic: string;
  durationMinutes: number;
  coach: string;
  notes: string;
  summary: SessionSummary;
  metrics: SessionMetricPoint[];
}