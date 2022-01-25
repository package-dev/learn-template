const config = {
  screen: {
    insta_home: 'insta_home',
    screen_dashboard: 'screen_dashboard',
    screen_dashboard2: {
      path: 'profule/:id',
      parse: {
        id: id => `${id}`,
      },
    },
  },
}
const linking = {
  prefixes: ['demo://app'],
  config,
}
export default linking
