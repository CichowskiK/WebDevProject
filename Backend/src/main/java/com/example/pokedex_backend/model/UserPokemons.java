package com.example.pokedex_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_pokemons")
public class UserPokemons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long pokemonId;

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Long getPokemonId() {
        return this.pokemonId;
    }

    public void setUserId(Long userId){
        this.userId = userId;
    }

    public void setPokemonId(Long setPokemonId){
        if(setPokemonId<=898 && setPokemonId>0) {
            this.pokemonId = setPokemonId;
        } else {
            throw new IllegalArgumentException("nieprawidłowe id");
        }
    }
}


