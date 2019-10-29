import React from 'react';
import './style.css';
import pokemonTypes from '../../helpers/pokemonTypes';


function Card({pokemon}){
    const showInformations = ()=>{
        let idName = '#'+pokemon.name+' .Card__name';
        let idTypes = '#'+pokemon.name+' .Card__types';
        let idInfo = '#'+pokemon.name+' .Card__info';
       

        let name = document.querySelector(idName);
        let types = document.querySelector(idTypes);
        let info = document.querySelector(idInfo);

       
        name.classList.add('show');
        types.classList.add('show');
        info.classList.add('show');
       
    }
    return (
        <div   className="Card" id={pokemon.name} onClick={showInformations}>
            <div className="Card__img">
            <img src={pokemon.sprites.front_default} alt=""/>
            </div>

            <div className="Card__name hide">
            {pokemon.name}
            </div>

            <div className="Card__types hide">
                {pokemon.types.map(type =>{
                    return (
                        <div className="Card__type" style={{backgroundColor:pokemonTypes[type.type.name]}}>
                        {type.type.name}
                        </div>
                    )
                })}
            </div>
            <div className="Card__info hide">
                <div className="Card__data Card__data--weight"> 
                  <p className='title'> Height</p>  
                    <p>{pokemon.weight}</p>
                </div>

                <div className="Card__data Card__data--height"> 
                  <p className='title'> Weight</p>  
                    <p>{pokemon.height}</p>
                </div>

                <div className="Card__data Card__data--ability"> 
                  <p className='title'> Ability</p>  
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
}


  

export default Card;