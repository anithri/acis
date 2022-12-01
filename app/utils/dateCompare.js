const ONE_DAY_MS = 1000 * 60 * 60 * 24;
export const dateCompare = (orig) => {
  const n = new Date();
  const d = new Date(orig);
  const diffDays = (n - d) / ONE_DAY_MS;

  if (diffDays <= 1) {
    return "bg-cyan-200";
  } else if (diffDays <= 30) {
    return "bg-emerald-200";
  } else if (diffDays <= 365) {
    return "bg-amber-200";
  } else {
    return "bg-red-200";
  }
};
