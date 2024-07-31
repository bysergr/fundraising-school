'use client';
import { useUserStore } from '@/providers/user-store-provider';
import * as React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import FilterIcons from './FilterIcons';
import { useInstantSearch, useMenu, useSearchBox } from 'react-instantsearch';
import { LuCalendarDays, LuSettings2, LuUserX } from 'react-icons/lu';
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
import {
  getOndeVamosClient,
  useListCalendarEvents,
  type ToggleCalendarEventReturn,
  type ListCalendarEventsReturn,
} from '@/utils/onde-vamos';
import { debounce } from '@/utils/lib';
import { Configure, InstantSearch, useHits } from 'react-instantsearch';
import { TechWeekEvent, type HostProps, ScheduleProps } from '@/utils/onde-vamos/common';
import { useToast } from '@/providers/toast-provider';
import RelevanceBadge from '@/components/search_list/RelevanceBadge';
import CalendarToggleButton from '@/components/search_list/CalendarToggleButton';

const Host = ({ host }: { host: HostProps[] }) => {
  const ui = host.map((item, key) => {
    const name = key > 0 ? `, ${item.name[0]}` : item.name[0];
    const link = item.linkedin[0] ? item.linkedin[0] : item.instagram[0];
    if (!link) return <span key={item.name[0]}>{name}</span>;
    return (
      <Link key={item.name[0]} href={link} target="_blank">
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
          <LuUserX className="mr-2 size-4 text-black" />
          <span className="text-right font-sans text-base font-semibold leading-none text-black">
            Soldout
          </span>
        </>
      ) : (
        <>
          <UsersIcon className="mr-2 size-4 text-black" />
          <span className="text-right font-sans text-base font-semibold leading-none text-black">
            (150/200)
          </span>
        </>
      )}
    </div>
  );
};

const RefinementBadges = ({ event }: { event: TechWeekEvent }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {event.format && (
        <Badge className="bg-violet-500 text-white">
          <FilterIcons className="w-4 px-1" label={event.format} /> {event.format}
        </Badge>
      )}
      {event.intention && (
        <Badge className="bg-violet-500 text-white">
          <FilterIcons className="w-4 px-1" label={event.intention} /> {event.intention}
        </Badge>
      )}
      {event.topic && (
        <Badge className="bg-violet-500 text-white">
          <FilterIcons className="w-4 px-1" label={event.topic} /> {event.topic}
        </Badge>
      )}
    </div>
  );
};

const ExpandableParagraph = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="flex flex-col">
      <p className={`${expanded ? '' : 'line-clamp-4'}`}>{text}</p>

      <button
        type="button"
        data-action={expanded ? 'collapse' : 'expand'}
        className="ml-auto cursor-pointer px-2 text-sm lg:text-xs"
        onMouseDown={toggleExpanded}
      >
        {expanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
};

const TimelineItem = ({
  event,
  separator,
  toggleCalendarEvent,
  refetchCalendar,
  refreshSearchResults,
}: {
  event: TechWeekEvent;
  separator: boolean;
  toggleCalendarEvent: ToggleCalendarEventReturn;
  refetchCalendar: ListCalendarEventsReturn['refetch'];
  refreshSearchResults: () => void;
}) => {
  const { showToast } = useToast();
  const formatTime = (dateString: string): string =>
    new Date(dateString).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

  const handleCalendarClick = () => {
    toggleCalendarEvent.mutate(event.id, !event.isAddedToCalendar);
    // IMPORTANT: Right now the Neon database takes some time to update after
    // writing to it, this is a manufactured delay to make sure the calendar
    // is updated in the db.
    setTimeout(() => {
      refetchCalendar();
      refreshSearchResults();
      if (event.isAddedToCalendar) {
        showToast({
          color: 'red',
          text: `Event removed from calendar: ${event.title}`,
          duration: 3000,
        });
        return;
      }
      showToast({
        color: 'green',
        text: `Event added to calendar: ${event.title}`,
        duration: 3000,
      });
    }, 200);
  };

  return (
    <div className=" flex w-full max-w-full flex-col items-start gap-4 lg:flex-row lg:gap-7">
      <div className="flex w-full flex-row items-center justify-between gap-1 text-sm text-gray-500 lg:w-auto lg:flex-col lg:items-end dark:text-gray-400">
        <div className="flex flex-row items-center text-end lg:flex-col lg:items-end">
          <span className="w-max text-lg font-normal text-black lg:pl-2 lg:pt-2">
            {formatTime(event.start_time)}
          </span>
        </div>
        <Link href={event.url} target="_blank">
          <span className="font-semibold leading-normal text-[#313A5E] underline">REGISTER</span>
        </Link>
      </div>

      <div className=" separator-item hidden lg:block" />
      <div className="grid w-full space-y-6 px-2">
        <div className="">
          <h3 className="text-xl font-bold text-ctwLightPurple">{event.title}</h3>
          {event.host && (
            <p className=" pb-2 font-normal leading-normal text-[#313A5E]">
              Por <Host host={event.host} />
            </p>
          )}
          {event.relevanceScore && (
            <RelevanceBadge
              score={Number(event.relevanceScore)}
              explanation={event.relevanceExplanation}
            />
          )}{' '}
          {event.full_address && (
            <span className=" ml-2 hidden font-semibold leading-normal text-[#313A5E] lg:ml-0 lg:block">
              {event.full_address}
            </span>
          )}
        </div>

        <ExpandableParagraph text={event.description} />
        {/* <p className="line-clamp-4 max-w-full">{event.description}</p> */}

        <RefinementBadges event={event} />
        <div className="flex w-full justify-between">
          <NumPeople out={false} />

          <CalendarToggleButton
            isAddedToCalendar={event.isAddedToCalendar}
            isLoading={toggleCalendarEvent.isLoading}
            onClick={handleCalendarClick}
            className="hidden lg:flex"
          />
        </div>
        <CalendarToggleButton
          isAddedToCalendar={event.isAddedToCalendar}
          isLoading={toggleCalendarEvent.isLoading}
          onClick={handleCalendarClick}
          className="lg:hidden"
        />
      </div>
      {separator && <Separator className="my-5 block lg:hidden" />}
    </div>
  );
};

interface TimeLineProps {
  schedules: ScheduleProps[];
  toggleCalendarEvent: ToggleCalendarEventReturn;
  refetchCalendar: ListCalendarEventsReturn['refetch'];
  refreshSearchResults: () => void;
  remove?: boolean;
}

function groupAndOrderEventsByDate(events: TechWeekEvent[]): ScheduleProps[] {
  const groupedEventsMap: Record<string, TechWeekEvent[]> = {};

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

  return groupedEventsArray;
}

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

const TimeLine: React.FC<TimeLineProps> = ({
  schedules,
  toggleCalendarEvent,
  refetchCalendar,
  refreshSearchResults,
}) => {
  const [openDates, setOpenDates] = React.useState<Set<string>>(
    new Set(schedules.map((s) => formatDate(s.date))),
  );

  const toggleDate = React.useCallback((date: string) => {
    setOpenDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  }, []);

  const sortedSchedules = React.useMemo(
    () => schedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [schedules],
  );

  return (
    <div className="p-0">
      <ul className="grid max-w-full gap-y-8">
        {sortedSchedules.length > 0 ? (
          sortedSchedules.map((schedule) => {
            const formattedDate = formatDate(schedule.date);
            const isOpen = openDates.has(formattedDate);
            return (
              <li key={formattedDate} className="flex flex-col rounded-lg bg-white p-3 shadow-sm">
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleDate(formattedDate)}
                    className="flex w-full items-center justify-between text-xl font-bold uppercase text-ctwLightPurple focus:outline-none focus:ring-2 focus:ring-ctwLightPurple focus:ring-opacity-50 lg:pl-2 lg:pt-2"
                    aria-expanded={isOpen}
                  >
                    <span>{formattedDate}</span>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 ease-in-out${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`mt-5 flex flex-col overflow-hidden transition-all duration-300 ease-in-out lg:space-y-16 ${
                      isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {schedule.events
                      .sort(
                        (a, b) =>
                          new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
                      )
                      .map((event, i) => (
                        <TimelineItem
                          key={`${event.title}-${event.start_time}`}
                          event={event}
                          separator={i < schedule.events.length - 1}
                          toggleCalendarEvent={toggleCalendarEvent}
                          refetchCalendar={refetchCalendar}
                          refreshSearchResults={refreshSearchResults}
                        />
                      ))}
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <li className="flex h-[30vh] items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center space-y-2.5">
              <h3 className="text-center text-2xl font-bold leading-7 text-gray-500">Empty</h3>
              <LuCalendarDays className="size-10 text-[#818181]" />
              <p className="px-5 text-center text-base font-normal leading-6 text-gray-500">
                No events matched your query. Have dinner with us?
              </p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

interface SelectEvent extends React.ChangeEvent<HTMLSelectElement> {}
interface CitySelectProps {
  className: string;
  onSelect?: (value: string) => void;
}
const CitySelect: React.FC<CitySelectProps> = ({ className, onSelect }) => {
  const { items: cityOptions, refine: refineCity } = useMenu({
    attribute: 'city',
  });

  const handleSelect = (e: SelectEvent): void => {
    const value: string = e.target.value === 'all' ? '' : e.target.value;

    refineCity(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <Select className={`${className}`} onChange={handleSelect}>
      <SelectItem key="all" value="all">
        Select City
      </SelectItem>
      {cityOptions.map(({ count, label, value, isRefined }) => (
        <SelectItem aria-checked={isRefined} key={label} value={value}>
          {value} ({count})
        </SelectItem>
      ))}
    </Select>
  );
};

interface SearchBarProps {
  activeTab: string;
  openModal: () => void;
  openModalShare: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ activeTab, openModal, openModalShare }) => {
  const { query, refine } = useSearchBox();
  const { status } = useInstantSearch();
  const [value, setValue] = React.useState(query);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const refineSearch = debounce(refine, 100);

  function setQuery(newQuery: string) {
    setValue(newQuery);
    refineSearch(newQuery);
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
            className="mr-2 grow rounded-none border-none bg-transparent focus:border-none"
            placeholder="Search something"
            value={value}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            autoFocus
          />
          <Button
            className=" inset-y-0 right-0 z-10 mx-2 my-1 flex cursor-pointer items-center  rounded-none bg-ctwLightPurple px-2 text-white focus:outline-none"
            variant="ghost"
            disabled={status === 'loading'}
            type="submit"
          >
            <MagnifyingGlassIcon className="size-4 font-bold text-white" />
          </Button>
        </div>
        <CitySelect className="hidden lg:block" />

        <Button
          className="inset-y-0 right-0  z-10 my-1  flex cursor-pointer items-center rounded-[1px]  bg-[#3C0560] px-2 text-white focus:outline-none lg:hidden"
          variant="ghost"
          type="button"
          onClick={openModal}
        >
          <LuSettings2 className="size-4 font-bold text-white" />
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
            <LuCalendarDays className="ml-1 size-4 font-bold text-white" />
          </Button>
        )}
      </form>
      <Filters />
    </div>
  );
};

const ChatSearchUI = () => {
  const { email } = useUserStore((state) => state);
  // This makes a call to the calendar list but we have to figure out how to make the call again after adding a new event to the calendar
  const {
    data: myCalendarList,
    isLoading: isCalendarLoading,
    error: myCalendarListError,
    toggleCalendarEvent,
    refetch: refetchCalendar,
  } = useListCalendarEvents(email);
  const { refresh: refreshSearchResults } = useInstantSearch();
  const [events, setEvents] = React.useState<TechWeekEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('matches');
  const { items } = useHits<TechWeekEvent>();
  const schedules = groupAndOrderEventsByDate(items);

  // Transform the myCalendar response to a format that can be used by the TimeLine component
  // Probably better to have the whole MyCalendar component be the one that makes this logic
  let mySchedules: ScheduleProps[] = [];
  if (myCalendarList && myCalendarList.data && myCalendarList.data.events.length > 0) {
    mySchedules = groupAndOrderEventsByDate(
      myCalendarList.data.events.map((myCalendarEvent) => {
        return myCalendarEvent.eventData;
      }),
    );
  }

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
      });
  }, []);

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
          <h3 className=" text-center text-2xl font-bold leading-7 text-gray-500">Send my Cal</h3>
          <div className="flex items-center justify-center gap-2.5 self-stretch p-2.5 px-5">
            <p className=" text-center text-base font-normal leading-6 text-gray-500">
              We{'´'}ll send your calendar to your register WhatsApp number
            </p>
          </div>
          <Button
            className="cursor-pointer rounded-md bg-[#3C0560] px-2 font-semibold text-white focus:outline-none"
            variant="ghost"
          >
            Send
            <LuCalendarDays className="ml-1 size-4 font-bold text-white" />
          </Button>
          <div></div>
        </div>
      </CustomModal>

      <SearchBar activeTab={activeTab} openModal={openModal} openModalShare={openModalShare} />
      <div className="size-full min-h-[50vh]">
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
            {schedules && schedules.length > 0 && (
              <TimeLine
                schedules={schedules}
                toggleCalendarEvent={toggleCalendarEvent}
                refetchCalendar={refetchCalendar}
                refreshSearchResults={refreshSearchResults}
              />
            )}
          </TabsContent>
          <TabsContent value="my_calendar" className="!mt-3 h-screen w-full">
            <div className="w-full">
              {isCalendarLoading && <p>Loading...</p>}
              {myCalendarListError && <p>Error: {myCalendarListError.message}</p>}
              {mySchedules && mySchedules.length > 0 ? (
                <TimeLine
                  schedules={mySchedules}
                  toggleCalendarEvent={toggleCalendarEvent}
                  refetchCalendar={refetchCalendar}
                  refreshSearchResults={refreshSearchResults}
                />
              ) : (
                <div className="flex h-[30vh] items-center justify-center">
                  <div className="flex w-full flex-col items-center justify-center space-y-2.5">
                    <h3 className=" text-center text-2xl font-bold leading-7 text-gray-500">
                      Empty
                    </h3>
                    <LuCalendarDays className="size-10 font-bold text-[#818181]" />
                    <div className="flex items-center justify-center gap-2.5 self-stretch p-2.5 px-5">
                      <p className=" text-center text-base font-normal leading-6 text-gray-500">
                        Please add some events on events tab.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const SearchEvents = () => {
  const { email } = useUserStore((state) => state);

  const { searchClient } = getOndeVamosClient({
    server: {
      additionalHeaders: {
        'X-Onde-Email': email,
      },
    },
  });
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="onde_col_week"
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure hitsPerPage={250} />
      <div className="lg:py-5">
        <ChatSearchUI />
      </div>
    </InstantSearch>
  );
};

export default SearchEvents;
