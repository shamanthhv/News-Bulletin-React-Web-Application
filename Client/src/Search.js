import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigationbar from "./Navigationbar.js"
import Newsarticlehome from "./Newsarticlehome.js"
import Loading from "./Loading.js"
import Searchcard from "./Searchcard"
import CardDeck from "react-bootstrap/CardDeck"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            response :{},
            isloaded :false,
            err: null,
            stringq:""
      };
    }
    check_validity_nwtimes(resultarr,final_array){
      for(var i=0;i<resultarr.length;i++){
        if(resultarr[i].headline && resultarr[i].headline.main!="" && resultarr[i].multimedia && resultarr[i].news_desk && resultarr[i].news_desk!="" && resultarr[i].pub_date && resultarr[i].pub_date!=""){
            final_array.push(resultarr[i])
        }
        if(final_array.length>=10){
          break
        }
      }
    }
    check_validity(resultarr,final_array){
      for(var i=0;i<resultarr.length;i++){
          if (resultarr[i].webPublicationDate && resultarr[i].webPublicationDate!== null && resultarr[i].webPublicationDate!= "" && resultarr[i].blocks.main && resultarr[i].blocks.main.elements && resultarr[i].blocks.main.elements[0].assets!="" && resultarr[i].blocks.main.elements[0].assets!=null && resultarr[i].webTitle && resultarr[i].webTitle!="" && resultarr[i].webTitle!=null && resultarr[i].sectionId && resultarr[i].sectionId!=null && resultarr[i].sectionId!="" && resultarr[i].blocks.body[0].bodyTextSummary && resultarr[i].blocks.body[0].bodyTextSummary!=null && resultarr[i].blocks.body[0].bodyTextSummary!="") {
              final_array.push(resultarr[i]);
        }
        if(final_array.length>=10){
          break
        }
      }
    }
    componentDidUpdate(prevprops){
        var prev = prevprops.location.search
        var prevq = prev.substring(3,prev.length)
        var str = this.props.location.search
        var query = str.substring(3,str.length)
        if(prevq!=query){
            this.fetch_data()
        }
    }
    componentDidMount(){
        this.fetch_data()
    }
    fetch_data() {
      var str = this.props.location.search
      var query = str.substring(3,str.length)
      var path = ""
      var default_img =""
      if(window.localStorage.getItem('toggle')=="true"){
        path="https://shamanthhw8.wl.r.appspot.com/search?searchkey="+query
        default_img="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" 
      }else{
        path="https://shamanthhw8.wl.r.appspot.com/searchnwtimes?searchkey="+query
        default_img="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
      }
      fetch(path).then(res => res.json())
        .then(
          (result) => {
            
            if(window.localStorage.getItem('toggle')=="true"){
              var result_array = result.response.results
              var final_arr=[]
              this.check_validity(result_array,final_arr)
              var component_array = final_arr.map(function(item,index){
                var date_format = item.webPublicationDate.split('T')[0]
                var arr =item.blocks.main.elements[0].assets
                if(arr.length==0){
                  var img = default_img
                }
                else{
                  var img = arr[arr.length-1].file
                }
                return <Searchcard key={index} title={item.webTitle} section={item.sectionId} date={date_format} description = {item.blocks.body[0].bodyTextSummary} image={img} detailid={item.id} shareurl={item.webUrl}/>
              })
            }else{
              console.log(result)
              var result_array = result.response.docs
              var final_arr=[]
              this.check_validity_nwtimes(result_array,final_arr)
              //console.log(final_arr)
              var component_array = final_arr.map(function(item,index){
                var date_format = item.pub_date.split('T')[0]
                var multimedia = item.multimedia
                var img=""
                for(var i=0;i<multimedia.length;i++){
                    if(multimedia[i].width>=2000){
                      img = "https://www.nytimes.com/"+multimedia[i].url
                      break
                    }
                }
                if(img=="" || img=="undefined"){
                    img = default_img
                }
                return <Searchcard key={index} title={item.headline.main} section={item.news_desk} date={date_format} description = {item.abstract} image={img} detailid={item.web_url} shareurl={item.web_url}/>
              })
              console.log(component_array)
            }
            
            this.setState(function(prev){
                return {
                    response:component_array,
                    isloaded:true,
                    err:null,
                    stringq:query
                  }
            });
  
          },
          (error) => {
            this.setState(function(prev){
                return {
                    response:null,
                    isloaded:true,
                    err:error,
                    stringq:query
                  }
            });
          }
        )
    }
    createGrid(){
        var arr = this.state.response
        var result_arr =[]
        for(var i=0;i<arr.length;i+=4){
            var children =[]
            for(var j=i;j<Math.min(i+4,arr.length);j++){
                console.log(j)
                children.push(<Col lg={3} key={j}>{arr[j]}</Col>)
            }
        result_arr.push(<Row key={i}>{children} </Row>)
        }
        console.log(result_arr)
        return result_arr
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
               <div>
                  <Navigationbar/>
                  <h2 style={{margin:'10px 10px'}}>Results</h2>
                  <div style={{margin:'10px 10px'}}>
                  {this.createGrid()}
                  </div>
               </div>
             )
             }
                
    }
  }
  
  export default Search;