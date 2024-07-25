"use client"
import * as React from 'react';
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { LuCalendarDays, LuCalendarMinus, LuCalendarPlus, LuSettings2, LuUserX } from 'react-icons/lu';

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
import { UsersIcon } from '@heroicons/react/24/outline';
import { CustomModal } from './Modal';
import { type ToastRef, Toast } from './Toast';

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


const NumPeople = ({ out }: { out: boolean }) => {
  return (
    <div className="flex items-end">
      {
        out ? (<>
          <LuUserX className="w-4 h-4 mr-2 text-black" />
          <span className="text-black text-right font-sans text-base font-semibold leading-none">Soldout</span>
        </>) : (
          <>
            <UsersIcon className="w-4 h-4 mr-2 text-black" />
            <span className="text-black text-right font-sans text-base font-semibold leading-none">(150/200)</span>
          </>
        )
      }
    </div>
  )
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
          <span className="text-lg text-black font-normal w-[max-content] lg:pl-2 lg:pt-2">
            {formatTime(event.start_time)}
          </span>
        </div>
        <Link href={"#"}>
          <span className="text-md font-semibold leading-normal underline text-[#313A5E]">
            REGISTER
          </span>
        </Link>
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


        <div className="flex w-full justify-between">
          <NumPeople out={false} />
          <Button
            className={`px-2 font-semibold focus:outline-none cursor-pointer text-white rounded-md hidden lg:flex ${remove ? "bg-[red]" : "bg-[#3C0560]"}`}
            variant="ghost"
            onClick={addToCalendar}
          >
            {
              remove ? <>
                <LuCalendarMinus className="w-4 h-4 mr-2 text-white" />
                Quitar
              </> : <>
                <LuCalendarPlus className="w-4 h-4 mr-2 text-white" />
                My Cal
              </>
            }
          </Button>
        </div>
        <Button
          className={`flex w-full px-2 font-semibold focus:outline-none cursor-pointer text-white rounded-md lg:hidden ${remove ? "bg-[red]" : "bg-[#3C0560]"}`}
          variant="ghost"
          onClick={addToCalendar}
        >
          {
            remove ? <>
              <LuCalendarMinus className="w-4 h-4 mr-2 text-white" />
              Quitar
            </> : <>
              <LuCalendarPlus className="w-4 h-4 mr-2 text-white" />
              My Cal
            </>
          }
        </Button>
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
    <div className="px-0 py-0">
      <div className=" grid gap-y-8 max-w-full">
        {schedules.map((schedule) => (
          <div
            key={formatDate(schedule.date)}
            className="flex flex-col bg-white p-3"
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toastRef = React.useRef<ToastRef>(null);
  const toastRefDanger = React.useRef<ToastRef>(null);

  const handleShowToast = () => {
    toastRef.current?.show();
  };

  const handleShowToastDelete = () => {
    toastRefDanger.current?.show();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenShare, setIsModalOpenShare] = React.useState(false);

  const openModalShare = () => {
    setIsModalOpenShare(true);
  };

  const closeModalShare = () => {
    setIsModalOpenShare(false);
  };

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
        handleShowToastDelete()
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
    <div className="flex flex-col space-y-5">
      {/* Top search bar */}

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Filters"
      >
        <div className="flex flex-col w-full space-y-5">
          <Select className="w-full ">
            <SelectItem value="">City</SelectItem>
            <SelectItem value="Bogotá">Bogotá</SelectItem>
            <SelectItem value="Cali">Cali</SelectItem>
            <SelectItem value="Barranquilla">Barranquilla</SelectItem>
          </Select>
          <Select className="w-full ">
            <SelectItem value="">Date</SelectItem>
          </Select>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isModalOpenShare}
        onClose={closeModalShare}
        title=""
      >
        <div className="flex flex-col w-full space-y-2.5">
          <h3 className="text-gray-500 text-center font-dm-sans text-2xl font-bold leading-7">
            Send my Cal
          </h3>
          <div className="flex p-2.5 px-5 justify-center items-center gap-2.5 self-stretch">
            <p className='text-gray-500 text-center font-dm-sans text-base font-normal leading-6'>
              We{"´"}ll send your calendar to your register WhatsApp number
            </p>
          </div>
          <Button
            className="px-2 font-semibold focus:outline-none cursor-pointer text-white rounded-md bg-[#3C0560]"
            variant="ghost"
            onClick={handleShowToast}
          >
            Send
            <LuCalendarDays className="w-4 h-4 text-white font-bold ml-1" />
          </Button>
          <div>
            <Toast
              ref={toastRef}
              color="green"
              icon={
                <>
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </>
              }
              text="Calendar sent successfully"
              duration={5000}
            />
          </div>
        </div>
      </CustomModal>


      <div className="flex flex-col">
        <form
          action=""
          role="search"
          noValidate
          method="get"
          className="relative w-full flex-wrap grid grid-cols-6 gap-4"
        >
          <div className={`bg-white rounded-md border border-gray-400 flex items-center justify-center content-center w-full lg:col-span-4  col-span-5 ${activeTab === "my_calendar" ? "lg:col-span-3 col-span-3" : ""}  `}>
            <Input
              ref={inputRef}
              className="flex-grow mr-2 bg-transparent border-none rounded-none focus:border-none"
              placeholder="Search something"
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
              className=" inset-y-0 right-0 flex items-center z-10 px-2 mx-2 my-1  focus:outline-none cursor-pointer bg-[#7D0991] text-white rounded-none"
              variant="ghost"
              disabled={status === "loading"}
              type="submit"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-white font-bold" />
            </Button>
          </div>

          <Select className="hidden lg:block">
            <SelectItem value="">City</SelectItem>
            <SelectItem value="Bogotá">Bogotá</SelectItem>
            <SelectItem value="Cali">Cali</SelectItem>
            <SelectItem value="Barranquilla">Barranquilla</SelectItem>
          </Select>
          <Select className="hidden lg:block">
            <SelectItem value="">Date</SelectItem>
          </Select>

          <Button
            className="flex lg:hidden  inset-y-0 right-0  items-center z-10 px-2 my-1  focus:outline-none cursor-pointer bg-[#3C0560] text-white rounded-[1px]"
            variant="ghost"
            type="button"
            onClick={openModal}
          >
            <LuSettings2 className="w-4 h-4 text-white font-bold" />
          </Button>
          {
            activeTab === "my_calendar" && (
              <Button
                className="flex inset-y-0 right-0  items-center z-10 px-2 my-1 col-span-2 lg:col-span-1 focus:outline-none cursor-pointer bg-[#3C0560] text-white rounded-[1px]"
                variant="ghost"
                type="button"
                onClick={openModalShare}
              >
                Send <span className='hidden lg:block ml-1'>{activeTab === "my_calendar" && "My calendar"}</span>
                <LuCalendarDays className="w-4 h-4 text-white font-bold ml-1" />
              </Button>
            )
          }
        </form>
        <Filters />
      </div>
      <div className="w-full h-full min-h-[50vh]">
        <Tabs value={activeTab} defaultValue="matches" className="flex justify-center flex-col items-start space-y-10" id="myMatchesTab">
          <TabsList className="grid w-full grid-cols-2 md:max-w-xl bg-transparent ">
            <TabsTrigger activeTab={activeTab} onClick={() => setActiveTab("matches")} className='font-bold' value="matches">Events</TabsTrigger>
            <TabsTrigger activeTab={activeTab} onClick={() => setActiveTab("my_calendar")} className='font-bold' value="my_calendar">My Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className='w-full h-screen !mt-3'>
            {events && events.length > 0 && <TimeLine schedules={schedules} addToCalendar={addToCalendar} />}
          </TabsContent>
          <TabsContent value="my_calendar" className='w-full h-screen !mt-3'>
            <div className="w-full">
              {selectedCalendar && selectedCalendar.length > 0 ? <TimeLine schedules={selectedCalendar} addToCalendar={addToCalendar} remove /> : (
                <div className="flex justify-center h-[30vh] items-center">
                  <div className="flex flex-col w-full space-y-2.5 justify-center items-center">
                    <h3 className="text-gray-500 text-center font-dm-sans text-2xl font-bold leading-7">
                      Empty
                    </h3>
                    <LuCalendarDays className="w-10 h-10 text-[#818181] font-bold" />
                    <div className="flex p-2.5 px-5 justify-center items-center gap-2.5 self-stretch">
                      <p className='text-gray-500 text-center font-dm-sans text-base font-normal leading-6'>
                        Please add some events on events tab.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Toast
              ref={toastRefDanger}
              color="blue"
              icon={
                <>
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9 9H9.01" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 9H15.01" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </>
              }
              text="You have removed this event from your calendar"
              duration={5000}
            />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};


export const SearchEvents = ({ serverUrl }: SearchEventsProps) => {


  return (
    <div className="lg:py-5">
      <ChatSearchUI />
    </div>
  );
};

