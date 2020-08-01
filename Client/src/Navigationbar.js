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
import { Link,NavLink } from 'react-router-dom'
import Switch from "react-switch";
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import Sbox from "./Sbox"
import Searchbox from './Searchbox';
import { FiBookmark } from "react-icons/fi";
import ReactTooltip from 'react-tooltip'
import { MdBookmark } from "react-icons/md";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class Navigationbar extends React.Component{
    constructor(){
        if(window.localStorage.getItem('toggle')=="true"){
          var temp =true
        }
        else{
          var temp =false
        }
        super()
        this.state={
            active_state : {"home":true,"world":false,"politics":false,"business":false,"technology":false,"sports":false},
            checked:temp,
            redirect:false,
            selection:"",
            cur_url : window.location.href
        }
        this.handleChange = this.handleChange.bind(this);
        this.handle_search = this.handle_search.bind(this)
        this.bookmarkhandle = this.bookmarkhandle.bind(this)
    }
   
    handleChange(checked) {
    
      if(window.localStorage.getItem('toggle')=='true'){
        window.localStorage.setItem('toggle', 'false');
      }
      else{
        window.localStorage.setItem('toggle', 'true');
      }
      window.location.reload(true);
    }
    fetchData = (inputValue, callback) => {
        let mkt = 'en-US';
        let query = inputValue;
        let params = '?mkt=' + mkt + '&q=' + query;
        if (!inputValue) {
          callback([]);
        } else {
            setTimeout(() => {
      fetch("https://shamanth.cognitiveservices.azure.com/bing/v7.0/suggestions" + params, {
        method: "GET",
        headers : {
            'Ocp-Apim-Subscription-Key' : '5a79dd7ec8614291a348c7247dc13543',
          }
      })
      .then((resp) => {
        return resp.json()
      }) 
      .then((data) => {
          console.log(data)
          const tempArray = [];
          var display_data = data.suggestionGroups
          for(var i=0;i<display_data.length;i++){
              var suggestion_arr =display_data[i].searchSuggestions
              for (var j=0;j<suggestion_arr.length;j++){
                  tempArray.push({label: `${suggestion_arr[j].query}`, value: suggestion_arr[j].displayText})
              }
          }
          setTimeout(() => {
            callback(tempArray);
          },1000);
                     
      })
      .catch((error) => {
        console.log(error, "catch the hoop")
      });
    });
    }
    }
    onSearchChange = (selectedOption) => {
        if (selectedOption) {
    
        this.setState({
            selectedOption
           });
        }
      };
      handle_search(selected_option){
          const history = useHistory();
          this.setState(function(prev){
            return({
            active_state:prev.active_state,
            checked:prev.checked,
            redirect:true,
            selection:selected_option
          })})
          history.push("/home");
      }
      bookmarkhandle(selcted_bookmark){
        
      }
    render(){
        const textcolor = {color: 'white',color: 'transparent', textShadow: "0 0 1.5px white"};
        const bright_font = {color:'white'}
        const styles = {
            container: base => ({
              ...base,
              flex: 0.5
            })
          };
        if(this.state.cur_url.includes('/search') || this.state.cur_url.includes('/detail')){
          return (
              
            <Navbar expand="lg" className="blueGradient">
                
                <Sbox/>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                            <Nav.Link as={NavLink} exact to="/" activeClassName="active" className="inactive left-nav">Home</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/world"  activeClassName="active" className="inactive left-nav">World</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/politics"  activeClassName="active" className="inactive left-nav">Politics</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/business"  activeClassName="active" className="inactive left-nav">Business</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/technology"  activeClassName="active" className="inactive left-nav">Technology</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/sports"  activeClassName="active" className="inactive left-nav">Sports</Nav.Link>       
                    </Nav>
                    <Nav>
                          <ReactTooltip place='bottom'/>
                          <Link to="/bookmark"><span style={{marginTop:'-1px',paddingRight:'15px',display:'inline-block',color:'white',fontSize:'20px'}}><FiBookmark data-tip="Bookmark"/></span></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        }else if(this.state.cur_url.includes('/bookmark')){

          return (
              
            <Navbar expand="lg" className="blueGradient">
                
                <Sbox/>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                            <Nav.Link as={NavLink} exact to="/" activeClassName="active" className="inactive left-nav">Home</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/world"  activeClassName="active" className="inactive left-nav">World</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/politics"  activeClassName="active" className="inactive left-nav">Politics</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/business"  activeClassName="active" className="inactive left-nav">Business</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/technology"  activeClassName="active" className="inactive left-nav">Technology</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/sports"  activeClassName="active" className="inactive left-nav">Sports</Nav.Link>       
                    </Nav>
                    <Nav>
                          <ReactTooltip place='bottom'/>
                          <Link to="/bookmark"><span style={{marginTop:'-1px',paddingRight:'15px',display:'inline-block',color:'white',fontSize:'20px'}}><MdBookmark id="1" style={{display:'inline'}}data-tip="Bookmark"/></span></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )

        }else{
        return (
            
            <Navbar expand="lg" className="blueGradient">
                
                  <Sbox/>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                            <Nav.Link as={NavLink} exact to="/" activeClassName="active" className="inactive left-nav">Home</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/world"  activeClassName="active" className="inactive left-nav">World</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/politics"  activeClassName="active" className="inactive left-nav">Politics</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/business"  activeClassName="active" className="inactive left-nav">Business</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/technology"  activeClassName="active" className="inactive left-nav">Technology</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/sports"  activeClassName="active" className="inactive left-nav">Sports</Nav.Link>       
                    </Nav>
                    <Nav>
                            <ReactTooltip place='bottom'/>
                            <Nav.Link as={NavLink} to="/bookmark"><span style={{marginTop:'-1px',paddingRight:'15px',display:'inline-block',color:'white',fontSize:'20px',cursor: "pointer"}}><FiBookmark data-tip="Bookmark"/></span></Nav.Link>
                            
                            <Nav.Link  style={{display:'inline-block',color:'white'}} >NYTimes</Nav.Link>
                                  <Nav.Link> 
                                    <Switch
                                      onChange={this.handleChange}
                                      checked ={this.state.checked}
                                      onColor="#00BFFF"
                                      offColor = "#C8C8C8"
                                      uncheckedIcon = {false}
                                      checkedIcon = {false}
                                      handleDiameter={20}
                                      height={23}
                                      width={42}
                                      className="react-switch"
                                      id="material-switch"
              
                                    />
                                    </Nav.Link> 
                            <Nav.Link style={{display:'inline-block',color:'white'}}>Guardian</Nav.Link>
                      
                    </Nav>
                </Navbar.Collapse>
               
            </Navbar>
            
        )
        }
    }
}

export default Navigationbar

