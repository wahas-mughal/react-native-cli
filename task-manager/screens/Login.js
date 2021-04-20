import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {Button, Text} from 'native-base';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

const Login = (props) => {
  const {width} = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //sign in with firebase
  const signInHandler = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          props.navigation.navigate('taskmanager');
          console.log('successfully signed in!', response);
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Error', 'That email address is already in use!', [
              {text: 'Okay'},
            ]);
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Error', 'That email address is invalid!', [
              {text: 'Okay'},
            ]);
          }
          if (error.code === 'auth/user-not-found') {
            Alert.alert(
              'Error',
              'There is no user record corresponding to this email!',
              [{text: 'Okay'}],
            );
          }
          if (error.code === 'auth/weak-password') {
            Alert.alert(
              'Error',
              'Your password is weak, please enter atleast 6 characters length password',
              [{text: 'Okay'}],
            );
          }
          console.log(error);
        });
    } else {
      Alert.alert('Error', 'Please enter email and password!', [
        {text: 'Okay'},
      ]);
      console.log('done');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={40}
          style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: width / 15,
            }}>
            <Image
              source={{
                uri:
                  'https://miro.medium.com/max/4000/1*8ygFKYb0Yo6Hc-vnScGA9A.png',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.authContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{width: '100%'}}>
          <Button block style={styles.btn} onPress={signInHandler}>
            <Text
              style={[
                styles.text,
                {fontWeight: 'bold', textTransform: 'capitalize'},
              ]}>
              {' '}
              Sign In
            </Text>
          </Button>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('forgetpassword')}>
            <Text style={[styles.text, {color: '#3e94f0'}]}>
              {' '}
              Forgot Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('register')}>
            <Text style={[styles.text, {color: '#3e94f0'}]}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  authContainer: {
    borderColor: '#3e94f0',
    borderWidth: 2,
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  input: {
    padding: 15,
    borderBottomColor: '#3e94f0',
    borderBottomWidth: 2,
    width: '100%',
    color: '#3e94f0',
    fontSize: RFPercentage(2.6),
    fontFamily: 'SFUIDisplay-Regular.otf',
  },
  image: {
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').width / 1.8,
    marginBottom: Dimensions.get('window').width / 15,
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    margin: 20,
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#3e94f0',
    borderRadius: 10,
  },
  text: {
    fontFamily: 'SFUIDisplay-Regular.otf',
    fontSize: RFPercentage(2.8),
  },
});
