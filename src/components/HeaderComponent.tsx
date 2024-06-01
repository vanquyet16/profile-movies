import * as React from "react";
import { Avatar, Box, Input } from "zmp-ui";

export interface IHeaderComponentProps {
  onclick?: () => void;
}

export default function HeaderComponent(props: IHeaderComponentProps) {
  const { onclick } = props;
  return (
    <div className="flex w-full items-center">
      <div className="pl-3">
        <img
          width={40}
          height={40}
          className="rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwCeTQy3OaO0J7IgWbbiwABhMpv8zwIq09Q&s"
          alt="Avatar"
        />
      </div>
      <div
        className="w-[55%] bg-black h-8 rounded-full flex items-center border border-white hover:opacity-70 mx-3"
        onClick={onclick}
      >
        <span className="text-white pl-3">Tìm kiếm</span>
      </div>
    </div>
  );
}