
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Card = ({ id, letter, onPress, disabled }) => {
  const [flipped, setFlipped] = useState(false);

  const handlePress = () => {
    if (!flipped && !disabled) {
      setFlipped(true); 
      onPress(id, letter); 
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: flipped ? '#FFF' : '#00F' }]}
      onPress={handlePress}
      disabled={disabled || flipped} 
    >
      {flipped && <Text style={styles.cardText}>{letter}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#00F',
  },
  cardText: {
    fontSize: 24,
    color: '#000',
  },
});

export default Card;
