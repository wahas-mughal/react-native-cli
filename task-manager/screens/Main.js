import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Main = () => {
  const [pushToken, setPushToken] = useState('');

  //handler the notification on the foreground while the app is running
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    // if user has given permissions
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((res) => {
        // if permissions has not been granted then ask
        if (res.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        //return the updated response object for next .then block
        return res;
      })
      .then((res) => {
        if (res.status !== 'granted') {
          Alert.alert(
            'Permissions are required!',
            'Please give me permission to receive notifications',
            [{text: 'Okay'}],
          );
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync({
          experienceId: 'wahas_mughal/awesomeproject',
        });
      })
      .then((res) => {
        const pushNoticationToken = res.data;
        console.log(pushNoticationToken);
        setPushToken(pushNoticationToken);
      });
  }, []);

  useEffect(() => {
    // show notification
    const notitificationSubscription = Notifications.addNotificationResponseReceivedListener(
      (notifications) => {
        console.log(notifications);
      },
    );

    //do whatever you like. will fire when the user will tab on notification
    const takeActionOnNotificationResponse = Notifications.addNotificationReceivedListener(
      (notifications) => {
        console.log(notifications);
      },
    );

    return () => {
      notitificationSubscription.remove();
      takeActionOnNotificationResponse.remove();
    };
  }, []);

  const triggerNotification = async () => {
    console.log('executed');
    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          host: 'exp.host',
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          data: {extractData: 'some meta data'},
          title: 'You have received an order',
          body:
            'The order has been placed by Muhammad Karim, tab to see the details',
        }),
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Icon name="plussquare" size={60} />
        <Button block onPress={triggerNotification}>
          <Text> Send Notification</Text>
        </Button>
      </View>
      <View style={styles.tasksView}>
        <View style={styles.task}>
          <Text> Task 1 </Text>
        </View>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#3e94f0',
    paddingTop: 20,
  },
  iconView: {
    width: '100%',
    alignItems: 'center',
  },
  tasksView: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
});
