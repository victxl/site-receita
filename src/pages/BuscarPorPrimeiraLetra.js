import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function BuscarPorPrimeiraLetra() {
  const [firstLetter, setFirstLetter] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchRecipesByFirstLetter = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
        );
        const { meals } = response.data;

        if (meals) {
          setRecipes(meals);
          setNotFound(false);
        } else {
          setRecipes([]);
          setNotFound(true);
        }
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      }
    };

    if (firstLetter) {
      fetchRecipesByFirstLetter();
    }
  }, [firstLetter]);

  const handleSearch = (letter) => {
    setFirstLetter(letter);
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="container">
      <h2>Buscar Receitas Letra</h2>
      <div>
        <ul className="nav flex-wrap"> {/* Use flex-wrap para que o alfabeto fique em uma única linha */}
          {alphabet.map((letter) => (
            <li className="nav-item" key={letter}>
              <button
                className={`nav-link btn ${firstLetter === letter ? "btn-primary" : "btn-light"}`}
                onClick={() => handleSearch(letter)}
              >
                {letter.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {notFound ? (
        <h3>Receita não encontrada</h3>
      ) : (
        <>
          {recipes.length > 0 && (
            <div>
              <h3>Resultados da busca:</h3>
              <div className="row">
                {recipes.map((recipe) => (
                  <div className="col-md-4" key={recipe.idMeal}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BuscarPorPrimeiraLetra;
