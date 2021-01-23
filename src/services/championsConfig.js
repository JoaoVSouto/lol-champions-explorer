import { LOCAL_STORAGE_KEY } from '../constants';

class ChampionsConfig {
  getAll() {
    const rawStoredConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedConfig = rawStoredConfig ? JSON.parse(rawStoredConfig) : {};

    return storedConfig;
  }

  get(key) {
    const config = this.getAll();

    return config[key];
  }

  set(config) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  }
}

export default new ChampionsConfig();
