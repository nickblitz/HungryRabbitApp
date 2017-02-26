
import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Text } from 'native-base';
import { Image, View } from 'react-native';
import { observer } from 'mobx-react/native';
import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';

const backgroundImage = require('../../../images/glow2.png');


@observer
class Home extends Component { // eslint-disable-line
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent>
              <Text />
            </Button>

            <Title>Dashboard</Title>

            <Button transparent onPress={() => { AppViewStore.drawerOpened = true; }}>
              <Icon name="ios-menu" />
            </Button>
          </Header>

          <Content style={{ backgroundColor: 'transparent' }} padder>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <Text>
                  User email: {AuthStore.user.email}
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Button
                  transparent
                  large
                  style={styles.roundedButton}
                  onPress={() => AuthStore.unsetUser()}
                >
                  <Icon name="ios-close-outline" />
                </Button>
              </View>
            </View>
          </Content>
        </Image>
      </Container>
        );
  }
}

export default Home;
