import DayOffModel, { DayOffCreationAttributes } from "../database/models/dayOff.Model";

const createDayOff = async (dayOff: DayOffCreationAttributes) => {
  return await DayOffModel.create(dayOff);
}

const getDayOffs = async () => {
  return await DayOffModel.findAll();
}


export default {
  createDayOff,
  getDayOffs,
};