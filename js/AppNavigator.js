
import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react/native';

import { Drawer, Spinner, View } from 'native-base';
import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage/';
import SideBar from './components/sideBar';
import Signup from './components/signup';
import { statusBarColor } from './themes/base-theme';

import AppViewStore from './stores/ViewStore/AppViewStore.js';
import AuthStore from './stores/EntityStore/AuthStore.js';
import AuthService from './services/AuthService.js';
import UserModel from './models/UserModel.js';

const TOKEN_KEY = '@Token:key';

@observer
class AppNavigator extends Component {

  componentDidMount() {
    this._loadInitialState();
  }

  componentWillReact() {
    if (AppViewStore.drawerOpened && this._drawer) {
      this._drawer.open();
    } else {
      this._drawer.close();
    }
  }

  _loadInitialState() { // eslint-disable-line class-methods-use-this
    AppViewStore.appLoading = true;
    AsyncStorage.getItem(TOKEN_KEY)
          .then((responseToken) => {
              // console.log('Saved Data is: ' + responseToken);
              // call to backend
            if (responseToken) {
              AuthService.getUser(responseToken)
                .then(response => response.json())
                .then((responseJson) => {
                  responseJson.data // eslint-disable-line no-param-reassign
                    .jwtAccessToken = responseToken;
                  if (responseJson.success === true) {
                    const userObj = new UserModel(responseJson.data);
                    AuthStore.setUser(userObj);
                    AppViewStore.replaceRoute({ key: 'home' });
                  }
                })
                .catch((error) => {
                  console.log('Error is: ', error);
                })
                .finally(() => {
                  AppViewStore.appLoading = false;
                });
            } else {
              AppViewStore.appLoading = false;
            }
          })
          .catch((error) => {
            console.log('Error in retreiving data', error);
          });
  }

  renderScene() { // eslint-disable-line class-methods-use-this
    switch (AppViewStore.routeStack2[AppViewStore.routeStack2.length - 1].key) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      default:
        return 'login';
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        onClose={() => { AppViewStore.drawerOpened = false; }}
        type="overlay"
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
        />
        {AppViewStore.appLoading ?
          <View style={{ flex: 1, backgroundColor: '#384850' }}>
            <Spinner style={{ flex: 1 }} />
          </View> :
          this.renderScene(AppViewStore.drawerOpened)}
      </Drawer>
    );
  }

}


export default AppNavigator;
