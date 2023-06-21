import React, {useEffect, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CharacterList from './src/Components/CharacterList/CharacterList';
import {getData} from './src/api/getData';
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
  const isDarkMode = useColorScheme() === 'dark';
  const [characters, setCharacters] = useState<Character[]>();
  const [apiGetCharacter, setApiGetCharacter] = useState(
    'https://rickandmortyapi.com/api/character',
  );
  const [filters, setFilters] = useState({
    species: '',
    status: '',
    name: '',
  });
  const [modalFilter, setModalFilter] = useState<null | string>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getCharacters = (newUrl?: string) => {
    fetchCharacters({
      url: newUrl || apiGetCharacter,
      characters: newUrl ? [] : characters,
      setUrl: setApiGetCharacter,
      setCharacters: setCharacters,
    });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ModalInput
        isVisible={modalFilter !== null}
        onSubmit={async (value: string) => {
          if (modalFilter) {
            setFilters(oldFilters => {
              return {...oldFilters, [modalFilter]: value};
            });
            getCharacters(
              'https://rickandmortyapi.com/api/character/?' +
                [modalFilter] +
                '=' +
                value,
            );
            setModalFilter(null);
          }
        }}
        onClose={() => setModalFilter(null)}
      />

      {filters ? (
        <HeaderFilter
          filterSpecies={() => setModalFilter('species')}
          filterStatus={() => setModalFilter('status')}
          filterName={() => setModalFilter('name')}
          filterValue={filters}
        />
      ) : null}
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
