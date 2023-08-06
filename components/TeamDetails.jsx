import Image from 'next/image'
import React from 'react'

const TeamDetails = ({ props }) => {
    return (
        <>
            <div className='flex items-center justify-center flex-col gap-1'>
                {props.second && <div className="flex items-center p-2  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Round 2 cleared</span>
                    </div>
                </div>}
                {props.lunch && <div class="flex items-center p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Lunch recieved</span>
                    </div>
                </div>}
                {props.first && <div className="flex items-center p-2  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Round 1 cleared</span>
                    </div>
                </div>}
                {props.attendance && <div className="flex items-center p-2  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Entered the hall</span>
                    </div>
                </div>}
                {props.payment && <div className="flex items-center p-2  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Payment Completed</span>
                    </div>
                </div>}
            </div>
            <div className='flex items-center justify-center flex-col gap-5'>
                <div className='bg-black w-64 text-white text-center rounded p-2'>Team Details</div>
                <div className='text-4xl font-extrabold text-gray-900 underline dark:text-white decoration-blue-500'>{props.team.teamName}</div>

                <div className="flex items-center space-x-4">
                    <Image width={10} height={10} className="w-10 h-10 rounded-full" src={props.team.leader.image} alt="">
                    </Image>
                    <div className="font-medium dark:text-white">
                        <div>{props.team.leader.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.team.leader.department}, {props.team.leader.year}</div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Image width={10} height={10} className="w-10 h-10 rounded-full" src={props.team.teamMember.image} alt="">
                    </Image>
                    <div className="font-medium dark:text-white">
                        <div>{props.team.teamMember.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.team.teamMember.department}, {props.team.teamMember.year}</div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default TeamDetails