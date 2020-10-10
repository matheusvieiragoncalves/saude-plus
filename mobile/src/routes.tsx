import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreatePoint from './pages/Create';
import Home from './pages/Home';
import Points from './pages/Points';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Create" component={CreatePoint} />
        {/* <AppStack.Screen name="Detail" component={Detail as any} /> */}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
