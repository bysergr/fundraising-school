'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Lesson: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState({
    introduction: false,
    fundraising: false,
    meetings: false,
    feedback: false,
    terms: false,
  });

  type Section = 'introduction' | 'fundraising' | 'meetings' | 'feedback' | 'terms';

  const toggleSection = (section: Section) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div>
      <h3 className="text-3xl font-bold">Lesson</h3>
      <ul className="list-none">
        <li className="py-2">
          <strong onClick={() => toggleSection('introduction')} className="cursor-pointer">
            <div className="flex items-center">
              <ChevronDownIcon className="mr-2 size-5" />
              <p>Introduction and Mindset</p>
            </div>
          </strong>
        </li>
        {visibleSections.introduction && (
          <ul className="list-inside list-disc pl-4">
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Why are we doing this
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Why are we experts in fundraising
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Legal disclaimer
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Build a great business
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Have a can do will do mindset
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Treat family right
            </li>
          </ul>
        )}
        <li className="py-2">
          <strong onClick={() => toggleSection('fundraising')} className="cursor-pointer">
            <div className="flex items-center">
              <ChevronDownIcon className="mr-2 size-5" />
              <p>Basic Fundraising</p>
            </div>
          </strong>
        </li>
        {visibleSections.fundraising && (
          <ul className="list-inside list-disc pl-4">
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Treat family right
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Why we like angel rounds
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Angel round dilution and check size
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Know your Benchmarks and recruit top angels around the world
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Your bosses believe in you
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Do not put weight on the cap table, or fix it
            </li>
          </ul>
        )}
        <li className="py-2">
          <strong onClick={() => toggleSection('meetings')} className="cursor-pointer">
            <div className="flex items-center">
              <ChevronDownIcon className="mr-2 size-5" />
              <p>Meetings with VCs</p>
            </div>
          </strong>
        </li>
        {visibleSections.meetings && (
          <ul className="list-inside list-disc pl-4">
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Be a good decal (valuation-wise)
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Look for a leader, followers will fall in line
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              DO NOT TELL VCs who else you are talking to
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              When is it OK to tell VCs what other VCs you are talking to
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              A VC will break your heart
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              The Investment Committee is Tinder, and you are ugly
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Get offers in writing
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Why FOMO makes a lot of sense in the VC industry
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Why FOMO and urgency are useful to founders
            </li>
          </ul>
        )}
        <li className="py-2">
          <strong onClick={() => toggleSection('feedback')} className="cursor-pointer">
            <div className="flex items-center">
              <ChevronDownIcon className="mr-2 size-5" />
              <p>Feedback and Continuous Improvement</p>
            </div>
          </strong>
        </li>
        {visibleSections.feedback && (
          <ul className="list-inside list-disc pl-4">
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Continually assess and adjust strategies
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Seek and act on feedback from VCs
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Implement improvements based on past experiences
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Encourage a culture of learning and adaptation
            </li>
          </ul>
        )}
        <li className="py-2">
          <strong onClick={() => toggleSection('terms')} className="cursor-pointer">
            <div className="flex items-center">
              <ChevronDownIcon className="mr-2 size-5" />
              <p>Terms and Negotiation</p>
            </div>
          </strong>
        </li>
        {visibleSections.terms && (
          <ul className="list-inside list-disc pl-4">
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Understand key terms and conditions
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Prepare for negotiation strategies
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Know when to compromise
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              Get legal advice for contract terms
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Lesson;
