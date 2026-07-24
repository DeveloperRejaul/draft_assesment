import { fetch } from '@react-native-community/netinfo';


class Net {
  async isConnected () {
    const status = await fetch();
    return status.isConnected && status.isInternetReachable;
  }
}

export default new Net()