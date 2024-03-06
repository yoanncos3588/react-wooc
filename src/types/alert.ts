export const alertLevels = ["success", "danger", "warning", "info"] as const;
export type AlertLevels = (typeof alertLevels)[number];
