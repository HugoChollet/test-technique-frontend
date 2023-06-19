import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CharacterList from './src/Components/CharacterList/CharacterList';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const characterMocked = {
    image:
      'https://www.radiofrance.fr/s3/cruiser-production/2019/10/22f8d83b-2dbb-4156-8f6d-9cc13b94e16f/1200x680_rickmorty.jpg',
    name: 'test',
    status: 'test',
    race: 'test',
    firstSeenEpisode: 'test',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <CharacterList characters={[characterMocked, characterMocked]} />
    </SafeAreaView>
  );
}

export default App;
