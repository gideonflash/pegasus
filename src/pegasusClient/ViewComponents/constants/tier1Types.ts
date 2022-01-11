type SysNames = "food" | "drink";

type Tier = {
  name: string;
  sysName: SysNames;
};
export const TIER1: Tier[] = [
  {
    name: "Food",
    sysName: "food",
  },
  {
    name: "Drink",
    sysName: "drink",
  },
];

export const TIER_1_ICONS = {
  food: "KnifeForkThin",
  drink: "DrinkThin",
};
