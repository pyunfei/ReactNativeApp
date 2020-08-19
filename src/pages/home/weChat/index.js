/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import PageView from '@/components/PageView';


function Index() {
  useEffect(() => {
    console.log('isoK');
  }, []);
  return (
    <PageView>
      <Text>home</Text>
    </PageView>
  );
}

export default Index;
