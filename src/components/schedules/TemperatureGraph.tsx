import { GraphPoint } from './types';
import { getPointColor } from './utils';

interface TemperatureGraphProps {
  graphPoints: GraphPoint[];
  yAxisLabels: number[];
}

export default function TemperatureGraph({ graphPoints, yAxisLabels }: TemperatureGraphProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-5 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(59 130 246 / 0.05) 100%)'
        }}
      />
      <div className="relative">
        <div className="relative h-48 bg-neutral-900/50 rounded-xl border border-neutral-700/50 p-4">
          <div className="absolute left-1 top-4 bottom-8 flex flex-col justify-between text-xs text-gray-500">
            <span>{yAxisLabels[0]}°C</span>
            <span>{yAxisLabels[1]}°C</span>
            <span>{yAxisLabels[2]}°C</span>
          </div>

          <div className="ml-8 h-full relative pb-6">
            <div className="absolute inset-0 pb-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-neutral-700/30" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-700/30" />
              <div className="absolute bottom-6 left-0 right-0 h-px bg-neutral-700/30" />
            </div>

            <svg className="absolute inset-0 w-full h-full pb-6" style={{ overflow: 'visible' }}>
              {graphPoints.length > 1 && (
                <polyline
                  points={graphPoints.map(p => `${p.x}%,${p.y}%`).join(' ')}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {graphPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={`${point.x}%`}
                    cy={`${point.y}%`}
                    r="4"
                    fill={getPointColor(point.type)}
                    stroke="rgb(23, 23, 23)"
                    strokeWidth="2"
                  />
                  {point.type !== 'off' && (
                    <text
                      x={`${point.x}%`}
                      y={`${point.y}%`}
                      dy="-10"
                      fill="rgb(147, 197, 253)"
                      fontSize="10"
                      textAnchor="middle"
                      className="font-semibold"
                    >
                      {point.temp}°
                    </text>
                  )}
                </g>
              ))}
            </svg>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
              <span>21:00</span>
              <span>0:00</span>
              <span>3:00</span>
              <span>6:00</span>
              <span>9:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
