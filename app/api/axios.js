import Constants from 'expo-constants';
import axios from 'axios';

const { manifest } = Constants;
const uri = `http://${Constants.expoConfig.debuggerHost
  .split(':')
  .shift()}:8080`;

export default axios.create({
  // baseURL: `http://192.168.1.52:8080`
  baseURL: uri
});
