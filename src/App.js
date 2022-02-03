import Sudoku from './features/sudoku/Sudoku'
import ToolBar from './features/sudoku/ToolBar'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pt-2">
          <ToolBar />
          <Sudoku />
        </div>
      </div>

    </div>
  )
}

export default App
