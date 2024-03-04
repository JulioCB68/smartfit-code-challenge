'use client'

import { GymI } from '@/service/type'

export default function Gym({ data }: { data: GymI[] }) {
  return (
    <div>
      <div>{data?.map((item) => item.content)}</div>
    </div>
  )
}
