import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Calculator from './screens/calculator';
import History from './screens/history';

import configureStore from './store';

const store = configureStore();



Navigation.registerComponentWithRedux('wabacus.mobile.calculator', () => Calculator,Provider, store);
Navigation.registerComponentWithRedux('wabacus.mobile.history', () => History, Provider, store );


Navigation.events().registerAppLaunchedListener(async() => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              component: {
                name: 'wabacus.mobile.calculator',
                options: {
                  layout: {
                    orientation: ['portrait']
                  },
                  bottomTab: {
                    icon: require('./assets/calculator.png')
                  }
                }
              }
            },
            {
              component: {
                name: 'wabacus.mobile.history',
                options: {
                  layout: {
                    orientation: ['portrait']
                  },
                  bottomTab: {
                    icon: require('./assets/list.png')
                  }
                }
              }
            }
          ]
        }
      }

  });
})

