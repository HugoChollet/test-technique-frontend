import React, {useEffect, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CharacterList from './src/Components/CharacterList/CharacterList';
import {getData} from './src/Components/getData';
import {Character} from './src/types/Character';

const apiGetCharacter = 'https://rickandmortyapi.com/api/character';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [characters, setCharacters] = useState<Character[]>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const characterMocked = {
    image:
      'https://www.radiofrance.fr/s3/cruiser-production/2019/10/22f8d83b-2dbb-4156-8f6d-9cc13b94e16f/1200x680_rickmorty.jpg',
    name: 'test',
    status: 'test',
    species: 'test',
    location: 'test',
  };

  useEffect(() => {
    getData(apiGetCharacter).then(data => {
      console.log('all fetched data', data);

      setCharacters(
        data.results.map(char => {
          console.log('test');

          console.log('ici', char);

          return {
            name: char.name,
            image: char.image,
            status: char.status,
            species: char.species,
            location: char.location.name,
          };
        }),
      );
    });
  }, []);

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <CharacterList characters={characters || [characterMocked]} />
    </SafeAreaView>
  );
}

export default App;
