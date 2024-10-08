import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import HomeLogo from "../assets/HomeLogo.svg";
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatTime } from '../components/Timer';
import { supabase } from '../supabaseClient';

const EndedRace = ({ route, navigation }) => {
  const { timer, motionTimer } = route.params;
  const date = new Date();
  const today = `${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);


  // Expo GO et localhost pas compatible
  // const insertRaceStats = async (data) => {
  //   try {
  //     const response = await fetch('http://localhost:4000/insertStats', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const result = await response.json();
  //     console.log('Race stats inserted:', result);
  //   } catch (error) {
  //     console.error('Error inserting race stats:', error);
  //   }
  // };

  const insertInSupabase = async (table, data) => {
    try {
      await supabase.from(table).insert(data)
    } catch (error) {
      console.error(error)
    }
  }

  const date_in_db = date.toISOString();
  const formattedTimer = formatTime(timer);
  const formattedMotionTimer = formatTime(motionTimer);

  insertInSupabase('stats',
    {
      created_at: date_in_db,
      'total_time': timer,
      motion_time: motionTimer,
      'max_speed': 1,
      distance: motionTimer
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.homeLogo}>
          <HomeLogo onPress={() => navigation.navigate('HomePage')} />
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>RACE SUMMARY</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Image source={require('../assets/carImage.png')} style={styles.carImage} />
        <View>
          <View style={StyleSheet.flatten([styles.stats, styles.timer])}>
            <Text style={styles.statTitle}>Timer</Text>
            <Text style={styles.data}>{formattedTimer}</Text>
          </View>
          <View style={styles.speed}>
            <View style={StyleSheet.flatten([styles.stats, styles.statsContainer])}>
              <Text style={styles.statTitle}>Motion Time</Text>
              <Text style={styles.data}>{formattedMotionTimer}</Text>
            </View>
            <View style={StyleSheet.flatten([styles.stats, styles.statsContainer])}>
              <Text style={styles.statTitle}>Date</Text>
              <Text style={styles.data}>{today}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  homeLogo: {
    position: 'absolute',
    top: 0,
    left: 40,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#24E8A0',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  stats: {
    backgroundColor: '#24E8A0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  timer: {
    width: 225,
    height: 100,
  },
  statsContainer: {
    height: 100,
    width: 100,
  },
  speed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  statTitle: {
    fontSize: 12,
  },
  data: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  carImage: {
    width: 280,
    height: 280,
  },
});

export default EndedRace;
