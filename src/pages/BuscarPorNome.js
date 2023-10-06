import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Botao from 'react-bootstrap/Button';
import Formulario from 'react-bootstrap/Form';
import RotuloFlutuante from 'react-bootstrap/FloatingLabel';

function BuscarPorNome() {
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [receitas, setReceitas] = useState([]);
  const [buscou, setBuscou] = useState(false);

  const realizarBusca = async () => {
    try {
      const resposta = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${termoDeBusca}`
      );
      const { meals } = resposta.data;
      setReceitas(meals || []);
      setBuscou(true);
    } catch (erro) {
      console.error("Erro ao buscar receitas:", erro);
    }
  };

  return (
    <div className="container">
      <div>
        <RotuloFlutuante
          controlId="floatingInput"
          label="Busca por Nome"
          className="mb-3"
          value={termoDeBusca}
          onChange={(e) => setTermoDeBusca(e.target.value)}>
          <Formulario.Control type="text" />
        </RotuloFlutuante>

        <Botao variant="warning" onClick={realizarBusca}>Pesquisar</Botao>
      </div>
      {buscou && (
        <div className="row">
          {receitas.map((receita) => (
            <div className="col-md-4 md-2" key={receita.idMeal}>
              <RecipeCard receita={receita} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuscarPorNome;
