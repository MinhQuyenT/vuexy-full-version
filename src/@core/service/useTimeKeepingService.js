import TimeKeepingService from './TimekeepingService'

export default function UseTimeKeepingService(axiosIns, common) {
  const timekeeping = new TimeKeepingService(axiosIns, common)

  return {
    timekeeping,
  }
}
