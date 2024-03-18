import { IFormData } from '@/app/page'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import IconHour from '../../public/assets/images/icon-hour.png'

interface IFormProps {
  filteredUnits: number | undefined
  units: number | undefined
  onSubmit: (data: IFormData) => void
}

export default function Form({ filteredUnits, units, onSubmit }: IFormProps) {
  const schema = z.object({
    radioOption: z
      .string({
        required_error: 'Selecione uma opção',
        invalid_type_error: 'Selecione uma opção',
      })
      .default(''),
    checkboxOption: z.boolean().optional().default(true),
  })

  const filterSchema = schema.required({
    radioOption: true,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(filterSchema),
  })

  return (
    <form className="mt-12" onSubmit={handleSubmit(onSubmit)} role="form">
      <div className="flex items-center pb-8">
        <Image src={IconHour} alt="Icon hour" width={30} height={30} />
        <p className="pl-2">Horário</p>
      </div>

      <h5 className="text-2xl font-light">Qual período quer treinar?</h5>
      <div className="flex flex-col pt-8">
        <div className="flex items-center justify-between">
          <div className="py-1">
            <input
              type="radio"
              value="morning"
              id="morning-label"
              {...register('radioOption')}
            />
            <label className="pl-2" htmlFor="morning-label">
              Manhã
            </label>
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
              id="afternoon"
              {...register('radioOption')}
            />
            <label className="pl-2" htmlFor="afternoon">
              Tarde
            </label>
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
              id="night"
              {...register('radioOption')}
            />
            <label className="pl-2" htmlFor="night">
              Noite
            </label>
          </div>
          <div className="flex">
            <p>18:01 às 23:00</p>
          </div>
        </div>
        {errors.radioOption && (
          <span className="text-sm font-bold text-red-600">
            {errors.radioOption?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between pt-8 md:flex-row">
        <div>
          <input
            type="checkbox"
            id="checkbox-units"
            {...register('checkboxOption')}
            defaultChecked={true}
          />
          <label className="pl-2" htmlFor="checkbox-units">
            Exibir unidades fechadas
          </label>
        </div>
        <div>
          <p className="pt-4 md:pt-0">
            Resultados encontrados: <strong>{filteredUnits ?? units}</strong>
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center pt-8 md:flex-row">
        <button
          name="Submit"
          type="submit"
          className="mx-6 my-4 rounded-md bg-dark-yellow py-4 text-center text-lg font-bold capitalize hover:bg-yellow-400 md:w-2/5"
        >
          Encontrar unidade
        </button>
        <button
          className="mx-6 my-4 rounded-md border border-gray-300 py-4 text-center text-lg font-bold capitalize md:w-2/5"
          onClick={() =>
            reset({ radioOption: '' }, { keepDefaultValues: true })
          }
        >
          Limpar
        </button>
      </div>
    </form>
  )
}
