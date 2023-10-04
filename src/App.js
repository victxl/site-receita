import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import HomePage from "./pages/HomePage"; 
import Header from "./components/Header"; 
import BuscarPorNome from "./pages/BuscarPorNome"; 
import BuscarPorPrimeiraLetra from "./pages/BuscarPorPrimeiraLetra"; 
import BuscarPorIngredientes from "./pages/BuscarPorIngredientes";
import RecipeDetails from "./components/RecipeDetails"; 
import Footer from "./components/Footer"; 





function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buscar-por-nome" element={<BuscarPorNome />} />
          <Route path="/buscar-por-primeira-letra" element={<BuscarPorPrimeiraLetra />} />
          <Route path="/buscar-por-ingredientes" element={<BuscarPorIngredientes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <HomePage />
        <Footer />
      </div>
    </Router>
  );
}

export default App;