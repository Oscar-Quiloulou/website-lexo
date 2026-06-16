// /src/core/utils.js

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function uid() {
  return Math.random().toString(36).slice(2);
}

export function now() {
  return Date.now();
}

export function days(n) {
  return n * 24 * 60 * 60 * 1000;
}
