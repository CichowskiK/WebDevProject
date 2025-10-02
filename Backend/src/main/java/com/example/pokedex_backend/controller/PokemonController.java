package com.example.pokedex_backend.controller;

import com.example.pokedex_backend.model.UserPokemons;
import com.example.pokedex_backend.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "https://cichowskik.github.io/"})
@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {
    @Autowired
    private PokemonService pokemonService;

    @PostMapping("/add")
    public UserPokemons addPokemon(@RequestBody Map<String, Long> body) {
        return pokemonService.addPokemon(body.get("userId"), body.get("pokemonId"));
    }

    @GetMapping("/{userId}")
    public List<UserPokemons> getUserPokemons(@PathVariable Long userId) {
        return pokemonService.getUserPokemons(userId);
    }
}
