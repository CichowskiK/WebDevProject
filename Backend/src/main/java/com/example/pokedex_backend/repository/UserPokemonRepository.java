package com.example.pokedex_backend.repository;

import com.example.pokedex_backend.model.UserPokemons;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserPokemonRepository extends JpaRepository<UserPokemons, Long> {
    List<UserPokemons> findByUserId(Long userId);
}