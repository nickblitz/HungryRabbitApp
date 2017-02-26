import React, { Component } from 'react';
import { Image } from 'react-native';

import { Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import { observer } from 'mobx-react/native';

import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import SignUpViewStore from '../../stores/ViewStore/SignUpViewStore.js';
import Spinner from '../loaders/Spinner';
import ErrorMsg from '../errorMsg';

// import { observable, computed } from 'mobx';

const backgroundImage = require('../../../images/glow2.png');

@observer
class SignUp extends Component { // eslint-disable-line

  render() { // eslint-disable-line class-methods-use-this
    const showErrors = !SignUpViewStore.isValid &&
                          SignUpViewStore.isSubmitted &&
                          SignUpViewStore.validationErrors;
    const showEmailError = showErrors && SignUpViewStore.validationErrors.email;
    const showNameError = showErrors && SignUpViewStore.validationErrors.name;
    const showPasswordError = showErrors && SignUpViewStore.validationErrors.password;
    const showReTypePasswordError = showErrors && SignUpViewStore.validationErrors.reTypePassword;
    return (
      <Container theme={theme} style={{ backgroundColor: 'rgba(65,75,85,1)' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent onPress={() => AppViewStore.popRoute()}>
              <Icon name="ios-arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
            </Button>

            <Title>Sign Up</Title>
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }} keyboardShouldPersistTaps>
            <View padder>

              <View style={styles.mb25}>
                <InputGroup>
                  <Icon name="ios-mail-open-outline" />
                  <Input
                    style={{ borderBottomColor: 'white' }}
                    placeholderTextColor="white"
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={
                    SignUpViewStore.isSubmitted
                    ?
                    (email) => {
                      SignUpViewStore.email = email;

                      SignUpViewStore.validate();
                    }
                    :
                    (email) => { SignUpViewStore.email = email; }
                  }
                    value={SignUpViewStore.email}
                  />
                  {showEmailError && <Icon name="ios-warning" style={{ color: 'red' }} />}
                </InputGroup>
                {
                  showEmailError &&
                  SignUpViewStore.validationErrors.email.map((err, index) =>
                    <ErrorMsg key={index} >
                      {err}
                    </ErrorMsg>
                  )
                }
              </View>
              <View style={styles.mb25}>
                <InputGroup>
                  <Icon name="ios-person" />
                  <Input
                    placeholder="Name"
                    placeholderTextColor="white"
                    value={SignUpViewStore.name}
                    onChangeText={
                    SignUpViewStore.isSubmitted
                    ?
                    (name) => {
                      SignUpViewStore.name = name;

                      SignUpViewStore.validate();
                    }
                    :
                    (name) => { SignUpViewStore.name = name; }
                  }
                  />
                  {showNameError && <Icon name="ios-warning" style={{ color: 'red' }} />}
                </InputGroup>
                {
                  showNameError &&
                  SignUpViewStore.validationErrors.name.map((err, index) =>
                    <ErrorMsg key={index} >
                      {err}
                    </ErrorMsg>
                  )
                }
              </View>

              <View style={styles.mb25}>
                <InputGroup>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholderTextColor="white"
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={
                        SignUpViewStore.isSubmitted
                        ?
                        (password) => {
                          SignUpViewStore.password = password;

                          SignUpViewStore.validate();
                        }
                        :
                        (password) => { SignUpViewStore.password = password; }
                      }
                    value={SignUpViewStore.password}
                  />
                  {showPasswordError && <Icon name="ios-warning" style={{ color: 'red' }} />}
                </InputGroup>
                {
                  showPasswordError &&
                  SignUpViewStore.validationErrors.password.map((err, index) =>
                    <ErrorMsg key={index} >
                      {err}
                    </ErrorMsg>
                  )
                }
              </View>
              <View style={styles.mb25}>
                <InputGroup>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="Re-Type Password"
                    secureTextEntry
                    placeholderTextColor="white"
                    onChangeText={
                        SignUpViewStore.isSubmitted
                        ?
                        (reTypePassword) => {
                          SignUpViewStore.reTypePassword = reTypePassword;

                          SignUpViewStore.validate();
                        }
                        :
                        (reTypePassword) => { SignUpViewStore.reTypePassword = reTypePassword; }
                      }
                    value={SignUpViewStore.reTypePassword}
                  />
                  {showReTypePasswordError && <Icon name="ios-warning" style={{ color: 'red' }} />}
                </InputGroup>
                {
                  showReTypePasswordError &&
                  SignUpViewStore.validationErrors.reTypePassword.map((err, index) =>
                    <ErrorMsg key={index} >
                      {err}
                    </ErrorMsg>
                  )
                }
              </View>

              <Button
                rounded
                block
                style={{ backgroundColor: '#fff', marginTop: 20 }}
                textStyle={{ color: '#00c497' }}
                onPress={() => SignUpViewStore.submit()}
              >
                {!SignUpViewStore.isSubmitting ? <Text style={{ color: 'rgba(1,188,140,1)' }}>Save and Continue</Text> : <Spinner color={'rgba(1,188,140,1)'} />}
              </Button>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}

export default SignUp;
