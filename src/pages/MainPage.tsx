import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const PopularImages = ({ query, input } : {query : any, input : string | undefined}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images'],
    queryFn: () =>
      fetch(`https://api.unsplash.com/photos/?per_page=20&page=4&order_by=popular&client_id=UADwZ0jykzvKArb5OjGtNAj5r1GbTg5xWcbrAvm9FR0`).then((res) => {
        return res.json();
      }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='flex flex-col mt-24 items-center justify-center'>
      <div className='flex justify-center items-center  flex-wrap w-full gap-y-12'>
        {query.length > 0 ? query?.map((photo: any) => (
          <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} className='w-[450px] h-96 m-auto' />
        )) : 
        input !== undefined && input.length > 0 && query.length < 1 ? <span> this topic could not be found</span> : 
        data?.map((photo: any) => (
          <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} className='w-[450px] h-96 m-auto' />
        ))}
      </div>
    </div>
  );
};


const MainPage = () => {
  const [filteredData, setFilteredData] = useState<any>([]);
  const [page, setpage] = useState(1)

  const filterinput = useRef<HTMLInputElement>(null);

  const filter = (props : string) => {
    const searchQuery = filterinput.current?.value;
    fetch(`https://api.unsplash.com/search/photos/?per_page=20&page=${page}&order_by=popular&query=${searchQuery}&client_id=dtKCornSDnG6aTLF127US1398j8X11-0HOvRLnnguiQ`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props == 'page' ? setFilteredData((prev : any) => [...prev, ...data.results]) : setFilteredData(data.results)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
  filter('page')
  }, [ page]);

  console.log(filteredData)

  return (
    <div className='pb-6'>
    <div className='w-full px-8 h-16 bg-slate-300 flex justify-between items-center'>
    <h1 className='text-gray-900 font-bold text-3xl font-mono'>G.pictures</h1>
    <div className='flex gap-7'>
      <Link to={'/'}>MainPage</Link>
      <Link to={'/history'}>History</Link>
    </div>
    </div>
    <div className='relative w-full h-fit items-center justify-center flex flex-col px-2'>
      <div className='releative mt-10 w-96 h-fit'>
      <input ref={filterinput} placeholder='Search for Picture' onChange={() => filter('')} className='w-96 h-14 shadow-black shadow-md border-none outline-none rounded-lg px-2' type="text" />
      </div>
      {filterinput?.current?.value.length !< 1 ? <h2 className='absolute top-32 left-8 font-sans font-bold text-4xl text-orange-600'>Popular photos</h2> : <></>}
      <PopularImages query={filteredData} input={filterinput?.current?.value} />
      {filteredData.length !== 0 &&       <button className='w-[600px] h-16 bg-gray-200 font-bold text-gray-900  color-white mt-12 rounded-sm' onClick={async() => setpage(prev => prev+1)}>Load more images</button>}

    </div>
    </div>
    
  );
};

export default MainPage;