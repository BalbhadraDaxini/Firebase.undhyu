"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  totalStars?: number
  size?: number
  fill?: string
  emptyFill?: string
  stroke?: string
  emptyStroke?: string
  onRatingChange?: (rating: number) => void
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      rating,
      totalStars = 5,
      size = 20,
      fill = "#FBBF24",
      emptyFill = "transparent",
      stroke = "#FBBF24",
      emptyStroke = "#FBBF24",
      onRatingChange,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: totalStars }, (_, i) => {
          const starNumber = i + 1
          const isFilled = rating >= starNumber
          const isHalfFilled = !isFilled && rating > i

          return (
            <div
              key={i}
              className="relative"
              style={{ width: size, height: size }}
              onClick={() => onRatingChange?.(starNumber)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onRatingChange?.(starNumber)
                }
              }}
              role={onRatingChange ? "button" : "img"}
              aria-label={
                onRatingChange
                  ? `Set rating to ${starNumber}`
                  : `${rating.toFixed(1)} out of ${totalStars} stars`
              }
              tabIndex={onRatingChange ? 0 : -1}
            >
              <Star
                className="absolute left-0 top-0 transition-colors"
                style={{
                  fill: emptyFill,
                  stroke: emptyStroke,
                  width: size,
                  height: size,
                }}
              />
              <div
                className="absolute left-0 top-0 h-full overflow-hidden transition-all duration-300"
                style={{
                  width: isFilled
                    ? "100%"
                    : isHalfFilled
                      ? `${(rating - i) * 100}%`
                      : "0%",
                }}
              >
                <Star
                  style={{
                    fill: fill,
                    stroke: stroke,
                    width: size,
                    height: size,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

Rating.displayName = "Rating"

export { Rating }
