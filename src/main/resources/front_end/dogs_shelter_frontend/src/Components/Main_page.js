import React from 'react';
import logo from "../logo.webp";

class Main_page extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <p className="text-monospace monotext">Добро пожаловать на сайт собачьего приюта <b>СпасёмСобакВместе</b></p>
                <img alt={'Main_picture'} className="main_pic" src={logo}></img>

            </div>
        );
    }
}

export default Main_page;