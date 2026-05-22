/** 格式化为 YYYY-MM-DD，用于列表与首页动态 */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
