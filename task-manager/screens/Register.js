import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {Button, Text} from 'native-base';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

const Register = (props) => {
  const {width} = Dimensions.get('window');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //initialize firestore
  const db = firestore();

  const [response, setResponse] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const {
  //         status,
  //       } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  //react-native image picker approach
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response.uri);
        setResponse(response);
      },
    );
  };

  //sign up with firebase
  const signUpUserHandler = () => {
    try {
      if (email && password && fname && lname) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            props.navigation.navigate('taskmanager');
            uploadPhoto(response.uri, res.user.uid);
            return db.collection('users').doc(res.user.uid).set({
              first_name: fname,
              last_name: lname,
            });
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('Error', 'Email address is already in use!', [
                {text: 'Okay'},
              ]);
            }
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Error', 'Email address is invalid!', [
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
        Alert.alert('Error', 'Please fill all the fields!', [{text: 'Okay'}]);
        console.log('done');
      }
    } catch (err) {
      throw err;
    }
  };

  // //to upload an image to firebase
  const uploadPhoto = async (uri, userId) => {
    try {
      //to resolve file path issue on different platforms
      let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      //the putFile method on a reference accepts a string path to the file on the users device.
      const ref = storage().ref(`users/${userId}/profileImage`);
      await ref.putFile(uploadUri);
    } catch (err) {
      throw err;
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          padding: 15,
        }}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={-200}
          style={{width: '100%'}}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: width / 15,
              }}>
              <Button
                block
                onPress={pickImage}
                style={[styles.btn, {marginBottom: 15}]}>
                <Text> Pick an image </Text>
              </Button>
              {response && (
                <Image
                  source={{
                    uri: response.uri,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.authContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#888"
              value={fname}
              onChangeText={(text) => setFName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#888"
              value={lname}
              onChangeText={(text) => setLName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{width: '100%'}}>
          <Button block style={styles.btn} onPress={signUpUserHandler}>
            <Text
              style={[
                styles.text,
                {fontWeight: 'bold', textTransform: 'capitalize'},
              ]}>
              {' '}
              Sign Up
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'red',
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
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderRadius: Dimensions.get('window').width / 3,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: Dimensions.get('window').width / 15,
  },
});
