import * as React from 'react'
import { AuthProvider } from "./context/AuthContext";
import { UserPokemonsProvider } from './context/UserPokemonsContext';
import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pokedex from "./pages/Pokedex";
import ProtectedRoute from "./components/ProtectedRoute";
import PokemonCatching from "./pages/PokemonCatching";
import MemoGame from './pages/miniGames/MemoGame';
import WackAMole from "./pages/miniGames/WackAMole"
import WhosThatPokemon from "./pages/miniGames/WhosThatPokemon"



function App() {
  return (
    <AuthProvider>
      <UserPokemonsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route
              path="/pokedex"
              element={
                <ProtectedRoute>
                  <Pokedex/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemonCatching"
              element={
                <ProtectedRoute>
                  <PokemonCatching/>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/pokemonCatching/memo" 
              element={
                <ProtectedRoute>
                  <MemoGame />
                </ProtectedRoute>
              } />

              <Route 
              path="/pokemonCatching/wackAMole" 
              element={
                <ProtectedRoute>
                  <WackAMole/>
                </ProtectedRoute>
              } />

              <Route 
              path="/pokemonCatching/whosThatPokemon" 
              element={
                <ProtectedRoute>
                  <WhosThatPokemon/>
                </ProtectedRoute>
              } />

            <Route path="/" element={<Navigate to="/pokedex" replace />} />
          </Routes>
        </Router>
      </UserPokemonsProvider>
    </AuthProvider>
  );
}

export default App;
