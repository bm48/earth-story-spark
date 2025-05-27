
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ActionZone = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const actions = [
    {
      id: 1,
      title: 'Switch to Renewable Energy',
      description: 'Power your operations with clean energy',
      impact: '40%',
      difficulty: 'Medium',
      timeframe: '6 months',
      isQuickWin: true,
      icon: '⚡',
      color: 'emerald',
    },
    {
      id: 2,
      title: 'Optimize Transportation',
      description: 'Route efficiency and electric fleet transition',
      impact: '25%',
      difficulty: 'Low',
      timeframe: '3 months',
      isQuickWin: true,
      icon: '🚛',
      color: 'blue',
    },
    {
      id: 3,
      title: 'Circular Supply Chain',
      description: 'Embrace recycling and sustainable sourcing',
      impact: '35%',
      difficulty: 'High',
      timeframe: '12 months',
      isQuickWin: false,
      icon: '♻️',
      color: 'purple',
    },
    {
      id: 4,
      title: 'Smart Building Systems',
      description: 'AI-powered energy management',
      impact: '20%',
      difficulty: 'Medium',
      timeframe: '8 months',
      isQuickWin: false,
      icon: '🏢',
      color: 'orange',
    },
    {
      id: 5,
      title: 'Employee Engagement',
      description: 'Cultivate a culture of sustainability',
      impact: '15%',
      difficulty: 'Low',
      timeframe: '2 months',
      isQuickWin: true,
      icon: '👥',
      color: 'teal',
    },
    {
      id: 6,
      title: 'Carbon Offsetting',
      description: 'Invest in verified carbon removal projects',
      impact: '30%',
      difficulty: 'Low',
      timeframe: '1 month',
      isQuickWin: true,
      icon: '🌲',
      color: 'green',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Your Action Arsenal
          </h2>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            Each action is a seed of change. Plant them wisely to grow your impact forest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => (
            <Card
              key={action.id}
              className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer ${
                hoveredCard === action.id ? 'shadow-2xl' : 'shadow-lg'
              }`}
              onMouseEnter={() => setHoveredCard(action.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {action.isQuickWin && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  Quick Win!
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{action.icon}</div>
                  <CardTitle className="text-lg text-emerald-800">
                    {action.title}
                  </CardTitle>
                </div>
                <p className="text-emerald-600 text-sm">
                  {action.description}
                </p>
              </CardHeader>

              <CardContent>
                {/* Impact Circle */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${parseInt(action.impact) * 2.51} 251`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-800">
                        {action.impact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`font-semibold ${
                      action.difficulty === 'Low' ? 'text-green-600' :
                      action.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {action.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-semibold text-emerald-600">
                      {action.timeframe}
                    </span>
                  </div>
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 ${
                    hoveredCard === action.id ? 'animate-pulse' : ''
                  }`}
                >
                  Start This Action
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionZone;
