import axios from "axios";
import type { Character, CharacterResponse } from "../types"

const API_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (page: number): Promise<CharacterResponse> => {
  const { data } = await axios.get(`${API_URL}/character?page=${page}`);
  return data;
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  const { data } = await axios.get(`${API_URL}/character/${id}`);
  return data;
};
