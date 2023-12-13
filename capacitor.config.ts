import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.pokemonapp',
  appName: 'pokemonapp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
