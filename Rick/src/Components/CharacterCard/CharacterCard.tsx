import * as React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

type Character = {
  image: string;
  name: string;
  status: string;
  race: string;
  firstSeenEpisode: string;
};

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
  console.log(character);

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: character.image}} />
      <Text style={styles.title}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Race: {character.race}</Text>
      <Text>First Seen: {character.firstSeenEpisode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CharacterCard;
