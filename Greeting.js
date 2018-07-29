import React from 'react'
import { Text } from 'react-native'
import { connect } from './store'

class Greeting extends React.Component {
  render() {
    return <Text>{this.props.greeting}</Text>
  }
}

const wrapped = connect(({ greeting }) => ({
  greeting
}))(Greeting)

export { wrapped as Greeting }
