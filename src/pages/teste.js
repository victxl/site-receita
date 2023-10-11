import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import "../App.css";
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function BuscarPorIngredientes() {
  // Estados para controlar o componente
  const [ingredient, setIngredient] = useState(""); // Ingrediente digitado pelo usuário
  const [recipes, setRecipes] = useState([]); // Lista de receitas recuperadas da API
  const [searched, setSearched] = useState(false); // Flag para controlar se uma pesquisa foi realizada
  const [ingredientList, setIngredientList] = useState([]); // Lista de ingredientes recuperados da API
  const [showIngredientList, setShowIngredientList] = useState(true); // Flag para controlar se a lista de ingredientes é exibida

  // Função para buscar receitas com base no ingrediente digitado
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

  // Função para lidar com o clique em um botão de ingrediente
  const handleIngredientClick = (selectedIngredient) => {
    setIngredient(selectedIngredient);
    handleSearch();
  };

  // Efeito colateral para buscar a lista de ingredientes da API
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
        {/* Campo de entrada de texto para o ingrediente */}
        <FloatingLabel
          controlId="floatingInput"
          label="Busca por Ingrediente"
          className="mb-3"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}>
          <Form.Control type="text" />
        </FloatingLabel>
        {/* Botão de pesquisa */}
        <Button variant="warning" onClick={handleSearch}>Pesquisar</Button>
      </div>

      {/* Lista de ingredientes (se showIngredientList for true) */}
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

      {/* Receitas encontradas (se searched for true) */}
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
