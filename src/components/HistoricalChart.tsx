
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { TrendingDown, TrendingUp, Target, Calendar } from 'lucide-react';

interface HistoricalDataPoint {
  month: string;
  actual: number;
  target: number;
  prediction?: number;
}

const HistoricalChart = () => {
  const [selectedView, setSelectedView] = useState<'line' | 'area' | 'bar'>('area');
  const [animationKey, setAnimationKey] = useState(0);

  // Historical data with targets and predictions
  const historicalData: HistoricalDataPoint[] = [
    { month: 'Jan 2023', actual: 2800, target: 2800 },
    { month: 'Mar 2023', actual: 2750, target: 2700 },
    { month: 'May 2023', actual: 2600, target: 2600 },
    { month: 'Jul 2023', actual: 2550, target: 2500 },
    { month: 'Sep 2023', actual: 2400, target: 2400 },
    { month: 'Nov 2023', actual: 2350, target: 2300 },
    { month: 'Jan 2024', actual: 2250, target: 2200 },
    { month: 'Mar 2024', actual: 2200, target: 2100, prediction: 2150 },
    { month: 'May 2024', actual: undefined, target: 2000, prediction: 2050 },
    { month: 'Jul 2024', actual: undefined, target: 1900, prediction: 1950 },
    { month: 'Sep 2024', actual: undefined, target: 1800, prediction: 1850 },
    { month: 'Nov 2024', actual: undefined, target: 1700, prediction: 1750 },
  ];

  const chartConfig = {
    actual: {
      label: "Actual Emissions",
      color: "#ef4444"
    },
    target: {
      label: "Target",
      color: "#10b981"
    },
    prediction: {
      label: "Prediction",
      color: "#f59e0b"
    }
  };

  // Calculate metrics
  const latestActual = historicalData.find(d => d.actual)?.actual || 0;
  const initialActual = historicalData[0].actual;
  const reductionPercentage = ((initialActual - latestActual) / initialActual * 100).toFixed(1);
  const isOnTarget = latestActual <= (historicalData.find(d => d.actual && d.month === 'Mar 2024')?.target || 0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedView]);

  const ViewToggle = () => (
    <div className="flex gap-2 mb-4">
      {[
        { key: 'area', label: 'Area', icon: '📊' },
        { key: 'line', label: 'Line', icon: '📈' },
        { key: 'bar', label: 'Bar', icon: '📉' }
      ].map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => setSelectedView(key as any)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedView === key 
              ? 'bg-emerald-100 text-emerald-800 shadow-sm' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );

  const MetricsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-800">{reductionPercentage}%</div>
              <div className="text-sm text-emerald-600">Total Reduction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`border-2 ${isOnTarget ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isOnTarget ? 'bg-green-100' : 'bg-orange-100'}`}>
              <Target className={`h-5 w-5 ${isOnTarget ? 'text-green-600' : 'text-orange-600'}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${isOnTarget ? 'text-green-800' : 'text-orange-800'}`}>
                {isOnTarget ? 'On Track' : 'Behind'}
              </div>
              <div className={`text-sm ${isOnTarget ? 'text-green-600' : 'text-orange-600'}`}>
                Target Status
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-800">8 mos</div>
              <div className="text-sm text-blue-600">Until Net Zero</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChart = () => {
    const commonProps = {
      data: historicalData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (selectedView) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#targetGradient)"
              strokeWidth={2}
              animationDuration={1500}
              animationBegin={0}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#actualGradient)"
              strokeWidth={3}
              animationDuration={1500}
              animationBegin={300}
            />
            <Area
              type="monotone"
              dataKey="prediction"
              stroke="#f59e0b"
              fillOpacity={0.1}
              fill="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              animationDuration={1500}
              animationBegin={600}
            />
          </AreaChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981" }}
              animationDuration={1500}
              animationBegin={0}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#ef4444"
              strokeWidth={4}
              dot={{ r: 5, fill: "#ef4444" }}
              animationDuration={1500}
              animationBegin={300}
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={{ r: 4, fill: "#f59e0b" }}
              animationDuration={1500}
              animationBegin={600}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="target"
              fill="#10b981"
              radius={[2, 2, 0, 0]}
              animationDuration={1000}
              animationBegin={0}
            />
            <Bar
              dataKey="actual"
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
            />
            <Bar
              dataKey="prediction"
              fill="#f59e0b"
              radius={[2, 2, 0, 0]}
              animationDuration={1000}
              animationBegin={400}
            />
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            📈 Your Emission Journey
          </h2>
          <p className="text-xl text-emerald-600">
            Track your progress over time and see where you're heading
          </p>
        </div>

        <MetricsCards />

        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-emerald-800">
                Historical Emissions Data
              </CardTitle>
              <ViewToggle />
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <div key={animationKey}>
                  {renderChart()}
                </div>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-700 font-medium">Actual Emissions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-sm text-gray-700 font-medium">Target Goals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded border-2 border-dashed border-amber-600"></div>
                <span className="text-sm text-gray-700 font-medium">Future Predictions</span>
              </div>
            </div>

            {/* Insights */}
            <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">📊 Key Insights</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
                <div>
                  • <strong>Consistent Progress:</strong> {reductionPercentage}% reduction achieved since Jan 2023
                </div>
                <div>
                  • <strong>Target Performance:</strong> {isOnTarget ? 'Exceeding expectations' : 'Need to accelerate efforts'}
                </div>
                <div>
                  • <strong>Future Outlook:</strong> Predictions show continued improvement trend
                </div>
                <div>
                  • <strong>Next Milestone:</strong> 30% reduction target by Dec 2024
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HistoricalChart;
