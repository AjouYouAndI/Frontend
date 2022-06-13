import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList, ChannelCreation, Rank } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    const theme = useContext(ThemeContext);
    return (
        <MaterialIcons
        name={name}
        size={26}
        color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
        />
    );
};

const MainTab = () => {
    const theme = useContext(ThemeContext);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: theme.tabActiveColor,
                inactiveTintColor: theme.tabInactiveColor,
            }}
        >
            <Tab.Screen 
            name = "글 목록" 
            component={ChannelList} 
            options={{
                tabBarIcon: ({ focused }) =>
                TabBarIcon({
                    focused,
                    name: focused ? 'chat-bubble' : 'chat-bubble-outline',
                }),
                unmountOnBlur: true
            }}
            listeners={({ navigation }) => ({
                blur: () => navigation.setParams({ screen: undefined }),
              })}
            />
            <Tab.Screen 
            name = "마이페이지" 
            component={Profile}
            options={{
                tabBarIcon: ({ focused }) =>
                TabBarIcon({
                    focused,
                    name: focused ? 'person' : 'person-outline',
                }),
                unmountOnBlur: true
            }}
            listeners={({ navigation }) => ({
                blur: () => navigation.setParams({ screen: undefined }),
              })}
            />
            <Tab.Screen
            name = '글 작성'
            component={ChannelCreation}
            options={{
                tabBarIcon: ({ focused }) =>
                TabBarIcon({
                    focused,
                    name: focused ? 'add-circle' : 'add-circle-outline',
                }),
                unmountOnBlur: true
            }}
            listeners={({ navigation }) => ({
                blur: () => navigation.setParams({ screen: undefined }),
              })}
            />
            <Tab.Screen
            name = '추천'
            component={Rank}
            options={{
                tabBarIcon: ({ focused }) =>
                TabBarIcon({
                    focused,
                    name: focused ? 'recommend' : 'recommend',
                }),
                unmountOnBlur: true
            }}
            listeners={({ navigation }) => ({
                blur: () => navigation.setParams({ screen: undefined }),
              })}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
