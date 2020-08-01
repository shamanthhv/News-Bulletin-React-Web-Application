import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import './App.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import { Link,NavLink,withRouter} from 'react-router-dom'
import Switch from "react-switch";
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

class New extends Component{
    render(props){
    return(<p>{props.title}</p>)
    }
}