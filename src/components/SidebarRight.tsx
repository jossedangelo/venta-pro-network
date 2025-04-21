
import ProfileSummary from "@/components/ProfileSummary";
import SuggestedConnections from "./SuggestedConnections";
import { Connection } from "@/types/connection";

interface SidebarRightProps {
  userCity: string;
  suggestedConnections: Connection[];
}

const SidebarRight = ({ userCity, suggestedConnections }: SidebarRightProps) => {
  return (
    <aside className="hidden md:block md:col-span-4">
      <div className="sticky top-16 overflow-y-auto max-h-[calc(100vh-5rem)] flex flex-col bg-transparent py-4 pr-4">
        <ProfileSummary />
        <SuggestedConnections userCity={userCity} suggestedConnections={suggestedConnections} />
      </div>
    </aside>
  );
};

export default SidebarRight;
