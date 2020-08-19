/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

function Index() {
  useEffect(() => {
    console.log('isoK');
  }, []);
  return (
    <View>
      <Text>home</Text>
    </View>
  );
}

export default Index;
