'use client';

import Hero from './Hero';
import Problems from './Problems';
import Solutions from './Solutions';
import HowItWorks from './HowItWorks';
import ForWho from './ForWho';
import Compare from './Compare';
import WhyAlino from './WhyAlino';
import CTA from './CTA';

export default function HomeBody() {
  return (
    <main className="pt-16">
      <Hero />
      <Problems />
      <Solutions />
      <HowItWorks />
      <ForWho />
      <Compare />
      <WhyAlino />
      <CTA />
    </main>
  );
}

