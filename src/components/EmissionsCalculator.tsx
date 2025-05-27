
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const EmissionsCalculator = () => {
  const [values, setValues] = useState({
    employees: 50,
    electricity: 100000,
    transportation: 50000,
    materials: 25000,
  });

  const [totalEmissions, setTotalEmissions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simple emissions calculation
    const emissions = 
      (values.employees * 4.5) + // tons per employee per year
      (values.electricity * 0.0004) + // kg CO2 per kWh
      (values.transportation * 0.002) + // kg CO2 per km
      (values.materials * 0.003); // kg CO2 per dollar spent

    setTotalEmissions(Math.round(emissions));
  }, [values]);

  const handleOptimize = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getEmissionLevel = () => {
    if (totalEmissions < 500) return { level: 'Excellent', color: 'emerald', message: 'You\'re a sustainability champion!' };
    if (totalEmissions < 1000) return { level: 'Good', color: 'green', message: 'Great progress on your journey!' };
    if (totalEmissions < 2000) return { level: 'Moderate', color: 'yellow', message: 'Room for growth ahead!' };
    return { level: 'High', color: 'orange', message: 'Big opportunities for impact!' };
  };

  const emissionLevel = getEmissionLevel();

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            What If Calculator
          </h2>
          <p className="text-xl text-emerald-600">
            Explore scenarios and watch your carbon story unfold in real-time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Controls */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800">Adjust Your Variables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-700 mb-2">
                    Number of Employees: {values.employees}
                  </label>
                  <Slider
                    value={[values.employees]}
                    onValueChange={(value) => setValues(prev => ({ ...prev, employees: value[0] }))}
                    max={500}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 mb-2">
                    Annual Electricity (kWh): {values.electricity.toLocaleString()}
                  </label>
                  <Slider
                    value={[values.electricity]}
                    onValueChange={(value) => setValues(prev => ({ ...prev, electricity: value[0] }))}
                    max={500000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 mb-2">
                    Transportation (km/year): {values.transportation.toLocaleString()}
                  </label>
                  <Slider
                    value={[values.transportation]}
                    onValueChange={(value) => setValues(prev => ({ ...prev, transportation: value[0] }))}
                    max={200000}
                    min={5000}
                    step={2500}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 mb-2">
                    Materials Spend ($): {values.materials.toLocaleString()}
                  </label>
                  <Slider
                    value={[values.materials]}
                    onValueChange={(value) => setValues(prev => ({ ...prev, materials: value[0] }))}
                    max={100000}
                    min={5000}
                    step={2500}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            <Card className={`bg-gradient-to-br from-${emissionLevel.color}-100 to-${emissionLevel.color}-200 border-${emissionLevel.color}-300 relative overflow-hidden`}>
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 1}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              <CardHeader>
                <CardTitle className={`text-${emissionLevel.color}-800`}>
                  Your Carbon Footprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold text-${emissionLevel.color}-800 mb-2`}>
                    {totalEmissions.toLocaleString()}
                  </div>
                  <div className="text-xl text-emerald-600 font-semibold">
                    tons CO₂ per year
                  </div>
                </div>

                <div className={`bg-${emissionLevel.color}-50 p-4 rounded-lg mb-6`}>
                  <div className={`text-lg font-semibold text-${emissionLevel.color}-800 mb-2`}>
                    Status: {emissionLevel.level}
                  </div>
                  <p className={`text-${emissionLevel.color}-700`}>
                    {emissionLevel.message}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-emerald-600 mb-4">
                    That's equivalent to {Math.round(totalEmissions / 5)} cars driven for a year!
                  </p>
                  
                  <Button 
                    onClick={handleOptimize}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Optimize My Impact! 🚀
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  Quick Wins Available
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Switch to renewable energy</span>
                    <span className="text-emerald-600 font-semibold">-40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Optimize transportation</span>
                    <span className="text-emerald-600 font-semibold">-25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Employee engagement</span>
                    <span className="text-emerald-600 font-semibold">-15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmissionsCalculator;
