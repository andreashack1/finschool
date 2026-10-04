import { gamificationConfig, GamificationConfigSchema } from "./gamification-config";
export const levels = gamificationConfig.levels;
export const LevelSchema = GamificationConfigSchema.shape.levels.element;
export const validateLevels = (value: unknown) => GamificationConfigSchema.parse({ ...gamificationConfig, levels: value }).levels;
