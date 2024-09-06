import { FlatList, Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { formatTime } from '../components/Timer';

export default function ScoreBoard() {

  const title = 'Classement des scores';
  const [stats, setStats] = useState([]);
  const colors = ['deeppink', 'skyblue', 'yellow', 'greenyellow', 'darkorange'];

  // function pour la couleur aléatoire
  const getRandomColor = (excludeColor) => {
    let color;
    do {
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === excludeColor);
    return color;
  };

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('stats')
      .select('*')

    if (error) {
      console.error('Erreur data:', error);
      return []
    }

    return data
  }

  useEffect(() => {
    const dataStats = async () => {
      const data = await fetchStats();
      let lastColor = null;
      const colorStats = data.map(entry => {
        const newColor = getRandomColor(lastColor);
        lastColor = newColor;
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
  // const scoreColumn = (dataScore, key) => {

  //   return (
  //     <FlatList
  //       data={dataScore}
  //       keyExtractor={(item) => item.id.toString()}
  //       renderItem={({ item }) => (
  //         <View style={styles.itemContainer}>
  //           <Text style={[styles.itemText, { color: item.color }]}>
  //             {data}
  //           </Text>
  //         </View>
  //       )}
  //       scrollEnabled={false}
  //     />
  //   )
  // };

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
        <FlatList
          data={stats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={[styles.itemText, { color: item.color }]}>
                {item.created_at.toISOString()}
              </Text>
              <Text style={[styles.itemText, { color: item.color }]}>
                {formatTime(item.total_time)}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
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
    fontWeight: '700',
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
