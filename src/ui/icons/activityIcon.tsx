import React from "react";
import {
  FitnessCenter, Stairs, Hiking, DirectionsBike,
} from "@mui/icons-material";
import { GiMountainClimbing } from "react-icons/gi";

interface ActivityIconProps {
  activityType: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ activityType: a }) => (
  <>{iconForActivity(a)}</>
);

export default ActivityIcon;

type activityIconMap = {
  [key: string]: React.ReactNode
};

const activityIcons: activityIconMap = {
  strength: <FitnessCenter />,
  stairs: <Stairs />,
  climbing: <GiMountainClimbing size="1.7em" />,
  "day-hike": <Hiking />,
  bike: <DirectionsBike />,
};

const iconForActivity = (activityType: string) => {
  if (activityIcons[activityType]) {
    return activityIcons[activityType];
  }
  return <div />;
};
