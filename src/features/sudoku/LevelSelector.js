import { useSelector, useDispatch } from 'react-redux'
import { setLevel, generateSudoku } from './sudokuSlice'

function LevelSelector() {
  const level = useSelector(state => state.sudoku.level)
  const dispatch = useDispatch()

  function handleLevelChange(e) {
    dispatch(setLevel(e.target.value))
  }

  function handleNewGame(e) {
    e.preventDefault()
    dispatch(generateSudoku())
  }

  return (
    <form className="row row-cols-sm-auto g-2 align-items-center justify-content-center my-3">
      <div className="col-12">
        <label htmlFor="level">Level</label>
      </div>
      <div className="col-12">
        <select 
          id="level"
          className="form-select shadow-none" 
          defaultValue={level}
          onChange={handleLevelChange}
        >
          <option value="veryEasy">Very easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="col-12">
        <button
          className="btn btn-outline-primary shadow-none"
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>
    </form>
  )
}

export default LevelSelector
