import type { ExerciseDayData } from '../../types/exercise';
import { LineHorizontal } from '../../components/Line/LineHorizontal';
import MarkdownRender from '../../utilities/MarkdownRender';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
interface ExerciseDayProps {
  exerciseDay: ExerciseDayData
}

export function ExerciseDay({ exerciseDay }: ExerciseDayProps) {

  const [isColapsed, setIsColapsed] = useState(true);

  return (
    <div className='flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl'>
      <div className='flex flex-row justify-between items-center'>
        <span className='font-bold text:base sm:text-lg text-text-500'>
          DÍA {exerciseDay.day}
        </span>
        <Button id='btnColap' type='button' width='fit' handleClick={() => setIsColapsed(!isColapsed)} >
          {isColapsed ? "Mostrar" : "Ocultar"}
        </Button>
      </div>
      <div className='flex flex-col'>
        <div className='flex'>
          <span className='text-center text-xl sm:text-2xl font-semibold'>
            {exerciseDay.title.toUpperCase()}
          </span>
        </div>
        {!isColapsed ?
          <>
            <LineHorizontal />
            <div className='hidden sm:block'>
              <MarkdownRender text={exerciseDay.content} />
            </div>
            <div className='sm:hidden block p-3'>
              <MarkdownRender text={exerciseDay.content} columnsLayout={false} />
            </div>
          </> : ""
        }
      </div>
    </div>
  )
}