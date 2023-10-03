import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function BuscarPorNome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const { meals } = response.data;
      setRecipes(meals || []);
      setSearched(true);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <FloatingLabel
          controlId="floatingInput"
          label="Busca por Nome"
          className="mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}>
          <Form.Control type="text" />
        </FloatingLabel>


        <Button variant="warning" onClick={handleSearch}>Pesquisar</Button>
      </div>
      {searched && (
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 md-2" key={recipe.idMeal}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuscarPorNome;
