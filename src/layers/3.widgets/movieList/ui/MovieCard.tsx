'use client'

import { FavoriteButton } from '@/layers/4.features/favorite/ui/FavoriteButton'
import Image from 'next/image'
import { BsFillPlayFill } from 'react-icons/bs'

interface MovieCardProps {
  data: Movie
}

export const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group relative col-span-1 h-[12vh] bg-zinc-900">
      <Image
        className="duration h-[12vh] w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-300 group-hover:opacity-0 sm:group-hover:opacity-0"
        src={data.thumbnailUrl}
        alt={data.title}
        height={150}
        width={250}
        unoptimized
      />
      <div className="invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-300 duration-200 group-hover:-translate-y-6 group-hover:translate-x-2 group-hover:scale-110 group-hover:opacity-100 sm:visible">
        <Image
          className="duration h-[12vh] w-full cursor-pointer rounded-md object-cover shadow-xl transition"
          src={data.thumbnailUrl}
          alt={data.title}
          height={150}
          width={250}
          unoptimized
        />
        <div className="absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
          <div className="flex flex-row items-center gap-3">
            <div
              className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:size-10"
              onClick={() => {}}
            >
              <BsFillPlayFill className="text-zinc-900" size={25} />
            </div>
            <FavoriteButton movieId={data?.id} />
          </div>
          <p className="mt-4 font-semibold text-green-400">
            New <span className="text-white">2024</span>
          </p>
          <div className="mt-4 flex flex-row items-center gap-2">
            <p className="text-[10px] text-white lg:text-sm">{data.duration}</p>
          </div>
          <div className="mt-4 flex flex-row items-center gap-2">
            <p className="text-[10px] text-white lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
