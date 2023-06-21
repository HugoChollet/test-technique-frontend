import {Character} from '../types/Character';
import {getData} from './getData';

type FetchCharactersProps = {
  url: string;
  characters: Character[] | undefined;
  setUrl: (newState: string) => void;
  setCharacters: (newState: Character[]) => void;
};

export const fetchCharacters = async ({
  url,
  characters,
  setUrl,
  setCharacters,
}: FetchCharactersProps) => {
  const data = await getData(url);
  if (data.error) {
    throw data.error;
  }
  setUrl(data.info.next);
  setCharacters([
    ...(characters || []),
    ...data.results.map(
      (char: {
        name: string;
        image: string;
        status: string;
        species: string;
        location: {name: string};
      }) => {
        return {
          name: char.name,
          image: char.image,
          status: char.status,
          species: char.species,
          location: char.location.name,
        };
      },
    ),
  ]);
};
