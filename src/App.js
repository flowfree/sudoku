import Sudoku from './features/sudoku/Sudoku'
import LevelSelector from './features/sudoku/LevelSelector'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div>
            <LevelSelector />
            <Sudoku />
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
