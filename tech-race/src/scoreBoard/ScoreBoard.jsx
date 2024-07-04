import { FlatList, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function ScoreBoard() {
  let title = 'Classement des scores';

  const [scores, setScores] = useState([
    { classement: 1, score: '1:30', nom: 'Clément' },
    { classement: 2, score: '1:20', nom: 'Nelson' },
    { classement: 3, score: '1:10', nom: 'Wilson' },
    { classement: 4, score: '1:00', nom: 'Arthur' },
    { classement: 5, score: '1:60', nom: 'Didier' }
  ]);

  const colors = ['deeppink', 'skyblue', 'yellow', 'greenyellow', 'darkorange'];
  
  // function for getRandomColor
  const getRandomColor = (excludeColor) => {
    let color;
    do {
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === excludeColor);
    return color;
  };

  // useEffect for to set each line with a random color 
  useEffect(() => {
    setScores(prevScores => {
      let lastColor = null;
      return prevScores.map(score => {
        const newColor = getRandomColor(lastColor);
        lastColor = newColor;
        return {
          ...score,
          color: newColor,
          nom: score.nom.toUpperCase(),
          score: score.score.toUpperCase(),
        };
      });
    });
  }, []);

  // function type
  const scoreColumn = (dataScore, key) => (
    <FlatList
      data={dataScore}
      keyExtractor={(item) => item.classement.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={[styles.itemText, { color: item.color }]}>
            {item[key]}
          </Text>
        </View>
      )}
      scrollEnabled={false}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Classement</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Score</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Nom</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            {scoreColumn(scores, 'classement')}
          </View>
          <View style={styles.column}>
            {scoreColumn(scores, 'score')}
          </View>
          <View style={styles.column}>
            {scoreColumn(scores, 'nom')}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 56,
    backgroundColor: '#1e293b',
    borderRadius: 15,
    height: '100%',
  },
  flexContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'white',
    fontSize: 24,
    fontWeight: 700,
  },
  row: {
    flexDirection: 'row',
    borderColor: '#d1d5db',
  },
  columnHeader: {
    width: '33%',
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  column: {
    width: '33%',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 8,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
