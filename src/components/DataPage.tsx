import DataHeader from './data/DataHeader';
import DataCard from './data/DataCard';
import { useDataCards } from './data/useDataCards';

export default function DataPage() {
  const dataCards = useDataCards();

  return (
    <div className="space-y-6">
      <DataHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {dataCards.map((card) => (
          <DataCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconColor={card.iconColor}
            borderColor={card.borderColor}
            bgColor={card.bgColor}
            gradientColor={card.gradientColor}
            emptyMessage={card.emptyMessage}
          />
        ))}
      </div>
    </div>
  );
}
