import { useSelector, useDispatch } from 'react-redux'
import { 
  generateSudoku, 
  setLevel, 
  selectSuccess 
} from '../features/sudoku/sudokuSlice'

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

  const buttons = (
    <div>
      <button 
        className="btn btn-sm btn-outline-primary shadow-none float-end"
      >
        Undo
      </button>
      <button 
        className="btn btn-sm btn-outline-primary shadow-none float-end me-2"
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
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <h6 className="dropdown-header">Choose level</h6>
            </li>
            <li><hr className="dropdown-divider" /></li>
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
        {success ? (<p className="float-end mt-1">Good job 👏 👏 👏</p>) : buttons} 
      </div>
    </div>
  )
}

export default ToolBar
