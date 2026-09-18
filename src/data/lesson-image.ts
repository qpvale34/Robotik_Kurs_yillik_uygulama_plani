export function getLessonImageSrc(week: number, hour: 1 | 2): string {
  return `${import.meta.env.BASE_URL}robotik_ders_aciklamali_resimler/hafta-${String(week).padStart(2, "0")}-saat-${String(hour).padStart(2, "0")}.jpg`;
}
