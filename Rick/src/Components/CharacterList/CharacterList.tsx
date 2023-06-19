import * as React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Character} from '../../types/Character';
import CharacterCard from '../CharacterCard/CharacterCard';

type CharacterListProps = {
  characters: Character[];
};

const CharacterList: React.FC<CharacterListProps> = ({characters}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={({item}) => <CharacterCard character={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});

export default CharacterList;
