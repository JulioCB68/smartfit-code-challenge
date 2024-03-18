'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import Form from '@/components/form'
import Gym from '@/components/gym'
import { getGyms } from '@/service/api'
import { GymI } from '@/service/type'
import { formFilterUnits } from '@/utils/filter-units'

import { SubmitHandler } from 'react-hook-form'
import Logo from '../../public/assets/images/logo.svg'

export interface IFormData {
  checkboxOption: string
  radioOption: string
}

export default function Home() {
  const [filteredUnits, setFilteredUnits] = useState<GymI[]>()

  const { data: units } = useQuery<GymI[]>({
    queryKey: ['gyms'],
    queryFn: getGyms,
  })

  const handleOnSubmitFormFilters: SubmitHandler<IFormData> = (data) => {
    const { checkboxOption, radioOption } = data

    if (units) {
      const filteredResults = formFilterUnits(
        units,
        !!checkboxOption,
        radioOption,
      )
      return setFilteredUnits(filteredResults)
    }
  }

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
        <Form
          filteredUnits={filteredUnits?.length}
          units={units?.length}
          onSubmit={handleOnSubmitFormFilters}
        />
      </div>

      <main className="flex flex-wrap items-center justify-center gap-6">
        {filteredUnits &&
          filteredUnits?.map((item, index) => <Gym key={index} data={item} />)}

        {!filteredUnits &&
          units?.map((item, index) => <Gym key={index} data={item} />)}
      </main>
    </div>
  )
}
