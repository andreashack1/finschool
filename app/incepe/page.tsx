import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
import { getFirstCurriculumLesson } from '../../src/lib/account/first-lesson';
import { LessonPlayer } from '../components/lesson-player';
export default async function Page(){if(await currentUser())redirect('/');const lesson=getFirstCurriculumLesson();return lesson?<LessonPlayer id={lesson.id} trial/>:<p>Pregătim prima lecție.</p>;}
