import React, { useEffect } from 'react'
import { fetchApiServiceUpdate } from '../utils/fetchApi'
import { Service } from '../types/Service';

function BarberPriceService() {
    const token = localStorage.getItem("token");
  const getBarberPriceService = async (name: string, service: Partial<Service>) => {
    const response = await fetchApiServiceUpdate(name, service, token)
    console.log(response)

  }
  return (
    <div>
      <button 
        onClick={() => getBarberPriceService('Corte na máquina' ,{price: 20, duration: 80})}
      >
        Vamos ver
      </button>
    </div>
  )
}
export default BarberPriceService