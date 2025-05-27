
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface IndustryIcon {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

interface SupplyChainRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  selected: boolean;
}

interface EnergyData {
  electricity: number;
  heating: number;
  transportation: number;
}

const SustainabilityCheckup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [treeGrowth, setTreeGrowth] = useState(0);
  
  const [industries, setIndustries] = useState<IndustryIcon[]>([
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', selected: false },
    { id: 'retail', name: 'Retail', icon: '🏪', selected: false },
    { id: 'tech', name: 'Technology', icon: '💻', selected: false },
    { id: 'food', name: 'Food & Beverage', icon: '🍎', selected: false },
    { id: 'logistics', name: 'Logistics', icon: '🚚', selected: false },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', selected: false },
  ]);

  const [regions, setRegions] = useState<SupplyChainRegion[]>([
    { id: 'north-america', name: 'North America', x: 20, y: 30, selected: false },
    { id: 'europe', name: 'Europe', x: 50, y: 25, selected: false },
    { id: 'asia', name: 'Asia', x: 75, y: 35, selected: false },
    { id: 'south-america', name: 'South America', x: 30, y: 65, selected: false },
    { id: 'africa', name: 'Africa', x: 55, y: 55, selected: false },
    { id: 'oceania', name: 'Oceania', x: 85, y: 70, selected: false },
  ]);

  const [energyData, setEnergyData] = useState<EnergyData>({
    electricity: 50,
    heating: 30,
    transportation: 40,
  });

  const calculateCO2Preview = () => {
    const total = energyData.electricity + energyData.heating + energyData.transportation;
    return Math.round(total * 2.5); // Simple calculation for demo
  };

  const handleIndustrySelect = (industryId: string) => {
    setIndustries(prev => prev.map(industry => 
      industry.id === industryId 
        ? { ...industry, selected: !industry.selected }
        : industry
    ));
    updateTreeGrowth();
  };

  const handleRegionSelect = (regionId: string) => {
    setRegions(prev => prev.map(region =>
      region.id === regionId
        ? { ...region, selected: !region.selected }
        : region
    ));
    updateTreeGrowth();
  };

  const updateTreeGrowth = () => {
    const selectedIndustries = industries.filter(i => i.selected).length;
    const selectedRegions = regions.filter(r => r.selected).length;
    const progress = (currentStep - 1) * 33.33 + (selectedIndustries > 0 ? 16.66 : 0) + (selectedRegions > 0 ? 16.66 : 0);
    setTreeGrowth(Math.min(progress, 100));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
    updateTreeGrowth();
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const ProgressTree = () => (
    <div className="flex justify-center mb-8">
      <div className="relative w-24 h-32">
        {/* Tree trunk */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-amber-700 rounded-t-sm" />
        
        {/* Tree canopy - grows with progress */}
        <div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.max(16, (treeGrowth / 100) * 40)}px`,
            height: `${Math.max(16, (treeGrowth / 100) * 40)}px`,
            opacity: treeGrowth > 0 ? 1 : 0.3,
          }}
        />
        
        {/* Leaves animation when fully grown */}
        {treeGrowth >= 100 && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-bounce">
            🌳
          </div>
        )}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4">
          Step 1: What's Your Industry? 🏭
        </h3>
        <p className="text-emerald-600">
          Drag and drop or click the icons that best describe your business
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {industries.map((industry) => (
          <Card
            key={industry.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              industry.selected 
                ? 'bg-emerald-100 border-emerald-500 shadow-lg' 
                : 'bg-white hover:shadow-md'
            }`}
            onClick={() => handleIndustrySelect(industry.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">{industry.icon}</div>
              <div className="text-sm font-semibold text-emerald-800">
                {industry.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4">
          Step 2: Map Your Supply Chain 🌍
        </h3>
        <p className="text-emerald-600">
          Click on the regions where you source materials or sell products
        </p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-8">
          <div className="relative w-full h-64 bg-gradient-to-b from-blue-200 to-emerald-200 rounded-lg overflow-hidden">
            {/* World map representation */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-16 h-12 bg-emerald-600 rounded-lg" />
              <div className="absolute top-6 right-8 w-20 h-16 bg-emerald-600 rounded-lg" />
              <div className="absolute bottom-8 left-8 w-12 h-20 bg-emerald-600 rounded-lg" />
            </div>

            {regions.map((region) => (
              <button
                key={region.id}
                className={`absolute w-4 h-4 rounded-full border-2 border-white transition-all duration-300 transform hover:scale-150 ${
                  region.selected 
                    ? 'bg-orange-500 animate-pulse' 
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                onClick={() => handleRegionSelect(region.id)}
                title={region.name}
              />
            ))}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {regions.filter(r => r.selected).map(region => (
              <span key={region.id} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                {region.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4">
          Step 3: Energy Usage Profile ⚡
        </h3>
        <p className="text-emerald-600">
          Adjust the sliders to estimate your energy consumption
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-emerald-700 mb-2">
              Electricity Usage: {energyData.electricity}%
            </label>
            <Slider
              value={[energyData.electricity]}
              onValueChange={(value) => setEnergyData(prev => ({ ...prev, electricity: value[0] }))}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-700 mb-2">
              Heating/Cooling: {energyData.heating}%
            </label>
            <Slider
              value={[energyData.heating]}
              onValueChange={(value) => setEnergyData(prev => ({ ...prev, heating: value[0] }))}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-700 mb-2">
              Transportation: {energyData.transportation}%
            </label>
            <Slider
              value={[energyData.transportation]}
              onValueChange={(value) => setEnergyData(prev => ({ ...prev, transportation: value[0] }))}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300">
          <CardHeader>
            <CardTitle className="text-orange-800 text-center">
              Live CO₂ Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-orange-800 mb-2">
              {calculateCO2Preview()}
            </div>
            <div className="text-lg text-orange-700 mb-4">
              tons CO₂ per year
            </div>
            <div className="text-sm text-orange-600">
              That's like burning ${Math.round(calculateCO2Preview() * 45)} per year! 💸
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Your Sustainability Checkup
          </h2>
          <p className="text-xl text-emerald-600">
            Let's discover your carbon story together
          </p>
        </div>

        <ProgressTree />

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-emerald-600 mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(treeGrowth)}% Complete</span>
          </div>
          <div className="w-full bg-emerald-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={currentStep === 3}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
              >
                {currentStep === 3 ? 'Complete Checkup' : 'Next Step'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {treeGrowth >= 100 && (
          <div className="text-center mt-8 animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-2">
              Congratulations! Your tree has grown!
            </h3>
            <p className="text-emerald-600">
              You've completed your sustainability checkup. Let's explore your eco-chronicle!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SustainabilityCheckup;
