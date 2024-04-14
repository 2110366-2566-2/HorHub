import { Box, LinearProgress, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'

const OverallRatingPane = ({ratingList} : {ratingList: number[]}) => {

    const [average, setAverage] = useState<number>(0)
    const [scoreCounter, setScoreCounter] = useState<number[]>([0,0,0,0,0])

    useEffect(() => {
        setAverage(ratingList.reduce((acc, val) => acc + val, 0) / ratingList.length)

        const newScoreCounter = [1,2,3,4,5].map((score) => ratingList.filter((value) => value === score).length)
        setScoreCounter(newScoreCounter)

    }, [ratingList])

    return (
        <div className="flex flex-col md:flex-row w-full gap-3 md:gap-0">
            <div className="w-full md:w-2/5 flex items-center justify-center gap-3">
                <Rating max={1} value={1} readOnly />
                <div className="font-bold text-xl">{average.toFixed(2)}</div>
            </div>
            <div className="w-full md:w-3/5 flex flex-col-reverse text-xs gap-1">
                {
                    scoreCounter.map((value, idx) => {
                        return (
                            <div className="flex gap-2 items-center">
                                <div className="w-3 text-right">{idx + 1}</div>
                                <Box sx={{ width: '100%', color: "blue", backgroundColor: "whitesmoke" }}>
                                    <LinearProgress sx={{ height: '10px' }} color="inherit" className="rounded-full" variant="determinate" value={(ratingList.length === 0) ? 0 : value * 100 / ratingList.length} />
                                </Box>
                                <div className="w-3 text-left">({value})</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default OverallRatingPane