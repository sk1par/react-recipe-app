import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Loader from 'react-loader-spinner';

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      setRecipes([]);
      setLoading(true);
      const result = await Axios.get(url);
      if (!result.data.more) {
        setLoading(false)
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
      setLoading(false)
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form onSubmit={onSubmit} className="search-form">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Search Food"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {
          loading && <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
        }
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
