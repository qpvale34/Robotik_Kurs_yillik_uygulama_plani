export function getLessonImageSrc(week: number, hour: 1 | 2): string | null {
  if (week < 1 || week > 26) return null;
  return `${import.meta.env.BASE_URL}robotik_ders_aciklamali_resimler/hafta-${String(week).padStart(2, "0")}-saat-${String(hour).padStart(2, "0")}.jpg`;
}
