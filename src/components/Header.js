


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function HomemPage() {
  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark" className='sticky-top'>
      <Container>
        <Navbar.Brand href="/">Receitas</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/buscar-por-nome">Buscar Por Nome</Nav.Link>
            <Nav.Link href="/buscar-por-primeira-letra">Buscar Por Letra</Nav.Link> 
            <Nav.Link href="/buscar-por-ingredientes">Buscar Por Ingredientes</Nav.Link>          
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomemPage;