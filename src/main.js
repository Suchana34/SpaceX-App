import Vue from 'vue';
import App from './App.vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import router from './router'

// Register the VueApollo plugin with Vue.
Vue.use(VueApollo);
// Create a new HttpLink to connect to your GraphQL API.
const httpLink = new HttpLink({
  uri: 'https://spacex-qraphql-api.now.sh/'
});
const link = httpLink;
// Create the apollo client
const apolloClient = new ApolloClient({
  // Tells Apollo to use the link chain with the http link we set up.
  link,
  // Handles caching of results and mutations.
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  // Inject apolloProvider for components to use.
  router,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');