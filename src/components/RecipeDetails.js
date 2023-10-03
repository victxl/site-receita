import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const { meals } = response.data;
        if (meals && meals.length > 0) {
          setRecipe(meals[0]);
        } else {
          setRecipe(null);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da receita:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Receita não encontrada.</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" >
      
      <Card style={{ width: '60%' }}>
      <div className="text-center">
        <h2>{recipe.strMeal}</h2>
      </div>
        <Card.Img variant="top" src={recipe.strMealThumb} alt={recipe.strMeal} />
        <Card.Body>
          <Card.Text>
            <h5>Ingredientes:</h5>
            <ul>
              {getIngredients(recipe).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Card.Text>
          <Card.Text>
            <h5>Instruções:</h5>
            <p>{recipe.strInstructions}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (recipe[ingredientKey]) {
      const ingredient = `${recipe[ingredientKey]} - ${recipe[measureKey]}`;
      ingredients.push(ingredient);
    }
  }
  return ingredients;
};

export default RecipeDetails;
