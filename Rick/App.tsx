import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

import CharacterList from './src/Components/CharacterList/CharacterList';
import {HeaderFilter} from './src/Components/HeaderFilter/HeaderFilter';
import ModalInput from './src/Components/ModalInput/ModalInput';
import {Character} from './src/types/Character';
import {fetchCharacters} from './src/api/fetchCharacters';

const characterMocked = {
  image:
    'https://www.radiofrance.fr/s3/cruiser-production/2019/10/22f8d83b-2dbb-4156-8f6d-9cc13b94e16f/1200x680_rickmorty.jpg',
  name: 'Rick&Morty',
  status: 'Okay',
  species: 'Cartoons Characters',
  location: 'TV',
};

function App(): JSX.Element {
  const initialFilters = {
    species: '',
    status: '',
    name: '',
  };
  const [characters, setCharacters] = useState<Character[]>();
  const [apiGetCharacter, setApiGetCharacter] = useState(
    'https://rickandmortyapi.com/api/character',
  );
  const [filters, setFilters] = useState(initialFilters);
  const [modalFilter, setModalFilter] = useState<null | string>(null);

  const getCharacters = (newUrl?: string) => {
    fetchCharacters({
      url: newUrl || apiGetCharacter,
      characters: newUrl ? [] : characters,
      setUrl: setApiGetCharacter,
      setCharacters: setCharacters,
    });
  };

  const filterCharacters = (value: string) => {
    if (modalFilter) {
      setFilters({
        ...initialFilters,
        [modalFilter]: value,
      });
      getCharacters(
        'https://rickandmortyapi.com/api/character/?' +
          [modalFilter] +
          '=' +
          value,
      );
      setModalFilter(null);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <SafeAreaView>
      <ModalInput
        isVisible={modalFilter !== null}
        onSubmit={filterCharacters}
        onClose={() => setModalFilter(null)}
      />
      <HeaderFilter
        filterSpecies={() => setModalFilter('species')}
        filterStatus={() => setModalFilter('status')}
        filterName={() => setModalFilter('name')}
        filterValue={filters}
      />
      {characters ? (
        <CharacterList
          characters={characters || [characterMocked]}
          onEndReached={() => getCharacters()}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default App;
