"use client";

import { useCallback, useEffect, useState } from "react";
import { SessionDetail } from "@/components/sessions/SessionDetail";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Loading } from "@/components/ui/Loading";
import { getSession } from "@/lib/api";
import type { Session } from "@/types/session";

interface SessionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SessionDetailPage({
  params,
}: SessionDetailPageProps) {
  const [sessionId, setSessionId] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void params.then(({ id }) => {
      setSessionId(id);
    });
  }, [params]);

  const loadSession = useCallback(async () => {
    if (!sessionId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await getSession(sessionId);
      setSession(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while loading this session.";

      setErrorMessage(message);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadSession();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadSession, sessionId]);

  return (
    <main className="min-h-screen px-6 py-10 bg-[#f7f5f0]">
      <div className="mx-auto max-w-6xl space-y-8">
        {isLoading ? (
          <Loading
            title="Loading session details"
            description="Fetching the selected coaching session."
          />
        ) : null}

        {!isLoading && errorMessage ? (
          <ErrorState description={errorMessage} onRetry={loadSession} />
        ) : null}

        {!isLoading && !errorMessage && !session ? (
          <EmptyState
            title="Session not found"
            description="The selected session could not be found."
          />
        ) : null}

        {!isLoading && !errorMessage && session ? (
          <SessionDetail session={session} />
        ) : null}
      </div>
    </main>
  );
}
