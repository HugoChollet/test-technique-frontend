import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Characters found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'grey',
  },
});

export default ErrorScreen;
