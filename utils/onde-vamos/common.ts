/**
 * @description This file is used to store common variables that are used across the project.
 * @module common
 * @see index.ts
 */
export const ONDE_VAMOS_HOST =
  process.env.NODE_ENV === 'production' ? 'api.onde-vamos.com' : 'api.diego.dev.onde-vamos.com';
export const ONDE_VAMOS_API_KEY = 'lasnf791hp3;iuTotallySafebnposcb-v97xoiusf';
export const ONDE_VAMOS_API_BASE_URL = `https://${ONDE_VAMOS_HOST}/colombiatechweek`;

export type HostProps = {
  instagram: string[];
  linkedin: string[];
  name: string[];
  twitter: string[];
};

export type TechWeekHit = {
  title: string;
  description: string;
  categories: string[];
  date_start: string;
  start_time: string;
  end_time: string;
  full_address: string;
  url: string;
  host?: HostProps[];
  neighborhood?: string;
  relevanceExplanation?: string;
  relevanceScore: number;
  remove?: boolean;
};

// This type is a type returned from our search + some customization based on the user context.
// Like isAddedToCalendar that tracks whether the event is added to the user's calendar.
export type TechWeekEvent = TechWeekHit & {
  isAddedToCalendar?: boolean;
};

export type ScheduleProps = {
  date: string;
  events: TechWeekEvent[];
};
