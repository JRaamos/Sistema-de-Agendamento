"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const fs = __importStar(require("fs"));
const credentials = JSON.parse(fs
    .readFileSync('credentials/cellular-sylph-403815-5625693c59e1.json', 'utf-8'));
const client = new googleapis_1.google.auth.JWT(credentials.client_email, undefined, credentials.private_key, ['https://www.googleapis.com/auth/calendar']);
const calendar = googleapis_1.google.calendar({ version: 'v3', auth: client });
const createEventService = async (eventData) => {
    await client.authorize();
    const event = await calendar.events.insert({
        calendarId: process.env.CALENDAR_ID,
        requestBody: eventData,
    });
    return event.data;
};
const deleteEventService = async (eventId) => {
    await client.authorize();
    const event = await calendar.events.delete({
        calendarId: process.env.CALENDAR_ID,
        eventId,
    });
    return event.data;
};
exports.default = { createEventService, deleteEventService };
