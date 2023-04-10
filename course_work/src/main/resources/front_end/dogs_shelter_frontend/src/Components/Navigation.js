import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar variant="light" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">Навигация</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Navbar.Collapse id="navbar-dark-example">
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Действия"
                                menuVariant="white"
                            >

                                <NavDropdown.Item href="/">На главную</NavDropdown.Item>
                                <NavDropdown.Item href="/dogs_page">
                                    Список собак
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">
                                    Выйти
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
        /*return <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/!* eslint-disable-next-line jsx-a11y/anchor-is-valid *!/}
            <a className="navbar-brand" href="#">Навигация</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">На главную</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/dogs_page">Список собак </a>
                    </li>
                </ul>
                <div className="form-inline my-2 my-lg-0 nav_button_logout">
                    <a href="/logout"><button className="btn btn-outline-success my-2 my-sm-0">Выйти</button></a>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                    crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
                    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
                    crossOrigin="anonymous"></script>

        </nav>;*/

    }
}
export default Navigation;
