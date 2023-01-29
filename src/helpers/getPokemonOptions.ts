import pokemonApi from "../api/pokemonApi";
import type { Pokemon } from "../interfaces/pokemon";

//Devolvemos arreglo numeros

const getPokemons = (): number[] => {
  const pokemonsArr = Array.from(Array(650));

  return pokemonsArr.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

  return pokemons;
};

//Va a devolver Promesa que resolvera tipo Pokemon

const getPokemonNames = async (pokemons: number[]): Promise<Pokemon[]> => {
  if (pokemons.length !== 4) throw "Pokemons debe ser 4 de longitud";
  //Desestructuramos array
  const [a, b, c, d] = pokemons;
  // const resp = await pokemonApi.get(`/3`)
  // console.log(resp.data.name, resp.data.id)
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  const [p1, p2, p3, p4] = await Promise.all(promiseArr);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

export default getPokemonOptions;
