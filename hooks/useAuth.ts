"use client";

import { useSyncExternalStore } from "react";
import {
  isAuthenticated as readIsAuthenticated,
  login,
  logout,
  subscribeToAuthChanges,
} from "@/lib/auth";

export function useAuth() {
  const isLoggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    readIsAuthenticated,
    () => false,
  );

  return {
    isLoggedIn,
    login,
    logout,
  };
}
