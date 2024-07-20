"use client"
import * as React from 'react';
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { LuCalendarMinus, LuCalendarPlus } from 'react-icons/lu';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import "./styles.css"

import {
  Select,
  SelectItem,
} from "@/components/ui/select"

import { Filters } from './Filters';


type SearchEventsProps = { serverUrl: string }

type HostProps = {
  instagram: string[];
  linkedin: string[];
  name: string[];
  twitter: string[];
}

type TechWeekHit = {
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
  remove?: boolean
}

type TechWeekEvent = TechWeekHit;

type ScheduleProps = {
  date: string;
  events: TechWeekEvent[];
};

const RelevanceBadge = ({ score }: { score: number }) => {
  let color: string;
  let text: string;
  let emoji: string;

  if (score >= 90) {
    color = "bg-green-100 text-green-800";
    text = "Excelente ajuste";
    emoji = "🎯";
  } else if (score >= 70) {
    color = "bg-yellow-100 text-yellow-800";
    text = "Buen ajuste";
    emoji = "👍";
  } else if (score >= 50) {
    color = "bg-orange-100 text-orange-800";
    text = "Algo relevante";
    emoji = "🤔";
  } else {
    color = "bg-red-100 text-red-800";
    text = "Menos relevante";
    emoji = "🔍";
  }

  return (
    <Badge className={`${color} text-sm font-medium px-2 py-1`}>
      {emoji} {text}
    </Badge>
  );
};



const TYPESENSE_PER_PAGE = 20;


const Host = ({ host }: { host: HostProps[] }) => {
  const ui = host.map((item, key) => {
    const name = key > 0 ? `, ${item.name[0]}` : item.name[0]
    const link = item.linkedin[0] ? item.linkedin[0] : item.instagram[0]
    return (
      <Link key={item.name[0]} href={"#"} target='_blank'>
        <span>{name}</span>
      </Link>
    )
  })
  return ui
}

const TimelineItem = ({
  event,
  separator,
  addToCalendar,
  remove
}: { event: TechWeekEvent; separator: boolean, addToCalendar: () => void, remove?: boolean }) => {

  const formatTime = (dateString: string): string =>
    new Date(dateString).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


  return (
    <div className=" flex flex-col lg:flex-row items-start gap-4 lg:gap-7 w-full max-w-full">
      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-1 text-sm text-gray-500 dark:text-gray-400 lg:w-auto justify-between w-full">

        <div className="flex flex-row lg:flex-col items-center lg:items-end text-end">
          <span className="text-lg text-[#7D0991] font-light w-[max-content] lg:pl-2 lg:pt-2">
            {formatTime(event.start_time)}
          </span>
        </div>
        <Link href={"#"}>
          <span className="text-md font-semibold leading-normal underline text-[#313A5E]">
            RSVP
          </span>
        </Link>

        <Button
          className={`px-2 focus:outline-none cursor-pointer text-black rounded-none uppercase flex lg:hidden ${remove ? "bg-[red]" : "bg-[#52EF70]"}`}
          variant="ghost"
          onClick={addToCalendar}
        >
          {
            remove ? <>
              <LuCalendarMinus className="w-4 h-4 mr-2 text-black" />
              Quitar
            </> : <>
              <LuCalendarPlus className="w-4 h-4 mr-2 text-black" />
              Añadir
            </>
          }
        </Button>
      </div>

      <div className="w-sm separator-item hidden lg:block" />
      <div className="space-y-6 px-2 w-full grid">
        <div className="">
          <h3 className="text-xl font-bold text-[#7D0991]">{event.title}</h3>
          {event.host && (
            <p className="text-md font-normal leading-normal text-[#313A5E] pb-2">
              Por {" "}
              <Host host={event.host} />
            </p>
          )}
          {event.full_address && (
            <span className="text-md font-semibold leading-normal text-[#313A5E] ml-2 lg:ml-0 hidden lg:block">
              {event.full_address}
            </span>
          )}
        </div>

        <p className="line-clamp-4 max-w-full">{event.description}</p>
        <p className="line-clamp-4 text-md font-semibold text-[#313A5E]">
          Por qué es tu interés
        </p>
        <p className="line-clamp-4 mt-2 text-[#313A5E] text-md  pb-4">
          {event.relevanceExplanation}
        </p>

        <div className="flex w-full justify-between">
          <RelevanceBadge score={event.relevanceScore} />
          <Button
            className={`px-2  focus:outline-none cursor-pointer text-black rounded-none uppercase hidden lg:flex ${remove ? "bg-[red]" : "bg-[#52EF70]"}`}
            variant="ghost"
            onClick={addToCalendar}
          >
            {
              remove ? <>
                <LuCalendarMinus className="w-4 h-4 mr-2 text-black" />
                Quitar
              </> : <>
                <LuCalendarPlus className="w-4 h-4 mr-2 text-black" />
                Añadir
              </>
            }
          </Button>
        </div>
      </div>
      {separator && <Separator className="block lg:hidden my-5" />}
    </div>
  )
};


type CalendarItemProps = { date: string; event: TechWeekEvent }
interface TimeLineProps {
  schedules: ScheduleProps[];
  addToCalendar: (params: CalendarItemProps) => void;
  remove?: boolean;
}

const TimeLine: React.FC<TimeLineProps> = ({ schedules, addToCalendar, remove }) => {

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="px-4 md:px-6 py-0">
      <div className=" grid gap-y-8 max-w-full">
        {schedules.map((schedule) => (
          <div
            key={formatDate(schedule.date)}
            className="flex flex-col bg-white p-3 "
            style={{
              boxShadow: "10px 10px 0px 0px #7D0992"
            }}
          >
            <details className="flex " open>
              <summary className="text-[#7D0991] cursor-pointer text-xl font-bold justify-between flex uppercase lg:pt-2 lg:pl-2">
                {formatDate(schedule.date)}
                <IoIosArrowDown className="arrow-icon" />
              </summary>
              <div className="flex flex-col h-full lg:space-y-16 mt-5">
                {schedule.events
                  .sort((left, right) => new Date(left.start_time).getTime() - new Date(right.start_time).getTime())
                  .filter((event) => event.relevanceScore > 40)
                  .map((event, i) => (
                    <TimelineItem
                      key={event.title}
                      event={event}
                      separator={i < schedule.events.length - 1}
                      remove={remove}
                      addToCalendar={() => {
                        addToCalendar({
                          date: schedule.date,
                          event: event
                        })
                      }}
                    />
                  ))}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatSearchUI = () => {

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [events, setEvents] = React.useState<TechWeekEvent[]>([]);
  const [schedules, setSchedules] = React.useState<ScheduleProps[]>([]);

  function setQuery(newQuery: string) {
    setValue(newQuery);
  }

  React.useEffect(() => {
    fetch("https://gist.githubusercontent.com/CestDiego/e2cf07f13a287619dc563a344b124133/raw/b1d918ae195f1374322f0199662b83d8d8ab8abb/events_sample.").then(res => res.json()).then((res) => {
      setEvents(res)
      setSchedules(res)
    })
  }, [])

  const [selectedCalendar, setSelectedCalendar] = React.useState<ScheduleProps[]>([])
  const [activeTab, setActiveTab] = React.useState("matches")

  const addToCalendar = (event: CalendarItemProps) => {
    const eventIndex = selectedCalendar.findIndex((item) => item.date === event.date);

    if (eventIndex !== -1) {
      const existingEventIndex = selectedCalendar[eventIndex].events.indexOf(event.event);

      if (existingEventIndex !== -1) {
        // Remove the event if it already exists
        const updatedEvents = selectedCalendar[eventIndex].events.filter((e) => e !== event.event);
        const updatedCalendar = [...selectedCalendar];
        if (updatedEvents.length > 0) {
          updatedCalendar[eventIndex].events = updatedEvents;
        } else {
          updatedCalendar.splice(eventIndex, 1);
        }
        setSelectedCalendar(updatedCalendar);
      } else {
        // Add the event if it does not exist
        const updatedCalendar = [...selectedCalendar];
        const newEvent = {
          ...event.event,
          remove: true
        }
        updatedCalendar[eventIndex].events.push(newEvent);
        setSelectedCalendar(updatedCalendar);
      }
    } else {
      // Add new date and event
      const newEvent = {
        ...event.event,
        remove: true
      }
      const newSchedule = {
        date: event.date,
        events: [newEvent],
      };
      setSelectedCalendar([...selectedCalendar, newSchedule]);
    }
    setActiveTab("my_calendar");
  };

  if (!events.length) return <></>;

  return (
    <div className="flex flex-col space-y-10">
      {/* Top search bar */}

      <div className="w-full h-full min-h-[50vh]">
        <Tabs value={activeTab} defaultValue="matches" className="flex justify-start flex-col items-start space-y-10" id="myMatchesTab">
          <TabsList className="grid w-full grid-cols-2 md:max-w-xl bg-transparent ">
            <TabsTrigger activeTab={activeTab} onClick={() => setActiveTab("matches")} className='uppercase font-bold' value="matches">Resultados: {events.length}</TabsTrigger>
            <TabsTrigger activeTab={activeTab} onClick={() => setActiveTab("my_calendar")} className='uppercase font-bold' value="my_calendar">Mi Calendario</TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className='w-full h-screen'>
            <form
              action=""
              role="search"
              noValidate
              method="get"
              className="relative w-full flex-wrap px-6 grid grid-cols-6 gap-4"
            >
              <div className="bg-white border-2 border-black flex items-center justify-center content-center w-full col-span-4">
                <Input
                  ref={inputRef}
                  className="flex-grow mr-2 bg-transparent border-none rounded-none focus:border-none"
                  placeholder="Haga una pregunta o ingrese un término de búsqueda..."
                  value={value}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  autoCapitalize="off"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  autoFocus
                />
                <Button
                  className=" inset-y-0 right-0 flex items-center z-10 px-4  focus:outline-none cursor-pointer bg-[#52EF70] text-black rounded-none"
                  variant="ghost"
                  disabled={status === "loading"}
                  type="submit"
                >
                  BUSCAR
                  <MagnifyingGlassIcon className="w-4 h-4 ml-2 text-black" />
                </Button>
              </div>
              <Select>
                <SelectItem value="">City</SelectItem>
                <SelectItem value="Bogotá">Bogotá</SelectItem>
                <SelectItem value="Cali">Cali</SelectItem>
                <SelectItem value="Barranquilla">Barranquilla</SelectItem>
              </Select>
              <Select>
                <SelectItem value="">Date</SelectItem>
              </Select>
            </form>
            <div className="my-2">
              <Filters />
            </div>
            {events && events.length > 0 && <TimeLine schedules={schedules} addToCalendar={addToCalendar} />}
          </TabsContent>
          <TabsContent value="my_calendar" className='w-full h-screen'>
            <div className="w-full">
              {selectedCalendar && selectedCalendar.length > 0 ? <TimeLine schedules={selectedCalendar} addToCalendar={addToCalendar} remove /> : (
                <div className="flex justify-center h-[30vh] items-center">
                  <span>Aun no añades eventos a tu calendario</span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};


export const SearchEvents = ({ serverUrl }: SearchEventsProps) => {


  return (
    <div className="py-5">
      <ChatSearchUI />
    </div>
  );
};

