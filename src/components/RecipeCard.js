import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

const Cards = ({ recipe }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"
        src={recipe.strMealThumb}
        className="card-img-top"
        alt={recipe.strMeal}
      />
      <Card.Body>
        <Card.Title>{recipe.strMeal}</Card.Title>
        <Card.Text className="card-text">Categoria: {recipe.strCategory}</Card.Text>
        <Link to={`/recipe/${recipe.idMeal}`}>
          <Button variant="warning">
            Ver Receita
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Cards;
