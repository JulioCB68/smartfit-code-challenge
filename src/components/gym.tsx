'use client'

import Image from 'next/image'

import { GymI } from '@/service/type'

export default function Gym({ data }: { data: GymI }) {
  const {
    title,
    content,
    opened,
    mask,
    towel,
    fountain,
    schedules,
    street,
    region,
    uf,
  } = data

  const lockerRoom = data.locker_room
  const cityName = data.city_name

  console.log(data)
  return (
    <div className="my-8 h-full w-full">
      <p
        className={`font-medium ${opened === true ? 'text-green-600' : 'text-red-600'}`}
      >
        {opened === true ? 'Aberto' : 'Fechado'}
      </p>
      <h1>{title}</h1>
      {street && (
        <>
          <p className="flex">
            {street} - {region} - {cityName}, {uf}
          </p>
          <p className="pt-2 font-semibold">
            Outras informações não disponíveis
          </p>
        </>
      )}

      {!street && (
        <>
          <p className="" dangerouslySetInnerHTML={{ __html: content }} />

          <ul className="flex">
            <Image
              width={30}
              height={30}
              src={`/assets/images/${mask}-mask.png`}
              alt="Mask logo"
            />
            <Image
              width={25}
              height={25}
              src={`/assets/images/${towel}-towel.png`}
              alt="Towel logo"
            />
            <Image
              width={25}
              height={25}
              src={`/assets/images/${fountain}-fountain.png`}
              alt="Fountain logo"
            />
            <Image
              width={25}
              height={25}
              src={`/assets/images/${lockerRoom}-lockerroom.png`}
              alt="Locker room logo"
            />
          </ul>

          <div className="flex flex-wrap gap-4">
            {schedules?.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p className=" pr-4 font-bold">{item.weekdays}</p>
                <p className="">{item.hour}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
