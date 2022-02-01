import Sudoku from './features/sudoku/Sudoku'
import LevelSelector from './features/sudoku/LevelSelector'

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
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
