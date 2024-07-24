'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';

function Animation({ children }: { children: JSX.Element }) {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      {children}
    </Transition>
  );
}

function QuestionItem({ title, answer }: { title: string; answer: string }) {
  return (
    <Disclosure>
      {({ open }: { open: boolean }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between gap-1 text-left text-lg font-bold">
            <p className="block max-w-[90%]">{title}</p>
            <XMarkIcon
              className={clsx('size-5 transition-transform', open ? 'rotate-0' : 'rotate-45')}
            />
          </Disclosure.Button>

          <Animation>
            <Disclosure.Panel className="my-4 text-gray-800">{answer}</Disclosure.Panel>
          </Animation>
        </>
      )}
    </Disclosure>
  );
}

export default function Questions() {
  return (
    <>
      <section id="questions" className="relative px-4 py-12 sm:px-6 md:py-20">
        <h2 className="h2 pb-12 text-center md:pb-16" data-aos="zoom-y-out">
          Still not convinced? <br /> We’ve got the answers
        </h2>
        <div
          data-aos="zoom-y-out"
          className="mx-auto max-w-4xl rounded-xl border border-[#f5f5f5] bg-[#f5f5f5] p-6"
        >
          <QuestionItem
            title="Is the Fundraising School for me?"
            answer="If you are an early-stage startup looking for guidance on fundraising fundamentals, practical insights, curated content, a community of founders in a similar stage, and support, this is an opportunity you don't want to miss out on."
          />
          <hr className="my-4 w-full border-gray-300" />

          <QuestionItem
            title="Will I need to pay a fee to enter the Fundraising School?"
            answer="Joining the Fundraising School is completely free. We believe in democratizing access to expert knowledge and peer networking, ensuring every aspiring founder has the opportunity to attend our sessions and events without financial barriers."
          />
          <hr className="my-4 w-full border-gray-300" />

          <QuestionItem
            title="Why do I need to be from LATAM?"
            answer="We are empowering the top talent of LATAM, creating a program that entrepreneurs wished they had earlier for guidance to empower their own businesses."
          />
          <hr className="my-4 w-full border-gray-300" />

          <QuestionItem
            title="Is the program in English?"
            answer="While we're based in Latin America, from Mexico to Brazil, we don't want to exclude anyone. Therefore, most of our program is conducted in English. However, if you only speak Spanish or Portuguese, you can still apply, as we will have sessions primarily in English and Spanish."
          />
          <hr className="my-4 w-full border-gray-300" />

          <QuestionItem
            title="What kind of support can I expect after completing the program?"
            answer="Graduating from Fundraising School is just the beginning. You'll have continued access to our community for ongoing support, networking opportunities, and the chance to stay updated with exclusive post-program resources and events."
          />
          <hr className="my-4 w-full border-gray-300" />

          <Disclosure>
            {({ open }: { open: boolean }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between gap-1 text-left text-lg font-bold">
                  <p className="block max-w-[90%]">Data Sharing and Privacy Policy</p>
                  <XMarkIcon
                    className={clsx('size-5 transition-transform', open ? 'rotate-0' : 'rotate-45')}
                  />
                </Disclosure.Button>

                <Animation>
                  <Disclosure.Panel className="my-4 text-fsPurple">
                    <Link href={'/data_sharing'}>Data Sharing and Privacy Policy Page</Link>
                  </Disclosure.Panel>
                </Animation>
              </>
            )}
          </Disclosure>
          <hr className="my-4 w-full border-gray-300" />

          <QuestionItem
            title="How can I get in touch with you?"
            answer="Feel free to email us at fundraisingschool@gmail.com."
          />
        </div>
      </section>

      <section className="relative px-4 pb-12 sm:px-6 md:pb-20">
        <p data-aos="zoom-y-out" className="mx-auto max-w-4xl text-center text-xl text-black">
          Still have more questions? Contact us{' '}
          <a href="mailto:info@fundraisingschool.com" className="text-fsPurple">
            info@fundraisingschool.com
          </a>{' '}
        </p>
      </section>
    </>
  );
}
