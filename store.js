import createStore from 'react-waterfall'
import { persist } from 'expo-waterfall-persist'

const config = {
  initialState: { version: 1, greeting: 'Hello world!', tick: 0 },
  actionsCreators: {
    setGreeting: (state, actions, greeting) => ({ greeting }),
    tick: ({ tick }) => ({
      tick: tick + 1
    })
  }
}

export const { Provider, actions, connect } = createStore(config, [persist])
