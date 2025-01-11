import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons

import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: true }}  // Show header with custom left component
    />
    <Stack.Screen 
      name="DetailsScreen" 
      component={DetailsScreen} 
      options={{ title: 'Movie Details' }} 
    />
  </Stack.Navigator>
);

// Search stack
const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Search" 
      component={SearchScreen} 
      options={{ headerShown: true }}  // Show the header for SearchScreen
    />
    <Stack.Screen 
      name="DetailsScreen" 
      component={DetailsScreen} 
      options={{ title: 'Movie Details' }} 
    />
  </Stack.Navigator>
);

// Main tab navigator
const MainTabs = () => (
  <Tab.Navigator 
    screenOptions={{
      headerShown: false, // Hide header in the Tab navigator
      tabBarActiveTintColor: '#fff', // Set active tab icon color to white
      tabBarInactiveTintColor: '#bbb', // Set inactive tab icon color to grey
      tabBarStyle: {
        backgroundColor: '#000', // Set bottom tab bar background to black
        borderTopWidth: 0, // Remove border
      },
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} /> // Icon for Home
        ),
      }} 
    />
    <Tab.Screen 
      name="Search" 
      component={SearchStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search-outline" size={size} color={color} /> // Icon for Search
        ),
      }} 
    />
  </Tab.Navigator>
);

// Root navigator
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
