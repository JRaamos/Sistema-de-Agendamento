export type ChartProps = {
  cancellationsData: number | null,
  futureSchedulesData: number | null,
  scheduleData: number | null,
}

export type ChartRagesDay = {
  ragesDays: number 
  setRagesDays: React.Dispatch<React.SetStateAction<number>>

}

export type ChartType = {
  chartType: string
  setChartType: React.Dispatch<React.SetStateAction<string>>
}