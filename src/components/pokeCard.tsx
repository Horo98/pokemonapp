import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import './pokeCard.css'; 

export const CardPokemon = ({ pokemon }) => {
  return (
    <IonCard className="ion-padding card-container" style={{ minHeight: '520px', maxHeight: '520px' }}>
      <div className="card-content-wrapper">
        <IonImg src={pokemon.sprites.other.dream_world.front_default} alt={`Pokemon ${pokemon.name}`} style={{ maxWidth: '150px' }} />

        <IonCardHeader>
          <IonCardTitle>{pokemon.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <p className="pokemon-id">N° {pokemon.id}</p>
          <h5>Weight: {pokemon.weight}</h5>
          <h5>Height: {pokemon.height}</h5>

          <div className="card-types">
            <IonCardTitle>Types: </IonCardTitle>
            {pokemon.types.map((type) => (
              <h4 key={type.type.name} className={`ion-chip ${type.type.name}`}>
                {type.type.name}
              </h4>
            ))}
          </div>

          <div className="card-ability">
            <IonCardTitle>Abilities: </IonCardTitle>
            {pokemon.abilities.map((ability) => (
              <h4 key={ability.ability.name} className={`ion-chip ${ability.ability.name}`}>
                {ability.ability.name}
              </h4>
            ))}
          </div>
        </IonCardContent>
      </div>
    </IonCard>
  );
};
