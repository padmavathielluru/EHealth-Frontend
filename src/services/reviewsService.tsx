import  { reviewsData }  from "../utils/ReviewsListConstants";

export const reviewsService = {
    getReviews: () => Promise.resolve(reviewsData),
};
