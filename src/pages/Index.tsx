
import React from 'react';
import HeroSection from '../components/HeroSection';
import ImpactVisualization from '../components/ImpactVisualization';
import ProgressTimeline from '../components/ProgressTimeline';
import ActionZone from '../components/ActionZone';
import EmissionsCalculator from '../components/EmissionsCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <HeroSection />
      <ImpactVisualization />
      <ProgressTimeline />
      <ActionZone />
      <EmissionsCalculator />
    </div>
  );
};

export default Index;
