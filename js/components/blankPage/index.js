
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';

import AppViewStore from '../../stores/ViewStore/AppViewStore.js';

const backgroundImage = require('../../../images/glow2.png');

class BlankPage extends Component { // eslint-disable-line

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent onPress={() => AppViewStore.popRoute()}>
              <Icon name="ios-arrow-back" />
            </Button>

            <Title>Blank Page</Title>

          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }} />
        </Image>
      </Container>
        );
  }
}

export default BlankPage;
