import { z } from 'zod';
import { createClientUuid } from '../uuid';
import { getFirstCurriculumLesson } from './first-lesson';
import { completeLessonSession,createEmptyProgress } from '../progress';
import { validateLessonEvidence } from './evidence';
export const onboardingKey='finly-onboarding-progress:v1';
export const TrialSchema=z.object({version:z.literal(1),lessonId:z.string(),operationId:z.uuid(),startedAt:z.iso.datetime(),completedAt:z.iso.datetime().nullable(),screenIndex:z.number().int().nonnegative(),shuffleSeed:z.uuid(),answers:z.array(z.object({screenId:z.string(),selectedOptionId:z.string()}).strict()),completed:z.boolean()}).strict();
export type TrialProgress=z.infer<typeof TrialSchema>;
let memoryTrial:TrialProgress|null=null;
export function readTrial():TrialProgress|null {
  if(typeof localStorage==='undefined')return null;
  let input:unknown;try{const raw=localStorage.getItem(onboardingKey);input=raw?JSON.parse(raw):memoryTrial;}catch{input=memoryTrial;}
  try{const parsed=TrialSchema.safeParse(input);const lesson=getFirstCurriculumLesson();if(!parsed.success || parsed.data.lessonId!==lesson.id || parsed.data.screenIndex>=lesson.screens.length || (!parsed.data.completed && parsed.data.screenIndex===lesson.screens.length-1) || (parsed.data.completed && !parsed.data.completedAt))return null;validateLessonEvidence(lesson,parsed.data.answers,parsed.data.completed);return parsed.data;}catch{return null;}
}
export function saveTrial(trial:TrialProgress) {memoryTrial=trial;if(typeof localStorage==='undefined')return;try{localStorage.setItem(onboardingKey,JSON.stringify(trial));}catch{/* Only the temporary first lesson can continue in memory without storage. */}}
export function startTrial() {const existing=readTrial();if(existing)return existing;const lesson=getFirstCurriculumLesson();if(!lesson)throw new Error('Curriculum indisponibil');const trial:TrialProgress={version:1,lessonId:lesson.id,operationId:createClientUuid(),startedAt:new Date().toISOString(),completedAt:null,screenIndex:0,shuffleSeed:createClientUuid(),answers:[],completed:false};saveTrial(trial);return trial;}
export function previewTrial(trial:TrialProgress) {return completeLessonSession(createEmptyProgress(new Date(trial.startedAt)),{lessonId:trial.lessonId,sessionId:trial.operationId,answers:trial.answers},new Date(trial.completedAt ?? trial.startedAt));}
export function clearTrial() {memoryTrial=null;if(typeof localStorage!=='undefined')try{localStorage.removeItem(onboardingKey);}catch{}}
