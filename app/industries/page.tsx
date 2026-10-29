import React from 'react';
import { Metadata } from 'next';
import { IndustriesIndexClient } from './IndustriesViews';

export const metadata: Metadata = {
  title: 'Industrial Handling Solutions by Sector | PT Dimensi Quantum Wahyudi',
  description: 'Discover how Schmalz vacuum lifting technology transforms productivity and ergonomics across Food & Beverage, Automotive, Logistics, and more.',
};

export default function IndustriesIndexPage() {
  return <IndustriesIndexClient />;
}
