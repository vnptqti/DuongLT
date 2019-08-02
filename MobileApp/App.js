import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Button, Container, Header, Left, Right, Icon, Text } from 'native-base';
import MainComponent from './src/components/MainComponent';
import DanhGiaComponent from './src/components/DanhGiaComponent';
import { DrawerItems } from 'react-navigation';
import RNRestart from 'react-native-restart';

class MyRestartScreen extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 100, marginLeft: 100 }}>
        <Button onPress={() => this.props.navigation.goBack()} >
          <Text>Go back home</Text>
        </Button>
      </View>
    );
  }
}//End of MyNotificationsScreen class

// const MyDrawerNavigator = createDrawerNavigator({
//    Home:{ 
//       screen: MainComponent,
//    },
//    Notifications: {
//       screen: MyNotificationsScreen,
//    },
//  });

const MyDrawerNavigator = createDrawerNavigator(
  {
    'Home': {
      screen: MainComponent
    },
    'DanhGia': {
      screen: DanhGiaComponent,
      navigationOptions: {
        drawerLabel: 'Đánh giá chất lượng ghi âm',
    },
    }
  },
  {
    contentComponent: (props) => (
      <View style={{ flex: 1 }}>
        <View >
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() =>
            Alert.alert(
              'Logout',
              'Bạn có muốn đổi tài khoản?',
              [
                { text: 'Cancel', onPress: () => { return null } },
                {
                  text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    RNRestart.Restart();
                  }
                },
              ],
              { cancelable: false }
            )
          }>
            <Text style={{ margin: 16, fontSize: 14, fontWeight: 'bold', color: '#d35400' }}>Đổi tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

const MyApp = createAppContainer(MyDrawerNavigator);

class App extends React.Component {
  render() {
    return (
      <Container>
        <MyApp >
        </MyApp >
      </Container>
    );
  }
}//End of App class

export default App;