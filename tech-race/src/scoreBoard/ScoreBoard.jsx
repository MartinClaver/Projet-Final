import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function ScoreBoard() {
  const title = 'Classement des scores';

  const [scores, setScores] = useState([
    { classement: 1, score: '1min30', nom: 'Clément' },
    { classement: 2, score: '1min20', nom: 'Nelson' },
    { classement: 3, score: '1min10', nom: 'Wilson' },
    { classement: 4, score: 'test', nom: 'dfgd' }
  ]);

  // useEffect(() => {
  //   fetchScores();
  // }, []);

  // const fetchScores = async () => {
  //   try {
  //     const response = await fetch('./database/test.json');
  //     const data = await response.json();
  //     setScores(data);
  //   } catch (error) {
  //     console.error('Ah batard:', error);
  //   }
  // };

  const scoreColumn = (dataScore, key) => (
    <FlatList
      data={dataScore}
      keyExtractor={(item) => item.classement.toString()}
      renderItem={({ item }) => (
        <View className="border-gray-300 py-1">
          <Text className="text-center text-sm text-white">
            {item[key]}
          </Text>
        </View>
      )}
      scrollEnabled={false}
    />
  );

  return (
    <View className="p-4 mt-14 bg-slate-900 rounded-xl h-[100%]">
      <View className="flex">
        <View>
          <Text className="text-center mb-4 text-white text-xl">{title}</Text>
        </View>
        <View className="flex-row">
          <View className="w-1/3 border-b border-gray-300">
            <Text className="text-center font-bold text-lg text-white">Classement</Text>
          </View>
          <View className="w-1/3 border-b border-gray-300">
            <Text className="text-center font-bold text-lg text-white">Score</Text>
          </View>
          <View className="w-1/3 border-b border-gray-300">
            <Text className="text-center font-bold text-lg text-white">Nom</Text>
          </View>
        </View>
        <View className="flex-row pb-2">
          <View className="w-1/3">
            {scoreColumn(scores, 'classement')}
          </View>
          <View className="w-1/3">
            {scoreColumn(scores, 'score')}
          </View>
          <View className="w-1/3">
            {scoreColumn(scores, 'nom')}
          </View>
        </View>
      </View>
    </View>
  );
}
