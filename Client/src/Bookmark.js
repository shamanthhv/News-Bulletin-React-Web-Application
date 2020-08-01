import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigationbar from "./Navigationbar.js"
import Newsarticlehome from "./Newsarticlehome.js"
import Loading from "./Loading.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Bookmarkcard from "./Bookmarkcard.js"
class Bookmark extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            response :[],
            isloaded :false,
            err: null,
            article_count:0
            
      };
      this.deletehandler = this.deletehandler.bind(this);
    }
    deletehandler(id){
        var arr = JSON.parse(localStorage.getItem("bookmark"));
        var index =-1
        var search= false

        for(var i=0;i<arr.length;i++){
            var myobj = JSON.parse(arr[i])
            if(myobj.articleid==id){
                search = true
                index=i
                break
            }
        }
        if(search){
            arr.splice(index,1)
            localStorage.setItem("bookmark", JSON.stringify(arr));
            var res = this.state.response
            var new_arr =[]
            for(var i=0;i<res.length;i++){
                if(res[i].props.articleid!=id){
                    new_arr.push(res[i])
                }
            }
            
        }
        this.setState(function(prev){
            return {
                response:new_arr,
                isloaded:prev.isloaded,
                err:prev.err,
                article_count:prev.article_count-1
            }
        })    
    }
    componentDidMount(){
        var result_arr =[]
        try{
            var arr = JSON.parse(localStorage.getItem("bookmark"));
            for(var i=0;i<arr.length;i++){
                var curobj = JSON.parse(arr[i])
                result_arr.push(<Bookmarkcard title={curobj.title} image={curobj.image} date={curobj.date} section={curobj.section} news={curobj.news} articleid={curobj.articleid} shareurl={curobj.shareurl} action={this.deletehandler}/>)
            }
            this.setState(function(prev){
                return({
                    response:result_arr,
                    isloaded:true,
                    err:null,
                    article_count:result_arr.length
                })
            })
        }
        catch(err){
            this.setState({
                response:result_arr,
                isloaded:true,
                err:false,
                article_count:result_arr.length
            })
        }
    }
    createGrid(){
        var arr = this.state.response
        var result_arr =[]
        for(var i=0;i<arr.length;i+=4){
            var children =[]
            for(var j=i;j<Math.min(i+4,arr.length);j++){
                children.push(<Col lg={3} key={j}>{arr[j]}</Col>)
            }
        result_arr.push(<Row key={i}>{children} </Row>)
        }
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
          if(this.state.article_count>0){
            return(
                <div>
                   <Navigationbar/>
                   <h2 style={{margin:'10px 10px'}}>Favourites</h2>
                   <div style={{margin:'10px 10px'}}>
                   {this.createGrid()}
                   </div>
                </div>
              )
          }else{
              return(
                  <div>
                        <Navigationbar/>
                        <h4 style={{textAlign:'center'}}>You Have No Saved Articles</h4>
                  </div>
                
                )
          }
          
          }
             
    }
}

  
  export default Bookmark;