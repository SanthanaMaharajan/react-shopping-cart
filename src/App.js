import './App.css';

//Components
import Header from './Components/Header';
import Products from './Components/Products';

//Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewProduct from './Components/ViewProduct';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/viewproduct' element={<ViewProduct/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
