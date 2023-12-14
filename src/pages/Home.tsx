import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonButton,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.detail.value || '');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleClearSearch}>
              Limpiar Búsqueda
            </IonButton>
          </IonButtons>
          <IonTitle>Pokemon-App</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            value={searchTerm}
            onIonChange={handleSearch}
            placeholder="Buscar Pokémon por nombre"
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer searchTerm={searchTerm} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
