import React, { useEffect, useState } from "react";
import { ReviewItem } from "../../interfaces/reviewsListInterface";
import { reviewsService } from "../../services/reviewsService";
import Title from "../Title";


const ReviewsList = () => {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);

    useEffect(() => {
        reviewsService.getReviews().then((data: ReviewItem[]) => setReviews(data));
    }, []);

    return (
        <div className="">
            <Title text="Reviews" />
            <div className="mt-4 h-[110vh] overflow-y-auto pr-2 custom-scrolbar bg-blue-50 p-2 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {reviews.map((item) =>(
                        <div key={item.id}
                        className="border border-gray-100 rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition">
                            <div className="flex items-center gap-3">
                                <img src={item.avatar}
                                alt={item.name}
                                className="h-12 w-12 rounded-full object-cover"/>
                                <div>
                                   <h3 className="font-semibold">{item.name}</h3> 
                                    <div className="flex items-center gap-2 mt-1">
                                   <p className="text-xs text-gray-500">{item.role}</p>
                                  
                                    <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                                <p className="text-xs text-gray-400 ">{item.date}</p>
                                </div>
                                </div>
                                </div>
                                
                                <div className="flex gap-1 mt-3"> 
                                    {[...Array(item.rating)].map((_,i) => (
                                        <img key={i}
                                        src="/images/star.svg" className="w-4 h-4" alt="star"/>
                                    ))}
                                </div>

                                <p className="text-sm texr-gray-700 mt-2 leading-related">
                                    {item.review}
                                </p>
                            </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ReviewsList;