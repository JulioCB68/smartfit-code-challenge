import axios from 'axios'

import { Gym } from './type'

export const getGyms = async (): Promise<Gym[]> => {
  const response = await axios.get(
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json',
  )
  const data = response.data.locations

  return data
}
