import { QueryInterface } from "sequelize";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      "day_off", [
      { "barber_id": 1, "day_off": "2023/11/07", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/11/14", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/11/21", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/11/28", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/12/05", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/12/12", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/12/19", "time": "full-day" },
      { "barber_id": 1, "day_off": "2023/12/26", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/01/02", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/01/09", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/01/16", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/01/23", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/01/30", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/02/06", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/02/13", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/02/20", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/02/27", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/03/05", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/03/12", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/03/19", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/03/26", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/04/02", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/04/09", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/04/16", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/04/23", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/04/30", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/05/07", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/05/14", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/05/21", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/05/28", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/06/04", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/06/11", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/06/18", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/06/25", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/07/02", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/07/09", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/07/16", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/07/23", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/07/30", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/08/06", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/08/13", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/08/20", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/08/27", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/09/03", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/09/10", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/09/17", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/09/24", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/10/01", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/10/08", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/10/15", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/10/22", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/10/29", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/11/05", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/11/12", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/11/19", "time": "full-day" },
      { "barber_id": 1, "day_off": "2024/11/26", "time": "full-day" }
    ],

      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("day_off", {});
  },
};
