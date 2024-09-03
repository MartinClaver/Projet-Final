import { FlatList, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 

export default function ScoreBoard() {
  let title = 'Classement des scores';

  const [scores, setScores] = useState([]);
  const colors = ['deeppink', 'skyblue', 'yellow', 'greenyellow', 'darkorange'];

  const getRandomColor = (excludeColor) => {
    let color;
    do {
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === excludeColor);
    return color;
  };

  async function fetchStats() {
    try {
      const response = await fetch('/test');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const stats = await response.json();
      console.log('Stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('classement', { ascending: true });  

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        let lastColor = null;
        const StatsScores = data.map(score => {
          const newColor = getRandomColor(lastColor);
          lastColor = newColor;
          return {
            classement: score.classement,
            score: score.score.toUpperCase(),
            nom: score.nom.toUpperCase(),
            color: newColor,
          };
        });
        setScores(StatsScores);
      }
    };

    fetchScores();
  }, []);

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
