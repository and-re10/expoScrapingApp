import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Routes
import Routes from './src/routes/index';


// Auth Provider
import { AuthProvider } from "./src/contexts/auth.js"

function App() {
  return (
    <NavigationContainer style={{margin: 0}}>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
