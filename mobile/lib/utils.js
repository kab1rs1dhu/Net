// lib/utils.js
export function formatDate(dateString) {
  // format date nicely
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}