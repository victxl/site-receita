import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importe o CSS do Bootstrap
import HomePage from "./pages/HomePage"; // Importe o componente HomePage como padrão
import Header from "./components/Header"; // Importe o componente de cabeçalho
import BuscarPorNome from "./pages/BuscarPorNome"; // Importe o componente BuscarPorNome como padrão
import BuscarPorPrimeiraLetra from "./pages/BuscarPorPrimeiraLetra"; // Importe o componente BuscarPorPrimeiraLetra como padrão
import BuscarPorIngredientes from "./pages/BuscarPorIngredientes";
import RecipeDetails from "./components/RecipeDetails"; // Certifique-se de que o caminho esteja correto
import Footer from "./components/Footer"; // Importe o componente Footer




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
        <Footer />
      </div>
    </Router>
  );
}

export default App;