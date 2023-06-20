import React, {useEffect, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CharacterList from './src/Components/CharacterList/CharacterList';
import {getData} from './src/Components/getData';
import {Character} from './src/types/Character';

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchCharacters = () => {
    getData(apiGetCharacter).then(data => {
      setApiGetCharacter(data.info.next);
      setCharacters([
        ...(characters || []),
        ...data.results.map(char => {
          return {
            name: char.name,
            image: char.image,
            status: char.status,
            species: char.species,
            location: char.location.name,
          };
        }),
      ]);
    });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      {characters ? (
        <CharacterList
          characters={characters || [characterMocked]}
          onEndReached={() => fetchCharacters()}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default App;
