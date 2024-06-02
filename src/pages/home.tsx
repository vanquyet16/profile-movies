import React, { useEffect, useState } from "react";
import { Page, Box, useSnackbar, Text, useNavigate, Avatar } from "zmp-ui";
import authenticationAPI from "../apis/authApi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SwiperTrenDing from "../components/swiper-trending";
import SwiperNew from "../components/swiper-new";
import { Movie } from "../model/movie";
import { API_KEY } from "../constants/appInfos";
import { appColor } from "../utils/app-config";
import { getUserInfo } from "zmp-sdk/apis";
import HeaderComponent from "../components/HeaderComponent";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [img, setImg] = useState('')

  const fetchMovies = async () => {
    openSnackbar({
      type: "loading",
      text: "Loading...",
    });
    try {
      const trendingResponse:any = await authenticationAPI.HandleAuthentication(
        `/trending/movie/week?language=vi&api_key=${API_KEY}`,
        "get"
      );
      if (trendingResponse && trendingResponse.results) {
        setTrendingMovies(trendingResponse.results);
      } else {
        throw new Error("Trending movies data is empty");
      }

      const upcomingResponse:any = await authenticationAPI.HandleAuthentication(
        `/movie/upcoming?language=vi&api_key=${API_KEY}`,
        "get"
      );
      if (upcomingResponse && upcomingResponse.results) {
        setUpcomingMovies(upcomingResponse.results);
      } else {
        throw new Error("Upcoming movies data is empty");
      }
      const topMoviesResponse:any = await authenticationAPI.HandleAuthentication(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        "get"
      );
      if (topMoviesResponse && topMoviesResponse.results) {
        setTopMovies(topMoviesResponse.results);
      } else {
        throw new Error("Upcoming movies data is empty");
      }

      closeSnackbar();
    } catch (error) {
      console.log("Error fetching movies:", error);
      closeSnackbar();
      openSnackbar({
        type: "error",
        text: `Failed to fetch movies. ${(error as Error).message}`,
      });
    }
  };
  const handelDetail = (item: Movie) => {
    navigate(`detail-movie/${item.id}`)
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleClickSearch = () => {
  navigate('/search',{direction: 'forward', animate: true}) 
  }

  return (
    <Page className="">
      <Box className="with-full" p={0}>
        <Box className="h-auto">
        <HeaderComponent onclick={() =>handleClickSearch()}/>
          <Text className="text-white p-3" size="xLarge" bold={true}>
            Phim hot
          </Text>
          <SwiperTrenDing data={topMovies} onSlideClick={(item:Movie) => {
            handelDetail(item)
          }}/>
        </Box>
        <Box className="h-auto">
          <Box flexDirection="row" justifyContent="space-between">
            <Text className="text-white p-2" size="xLarge" bold={true}>
              Sắp chiếu
            </Text>
            <Text className="text-[#F8EE0D] p-2" size="xLarge" bold={true}>
              Xem thêm
            </Text>
          </Box>
          <SwiperNew data={trendingMovies} onSlideClick={(item:Movie) => {
            handelDetail(item)
          }}/>
        </Box>
        <Box className="h-auto">
          <Box flexDirection="row" justifyContent="space-between">
            <Text className="text-white p-2" size="xLarge" bold={true}>
              Đang chiếu
            </Text>
            <Text className="text-[#F8EE0D] p-2" size="xLarge" bold={true}>
              Xem thêm
            </Text>
          </Box>
          <SwiperNew data={upcomingMovies} onSlideClick={(item:Movie) => {
            handelDetail(item)
          }}/>
        </Box>
      

        <Box height={60}></Box>
      </Box>
    </Page>
  );
};

export default HomePage;


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
