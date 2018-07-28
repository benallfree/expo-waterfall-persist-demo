import React from 'react'
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native'
import { createStoreAsync } from 'expo-waterfall-persist'

const config = {
  initialState: { version: 4, greeting: 'Hello world!' },
  actionsCreators: {
    setGreeting: (state, actions, greeting) => ({ greeting })
  }
}

class Greeting extends React.Component {
  render() {
    return <Text>{this.props.greeting}</Text>
  }
}

export default class App extends React.Component {
  state = {
    isReady: false,
    opacity: 0
  }
  componentDidMount() {
    createStoreAsync(config, { onSaved: this.handleStateSaved }).then(
      ({ Provider, actions, connect, subscribe, unsubscribe }) => {
        this.actions = actions
        this.Provider = Provider
        this.Greeting = connect(({ greeting }) => ({ greeting }))(Greeting)
        this.setState({ isReady: true })
      }
    )
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
    this.actions.setGreeting(text)
  }

  render() {
    if (!this.state.isReady) return null
    return (
      <View style={styles.container}>
        <this.Provider>
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
            <this.Greeting />
          </View>
          <TextInput
            placeholder="New greeting"
            onChangeText={this.handleChange}
          />
        </this.Provider>
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
