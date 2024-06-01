import React, { useEffect, useState } from "react";
import {
  Page,
  Box,
  useSnackbar,
  Text,
  useNavigate,
  Avatar,
  Icon,
} from "zmp-ui";
import authenticationAPI from "../apis/authApi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SwiperTrenDing from "../components/swiper-trending";
import SwiperNew from "../components/swiper-new";
import { Movie } from "../model/movie";
import { API_KEY, image500 } from "../constants/appInfos";
import { appColor } from "../utils/app-config";
import { getUserInfo } from "zmp-sdk/apis";
import HeaderComponent from "../components/HeaderComponent";

const SearchPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const [moviesSearch, setMoviesSearch] = useState([]);
  console.log("🚀 ~ moviesSearch:", moviesSearch);
  const [valueInput, setValueInput] = useState("");

  const handelChaneText = (e: string) => {
    setValueInput(e);
    searchMovies(e);
  };

  const searchMovies = async (nameMovie: string) => {
    // openSnackbar({
    //   type: "loading",
    //   text: "Loading...",
    // });
    try {
      const response: any = await authenticationAPI.HandleAuthentication(
        `/search/movie?query=${nameMovie}&include_adult=false&language=vi&page=1&api_key=${API_KEY}`,
        "get"
      );
      if (response && response.results) {
        console.log("🚀 ~ searchMovies ~ response.results:", response.results);
        setMoviesSearch(response.results);
      } else {
        throw new Error("Trending movies data is empty");
      }

      //   closeSnackbar();
    } catch (error) {
      console.log("Error fetching movies:", error);
      //   closeSnackbar();
      openSnackbar({
        type: "error",
        text: `Failed to fetch movies. ${(error as Error).message}`,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  }
  const handelDetail = (item: Movie) => {
    console.log("🚀 ~ handelDetail ~ item:", item)
    navigate(`/detail-movie/${item.id}`);
  };

  //   useEffect(() => {
  //     searchMovies()
  //   }, []);

  return (
    <Page>
        <div className=" flex flex-row">
        <div className="w-[30px] h-[40px]  pl-3 flex justify-center items-center" onClick={handleBack}>
          <Icon
            icon="zi-arrow-left"
            size={30}
            style={{ color: "white"}}
            className="hover:opacity-70"
          ></Icon>
        </div>
      <div className="flex items-center w-64 pl-3">
        <input
          onChange={(e) => {
            handelChaneText(e.target.value);
          }}
          value={valueInput}
          type="text"
          className="w-56 h-8 rounded-full border border-white pl-2 bg-black text-white"
          placeholder="Nhập tên"
          autoFocus={true}
        />
      </div>
        </div>
      
      <div>
        {moviesSearch.length === 0 ? (
          <div className=" flex text-white p-4 w-full justify-center">
            Không tìm thấy
          </div>
        ) : (
          moviesSearch.map((item: any) => {
            return (
              <div
                key={item}
                className="flex items-center p-4 border-b border-[#a2a1a1]"
                onClick={() => {
                    handelDetail(item);
                }}
              >
                <Avatar
                  src={image500(item.poster_path) || ""}
                  size={50}
                ></Avatar>
                <Text className="text-white p-2" size="xLarge" bold={true}>
                  {item.title}
                </Text>
              </div>
            );
          })
        )}
      </div>
    </Page>
  );
};

export default SearchPage;

// import React, { useEffect, useState } from "react";
// import { Page, Box, useSnackbar, Text } from "zmp-ui";
// import authenticationAPI from "../apis/authApi";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// import SwiperTrenDing from "../components/swiper-trending";
// import SwiperNew from "../components/swiper-new";
// import { getUserID,getUserInfo } from "zmp-sdk/apis";
// import { useRecoilValue } from "recoil";
// import { fetchTrendingMovies, fetchUpcomingMovies } from "../state";

// const HomePage: React.FunctionComponent = () => {
// const trendingMovies = useRecoilValue(fetchTrendingMovies);
//   // const upcomingMovies = useRecoilValue(fetchUpcomingMovies);

//   const { openSnackbar, closeSnackbar } = useSnackbar();
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);
//   const api_key = "f2cf4dee03036aa9e6fe7b67466e5772";

//   const fetchMovies = async () => {
//     openSnackbar({
//       type: "loading",
//       text: "Loading...",
//     });
//     try {
//       const movies_trending: any = await authenticationAPI.HandleAuthentication(
//         `/trending/movie/week?language=vi&api_key=${api_key}`,
//         "get"
//       );
//       setTrendingMovies(movies_trending.results);
//       const movies_upcoming: any = await authenticationAPI.HandleAuthentication(
//         `/movie/upcoming?language=vi&api_key=${api_key}`,
//         "get"
//       )
//       setUpcomingMovies(movies_upcoming.results)
//       closeSnackbar();

//     } catch (error) {
//       console.log("Error fetching movies:", error);
//       closeSnackbar();
//       openSnackbar({
//         type: "error",
//         text: "Failed to fetch movies. Please try again later.",
//       });
//     }
//   };

// //   getUserID({
// //     success: (data) => {
// //       // xử lý khi gọi api thành công
// //       const userID = data;
// //       console.log("🚀 ~ userID:", userID)
// //     },
// //     fail: (error) => {
// //       // xử lý khi gọi api thất bại
// //       console.log(error);
// //     }
// //   });

// // getUserInfo({
// //   avatarType: "normal",
// //   success: (data) => {
// //     // xử lý khi gọi api thành công
// //     const { userInfo } = data;
// //     console.log("🚀 ~ userInfo:", userInfo)
// //   },
// //   fail: (error) => {
// //     // xử lý khi gọi api thất bại
// //     console.log(error);
// //   }
// // });

//   useEffect(() => {
//     fetchMovies();
//     }, []);

//   return (
//     <Page style={{ flex: 1, backgroundColor: "#6D736D" }}>
//       <Box className="with-full" p={0}>
//         <Box className="h-auto">
//           <Text className="text-[#FFFF] p-3" size="xLarge" bold={true}>
//             Xu hướng
//           </Text>
//             <SwiperTrenDing data={trendingMovies} />
//         </Box>

//         <Box className="h-auto" >
//           <Box flexDirection="row" justifyContent="space-between">
//           <Text className="text-[#FFFF] p-2" size="xLarge" bold={true}>
//             Sắp chiếu
//           </Text>
//           <Text className="text-[#F8EE0D] p-2" size="xLarge" bold={true}>
//             xem thêm
//           </Text>
//           </Box>

//          <SwiperNew data={upcomingMovies} />
//         </Box>
//       </Box>
//     </Page>
//   );
// };

// export default HomePage;
