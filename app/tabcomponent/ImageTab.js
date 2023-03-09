import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageBoard from '../screens/ImageBoard';
import ImageDetail from '../screens/ImageDetail';
import ModifyImage from '../components/modifycontentcomp/ModifyImage';
import UserDetail from '../screens/UserDetail';
import DirectMessage from '../screens/DirectMessage';
import MessageBox from '../screens/MessageBox';

const Stack = createNativeStackNavigator();

const ImageTab = () => {
  return (
    <Stack.Navigator initialRouteName="ImageBoard">
      <Stack.Screen
        name="ImageBoard"
        component={ImageBoard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ModifyImage"
        component={ModifyImage}
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
export default ImageTab;
