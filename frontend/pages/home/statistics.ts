import type { UserClient } from "~~/lib/api/user";

type StatCard = {
  label: string;
  value: number;
  type: "currency" | "number";
};

export function statCardData(api: UserClient) {
  const { data: statistics } = useAsyncData(async () => {
    const { data } = await api.stats.group();
    return data;
  });

  return computed(() => {
    return [
      {
        label: "القيمة الإجمالية",
        value: statistics.value?.totalItemPrice || 0,
        type: "currency",
      },
      {
        label: "إجمالي العناصر",
        value: statistics.value?.totalItems || 0,
        type: "number",
      },
      {
        label: "إجمالي الأماكن",
        value: statistics.value?.totalLocations || 0,
        type: "number",
      },
      {
        label: " إجمالي التسميات",
        value: statistics.value?.totalLabels || 0,
        type: "number",
      },
    ] as StatCard[];
  });
}
