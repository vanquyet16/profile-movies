import { atom, selector } from "recoil";
import { getUserInfo } from "zmp-sdk";
import { Movie } from "./model/movie";
import authenticationAPI from "./apis/authApi";
import { useSnackbar } from "zmp-ui";

const api_key = "f2cf4dee03036aa9e6fe7b67466e5772";

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const fetchTrendingMovies = selector<Movie[]>({
  key: 'fetchTrendingMovies',
  get: async () => {
    // const { openSnackbar, closeSnackbar } = useSnackbar(); // Đưa vào bên trong hàm get
    // openSnackbar({
    //   type: "loading",
    //   text: "Loading Trending Movies...",
    // });
    try {
      const movies_trending: any = await authenticationAPI.HandleAuthentication(
        `/trending/movie/week?language=vi&api_key=${api_key}`,
        "get"
      );
      const trendingMovies = movies_trending.results;
      // closeSnackbar();
      return trendingMovies;
    } catch (error) {
      console.log("Error fetching trending movies:", error);
      // closeSnackbar();
      // openSnackbar({
      //   type: "error",
      //   text: "Failed to fetch trending movies. Please try again later.",
      // });
      return []; // Trả về một mảng rỗng nếu xảy ra lỗi
    }
  },
});

export const fetchUpcomingMovies = selector<Movie[]>({
  key: 'fetchUpcomingMovies',
  get: async () => {
    // const { openSnackbar, closeSnackbar } = useSnackbar(); // Đưa vào bên trong hàm get
    // openSnackbar({
    //   type: "loading",
    //   text: "Loading Upcoming Movies...",
    // });
    try {
      const movies_upcoming: any = await authenticationAPI.HandleAuthentication(
        `/movie/upcoming?language=vi&api_key=${api_key}`,
        "get"
      );
      const upcomingMovies = movies_upcoming.results;
      // closeSnackbar();
      return upcomingMovies;
    } catch (error) {
      console.log("Error fetching upcoming movies:", error);
      // closeSnackbar();
      // openSnackbar({
      //   type: "error",
      //   text: "Failed to fetch upcoming movies. Please try again later.",
      // });
      return []; // Trả về một mảng rỗng nếu xảy ra lỗi
    }
  },
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});
