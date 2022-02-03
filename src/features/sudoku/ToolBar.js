import { useSelector, useDispatch } from 'react-redux'
import { setLevel, generateSudoku, selectSuccess } from './sudokuSlice'

function ToolBar() {
  const level = useSelector(state => state.sudoku.level)
  const success = useSelector(selectSuccess)
  const dispatch = useDispatch()

  function handleLevelChange(e, level) {
    e.preventDefault()
    dispatch(setLevel(level))
    dispatch(generateSudoku())
  }

  function handleNewGame(e) {
    e.preventDefault()
    dispatch(generateSudoku())
  }

  return (
    <div className="row">
      <div className="col-6 mt-2">
        {success && <p>Good job 👏 👏 👏</p>} 
      </div>
      <div className="col-6 mt-2 mb-3">
        <div className="btn-group float-end">
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
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <h6 className="dropdown-header">Choose level</h6>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="/"
                onClick={e => handleLevelChange(e, 'practice')}
              >
                Practice
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="/"
                onClick={e => handleLevelChange(e, 'easy')}
              >
                Easy
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="/"
                onClick={e => handleLevelChange(e, 'medium')}
              >
                Medium
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="/"
                onClick={e => handleLevelChange(e, 'hard')}
              >
                Hard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ToolBar
