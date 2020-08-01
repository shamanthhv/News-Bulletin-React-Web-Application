import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Spinner from 'react-bootstrap/Spinner'
const override = css`
  display: block;
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-color: red;
`;
 
class Loading extends Component{
    render(){
        return(
            <div className="sweet-loading">
                <section className="loading" >
                    <Spinner animation="grow" variant="primary" style={{color:"#5A36D7"}}/>
                    <p>Loading</p>
               </section>
               
            </div>
        )
    }
}
export default Loading