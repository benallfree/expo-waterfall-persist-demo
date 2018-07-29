import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Button
} from 'react-native'
import { Provider, actions, connect } from './store'
import { Greeting } from './Greeting'

const ShowTick = connect(({ tick }) => ({ tick }))(({ tick }) => (
  <Text>{tick}</Text>
))

export default class App extends React.Component {
  state = {
    opacity: 0
  }

  handleStartTicker = () => {
    setInterval(() => {
      actions.tick()
    }, 50)
  }

  handleStateSaved = state => {
    this.setState(
      {
        opacity: new Animated.Value(1)
      },
      () => {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 2000
        }).start()
      }
    )
  }

  handleChange = text => {
    actions.setGreeting(text)
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider onSaved={this.handleStateSaved}>
          <Text style={{ fontSize: 20 }}>
            Type a new greeting below. Close the app, open it again. The
            greeting remains.
          </Text>
          <Text style={{ fontSize: 15, fontStyle: 'italic' }}>
            Notice the debounce when it saves. State versioning is also
            supported. Modify the 'version' field in the code, and re-run. State
            will be discarded.
          </Text>
          <Animated.View
            style={{
              opacity: this.state.opacity
            }}
          >
            <Text style={{ fontSize: 15, color: 'green' }}>
              State was saved.
            </Text>
          </Animated.View>
          <View
            style={{
              padding: 10,
              margin: 10,
              borderColor: 'black',
              borderWidth: 2
            }}
          >
            <Greeting />
          </View>
          <TextInput
            placeholder="New greeting"
            onChangeText={this.handleChange}
          />
          <ShowTick />
          <Button title="Start Ticker" onPress={this.handleStartTicker} />
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10
  }
})
