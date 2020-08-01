import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigationbar from "./Navigationbar.js"
import Newsarticlehome from "./Newsarticlehome.js"
import Loading from "./Loading.js"

class Technology extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            response :{},
            isloaded :false,
            err: null,
      };
    }
    check_validity_nwtimes(resultarr,final_array){
      for(var i=0;i<resultarr.length;i++){
          if (resultarr[i].multimedia && resultarr[i].multimedia!== null && resultarr[i].multimedia!= "" && resultarr[i].title && resultarr[i].title!="" && resultarr[i].title!=null  && resultarr[i].section && resultarr[i].section!=null && resultarr[i].section!="" && resultarr[i].abstract && resultarr[i].abstract!=null && resultarr[i].abstract!="" && resultarr[i].published_date&& resultarr[i].published_date!="" && resultarr[i].published_date!=null)
           {
              final_array.push(resultarr[i]);
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
    componentDidMount() {
      var path = ""
      var default_img =""
      if(window.localStorage.getItem('toggle')=="true"){
        path="https://shamanthhw8.wl.r.appspot.com/technology"
        default_img="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" 
      }else{
        path="https://shamanthhw8.wl.r.appspot.com/technologynwtimes"
        default_img="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
      }
      fetch(path).then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            
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
                return <Newsarticlehome key={index} title={item.webTitle} section={item.sectionId} date={date_format} description = {item.blocks.body[0].bodyTextSummary} image={img} detailid={item.id} shareurl={item.webUrl}/>
              })
            }else{
              var result_array = result.results
              var final_arr=[]
              this.check_validity_nwtimes(result_array,final_arr)
              var component_array = final_arr.map(function(item,index){
                var date_format = item.published_date.split('T')[0]
                var multimedia = item.multimedia
                var img=""
                for(var i=0;i<multimedia.length;i++){
                    if(multimedia[i].width>2000){
                      img = multimedia[i].url
                      break
                    }
                }
                if(img=="" || img=="undefined"){
                    img = default_img
                }
                return <Newsarticlehome key={index} title={item.title} section={item.section} date={date_format} description = {item.abstract} image={img} detailid={item.url} shareurl={item.url}/>
              })
            }
            
            this.setState(function(prev){
                return {
                    response:component_array,
                    isloaded:true,
                    err:null,
                  }
            });
  
          },
          (error) => {
            this.setState(function(prev){
                return {
                    response:null,
                    isloaded:true,
                    err:error,
                  }
            });
          }
        )
    }
  
    render(){
           console.log("Hellllllllo")
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
                  {this.state.response}
               </div>
             )
             }
                
    }
  }
  
  export default Technology;