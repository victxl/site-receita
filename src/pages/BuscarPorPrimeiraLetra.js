import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function BuscarPorPrimeiraLetra() {
  const [primeiraLetra, setPrimeiraLetra] = useState("");
  const [receitas, setReceitas] = useState([]);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    const buscarReceitasPorPrimeiraLetra = async () => {
      try {
        const resposta = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`
        );
        const { meals } = resposta.data;

        if (meals) {
          setReceitas(meals);
          setNaoEncontrado(false);
        } else {
          setReceitas([]);
          setNaoEncontrado(true);
        }
      } catch (erro) {
        console.error("Erro ao buscar receitas:", erro);
      }
    };

    if (primeiraLetra) {
      buscarReceitasPorPrimeiraLetra();
    }
  }, [primeiraLetra]);

  const realizarBusca = (letra) => {
    setPrimeiraLetra(letra);
  };

  const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="container">
      <h2>Buscar Receitas por Primeira Letra</h2>
      <div>
        <ul className="nav flex-wrap"> 
          {alfabeto.map((letra) => (
            <li className="nav-item" key={letra}>
              <button
                className={`nav-link btn ${primeiraLetra === letra ? "btn-primary" : "btn-light"}`}
                onClick={() => realizarBusca(letra)}
              >
                {letra.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {naoEncontrado ? (
        <h3>Receita não encontrada</h3>
      ) : (
        <>
          {receitas.length > 0 && (
            <div>
              <h3>Resultados da busca:</h3>
              <div className="row">
                {receitas.map((receita) => (
                  <div className="col-md-4" key={receita.idMeal}>
                    <RecipeCard receita={receita} />
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
