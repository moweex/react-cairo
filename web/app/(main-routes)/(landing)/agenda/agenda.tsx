import { getAgenda } from '@lib/cms-api';
import { HOUR } from '@lib/constants';
import { AgendaItem } from '@lib/types';
import DateComponent from 'app/(main-routes)/(landing)/location/date/date';

const Session = (data: AgendaItem) => {
  return (
    <div className="flex w-full min-h-[10rem]">
      <div className="flex pb-3 border-r-2 border-black border-opacity-50">
        <div className="w-32 md:w-96 justify-between flex rounded-l-lg items-stretch bg-gradient-to-r from-brand-300 to-brand-300">
          <div className="ml-2 md:ml-4 flex flex-col justify-around py-2">
            <div className="text-black text-sm md:text-3xl md:font-bold tracking-widest">
              <DateComponent date={data.start} format="MMMM dd" />
            </div>
            <div className="mt-3 space-y-1">
              <div className="text-black text-base font-medium md:text-xl">
                <DateComponent date={data.start} format="HH:mm" />
              </div>
              <div className="text-black text-base font-medium md:text-xl">
                <DateComponent date={data.end} format="HH:mm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex-1 rounded-r-lg mb-3 bg-opacity-10 flex flex-col justify-center">
        <div className="flex py-2 md:py-2 px-1 md:px-6 items-center gap-2 md:gap-4 my-4">
          <div className="flex-1">
            <div className="text-brand-300 font-bold text-lg md:text-2xl my-auto">
              {data.title}
            </div>
            <div className="mt-1 md:mt-4 flex flex-col space-y-2">
              {data.speakers.map(speaker => (
                <div
                  key={speaker.id}
                  className="flex flex-row items-center space-x-4"
                >
                  <div className="text font-semibold text-base md:text-xl">
                    {speaker.name}
                  </div>
                  <div className="text-gray-100 text-sm md:text-base ">
                    {speaker.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Agenda() {
  const agenda = await getAgenda({ revalidate: HOUR });

  if (agenda.length === 0) return <></>;

  return (
    <section
      id="agenda"
      className="flex flex-col items-center w-full bg-opacity-30 bg-black py-20"
    >
      <h3 className="text-2xl md:text-4xl uppercase font-extrabold tracking-[0.2em]">
        agenda
      </h3>
      <div className="flex flex-col items-center w-full px-4 lg:w-5/6 max-w-[1980px] mt-14">
        {agenda.map(item => (
          <Session key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
