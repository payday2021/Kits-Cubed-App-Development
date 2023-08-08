import Constants from 'expo-constants';
import axios from 'axios';

const uri = Constants.expoConfig.debuggerHost
  ? `http://${Constants.expoConfig.debuggerHost.split(':').shift()}:8080` // if running on android emulator
  : 'http://localhost:8080'; // if running on web

export default axios.create({
  // baseURL: `http://192.168.1.52:8080`
  baseURL: uri
});
