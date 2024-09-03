import { FlatList, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ScoreBoard() {

  let title = 'Classement des scores';

    // function for getRandomColor
    const getRandomColor = (excludeColor) => {
        let color;
        do {
          color = colors[Math.floor(Math.random() * colors.length)];
        } while (color === excludeColor);
        return color;
      };

  async function fetchStats() {

    const { data, error } = await supabase
        .from('stats')
        .select('*')

    if (error) {
        console.error('sa marche pas la récup de donnée :', error);
        return []
    } else {
        console.log('sa marche chef :', data);
        return data
    }
  }

  const colors = ['deeppink', 'skyblue', 'yellow', 'greenyellow', 'darkorange'];

  // useEffect for to set each line with a random color 
  useEffect(() => {
    const dataStats = async () => {
        const data = await fetchStats;
        let lastColor = null;
        const colorStats = data.map(entry => {
            const newColor = getRandomColor(lastColor);
            lastColor = newColor
            return {
                ...entry,
                color: newColor,
            };
        });
        setStats(colorStats);
    };

    dataStats();
  }, []);

  // Fonction pour rendre une colonne de scores
  const scoreColumn = (dataScore, key) => (
    <FlatList
      data={dataScore}
      keyExtractor={(item) => item.id.toString()}
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
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Temps</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            {scoreColumn(stats, 'created_at')}
          </View>
          <View style={styles.column}>
            {scoreColumn(stats, 'sum-speed')}
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
