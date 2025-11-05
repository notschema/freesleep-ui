import ServiceCard from './status/ServiceCard';
import StatusHeader from './status/StatusHeader';
import { useServices } from './status/useServices';
import { getCurrentDateTime } from './status/utils';

export default function StatusPage() {
  const services = useServices();
  const currentDate = getCurrentDateTime();

  const handleRunService = (serviceTitle: string) => {
    console.log(`Running ${serviceTitle}`);
  };

  return (
    <div className="space-y-6">
      <StatusHeader currentDate={currentDate} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="relative group"
            style={{
              animation: `fadeIn 0.3s ease-out ${index * 0.03}s both`
            }}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              status={service.status}
              timestamp={service.timestamp}
              onRun={service.hasRun ? () => handleRunService(service.title) : undefined}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
