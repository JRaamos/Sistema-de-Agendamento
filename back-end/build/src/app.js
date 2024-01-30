"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const registres_routers_1 = __importDefault(require("./routers/registres.routers"));
const schedules_router_1 = __importDefault(require("./routers/schedules.router"));
const cancellation_routers_1 = __importDefault(require("./routers/cancellation.routers"));
const login_1 = __importDefault(require("./routers/login"));
const googleEvent_routers_1 = __importDefault(require("./routers/googleEvent.routers"));
const dayOff_routers_1 = __importDefault(require("./routers/dayOff.routers"));
const service_routers_1 = __importDefault(require("./routers/service.routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(service_routers_1.default);
app.use(registres_routers_1.default);
app.use(schedules_router_1.default);
app.use(cancellation_routers_1.default);
app.use(login_1.default);
app.use(googleEvent_routers_1.default);
app.use(dayOff_routers_1.default);
exports.default = app;
