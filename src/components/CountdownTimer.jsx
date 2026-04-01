import { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const targetDate = '2025-06-04T23:59:59';

        const difference = new Date(targetDate) - now;

        let timeLeft = {};

        if (difference >= 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),

            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        < span className='flex text-xs gap-1.5  p-2 bg-accent-900 bg-opacity-90 rounded-full border-[3.5px] border-accent-50 border-dashed'>
            <div className=' border-2 border-accent-300 rounded-full  px-2 py-0.6  text-center bg-accent-300'>
                <div className='font-bold text-sm text-accent-900'>{timeLeft.days.toLocaleString('en-US', { minimumIntegerDigits: 2 })} </div>
                <div className='text-accent-900'> days</div>
            </div>
            
            <div className=' border-2 border-accent-300 rounded-full  px-3 py-0.6  text-center bg-accent-300'>
                <div className='font-bold text-sm text-accent-900'>{timeLeft.hours.toLocaleString('en-US', { minimumIntegerDigits: 2 })} </div>
                <div className='text-accent-900'>hrs</div>
            </div>
            
            <div className=' border-2 border-accent-300 rounded-full  px-2 py-0.6  text-center bg-accent-300'>
                <div className='font-bold text-sm text-accent-900'>{timeLeft.minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}  </div>
                <div className='text-accent-900'> mins</div>
            </div>

            <div className=' border-2 border-accent-300 rounded-full  px-3 py-0.5  text-center bg-accent-300'>
                <div className='font-bold text-sm text-accent-900'>{timeLeft.seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })} </div>
                <div className='text-accent-900'> sec</div>
            </div>

            
        </span>
    );
};

export default CountdownTimer;
