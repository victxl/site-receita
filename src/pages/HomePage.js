import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container">
      
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe.idMeal}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;