import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {Text, TextInput} from 'react-native';
// 안드로이드 글자 크기 설정 기능 제한
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

import Login from './screens/Login';
import AuthStartScreen from './screens/AuthStartScreen';
import Signup from './screens/Signup';
import KaKaoSignup from './screens/KaKaoSignup';
import VideoDetail from './screens/VideoDetail';
import store from './redux/store/configStore';
import {Colors} from './constants/colors';
import {Provider} from 'react-redux';
import LoginChecker from './components/LoginChecker';
import BottomTabNav from './components/BottomTabNav';

const Stack = createNativeStackNavigator();

//로그인전 이용하는 스크린
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStartScreen"
        component={AuthStartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// 로그인 후 이동하는 screen
// TODO: 페이지들 넣기, screenOptions 지울듯
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.mainColorBright},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.mainColorBright},
      }}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{headerShown: false}}
      />

      <Stack.Screen name="VideoDetail" component={VideoDetail} />
    </Stack.Navigator>
  );
};

const KaKaoAuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="KaKaoSignup"
        component={KaKaoSignup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const {isLogin} = useSelector(state => state.login);
  const {myNick} = useSelector(state => state.login);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      {!isLogin ? (
        <AuthStack />
      ) : myNick === '' || myNick === null || myNick === undefined ? (
        <KaKaoAuthStack />
      ) : (
        <AuthenticatedStack />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} />
        <LoginChecker />
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default App;
