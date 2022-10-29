import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PokemonDetailsProvider } from './providers/PokemonDetailsProvider';
import { PokemonListProvider } from './providers/PokemonListProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PokemonListProvider>
      <PokemonDetailsProvider>
        <App />
      </PokemonDetailsProvider>
    </PokemonListProvider>
  </React.StrictMode>
);
