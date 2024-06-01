import * as React from 'react';
import { Avatar, Box, Input } from 'zmp-ui';

export interface IHeaderComponentProps {
    onclick?: () => void;
}

export default function HeaderComponent (props: IHeaderComponentProps) {
    const { onclick } = props;
  return (
   <div className='flex w-[82%] justify-evenly  items-center'>
    <img width={40} height={40} className=' rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwCeTQy3OaO0J7IgWbbiwABhMpv8zwIq09Q&s'></img>
    {/* <input type="text" className='text-white p-2 bg-black rounded-full' placeholder='Tìm kiếm'/> */}
    <div className='w-[60%] bg-black h-8 rounded-full flex items-center border border-white hover:opacity-70' onClick={onclick}>
        <span className='text-white pl-3'>Tìm kiếm</span>
    </div>
  </div>
  );
}
