import Sudoku from './features/sudoku/Sudoku'
import LevelSelector from './features/sudoku/LevelSelector'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pt-2">
          <LevelSelector />
          <Sudoku />
        </div>
      </div>

    </div>
  )
}

export default App
