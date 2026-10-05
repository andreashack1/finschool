import type { ReadyLesson } from '../../types/learning';
import { isAnswerScreen } from '../progress';
import { AccountError } from './errors';
export function validateLessonEvidence(lesson:ReadyLesson,evidence:readonly {screenId:string;selectedOptionId:string}[],complete=true) {
  const questions=lesson.screens.filter(isAnswerScreen);const answers=new Map(evidence.map(a=>[a.screenId,a.selectedOptionId]));
  if(answers.size!==evidence.length || (complete && evidence.length!==questions.length))throw new AccountError('INVALID_OPERATION');
  for(const answer of evidence) {const screen=questions.find(q=>q.id===answer.screenId);if(!screen)throw new AccountError('INVALID_OPERATION');const choices=screen.type==='adevarat_fals'?['true','false']:screen.options.map(o=>o.id);if(!choices.includes(answer.selectedOptionId))throw new AccountError('INVALID_OPERATION');}
}
