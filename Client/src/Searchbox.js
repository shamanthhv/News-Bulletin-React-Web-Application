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

function Searchbox() {
  const history = useHistory();
   
  var fetchData = (inputValue, callback) => {
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
      },200);
                 
  })
  .catch((error) => {
    console.log(error, "catch the hoop")
  });
});
}
}
const styles = {
    container: base => ({
      ...base,
      flex: 0.5
    })
  };
function handleClick(selected) {
    history.push("/search?q="+selected);
  }

  return (
    <AsyncSelect
                    cacheOptions
                    loadOptions={fetchData}
                    defaultOptions
                    placeholder="Enter Keyword .."
                    styles={styles}
                    onChange={handleClick}
    />
  );
}
export default withRouter(Searchbox);