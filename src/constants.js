export const ROOT_LOL_API =
  process.env.NODE_ENV === 'development'
    ? 'http://ddragon.leagueoflegends.com/cdn/11.1.1'
    : 'https://ddragon.leagueoflegends.com/cdn/11.1.1';

export const SPLASH_LOL_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash'
    : 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash';

export const LOCAL_STORAGE_KEY = '@lc/config';
