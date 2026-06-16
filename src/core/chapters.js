// /src/core/chapters.js

export async function loadChaptersFor(level, subject) {
  const res = await fetch("/src/data/chapters.json");
  const data = await res.json();

  return data[level]?.[subject] || [];
}
