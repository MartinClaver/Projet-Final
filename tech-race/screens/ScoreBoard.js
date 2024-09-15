import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { formatTime } from '../components/Timer';
import HomeLogo from "../assets/HomeLogo.svg";

const ScoreBoard = ({ navigation }) => {
  const title = 'Leaderboard';
  const [stats, setStats] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const colors = ['deeppink', 'skyblue', 'yellow', 'greenyellow', 'darkorange'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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

  const sortDataByTime = (data, order) => {
    return [...data].sort((a, b) => {
      return order === 'asc' ? a.total_time - b.total_time : b.total_time - a.total_time;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

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
      setStats(sortDataByTime(colorStats, sortOrder));
    };
    dataStats();
  }, [sortOrder]);

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.homeLogo}>
          <HomeLogo onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.row}>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Time</Text>
          </View>
        </View>
        <View style={styles.sortButtonContainer}>
          <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton} testID="sort-button">
            <Text style={styles.sortButtonText} testID="sort-button-text">
              Time : {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={stats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={[styles.itemText, { color: item.color }]}>
                {formatDate(item.created_at)}
              </Text>
              <Text style={[styles.itemText, { color: item.color }]}>
                {formatTime(item.total_time)}
              </Text>
            </View>
          )}
          scrollEnabled={true}
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
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  homeLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    borderColor: '#d1d5db',
  },
  columnHeader: {
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 14,
  },
  sortButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  sortButton: {
    backgroundColor: '#4a5568',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScoreBoard;
