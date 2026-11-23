export function isLight() {
  return document.documentElement.classList.contains("light");
}

export function applyTheme(light) {
  document.documentElement.classList.toggle("light", light);
  try {
    localStorage.setItem("theme", light ? "light" : "dark");
  } catch (e) {}
}
