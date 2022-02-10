import { useSelector, useDispatch } from 'react-redux'
import { 
  generateSudoku, 
  reveal,
  undo,
  setLevel, 
  selectSuccess 
} from '../features/sudoku/sudokuSlice'

function ToolBar() {
  const level = useSelector(state => state.sudoku.level)
  const userInputCount = useSelector(state => state.sudoku.history.length)
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

  const levels = ['Practice', 'Easy', 'Medium', 'Hard']

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
              <hr className="dropdown-divider" />
            </li>
            {levels.map((level, index) => (
              <li key={index}>
                <a 
                  href="/"
                  className="dropdown-item" 
                  onClick={e => handleLevelChange(e, level)}
                >
                  {level}
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
