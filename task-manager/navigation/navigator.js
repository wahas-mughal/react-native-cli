import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Main from '../screens/Main';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';

//initialize stack navigation
const Stack = createStackNavigator();

//main stack navigator
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'SFUIDisplay-Regular.otf',
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#3e94f0',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="forgetpassword"
        component={ForgetPassword}
        options={{
          title: 'Forgot Password',
        }}
      />
      <Stack.Screen
        name="taskmanager"
        component={Main}
        options={{
          title: 'Task Manager',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
