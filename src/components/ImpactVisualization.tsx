
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImpactVisualization = () => {
  const [selectedScope, setSelectedScope] = useState<'scope1' | 'scope2' | 'scope3'>('scope1');

  const emissionsData = {
    scope1: { value: 1250, unit: 'tons CO₂', comparison: '250 cars driven for a year' },
    scope2: { value: 2800, unit: 'tons CO₂', comparison: '560 homes powered for a year' },
    scope3: { value: 4200, unit: 'tons CO₂', comparison: '9.1 million smartphone charges' },
  };

  const getCurrentData = () => emissionsData[selectedScope];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Your Impact at a Glance
          </h2>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            Every emission tells a story. Let's explore the chapters of your carbon footprint.
          </p>
        </div>

        {/* Scope Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            {Object.keys(emissionsData).map((scope) => (
              <button
                key={scope}
                onClick={() => setSelectedScope(scope as any)}
                className={`px-6 py-3 rounded-full mx-1 font-semibold transition-all duration-300 ${
                  selectedScope === scope
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {scope.charAt(0).toUpperCase() + scope.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Visualization */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Visual Representation */}
          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 bg-emerald-600 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center z-10">
                <div className="text-6xl font-bold text-emerald-800 mb-2 animate-scale-in">
                  {getCurrentData().value.toLocaleString()}
                </div>
                <div className="text-xl text-emerald-600 font-semibold">
                  {getCurrentData().unit}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-800">
                That's like...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-emerald-700 mb-6">
                {getCurrentData().comparison}
              </p>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Good News!</h4>
                  <p className="text-orange-700">
                    You're already 15% below industry average. Your supply chain roots are growing strong! 🌱
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Growth Opportunity</h4>
                  <p className="text-blue-700">
                    With strategic changes, you could reduce this by 35% in the next year.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImpactVisualization;
