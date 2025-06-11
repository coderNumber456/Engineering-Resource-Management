// hooks/useAvailableCapacity.ts
import { useCallback } from "react";

type Assignment = {
  engineerId: string;
  startDate: string;
  allocationPercentage: number;
};

export const useAvailableCapacity = () => {
  const getAvailableCapacity = useCallback(
    (
      engineerId: string,
      maxCapacity: number,
      assignments: Assignment[]
    ) => {
      const activeAssignments = assignments.filter(
        (a) => a.engineerId === engineerId
      );

      const totalAllocated = activeAssignments.reduce((sum, a) => {
        const startDate = new Date(a.startDate).getTime();
        const today = Date.now();

        return startDate <= today
          ? sum + Number(a.allocationPercentage)
          : sum;
      }, 0);

      return {
        activeAssignments,
        availableCapacity: maxCapacity - totalAllocated,
      };
    },
    []
  );

  return getAvailableCapacity;
};


