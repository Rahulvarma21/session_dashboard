import type { Session } from "@/types/session";
import { SessionCard } from "@/components/sessions/SessionCard";

interface SessionListProps {
  sessions: Session[];
}

export function SessionList({ sessions }: SessionListProps) {
  return (
    <section className="space-y-4">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </section>
  );
}
