import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChannelCreation } from '../screens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.background },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="<나와, 너>" component={MainTab} />
    </Stack.Navigator>
  );
};

export default MainStack;