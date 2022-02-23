import Sudoku from './features/sudoku/Sudoku'
import ToolBar from './app/ToolBar'

function App() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-sm-12 col-md-5 pt-2">
          <ToolBar />
          <Sudoku />
        </div>
      </div>

    </div>
  )
}

export default App
