import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  content: {
    marginTop: 10,
    marginBottom: 10,
  },

  w100: {
    width: '100%',
  },
  
  mt2: {
    marginTop: 10,
  },

  mb2: {
    marginBottom: 10,
  },

  source: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 3,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  recordImage: {
    width: '100%',
    height: windowHeight / 3,
    resizeMode: 'cover',
  },

  gridContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  gridItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
  },

  divider: {
    paddingVertical: 0.5,
    marginVertical: 0.5,
    backgroundColor: '#ccc'
  }
});
