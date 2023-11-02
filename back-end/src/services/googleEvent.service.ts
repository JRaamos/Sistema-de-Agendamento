import { google } from 'googleapis';
import * as fs from 'fs';
import { GoogleEvent } from '../types/GoogleEvent';

const credentials = JSON.parse(fs
  .readFileSync('credentials/cellular-sylph-403815-5625693c59e1.json', 'utf-8'));

const client = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  ['https://www.googleapis.com/auth/calendar'],
);

const calendar = google.calendar({ version: 'v3', auth: client });

const createEventService = async (eventData: GoogleEvent) => {
  await client.authorize();
  const event = await calendar.events.insert({
    calendarId: process.env.CALENDAR_ID,
    requestBody: eventData,
  });
  return event.data;
};

const deleteEventService = async (eventId: string) => {
  await client.authorize();
  const event = await calendar.events.delete({
    calendarId: process.env.CALENDAR_ID,
    eventId,
  });
  return event.data;
};

export default { createEventService, deleteEventService };