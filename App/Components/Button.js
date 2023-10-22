import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: '#D9D9D9',
    margin:10,
    width:160,
  },
  text: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',

  },
});
