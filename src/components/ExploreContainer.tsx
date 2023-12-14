import React, { useEffect, useRef, useState } from 'react';
import './ExploreContainer.css';
import { CardPokemon } from './pokeCard';
import { IonContent, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

interface ContainerProps {
  searchTerm: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ searchTerm }) => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPokemons = async (page) => {
    const baseURL = 'https://pokeapi.co/api/v2/';
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    const endpoint = `pokemon?limit=${pageSize}&offset=${offset}`;

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}${endpoint}`);
      const data = await res.json();

      const promises = data.results.map(async (pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        const pokemonData = await pokemonRes.json();
        return pokemonData;
      });

      const results = await Promise.all(promises);

      // Filtrar los resultados por el nombre del Pokemon si hay un término de búsqueda
      const filteredResults = searchTerm
        ? results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : results;

      // Aleatorizar la lista de pokémons
      const randomizedResults = filteredResults.sort(() => Math.random() - 0.5);

      setPokemons((prevPokemons) => [...prevPokemons, ...randomizedResults]);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPokemons([]);
    getPokemons(1);
  }, [searchTerm]);

  const ionRefresherRef = useRef(null);

  const handleRefresh = async (event) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPokemons([]);
    getPokemons(1);
    event.detail.complete();
    ionRefresherRef.current.complete();
  };

  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = currentPage + 1;
      getPokemons(nextPage);
    }
  };

  const handleClearSearch = () => {
    // Limpiar el término de búsqueda para mostrar la lista completa
    setPokemons([]);
    getPokemons(1);
  };

  const renderPokemonRows = () => {
    const maxCardsPerRow = 5;
    const rows = chunkArray(pokemons, maxCardsPerRow);

    return rows.map((row, rowIndex) => (
      <IonRow key={rowIndex}>
        {row.map((pokemon) => (
          <IonCol key={pokemon.id}>
            <CardPokemon pokemon={pokemon} />
          </IonCol>
        ))}
      </IonRow>
    ));
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>



      <IonGrid>{renderPokemonRows()}</IonGrid>
      <IonRow>
        <IonCol className="ion-text-center">
          {loading && <div>Cargando...</div>}
          {!loading && (
            <IonButton onClick={handleLoadMore} expand="full">
              Cargar más
            </IonButton>
          )}
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default ExploreContainer;

function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
}