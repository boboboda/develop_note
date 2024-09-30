import { WebSocketStatus } from '@hocuspocus/provider'
import { memo } from 'react'
import { EditorUser } from './types'
import Tooltip from '@/components/ui/ToolTip'

export type EditorInfoProps = {
  characters: number
  words: number
  user: EditorUser
}

export const EditorInfo = memo(({characters, user, words }: EditorInfoProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col justify-center pr-4 mr-4 text-right border-r border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {words} {words === 1 ? '단어' : '단어'}
        </div>
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {characters} {characters === 1 ? '자' : '자'}
        </div>
      </div>
      <div className="flex items-center gap-2 mr-2">
        
       
      </div>
      {(
        <div className="flex flex-row items-center">
          <div className="relative flex flex-row items-center ml-3">
            {
              <div key={user.clientId} className="-ml-3">
              <Tooltip title={user.clientId}>
                {user.name}
              </Tooltip>
            </div>
            }
          </div>
        </div>
      )}
    </div>
  )
})

EditorInfo.displayName = 'EditorInfo'
