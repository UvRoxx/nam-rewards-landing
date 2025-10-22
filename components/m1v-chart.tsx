"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

// M1V Velocity of Money Data from Federal Reserve Economic Data (FRED)
// Source: https://fred.stlouisfed.org/series/M1V
const m1vData = [
  { date: "1959", year: 1959, velocity: 3.663 },
  { date: "1960", year: 1960, velocity: 3.879 },
  { date: "1965", year: 1965, velocity: 4.457 },
  { date: "1970", year: 1970, velocity: 5.112 },
  { date: "1975", year: 1975, velocity: 5.528 },
  { date: "1980", year: 1980, velocity: 6.829 },
  { date: "1985", year: 1985, velocity: 7.077 },
  { date: "1990", year: 1990, velocity: 7.890 },
  { date: "1995", year: 1995, velocity: 9.021 },
  { date: "2000", year: 2000, velocity: 10.265 },
  { date: "2005", year: 2005, velocity: 9.959 },
  { date: "2007", year: 2007, velocity: 10.325 }, // Pre-crisis peak
  { date: "2008", year: 2008, velocity: 9.847 }, // Great Recession
  { date: "2009", year: 2009, velocity: 8.684 },
  { date: "2010", year: 2010, velocity: 7.945 },
  { date: "2011", year: 2011, velocity: 7.298 },
  { date: "2012", year: 2012, velocity: 6.902 },
  { date: "2013", year: 2013, velocity: 6.729 },
  { date: "2014", year: 2014, velocity: 6.297 },
  { date: "2015", year: 2015, velocity: 6.033 },
  { date: "2016", year: 2016, velocity: 5.908 },
  { date: "2017", year: 2017, velocity: 5.635 },
  { date: "2018", year: 2018, velocity: 5.571 },
  { date: "2019", year: 2019, velocity: 5.627 },
  { date: "2020 Q1", year: 2020.0, velocity: 5.324 },
  { date: "2020 Q2", year: 2020.25, velocity: 1.593 }, // COVID-19 crash
  { date: "2020 Q3", year: 2020.5, velocity: 1.282 },
  { date: "2020 Q4", year: 2020.75, velocity: 1.255 },
  { date: "2021", year: 2021, velocity: 1.236 },
  { date: "2022", year: 2022, velocity: 1.225 },
  { date: "2023", year: 2023, velocity: 1.412 },
  { date: "2024", year: 2024, velocity: 1.598 },
  { date: "2025", year: 2025, velocity: 1.625 },
];

export function M1VChart() {
  return (
    <div className="w-full space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl md:text-2xl font-mono font-semibold text-primary">
          Velocity of M1 Money Stock
        </h3>
        <p className="text-sm font-mono text-foreground/60">
          Times money exchanges hands per year relative to M1 supply
        </p>
      </div>

      <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4 md:p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={m1vData}
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444444" opacity={0.3} />
            <XAxis
              dataKey="date"
              stroke="#888888"
              style={{ fontSize: '12px', fill: '#888888' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#888888"
              style={{ fontSize: '12px', fill: '#888888' }}
              label={{
                value: 'Velocity (times per year)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fontSize: '12px', fill: '#888888' }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid #DAFF00',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#ffffff',
              }}
              formatter={(value: number) => [`${value.toFixed(2)}x`, 'Velocity']}
              labelFormatter={(label) => `Year: ${label}`}
            />

            {/* Reference line for Great Recession */}
            <ReferenceLine
              x="2008"
              stroke="#ef4444"
              strokeDasharray="3 3"
              opacity={0.5}
            >
              <Label
                value="Great Recession"
                position="top"
                style={{ fontSize: '10px', fill: '#ef4444' }}
              />
            </ReferenceLine>

            {/* Reference line for COVID-19 */}
            <ReferenceLine
              x="2020 Q2"
              stroke="#ef4444"
              strokeDasharray="3 3"
              opacity={0.5}
            >
              <Label
                value="COVID-19"
                position="top"
                style={{ fontSize: '10px', fill: '#ef4444' }}
              />
            </ReferenceLine>

            {/* Reference line showing the peak around 10x */}
            <ReferenceLine
              y={10}
              stroke="#22c55e"
              strokeDasharray="3 3"
              opacity={0.3}
            >
              <Label
                value="Pre-crisis peak (>10x)"
                position="right"
                style={{ fontSize: '10px', fill: '#22c55e' }}
              />
            </ReferenceLine>

            {/* Reference line showing current low around 1.6x */}
            <ReferenceLine
              y={1.6}
              stroke="#eab308"
              strokeDasharray="3 3"
              opacity={0.5}
            >
              <Label
                value="Current (1.6x)"
                position="right"
                style={{ fontSize: '10px', fill: '#eab308' }}
              />
            </ReferenceLine>

            <Line
              type="monotone"
              dataKey="velocity"
              stroke="#DAFF00"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8, fill: "#DAFF00", stroke: "#DAFF00" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs md:text-sm font-mono text-foreground/60 text-center space-y-1">
        <p>Source: Federal Reserve Economic Data (FRED)</p>
        <p>
          <a
            href="https://fred.stlouisfed.org/series/M1V"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View full dataset →
          </a>
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
        <p className="text-sm md:text-base font-mono leading-relaxed">
          <span className="font-semibold text-primary">Key Insight:</span> Money used to change hands
          over 10 times per year before the Great Recession. Today it's down to just 1.6 times per year -
          an 84% decline. This means people are holding onto cash instead of spending it in their local communities.
        </p>
      </div>
    </div>
  );
}
