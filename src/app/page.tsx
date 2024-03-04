'use client'

import Image from 'next/image'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import Gym from '@/components/gym'
import { getGyms } from '@/service/api'
import { GymI } from '@/service/type'
import { filterrr } from '@/utils/filter-units'

import IconHour from '../../public/assets/images/icon-hour.png'
import Logo from '../../public/assets/images/logo.svg'

interface FormData extends FieldValues {
  checkboxOption: string
  radioOption: string
}

export default function Home() {
  const [filteredUnits, setFilteredUnits] = useState<GymI[]>()

  const schema = z
    .object({
      radioOption: z.string().optional(),
      checkboxOption: z.boolean().optional(),
    })
    .default({ checkboxOption: true })

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { data: units } = useQuery<GymI[], Error>({
    queryKey: ['gyms'],
    queryFn: getGyms,
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { checkboxOption, radioOption } = data

    if (units) {
      const filteredResults = filterrr(units, !!checkboxOption, radioOption)
      return setFilteredUnits(filteredResults)
    }
  }

  //   onClean(): void {
  //     formGroup.reset();

  // }

  return (
    <div>
      <div className="flex w-full items-center justify-center bg-black p-4">
        <Image src={Logo} alt="Logo" width={200} height={200} />
      </div>
      <div className="container m-auto px-8 pt-20">
        <h1 className="w-96 text-5xl font-bold capitalize">
          REABERTURA SMART FIT
        </h1>
        <div className="my-12 h-2 w-36 bg-black"></div>
        <p className="md:w-7/12">
          O horário de funcionamento das nossas unidades está seguindo os
          decretos de cada município. Por isso, confira aqui se a sua unidade
          está aberta e as medidas de segurança que estamos seguindo.
        </p>
        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center pb-8">
            <Image src={IconHour} alt="Logo" width={30} height={30} />
            <p className="pl-2">Horário</p>
          </div>

          <h5 className="text-2xl font-light">Qual período quer treinar?</h5>

          <div className="flex flex-col pt-8">
            <div className="flex items-center justify-between">
              <div className="py-1">
                <input
                  type="radio"
                  value="morning"
                  {...register('radioOption')}
                />
                <label className="pl-2">Manhã</label>
              </div>
              <div className="flex">
                <p>06:00 às 12:00</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-1">
                <input
                  type="radio"
                  value="afternoon"
                  {...register('radioOption')}
                />
                <label className="pl-2">Tarde</label>
              </div>
              <div className="flex">
                <p>12:01 às 18:00</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="py-1">
                <input
                  type="radio"
                  value="night"
                  {...register('radioOption')}
                />
                <label className="pl-2">Noite</label>
              </div>
              <div className="flex">
                <p>18:01 às 23:00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between pt-8 md:flex-row">
            <div>
              <input
                type="checkbox"
                {...register('checkboxOption')}
                defaultChecked={true}
              />
              <label className="pl-2">Exibir unidades fechadas</label>
            </div>
            <div>
              <p className="pt-4 md:pt-0">
                Resultados encontrados:{' '}
                <strong>{filteredUnits?.length ?? units?.length}</strong>
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center pt-8 md:flex-row">
            <button
              type="submit"
              className="mx-6 my-4 rounded-md bg-[#FFB612] py-4 text-center text-lg font-bold capitalize md:w-2/5"
            >
              Encontrar unidade
            </button>
            <button
              type="submit"
              className="mx-6 my-4 rounded-md border border-gray-300 py-4 text-center text-lg font-bold capitalize md:w-2/5"
            >
              Limpar
            </button>
          </div>
        </form>
        <div className="w-full">
          {filteredUnits &&
            filteredUnits?.map((item) => <Gym key={item.id} data={item} />)}

          {!filteredUnits &&
            units?.map((item) => <Gym key={item.id} data={item} />)}
        </div>
      </div>
    </div>
  )
}
