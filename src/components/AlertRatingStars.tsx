"use client";
import useAppContext from "@/hooks/useAppContext";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6"; // Full star icon for selected and hovered state
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { setRatingAction } from "@/actions/setRatingAction";

interface IAlertRatingStars {
  productId: string;
}

export function AlertRatingStars({ productId }: IAlertRatingStars) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { user } = useAppContext();

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitRating = async () => {
    await setRatingAction({ userId: user._id, productId, rating })
    console.log(`User submitted a rating of ${rating} stars`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent">
          <span className="text-2xl text-muted-foreground hover:text-primary transition">
            <FaRegStar />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rate Your Experience</AlertDialogTitle>
          <AlertDialogDescription>
            Please rate your experience by selecting a star rating.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl cursor-pointer transition"
            >
              {star <= (hoverRating || rating) ? (
                <FaStar className="text-yellow-500" /> // Full yellow star for selected or hovered stars
              ) : (
                <FaRegStar className="text-muted-foreground" /> // Outline star for unselected and unhovered stars
              )}
            </span>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmitRating}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
