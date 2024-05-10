import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Box,
  Page,
  useSnackbar,
  Header,
  Text,
  Stack,
} from "zmp-ui";
import { useRecoilState } from "recoil";
import { displayNameState } from "../state";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { appColor } from "../utils/app-config";
import authenticationAPI from "../apis/authApi";
import { API_KEY, image185, image1852, image500 } from "../constants/appInfos";
import YouTube from "react-youtube";
import { Movie } from "../model/movie";
import "../css/app.css";
import { Cast } from "../model/cast";
import SwiperCast from "../components/swiper-cast";
const DetailMovie: React.FunctionComponent = () => {
  const [displayName, setDisplayName] = useRecoilState(displayNameState);
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const { id } = useParams();
  const [video, setVideo] = useState<Movie[]>([]);
  const [cats, setCast] = useState<Cast[]>([]);
  const [detail, setDetail] = useState<Movie>();
  const getDetail = async () => {
    openSnackbar({
      type: "loading",
      text: "Loading...",
    });
    try {
      const detailMovie: any = await authenticationAPI.HandleAuthentication(
        `/movie/560016?language=vi&api_key=f2cf4dee03036aa9e6fe7b67466e5772`,
        "get"
      );
      if (detailMovie) {
        setDetail(detailMovie);
      } else {
        throw new Error("detailMoviedata is empty");
      }

      const videoMovies: any = await authenticationAPI.HandleAuthentication(
        `/movie/${id}/videos?language=en-US&api_key=${API_KEY}`,
        "get"
      );
      if (videoMovies && videoMovies.results) {
        setVideo(videoMovies.results);
      } else {
        throw new Error("Upcoming movies data is empty");
      }

      const castMovies: any = await authenticationAPI.HandleAuthentication(
        `/movie/${id}/casts?language=en-US&api_key=${API_KEY}`,
        "get"
      );
      if (castMovies && castMovies.cast) {
        setCast(castMovies.cast);
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
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Page className={`bg-[#313230]`}>
      <Box className="w-auto">
        <YouTube
          style={{ width: "100%", height: "50%" }}
          iframeClassName="styleFrame"
          videoId={video[0]?.key}
        ></YouTube>
      </Box>
      <Box
        className="w-auto min-h-[0] h-auto flex flex-col overflow-x-hidden"
        p={3}
      >
        <h1 className="text-[#F8EE0D] font-bold text-2xl">
          {detail?.original_title}
        </h1>
        <span className="text-white text-xl flex-grow italic">
          {detail?.overview}{" "}
        </span>
        <Box flexDirection="row" alignItems="center" mt={1}>
          <h1 className="text-white text-[15px] font-bold">Ngày phát hành:</h1>
          <span className="text-opacity-50 ml-1 text-white text-[15px]">
            {detail?.release_date}
          </span>
        </Box>

        <Box flexDirection="row" alignItems="center" mt={1}>
          <h1 className="text-white text-[15px] font-bold">Điểm:</h1>
          <span className="text-opacity-50 ml-1 text-white text-[15px]">
            {detail?.vote_average}
          </span>
        </Box>
      </Box>
      <Box className="w-auto p-3">
        <h1 className="text-[#F8EE0D] font-bold text-2xl p-3">Diễn viên</h1>
        {/* <SwiperCast data={cats} onSlideClick={() =>{
      }}/> */}
        <Box className="overflow-x-auto">
          <div className="flex flex-row">
            {cats.map((item, index) => (
              // <div className="inline-flex">
             <img
                width={100}
                height={100}
                src={`${image500(item.profile_path)}`}
                alt="aaaa"
                draggable="true"
                className="rounded-xl  mt-3 ml-3"
              />
            // </div>

            ))}
          </div>
        </Box>
      </Box>
    </Page>
  );
};

export default DetailMovie;
{
  /* <h1 className="text-[#F8EE0D] font-bold text-2xl">Diễn viên</h1>
<div className="flex flex-nowrap overflow-x-auto">
  {cats.map((item, index) => (
    <div  key={index} className="ml-2 bg-slate-400">
        <img
        src={`${image500(item.profile_path)}`}
        alt=""
        draggable="true"
      />
      <h1>{item.name}</h1>
    </div>
    
  ))}
</div> */
}
