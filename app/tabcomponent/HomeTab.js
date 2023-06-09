import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import UserDetail from '../screens/UserDetail';
import MessageBox from '../screens/MessageBox';
import DirectMessage from '../screens/DirectMessage';

const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageBox"
        component={MessageBox}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeTab;
