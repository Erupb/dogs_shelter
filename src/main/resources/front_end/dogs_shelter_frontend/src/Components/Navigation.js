import React from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';

class Navigation extends React.Component {
    checkLogin(){
        let login = this.getLogin()
        if(login){
            return login;
            /*username_visible.style.visibility = "visible";
            console.log("user logged in");*/
        } else{
            /*console.log("user not logged in");
            user_not_logon.style.visibility = "visible";*/
            return null;
        }
    }

    getLogin(){
        let login = localStorage.getItem('username');
        return login;
    }


    render() {
        if(this.checkLogin()) {
            return (
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">Навигация</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link href="/">Главная</Nav.Link>
                                <Nav.Link href="/dogs">Список собак</Nav.Link>
                            </Nav>
                            <Nav.Link className="d-flex">
                                <div>
                                    <p>{this.getLogin()}</p>
                                    <Button variant="outline-success" onClick={() => {
                                        window.location.href = "/logout";
                                    }}>Выйти</Button>
                                </div>
                                {/*<div id="user_not_logon" style={{"visibility": "visible"}}>
                                    <Button variant="outline-success" onClick={() => {
                                        window.location.href = "/login";
                                    }}>Войти</Button>
                                </div>*/}
                            </Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
        } else {
            return (
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">Навигация</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link href="/">Главная</Nav.Link>
                                <Nav.Link href="/dogs">Список собак</Nav.Link>
                            </Nav>
                            <Nav.Link className="d-flex">
                                {/*<div id="username_visible" style={{"visibility": "hidden"}}>
                                    <p>{this.getLogin()}</p>
                                    <Button variant="outline-success" onClick={() => {
                                        window.location.href = "/login";
                                    }}>Выйти</Button>
                                </div>*/}
                                <div>
                                    <Button variant="outline-success" onClick={() => {
                                        window.location.href = "/login";
                                    }}>Войти</Button>
                                </div>
                            </Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
        }

    }
}
export default Navigation;
