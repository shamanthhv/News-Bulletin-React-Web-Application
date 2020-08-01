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
import Navigationbar from './Navigationbar'
import Loading from './Loading'
import Detailcard from './Detailcard'
import Commentbox from './Commentbox'

class Detail extends Component{
    constructor(){
        super()
        this.state={
            response:null,
            isloaded:false,
            err:null,
            urlpath:""
        }
        
    }
    componentDidMount() {
        
        var path = ""
        var default_img =""
        if(window.localStorage.getItem('toggle')=="true"){
          path="https://shamanthhw8.wl.r.appspot.com/detail?id="+this.props.location.state.articleid
          default_img="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" 
        }else{
          path="https://shamanthhw8.wl.r.appspot.com/detailnwtimes?id="+this.props.location.state.articleid
          default_img="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
        }
        fetch(path).then(res => res.json())
          .then(
            (result) => {      
              if(window.localStorage.getItem('toggle')=="true"){
                    var title=result.response.content.webTitle
                    var image_arr = result.response.content.blocks.main.elements[0].assets
                    if(image_arr.length==0){
                        var image =default_img
                    }
                    else{
                        var image = image_arr[image_arr.length-1].file
                    }
                    
                    var date = result.response.content.webPublicationDate.split('T')[0]
                    var description = result.response.content.blocks.body[0].bodyTextSummary
                    var section = result.response.content.sectionName
                    var news ="Guardian"
                    var shareurl=result.response.content.webUrl
              }else{
                    var title=result.response.docs[0].headline.main
                    var image=""
                    var multimedia = result.response.docs[0].multimedia
                    for(var i=0;i<multimedia.length;i++){
                        if(multimedia[i].width>2000){
                            image = "https://www.nytimes.com/"+multimedia[i].url
                            break
                        }
                    }
                    if(image=="" || image=="undefined"){
                        image = default_img
                    }
                    var date = result.response.docs[0].pub_date.split('T')[0]
                    var description = result.response.docs[0].abstract
                    var section = result.response.docs[0].section_name
                    var news ="NYTimes"
                    var shareurl=result.response.docs[0].web_url
              }
              
              this.setState(function(prev){
                  return {
                      response:{dtitle:title,dimage:image,ddate:date,ddescription:description,dsection:section,dnews:news,shareurl:shareurl},
                      isloaded:true,
                      err:null,
                      urlpath:path
                    }
              });
    
            },
            (error) => {
              this.setState(function(prev){
                  return {
                      response:null,
                      isloaded:true,
                      err:error,
                      urlpath:path
                    }
              });
            }
          )
      }
      render(){
        if(this.state.err){
          return(<div><h3>Error occurred :( </h3></div>)
        }
        else if(!this.state.isloaded){
          return(<div><Navigationbar/><Loading/></div>)
        }
        else{
          return(
            <div >
               <Navigationbar/>
               <Detailcard title={this.state.response.dtitle} image={this.state.response.dimage} date={this.state.response.ddate} description={this.state.response.ddescription} articleid={this.props.location.state.articleid} section={this.state.response.dsection} news={this.state.response.dnews} shareurl={this.state.response.shareurl}/>
               <Commentbox articleid={this.props.location.state.articleid}/>
            </div>
          )
          }
             
    }
}

export default Detail