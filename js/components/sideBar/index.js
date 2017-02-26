
import React, { Component } from 'react';
import { Text, Icon, List, ListItem, Content, Thumbnail } from 'native-base';

import styles from './style';

import AppViewStore from '../../stores/ViewStore/AppViewStore.js';

const logo = require('../../../images/icon2.png');

class SideBar extends Component { // eslint-disable-line
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Content style={{ backgroundColor: '#252A30' }} >
        <Thumbnail size={200} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 15, resizeMode: 'contain' }} circular source={logo} />
        <List foregroundColor={'white'} >
          <ListItem
            button
            onPress={
              () => {
                AppViewStore.drawerOpened = false;
                if (AppViewStore.routeStack2[AppViewStore.routeStack2.length - 1].key !== 'home') {
                  AppViewStore.pushRoute({ key: 'home' });
                }
              }
            }
            iconLeft style={styles.links}
          >
            <Icon name="ios-home" />
            <Text >Home</Text>
          </ListItem>
          <ListItem
            button
            onPress={
              () => {
                AppViewStore.drawerOpened = false;
                AppViewStore.pushRoute({ key: 'blankPage' });
              }
            }
            iconLeft style={styles.links}
          >
            <Icon name="ios-chatboxes" />
            <Text>Blank Page</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}

export default SideBar;
