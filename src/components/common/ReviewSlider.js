import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Pagination } from 'swiper';
import ReactStars from 'react-stars';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { ratingAndReviews } from '../../services/apis';

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);

    const getAllReviews = async () => {
        const response = await apiConnector('GET', ratingAndReviews.REVIEWS_DETAILS_API);

        const { data } = response;

        if (data?.success) {
            setReviews(data?.data);
        }

    }

    useEffect(() => {
        getAllReviews();
    }, []);

  return (
    <div className='w-11/12 h-[400px] mx-auto mt-6 mb-12'>
          <h1 className='text-3xl font-bold text-center'>Reviews From Learners</h1>
          
          <div className='h-[300px] flex items-center justify-center my-4 max-md:flex-col max-w-maxContent'>
              <Swiper
                  slidesPerView={3}
                  spaceBetween={25}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                  delay:2500
                  }}
                  modules={[FreeMode, Pagination, Autoplay]}
              >

                  {
                      reviews?.map((review, index) => {
                          return (
                              <SwiperSlide key={index} className='mx-auto min-w-[300px] min-h-[250px] px-4 py-2 rounded-md bg-richblack-700'>
                                  <img src={ `${review?.user?.image ? review?.user?.image : "https://api.dicebear.com/5.x/initials/svg?seed="+review?.user?.firstName +" "+review?.user?.lastName}`} className='w-[40px] h-[40px] rounded-full mt-6' alt='review profile pic'  />
                                  <p className='text-md font-bold'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                  <p className='text-sm'>{review?.user?.email} </p>

                                  <ReactStars 
                                      value={review?.rating}
                                      edit={false}
                                      className='my-2'
                                  />

                                  <p className='text-sm text-justify my-3'>{review?.review}</p>
                              </SwiperSlide>
                          )
                      })
                  }

            </Swiper>
          </div>
    </div>
  )
}

export default ReviewSlider