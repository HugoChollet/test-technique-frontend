import * as React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Character} from '../../types/Character';
import CharacterCard from '../CharacterCard/CharacterCard';

type CharacterListProps = {
  characters: Character[];
  onEndReached: () => void;
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onEndReached,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={({item}) => <CharacterCard character={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
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
