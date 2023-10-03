import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import "../App.css";
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';



function BuscarPorIngredientes() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [showIngredientList, setShowIngredientList] = useState(true);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const { meals } = response.data;
      setRecipes(meals || []);
      setSearched(true);
      setShowIngredientList(false); 
    } catch (error) {
      console.error("Erro ao buscar receitas por ingrediente:", error);
    }
  };

  const handleIngredientClick = (selectedIngredient) => {
    setIngredient(selectedIngredient);
    handleSearch();
  };

 
  useEffect(() => {
    const fetchIngredientList = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const { meals } = response.data;
        if (meals) {
          setIngredientList(meals.map((item) => item.strIngredient));
        }
      } catch (error) {
        console.error("Erro ao buscar a lista de ingredientes:", error);
      }
    };

    fetchIngredientList();
  }, []);

  return (
    <div className="container">
      
      <div>
        <FloatingLabel
          controlId="floatingInput"
          label="Busca por Ingrediente"
          className="mb-3"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}>
        <Form.Control type="text" />
        </FloatingLabel>
        <Button variant="warning" onClick={handleSearch}>Pesquisar</Button>
      </div>

      {showIngredientList && (
        <div>
          <h3>Lista de Ingredientes</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {ingredientList.map((ingredientItem) => (
              <Button variant="warning" className="text-button"
                key={ingredientItem}
                onClick={() => handleIngredientClick(ingredientItem)}
                style={{
                  marginRight: "20px",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                {ingredientItem}
              </Button>
            ))}
          </div>
        </div>
      )}

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

export default BuscarPorIngredientes;

