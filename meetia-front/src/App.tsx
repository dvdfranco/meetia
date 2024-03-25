import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </div>
  )
}

export default App
