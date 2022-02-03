import { useSelector, useDispatch } from 'react-redux'
import { 
  generateSudoku, 
  resetSudoku,
  setLevel, 
  selectSuccess 
} from '../features/sudoku/sudokuSlice'

const reloadIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
  </svg>
)

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
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <h6 className="dropdown-header">Choose level</h6>
            </li>
            <li>
              <a 
                href="/"
                className="dropdown-item" 
                onClick={e => handleLevelChange(e, 'practice')}
              >
                Practice
              </a>
            </li>
            <li>
              <a 
                href="/"
                className="dropdown-item" 
                onClick={e => handleLevelChange(e, 'easy')}
              >
                Easy
              </a>
            </li>
            <li>
              <a 
                href="/"
                className="dropdown-item" 
                onClick={e => handleLevelChange(e, 'medium')}
              >
                Medium
              </a>
            </li>
            <li>
              <a 
                href="/"
                className="dropdown-item" 
                onClick={e => handleLevelChange(e, 'hard')}
              >
                Hard
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-6 mt-2">
        {success ? (
          <p className="float-end mt-1">Good job 👏 👏 👏</p>
        ) : (
          <button 
            className="btn btn-sm btn-outline-primary shadow-none float-end"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Clear all filled in numbers"
            onClick={e => dispatch(resetSudoku())}
          >
            {reloadIcon}
          </button>
        )} 
      </div>
    </div>
  )
}

export default ToolBar
