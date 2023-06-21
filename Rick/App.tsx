import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

import CharacterList from './src/Components/CharacterList/CharacterList';
import {HeaderFilter} from './src/Components/HeaderFilter/HeaderFilter';
import ModalInput from './src/Components/ModalInput/ModalInput';
import {Character} from './src/types/Character';
import {fetchCharacters} from './src/api/fetchCharacters';
import ErrorScreen from './src/Components/ErrorScreen/ErrorScreen';

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

  const getCharacters = async (newUrl?: string) => {
    try {
      await fetchCharacters({
        url: newUrl || apiGetCharacter,
        characters: newUrl ? [] : characters,
        setUrl: setApiGetCharacter,
        setCharacters: setCharacters,
      });
    } catch (e) {
      setCharacters([]);
    }
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
      {characters && characters.length > 0 ? (
        <CharacterList
          characters={characters}
          onEndReached={() => getCharacters()}
        />
      ) : (
        <ErrorScreen />
      )}
    </SafeAreaView>
  );
}

export default App;
