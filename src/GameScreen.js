import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Card from "./Cards";

const GameScreen = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialCards = generateInitialCards();
    const shuffledCards = shuffleArray([...initialCards]);
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatches(0);
    setAttempts(0);
  };
  const Reset = () => {
    initializeGame();
  };
  const generateInitialCards = () => {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let initialCards = [];
    letters.forEach((letter) => {
      initialCards.push({ id: `${letter}1`, letter });
      initialCards.push({ id: `${letter}2`, letter });
    });
    return initialCards;
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleCardPress = (cardId, letter) => {
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, { id: cardId, letter }]);
      setAttempts(attempts + 1);

      if (selectedCards.length === 1 && selectedCards[0].letter === letter) {
        setMatches(matches + 1);
        setSelectedCards([]);
      } else if (selectedCards.length === 1) {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <View style={{ flex: 1}}>
      <Text
        style={{
          fontSize: 25,
          color: "black",
          alignSelf: "center",
          position: "absolute",
          top: 60,
        }}
      >
        Memory Game
      </Text>
      <View style={styles.container}>
        {cards.map((card, index) => (
          <Card
            key={index}
            id={card.id}
            letter={card.letter}
            onPress={handleCardPress}
            disabled={selectedCards.some((c) => c.id === card.id)}
          />
        ))}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Attempts: {attempts}</Text>
          <Text style={styles.infoText}>Matches: {matches}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 100,
          position: "absolute",
          bottom: 100,
          left: 170,
          borderWidth: 2,
          borderColor: "red",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
        onPress={Reset}
      >
        <Text style={{ fontSize: 20, color: "red" }}>Reset </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 10,
    marginTop: 100,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GameScreen;
