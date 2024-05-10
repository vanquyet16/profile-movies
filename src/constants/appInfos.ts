
export const appInfo = {
  BASE_URL: 'https://api.themoviedb.org/3',
};

export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;
export const image1852 = profile_path=> profile_path? 'https://image.tmdb.org/t/p/w185'+profile_path : null;

export const API_KEY = 'f2cf4dee03036aa9e6fe7b67466e5772';
