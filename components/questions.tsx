'use client'

import { Disclosure, Transition } from '@headlessui/react';

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
  )
}


export default function Questions() {
  return (
    <>
      <section className='relative py-12 md:py-20'>
        <h2 className="h2 pb-12 md:pb-16 text-center" data-aos="zoom-y-out">Still not convinced? <br /> We’ve got the answers</h2>
        <div className="max-w-sm md:max-w-4xl mx-auto flex flex-col items-center justify-center border border-[#f5f5f5] bg-[#f5f5f5] rounded-xl p-6">
          <Disclosure>
            <Disclosure.Button className="font-bold text-lg">
              <p>Is the Fundraising School for me?</p>
            </Disclosure.Button>

            <Animation>
              <Disclosure.Panel className="text-gray-800 my-4">
                If you are an early-stage startup looking for guidance on fundraising fundamentals, practical insights, curated content, a community of founders in a similar stage, and support, this is an opportunity you don't want to miss out on.
              </Disclosure.Panel>
            </Animation>
          </Disclosure>

          <hr className="my-4 w-full border-gray-300" />

          <Disclosure>
            <Disclosure.Button className="font-bold text-lg">
              Will I need to pay a fee to enter the Fundraising School?
            </Disclosure.Button>
            <Animation>
              <Disclosure.Panel className="text-gray-800 my-4">
                Joining the Fundraising School is completely free. We believe in democratizing access to expert knowledge and peer networking, ensuring every aspiring founder has the opportunity to attend our sessions and events without financial barriers.
              </Disclosure.Panel>
            </Animation>

          </Disclosure>

          <hr className="my-4 w-full border-gray-300" />

          <Disclosure>
            <Disclosure.Button className="font-bold text-lg">
              Why do I need to be from LATAM?
            </Disclosure.Button>
            <Animation>
              <Disclosure.Panel className="text-gray-800 my-4">
                We are empowering the top talent of LATAM, creating a program that entrepreneurs wished they had earlier for guidance to empower their own businesses.
              </Disclosure.Panel>
            </Animation>
          </Disclosure>

          <hr className="my-4 w-full border-gray-300" />

          <Disclosure>
            <Disclosure.Button className="font-bold text-lg">
              Is the program in English?
            </Disclosure.Button>
            <Animation>

              <Disclosure.Panel className="text-gray-800 my-4">
                While we're based in Latin America, from Mexico to Brazil, we don't want to exclude anyone. Therefore, most of our program is conducted in English. However, if you only speak Spanish or Portuguese, you can still apply, as we will have sessions primarily in English and Spanish.
              </Disclosure.Panel>
            </Animation>
          </Disclosure>

          <hr className="my-4 w-full border-gray-300" />

          <Disclosure>
            <Disclosure.Button className="font-bold text-lg">
              What kind of support can I expect after completing the program?
            </Disclosure.Button>
            <Animation>
              <Disclosure.Panel className="text-gray-800 my-4">
                Graduating from Fundraising School is just the beginning. You'll have continued access to our community for ongoing support, networking opportunities, and the chance to stay updated with exclusive post-program resources and events.
              </Disclosure.Panel>
            </Animation>
          </Disclosure>

          <hr className="my-4 w-full border-gray-300" />

          <Disclosure>
            <Disclosure.Button className="font-bold text-lg">
              How can I get in touch with you?
            </Disclosure.Button>
            <Animation>
              <Disclosure.Panel className="text-gray-800 my-4">
                Feel free to email us at fundraisingschool@gmail.com.
              </Disclosure.Panel>
            </Animation>
          </Disclosure>

        </div>
      </section>

      <section className='relative py-12 md:py-20'>
        <p className='text-xl text-black max-w-sm md:max-w-4xl mx-auto text-center'>Still have more questions? Contact us <span className='text-[#637ee0]'>info@fundraisingschool.com</span> </p>
      </section>
    </>
  )
}