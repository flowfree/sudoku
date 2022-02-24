import React from 'react'
import { useAppSelector, useAppDispatch } from './hooks';
import { 
  Level,
  generateSudoku, 
  reveal,
  undo,
  setLevel, 
  selectSuccess 
} from '../features/sudoku/sudokuSlice'

function ToolBar() {
  const level = useAppSelector(state => state.sudoku.level)
  const userInputCount = useAppSelector(state => state.sudoku.history.length)
  const success = useAppSelector(selectSuccess)
  const dispatch = useAppDispatch()

  const levels = [
    Level.Practice, 
    Level.Easy,
    Level.Medium,
    Level.Hard
  ]

  function handleLevelChange(e: React.MouseEvent, level: Level) {
    e.preventDefault()
    dispatch(setLevel(level))
    dispatch(generateSudoku())
  }

  function handleNewGame(e: React.MouseEvent) {
    e.preventDefault()
    dispatch(generateSudoku())
  }

  const buttons = (
    <div>
      <button 
        className="btn btn-sm btn-outline-primary shadow-none float-end"
        onClick={e => dispatch(undo())}
        disabled={userInputCount === 0}
      >
        Undo
      </button>
      <button 
        className="btn btn-sm btn-outline-primary shadow-none float-end me-2"
        onClick={e => dispatch(reveal())}
      >
        Reveal
      </button>
    </div>
  )

  return (
    <div className="row">
      <div className="col-6 mt-2 mb-3">
        <div className="btn-group dropend">
          <button 
            type="button" 
            className="btn btn-sm btn-primary shadow-none"
            onClick={handleNewGame}
          >
            New Game
            <span className="badge bg-warning text-dark ms-2">{level}</span>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split shadow-none" 
            data-bs-toggle="dropdown" 
            data-testid="selectLevel"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu" data-testid="level-dialog">
            <li>
              <h6 className="dropdown-header">Choose level</h6>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {levels.map((item, index) => (
              <li key={index}>
                <a 
                  href="/"
                  className="dropdown-item" 
                  onClick={e => handleLevelChange(e, item)}
                >
                  {item + (item === level ? ' ✔️' : '')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-6 mt-2">
        {success ? (<p className="float-end mt-1">👏 👏 👏 You got it!</p>) : buttons} 
      </div>
    </div>
  )
}

export default ToolBar
