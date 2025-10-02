package com.example.pokedex_backend.service;

import com.example.pokedex_backend.model.UserPokemons;
import com.example.pokedex_backend.repository.UserPokemonRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@Service
public class PokemonService {
    @Autowired
    private UserPokemonRepository userPokemonRepository;

    public UserPokemons addPokemon(Long userId, Long pokemonId) {
        UserPokemons up = new UserPokemons();
        up.setUserId(userId);
        up.setPokemonId(pokemonId);
        return userPokemonRepository.save(up);
    }

    public List<UserPokemons> getUserPokemons(Long userId) {
        return userPokemonRepository.findByUserId(userId);
    }
}
