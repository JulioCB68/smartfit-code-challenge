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

  return (
    <div className="my-8 h-[27rem] w-96 rounded-lg border border-gray-300 p-4">
      <p
        className={`font-medium ${opened === true ? 'text-green-600' : 'text-red-600'}`}
      >
        {opened === true ? 'Aberto' : 'Fechado'}
      </p>
      <h1
        className="py-2 text-2xl font-bold"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {street && (
        <>
          <p className="flex text-light-grey">
            {street} - {region} - {cityName}, {uf}
          </p>
          <p className="pt-2 font-semibold">
            Outras informações não disponíveis
          </p>
        </>
      )}

      {content && (
        <>
          <p
            className="pb-4 text-light-grey"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="my-4 flex gap-2">
            <Image
              width={35}
              height={35}
              src={`/assets/images/${mask}-mask.png`}
              alt="Mask logo"
            />
            <Image
              width={35}
              height={35}
              src={`/assets/images/${towel}-towel.png`}
              alt="Towel logo"
            />
            <Image
              width={35}
              height={35}
              src={`/assets/images/${fountain}-fountain.png`}
              alt="Fountain logo"
            />
            <Image
              width={35}
              height={35}
              src={`/assets/images/${lockerRoom}-lockerroom.png`}
              alt="Locker room logo"
            />
          </div>

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
