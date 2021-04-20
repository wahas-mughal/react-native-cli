import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';

import {Button, Text} from 'native-base';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');

  //forgot password
  const forgotPassword = (email) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Error', 'Email has been sent. Please check your email!', [
          {text: 'Okay'},
        ]);
      })
      .catch((err) => {
        Alert.alert('Error', 'Please enter a valid email!', [{text: 'Okay'}]);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={40}
          style={{width: '100%'}}>
          <View style={styles.authContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{width: '100%'}}>
          <Button
            block
            style={styles.btn}
            onPress={() => forgotPassword(email)}>
            <Text
              style={[
                styles.text,
                {fontWeight: 'bold', textTransform: 'capitalize'},
              ]}>
              {' '}
              Submit
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
