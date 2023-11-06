import DayOffModel, { DayOffCreationAttributes } from "../database/models/dayOff.Model";
type DayOff = {
  selectedDate: string;
  timeOff: string;
};
const createDayOff = async (dayOff: DayOff[]) => {
  dayOff.map(async (item) => {
    const newdayOff = {
      dayOff: item.selectedDate,
      time: item.timeOff,
      barberId: 1,
    }
    return await DayOffModel.create(newdayOff);
  });
}

const getDayOffs = async () => {
  return await DayOffModel.findAll();
}

const deleteDayOff = async (date: string) => {
  return await DayOffModel.destroy({
    where: {
      dayOff: date,
    }
  });

}



export default {
  createDayOff,
  getDayOffs,
  deleteDayOff,
};