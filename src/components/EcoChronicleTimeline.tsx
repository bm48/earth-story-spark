
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'current' | 'target' | 'milestone';
  title: string;
  value: number;
  status: 'completed' | 'inProgress' | 'upcoming';
}

interface ActionItem {
  icon: string;
  title: string;
  impact: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const EcoChronicleTimeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: 'Jan 2024',
      type: 'milestone',
      title: 'Baseline Assessment',
      value: 2500,
      status: 'completed'
    },
    {
      id: '2',
      date: 'Mar 2024',
      type: 'current',
      title: 'Current Emissions',
      value: 2250,
      status: 'inProgress'
    },
    {
      id: '3',
      date: 'Jun 2024',
      title: '15% Reduction Target',
      type: 'target',
      value: 1875,
      status: 'upcoming'
    },
    {
      id: '4',
      date: 'Dec 2024',
      title: '30% Reduction Goal',
      type: 'target',
      value: 1250,
      status: 'upcoming'
    },
    {
      id: '5',
      date: 'Dec 2030',
      title: 'Net Zero Target',
      type: 'target',
      value: 0,
      status: 'upcoming'
    }
  ];

  const scopeData = {
    scope1: { value: 450, percentage: 20, color: '#f59e0b' },
    scope2: { value: 900, percentage: 40, color: '#10b981' },
    scope3: { value: 900, percentage: 40, color: '#3b82f6' }
  };

  const dummyActions: ActionItem[] = [
    {
      icon: '🚚',
      title: 'Electrify Fleet',
      impact: '-18%',
      description: 'Replace 50% of delivery vehicles with electric alternatives',
      difficulty: 'Medium'
    },
    {
      icon: '💡',
      title: 'LED Retrofit',
      impact: '-9%',
      description: 'Upgrade all facility lighting to energy-efficient LED systems',
      difficulty: 'Easy'
    },
    {
      icon: '🌱',
      title: 'Supply Chain Optimization',
      impact: '-12%',
      description: 'Partner with local suppliers to reduce transportation emissions',
      difficulty: 'Hard'
    },
    {
      icon: '⚡',
      title: 'Solar Installation',
      impact: '-15%',
      description: 'Install rooftop solar panels to offset electricity usage',
      difficulty: 'Medium'
    }
  ];

  const DonutChart = () => {
    const radius = 80;
    const strokeWidth = 20;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    let cumulativePercentage = 0;

    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={normalizedRadius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {Object.entries(scopeData).map(([scope, data], index) => {
            const strokeDasharray = `${data.percentage * circumference / 100} ${circumference}`;
            const strokeDashoffset = -cumulativePercentage * circumference / 100;
            cumulativePercentage += data.percentage;

            return (
              <circle
                key={scope}
                cx="100"
                cy="100"
                r={normalizedRadius}
                stroke={data.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 animate-pulse"
                style={{ animationDelay: `${index * 0.3}s` }}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-800">2,250</div>
            <div className="text-sm text-emerald-600">tons CO₂</div>
          </div>
        </div>
      </div>
    );
  };

  const ComparisonSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    
    return (
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-emerald-800">Before vs After</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-32 bg-gradient-to-r from-red-200 to-green-200 rounded-lg overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-red-400 transition-all duration-300"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="flex items-center justify-center h-full text-white font-bold">
                Before: 2,500t
              </div>
            </div>
            
            <div 
              className="absolute top-0 right-0 h-full bg-green-400 transition-all duration-300 flex items-center justify-center text-white font-bold"
              style={{ width: `${100 - sliderPosition}%` }}
            >
              After: 1,875t
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 opacity-0 cursor-pointer"
            />
            
            <div 
              className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-300"
              style={{ left: `${sliderPosition}%` }}
            />
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-emerald-600 font-semibold">
              25% reduction vs industry average
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Eco-Chronicle Timeline
          </h2>
          <p className="text-xl text-emerald-600">
            Watch your sustainability story unfold through time
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Third - Timeline */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 h-full">
              <CardHeader>
                <CardTitle className="text-emerald-800">Your Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 via-yellow-400 to-green-400" />
                  
                  <div className="space-y-6">
                    {timelineEvents.map((event, index) => (
                      <div key={event.id} className="relative flex items-start">
                        <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-white z-10 ${
                          event.type === 'current' ? 'bg-yellow-500 animate-pulse' :
                          event.status === 'completed' ? 'bg-green-500' :
                          'bg-gray-300'
                        }`} />
                        
                        <div className="ml-10">
                          <div className="text-sm text-gray-500">{event.date}</div>
                          <div className="font-semibold text-emerald-800">{event.title}</div>
                          <div className="text-lg text-emerald-600">{event.value} tons CO₂</div>
                          
                          {event.type === 'current' && (
                            <div className="text-xs text-yellow-600 font-semibold mt-1 animate-pulse">
                              🔥 Currently burning ${Math.round(event.value * 45)}/year
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Two Thirds */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pulse View - Donut Chart */}
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800">Pulse View - Emissions Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <DonutChart />
                  
                  <div className="space-y-4">
                    {Object.entries(scopeData).map(([scope, data]) => (
                      <div key={scope} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="font-semibold text-gray-700">
                            {scope.charAt(0).toUpperCase() + scope.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="text-lg font-bold text-emerald-800">{data.value}</span>
                          <span className="text-gray-600 ml-1">tons</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Theater */}
            <ComparisonSlider />

            {/* Action Theater */}
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800">Action Theater - Quick Wins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {dummyActions.map((action) => (
                    <Card
                      key={action.title}
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        hoveredAction === action.title ? 'shadow-xl bg-emerald-50 border-emerald-300' : 'hover:shadow-lg'
                      }`}
                      onMouseEnter={() => setHoveredAction(action.title)}
                      onMouseLeave={() => setHoveredAction(null)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`text-2xl transition-transform duration-300 ${
                            hoveredAction === action.title ? 'animate-bounce' : ''
                          }`}>
                            {action.icon}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-emerald-800">{action.title}</h4>
                              <span className="text-lg font-bold text-green-600">{action.impact}</span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                action.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                action.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {action.difficulty}
                              </span>
                              
                              {hoveredAction === action.title && (
                                <span className="text-xs text-emerald-600 animate-pulse">
                                  Click to implement!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoChronicleTimeline;
