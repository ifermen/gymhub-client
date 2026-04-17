import type { ExerciseDayData } from '../../types/exercise';
import { LineVertical } from '../../components/Line/LineVertical';
import { LineHorizontal } from '../../components/Line/LineHorizontal';
import MarkdownRender from '../../utilities/MarkdownRender';
interface ExerciseDayProps {
  exerciseDay: ExerciseDayData
}

export function ExerciseDay({ exerciseDay }: ExerciseDayProps) {

  return (
    <div className='flex flex-col sm:flex-row w-full gap-1 border-2 border-background-200 rounded-xl p-3'>
      <div className='flex-col justify-center items-center w-1/3 bg-white rounded-lg p-3 hidden sm:flex'>
        <span className='text-4xl mx-3 font-bold'>
          Día {exerciseDay.day}
        </span>
        <LineHorizontal />
        <span className='text-center text-2xl mx-3 font-semibold'>
          {exerciseDay.title}
        </span>
      </div>
      <LineVertical style='hidden sm:flex' />
      <div className='flex sm:hidden gap-3 text-xl items-center'>
        <span className='font-bold'>
          {exerciseDay.day}
        </span>
        <span className='text-center'>
          {exerciseDay.title}
        </span>
      </div>
      <LineHorizontal style='sm:hidden flex' />
      <div className='w-2/3'>
        <MarkdownRender text={exerciseDay.content} />
      </div>
    </div>
  )
}