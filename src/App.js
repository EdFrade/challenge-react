import React,{useState, useEffect} from 'react';
import {getAllPokemon, getPokemon} from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import './App.css';

function App() {
  const[pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setnextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const[loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
 
  useEffect(()=>{
    async function fetchData(){
      let response = await getAllPokemon(initialUrl);
     
      setnextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      console.log(response);
      
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async ()=>{
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setnextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async ()=>{
    if(!prevUrl){
      return;
    }
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setnextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async(data) =>{
    let _pokemonData = await Promise.all(data.map(async pokemon =>{
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }));

    setPokemonData(_pokemonData)
  };

  
  return (
    <div className="App">
      {
        loading ? <h1>Loading....</h1>: (
          <>
          <Navbar/>
          <div className="btn">
            <button onClick={prev}>Anterior</button>
            <button onClick={next}>Proximo</button>
          </div>
            <div className="grid-container">
            {
              pokemonData.map((pokemon, i) =>{
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>
          <div className="btn">
            <button onClick={prev}>Anterior</button>
            <button onClick={next}>Proximo</button>
          </div>
          </>
        )
      }
    </div>
  );
}

export default App;
