import type { Session } from "@/types/session";

interface SessionsResponse {
  data: Session[];
  total: number;
}

interface SessionResponse {
  data: Session;
}

interface ErrorResponse {
  error?: string;
}

interface GetSessionsOptions {
  student?: string;
  from?: string;
  to?: string;
}

function buildSessionsQuery(options: GetSessionsOptions = {}) {
  const searchParams = new URLSearchParams();

  if (options.student) {
    searchParams.set("student", options.student);
  }

  if (options.from) {
    searchParams.set("from", options.from);
  }

  if (options.to) {
    searchParams.set("to", options.to);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const json = (await response.json()) as T | ErrorResponse;

  if (!response.ok) {
    const message =
      json && typeof json === "object" && "error" in json && typeof json.error === "string"
        ? json.error
        : "Something went wrong while fetching data.";

    throw new Error(message);
  }

  return json as T;
}

export async function getSessions(options: GetSessionsOptions = {}) {
  const query = buildSessionsQuery(options);
  const response = await fetch(`/api/sessions${query}`, {
    method: "GET",
    cache: "no-store",
  });

  return parseJsonResponse<SessionsResponse>(response);
}

export async function getSession(id: string) {
  const response = await fetch(`/api/sessions/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  return parseJsonResponse<SessionResponse>(response);
}
