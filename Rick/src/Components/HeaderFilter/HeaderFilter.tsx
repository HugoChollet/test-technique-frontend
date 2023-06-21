import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

type Filter = {
  species: string;
  name: string;
  alive: boolean;
};

type HeaderProps = {
  filterSpecies: () => void;
  filterAlive: () => void;
  filterName: () => void;
  filterValue: Filter;
};

export const HeaderFilter: React.FC<HeaderProps> = ({
  filterSpecies,
  filterAlive,
  filterName,
  filterValue,
}) => {
  const filterStyle = (filter: string) =>
    filter === '' ? styles.filter : styles.activeFilter;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={filterSpecies}>
        <Text style={filterStyle(filterValue.species)}>Species</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={filterAlive}>
        <Text style={filterValue.alive ? styles.activeFilter : styles.filter}>
          Alive
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={filterName}>
        <Text style={filterStyle(filterValue.name)}>Name</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filter: {
    padding: 10,
    color: 'black',
  },
  activeFilter: {
    padding: 8,
    borderWidth: 2,
    borderColor: 'blue',
    color: 'blue',
  },
});
