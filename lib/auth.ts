const AUTH_STORAGE_KEY = "session-dashboard-auth";
const AUTH_EVENT_NAME = "session-dashboard-auth-change";

function canUseStorage() {
  return typeof window !== "undefined";
}

function notifyAuthChange() {
  if (!canUseStorage()) {
    return;
  }

  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function isAuthenticated() {
  if (!canUseStorage()) {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function login() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
  notifyAuthChange();
}

export function logout() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuthChange();
}

export function subscribeToAuthChanges(callback: () => void) {
  if (!canUseStorage()) {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === AUTH_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(AUTH_EVENT_NAME, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(AUTH_EVENT_NAME, callback);
  };
}

export { AUTH_EVENT_NAME, AUTH_STORAGE_KEY };
