
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProgressTimeline = () => {
  const milestones = [
    {
      id: 1,
      title: 'Energy Audit Complete',
      description: 'You discovered your biggest energy drains',
      achievement: 'Detective Badge',
      progress: 100,
      icon: '🔍',
    },
    {
      id: 2,
      title: 'First Reduction Target Set',
      description: 'Your journey map is taking shape',
      achievement: 'Pathfinder Badge',
      progress: 100,
      icon: '🎯',
    },
    {
      id: 3,
      title: '10% Emissions Reduced',
      description: 'Your efforts are bearing fruit!',
      achievement: 'Impact Maker',
      progress: 75,
      icon: '📉',
    },
    {
      id: 4,
      title: 'Supply Chain Optimization',
      description: 'Nurturing partnerships for sustainability',
      achievement: 'Network Builder',
      progress: 45,
      icon: '🌐',
    },
    {
      id: 5,
      title: 'Carbon Neutral Goal',
      description: 'The summit of your sustainability mountain',
      achievement: 'Planet Guardian',
      progress: 0,
      icon: '🏔️',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-blue-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Your Sustainability Journey
          </h2>
          <p className="text-xl text-emerald-600">
            Every step forward is a victory for our planet
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center text-lg z-10 ${
                  milestone.progress === 100 
                    ? 'bg-emerald-500 text-white animate-pulse' 
                    : milestone.progress > 0
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {milestone.progress === 100 ? '✓' : milestone.icon}
                </div>

                {/* Content card */}
                <Card className={`ml-16 transition-all duration-500 transform hover:scale-105 ${
                  milestone.progress > 0 ? 'bg-white/90 shadow-lg' : 'bg-gray-50/50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-800 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-emerald-600">
                          {milestone.description}
                        </p>
                      </div>
                      
                      {milestone.progress === 100 && (
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                          {milestone.achievement}
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          milestone.progress === 100 
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                            : milestone.progress > 0
                            ? 'bg-gradient-to-r from-orange-400 to-orange-600'
                            : 'bg-gray-300'
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    
                    <div className="text-right text-sm text-gray-600 mt-2">
                      {milestone.progress}% complete
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTimeline;
