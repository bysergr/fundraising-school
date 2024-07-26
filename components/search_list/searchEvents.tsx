'use client';
import * as React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useInstantSearch, useMenu, useSearchBox } from 'react-instantsearch';
import {
  LuCalendarDays,
  LuCalendarMinus,
  LuCalendarPlus,
  LuSettings2,
  LuUserX,
} from 'react-icons/lu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import './styles.css';
import { Select, SelectItem } from '@/components/ui/select';
import { Filters } from './Filters';
import { UsersIcon } from '@heroicons/react/24/outline';
import { CustomModal } from './Modal';
import { type ToastRef, Toast } from './Toast';
import { getTypesenseAdapter } from '@/utils/onde-vamos';
import { Configure, InstantSearch, useHits } from 'react-instantsearch';

const searchAdapter = getTypesenseAdapter();

type SearchEventsProps = { serverUrl: string };

type HostProps = {
  instagram: string[];
  linkedin: string[];
  name: string[];
  twitter: string[];
};

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
  remove?: boolean;
};

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
    color = 'bg-green-100 text-green-800';
    text = 'Excelente ajuste';
    emoji = '🎯';
  } else if (score >= 70) {
    color = 'bg-yellow-100 text-yellow-800';
    text = 'Buen ajuste';
    emoji = '👍';
  } else if (score >= 50) {
    color = 'bg-orange-100 text-orange-800';
    text = 'Algo relevante';
    emoji = '🤔';
  } else {
    color = 'bg-red-100 text-red-800';
    text = 'Menos relevante';
    emoji = '🔍';
  }

  return (
    <Badge className={`${color} px-2 py-1 text-sm font-medium`}>
      {emoji} {text}
    </Badge>
  );
};

const TYPESENSE_PER_PAGE = 20;

const Host = ({ host }: { host: HostProps[] }) => {
  const ui = host.map((item, key) => {
    const name = key > 0 ? `, ${item.name[0]}` : item.name[0];
    const link = item.linkedin[0] ? item.linkedin[0] : item.instagram[0];
    return (
      <Link key={item.name[0]} href={'#'} target="_blank">
        <span>{name}</span>
      </Link>
    );
  });
  return ui;
};

const NumPeople = ({ out }: { out: boolean }) => {
  return (
    <div className="flex items-end">
      {out ? (
        <>
          <LuUserX className="mr-2 h-4 w-4 text-black" />
          <span className="text-right font-sans text-base font-semibold leading-none text-black">
            Soldout
          </span>
        </>
      ) : (
        <>
          <UsersIcon className="mr-2 h-4 w-4 text-black" />
          <span className="text-right font-sans text-base font-semibold leading-none text-black">
            (150/200)
          </span>
        </>
      )}
    </div>
  );
};
const TimelineItem = ({
  event,
  separator,
  addToCalendar,
  remove,
}: {
  event: TechWeekEvent;
  separator: boolean;
  addToCalendar: () => void;
  remove?: boolean;
}) => {
  const formatTime = (dateString: string): string =>
    new Date(dateString).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

  return (
    <div className=" flex w-full max-w-full flex-col items-start gap-4 lg:flex-row lg:gap-7">
      <div className="flex w-full flex-row items-center justify-between gap-1 text-sm text-gray-500 lg:w-auto lg:flex-col lg:items-end dark:text-gray-400">
        <div className="flex flex-row items-center text-end lg:flex-col lg:items-end">
          <span className="w-[max-content] text-lg font-normal text-black lg:pl-2 lg:pt-2">
            {formatTime(event.start_time)}
          </span>
        </div>
        <Link href={event.url} target="_blank">
          <span className="text-md font-semibold leading-normal text-[#313A5E] underline">
            REGISTER
          </span>
        </Link>
      </div>

      <div className="w-sm separator-item hidden lg:block" />
      <div className="grid w-full space-y-6 px-2">
        <div className="">
          <h3 className="text-xl font-bold text-[#7D0991]">{event.title}</h3>
          {event.host && (
            <p className="text-md pb-2 font-normal leading-normal text-[#313A5E]">
              Por <Host host={event.host} />
            </p>
          )}
          {event.full_address && (
            <span className="text-md ml-2 hidden font-semibold leading-normal text-[#313A5E] lg:ml-0 lg:block">
              {event.full_address}
            </span>
          )}
        </div>

        <p className="line-clamp-4 max-w-full">{event.description}</p>

        <div className="flex w-full justify-between">
          <NumPeople out={false} />
          <Button
            className={`hidden cursor-pointer rounded-md px-2 font-semibold text-white focus:outline-none lg:flex ${remove ? 'bg-[red]' : 'bg-[#3C0560]'}`}
            variant="ghost"
            onClick={addToCalendar}
          >
            {remove ? (
              <>
                <LuCalendarMinus className="mr-2 h-4 w-4 text-white" />
                Quitar
              </>
            ) : (
              <>
                <LuCalendarPlus className="mr-2 h-4 w-4 text-white" />
                My Cal
              </>
            )}
          </Button>
        </div>
        <Button
          className={`flex w-full cursor-pointer rounded-md px-2 font-semibold text-white focus:outline-none lg:hidden ${remove ? 'bg-[red]' : 'bg-[#3C0560]'}`}
          variant="ghost"
          onClick={addToCalendar}
        >
          {remove ? (
            <>
              <LuCalendarMinus className="mr-2 h-4 w-4 text-white" />
              Quitar
            </>
          ) : (
            <>
              <LuCalendarPlus className="mr-2 h-4 w-4 text-white" />
              My Cal
            </>
          )}
        </Button>
      </div>
      {separator && <Separator className="my-5 block lg:hidden" />}
    </div>
  );
};

type CalendarItemProps = { date: string; event: TechWeekEvent };
interface TimeLineProps {
  schedules: ScheduleProps[];
  addToCalendar: (params: CalendarItemProps) => void;
  remove?: boolean;
}

function groupAndOrderEventsByDate(events: TechWeekEvent[]): ScheduleProps[] {
  const groupedEventsMap: Record<string, TechWeekEvent[]> = {};

  console.log({ events });
  events.forEach((event) => {
    try {
      const date = new Date(event.start_time).toISOString().split('T')[0];
      if (!groupedEventsMap[date]) {
        groupedEventsMap[date] = [];
      }
      groupedEventsMap[date].push(event);
    } catch (err) {
      console.error(err);
    }
  });

  const groupedEventsArray: ScheduleProps[] = Object.entries(groupedEventsMap)
    .map(([date, events]) => ({ date, events }))
    .sort((a, b) => a.date.localeCompare(b.date));
  console.log({ groupedEventsArray });

  return groupedEventsArray;
}

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

const TimeLine: React.FC<TimeLineProps> = ({ addToCalendar, remove }) => {
  const { items } = useHits<TechWeekHit>();
  const schedules = groupAndOrderEventsByDate(items);

  return (
    <div className="px-0 py-0">
      <div className=" grid max-w-full gap-y-8">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div key={formatDate(schedule.date)} className="flex flex-col bg-white p-3">
              <details className="flex " open>
                <summary className="flex cursor-pointer justify-between text-xl font-bold uppercase text-[#7D0991] lg:pl-2 lg:pt-2">
                  {formatDate(schedule.date)}
                  <IoIosArrowDown className="arrow-icon" />
                </summary>
                <div className="mt-5 flex h-full flex-col lg:space-y-16">
                  {schedule.events
                    .sort(
                      (left, right) =>
                        new Date(left.start_time).getTime() - new Date(right.start_time).getTime(),
                    )
                    .filter((event) => {
                      return true;
                      /* We don't have relevance scores yet */
                      /* return event.relevanceScore > 40 */
                    })
                    .map((event, i) => (
                      <TimelineItem
                        key={event.title}
                        event={event}
                        separator={i < schedule.events.length - 1}
                        remove={remove}
                        addToCalendar={() => {
                          addToCalendar({
                            date: schedule.date,
                            event: event,
                          });
                        }}
                      />
                    ))}
                </div>
              </details>
            </div>
          ))
        ) : (
          <div className="flex h-[30vh] items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center space-y-2.5">
              <h3 className="font-dm-sans text-center text-2xl font-bold leading-7 text-gray-500">
                Empty
              </h3>
              <LuCalendarDays className="h-10 w-10 font-bold text-[#818181]" />
              <div className="flex items-center justify-center gap-2.5 self-stretch p-2.5 px-5">
                <p className="font-dm-sans text-center text-base font-normal leading-6 text-gray-500">
                  No events matched your query. Have dinner with us?
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CitySelect = ({ className, onSelect }: { className: string; onSelect?: (e: any) => any }) => {
  const { items: cityOptions, refine: refineCity } = useMenu({
    attribute: 'city',
  });
  console.log({ cityOptions });

  const handleSelect = (e) => {
    const value = e.target.value;
    refineCity(value);
    onSelect && onSelect(value);
  };

  return (
    <Select className={`${className}`} onChange={handleSelect}>
      {cityOptions.map(({ count, label, value, isRefined }) => (
        <SelectItem aria-checked={isRefined} key={label} value={value}>
          {value} ({count})
        </SelectItem>
      ))}
    </Select>
  );
};

const SearchBar = ({ activeTab, openModal, openModalShare }) => {
  const { query, refine } = useSearchBox();
  const { status } = useInstantSearch();

  const [value, setValue] = React.useState(query);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function setQuery(newQuery: string) {
    setValue(newQuery);
    refine(newQuery);
  }

  return (
    <div className="flex flex-col">
      <form
        action=""
        role="search"
        noValidate
        method="get"
        className="relative grid w-full grid-cols-6 flex-wrap gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          const newQuery = inputRef.current?.value || '';
          /* trackEvent('search/submit', { query: newQuery }); */
          if (inputRef.current) {
            setQuery(newQuery);
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <div
          className={`col-span-5 flex w-full content-center items-center justify-center rounded-md border border-gray-400 bg-white  lg:col-span-4 ${activeTab === 'my_calendar' ? 'col-span-3 lg:col-span-3' : ''}  `}
        >
          <Input
            ref={inputRef}
            className="mr-2 flex-grow rounded-none border-none bg-transparent focus:border-none"
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
            className=" inset-y-0 right-0 z-10 mx-2 my-1 flex cursor-pointer items-center  rounded-none bg-[#7D0991] px-2 text-white focus:outline-none"
            variant="ghost"
            disabled={status === 'loading'}
            type="submit"
          >
            <MagnifyingGlassIcon className="h-4 w-4 font-bold text-white" />
          </Button>
        </div>
        <CitySelect className="hidden lg:block" />

        <Button
          className="inset-y-0 right-0  z-10 my-1  flex cursor-pointer items-center rounded-[1px]  bg-[#3C0560] px-2 text-white focus:outline-none lg:hidden"
          variant="ghost"
          type="button"
          onClick={openModal}
        >
          <LuSettings2 className="h-4 w-4 font-bold text-white" />
        </Button>
        {activeTab === 'my_calendar' && (
          <Button
            className="inset-y-0 right-0 z-10  col-span-2 my-1 flex cursor-pointer items-center rounded-[1px] bg-[#3C0560] px-2 text-white focus:outline-none lg:col-span-1"
            variant="ghost"
            type="button"
            onClick={openModalShare}
          >
            Send{' '}
            <span className="ml-1 hidden lg:block">
              {activeTab === 'my_calendar' && 'My calendar'}
            </span>
            <LuCalendarDays className="ml-1 h-4 w-4 font-bold text-white" />
          </Button>
        )}
      </form>
      <Filters />
    </div>
  );
};

const ChatSearchUI = () => {
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

  React.useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/CestDiego/e2cf07f13a287619dc563a344b124133/raw/b1d918ae195f1374322f0199662b83d8d8ab8abb/events_sample.',
    )
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
        setSchedules(res);
      });
  }, []);

  const [selectedCalendar, setSelectedCalendar] = React.useState<ScheduleProps[]>([]);
  const [activeTab, setActiveTab] = React.useState('matches');

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
        handleShowToastDelete();
      } else {
        // Add the event if it does not exist
        const updatedCalendar = [...selectedCalendar];
        const newEvent = {
          ...event.event,
          remove: true,
        };
        updatedCalendar[eventIndex].events.push(newEvent);
        setSelectedCalendar(updatedCalendar);
      }
    } else {
      // Add new date and event
      const newEvent = {
        ...event.event,
        remove: true,
      };
      const newSchedule = {
        date: event.date,
        events: [newEvent],
      };
      setSelectedCalendar([...selectedCalendar, newSchedule]);
    }
    setActiveTab('my_calendar');
  };

  if (!events.length) return <></>;

  return (
    <div className="flex flex-col space-y-5">
      {/* Top search bar */}

      <CustomModal key="filters" isOpen={isModalOpen} onClose={closeModal} title="Filters">
        <div className="flex w-full flex-col space-y-5">
          <CitySelect className="w-full" onSelect={closeModal} />
        </div>
      </CustomModal>

      <CustomModal key="otro" isOpen={isModalOpenShare} onClose={closeModalShare} title="">
        <div className="flex w-full flex-col space-y-2.5">
          <h3 className="font-dm-sans text-center text-2xl font-bold leading-7 text-gray-500">
            Send my Cal
          </h3>
          <div className="flex items-center justify-center gap-2.5 self-stretch p-2.5 px-5">
            <p className="font-dm-sans text-center text-base font-normal leading-6 text-gray-500">
              We{'´'}ll send your calendar to your register WhatsApp number
            </p>
          </div>
          <Button
            className="cursor-pointer rounded-md bg-[#3C0560] px-2 font-semibold text-white focus:outline-none"
            variant="ghost"
            onClick={handleShowToast}
          >
            Send
            <LuCalendarDays className="ml-1 h-4 w-4 font-bold text-white" />
          </Button>
          <div>
            <Toast
              ref={toastRef}
              color="green"
              icon={
                <>
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </>
              }
              text="Calendar sent successfully"
              duration={5000}
            />
          </div>
        </div>
      </CustomModal>

      <SearchBar activeTab={activeTab} openModal={openModal} openModalShare={openModalShare} />
      <div className="h-full min-h-[50vh] w-full">
        <Tabs
          value={activeTab}
          defaultValue="matches"
          className="flex flex-col items-start justify-center space-y-10"
          id="myMatchesTab"
        >
          <TabsList className="grid w-full grid-cols-2 bg-transparent md:max-w-xl ">
            <TabsTrigger
              activeTab={activeTab}
              onClick={() => setActiveTab('matches')}
              className="font-bold"
              value="matches"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              activeTab={activeTab}
              onClick={() => setActiveTab('my_calendar')}
              className="font-bold"
              value="my_calendar"
            >
              My Calendar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className="!mt-3 h-screen w-full">
            {events && events.length > 0 && (
              <TimeLine schedules={schedules} addToCalendar={addToCalendar} />
            )}
          </TabsContent>
          <TabsContent value="my_calendar" className="!mt-3 h-screen w-full">
            <div className="w-full">
              {selectedCalendar && selectedCalendar.length > 0 ? (
                <TimeLine schedules={selectedCalendar} addToCalendar={addToCalendar} remove />
              ) : (
                <div className="flex h-[30vh] items-center justify-center">
                  <div className="flex w-full flex-col items-center justify-center space-y-2.5">
                    <h3 className="font-dm-sans text-center text-2xl font-bold leading-7 text-gray-500">
                      Empty
                    </h3>
                    <LuCalendarDays className="h-10 w-10 font-bold text-[#818181]" />
                    <div className="flex items-center justify-center gap-2.5 self-stretch p-2.5 px-5">
                      <p className="font-dm-sans text-center text-base font-normal leading-6 text-gray-500">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 9H9.01"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 9H15.01"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
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

const SearchEvents = ({ serverUrl }: SearchEventsProps) => {
  return (
    <InstantSearch
      searchClient={searchAdapter.searchClient}
      indexName="onde_col_week"
      future={{ preserveSharedStateOnUnmount: true }}
    >
      {/* @ts-ignore Ignore this typescript error, the types for configure look wrong */}
      <Configure hitsPerPage={100} />
      <div className="lg:py-5">
        <ChatSearchUI />
      </div>
    </InstantSearch>
  );
};

export default SearchEvents;
