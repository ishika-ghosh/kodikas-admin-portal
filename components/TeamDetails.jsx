import Image from 'next/image'
import React from 'react'

const TeamDetails = ({ props }) => {
    return (
        <>
            <div className='flex items-center justify-center flex-col gap-5'>
                <div className='bg-black w-64 text-white text-center rounded p-2'>Team Details</div>
                <div className='text-4xl font-extrabold text-gray-900 underline dark:text-white decoration-blue-500'>{props.teamName}</div>

                <div className="flex items-center space-x-4">
                    <Image width={10} height={10} className="w-10 h-10 rounded-full" src={props.leader.image} alt="">
                    </Image>
                    <div className="font-medium dark:text-white">
                        <div>{props.leader.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.leader.department}, {props.leader.year}</div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Image width={10} height={10} className="w-10 h-10 rounded-full" src={props.teamMember.image} alt="">
                    </Image>
                    <div className="font-medium dark:text-white">
                        <div>{props.teamMember.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.teamMember.department}, {props.teamMember.year}</div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default TeamDetails