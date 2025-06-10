import React, {  useCallback, useEffect, useMemo, useState } from "react";
import { service } from "../Service/service";


type Project = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: string;
  _id: string;
};

const Teams: React.FC = () => {
  const [assignments, setAssignments] = useState([]);
  const [projects, setProjects] = useState<Project|any>([]);
  const [engineers, setEngineers] = useState([]);
  const [search ,setSearch] = useState(''); 
  const [serachedEngineers ,setSerachedEngineers] = useState([]); 




  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentRes, projectRes, engineerRes] = await Promise.all([
          service.getAllAssignments(),
          service.getAllProjects(),
          service.getAllEngineers(),
        ]);

        setAssignments(assignmentRes.assignments || []);
        setProjects(projectRes.projects || []);
        setEngineers(engineerRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  /**
   * Memoized function to get available capacity for a given engineer
   */
  const getAvailableCapacity = useCallback(
    (engineerId: string, maxCapacity: number) => {
      const activeAssignments = assignments.filter(
        (a: any) => a.engineerId === engineerId
      );

      const totalAllocated = activeAssignments.reduce(
        (sum: number, a: any) => sum + Number(a.allocationPercentage),
        0
      );

      return {
        activeAssignments: activeAssignments,
        availableCapacity: maxCapacity - totalAllocated,
      };
    },
    [assignments] // Will only change if assignments change
  );

  /**
   * Memoized transformation of engineers with available capacity
   */
  const updatedEngineers: any = useMemo(() => {
    return engineers.map((engineer: any) => {
      const { availableCapacity, activeAssignments } = getAvailableCapacity(
        engineer._id,
        engineer.maxCapacity
      );

      return {
        ...engineer,
        availableCapacity,
        activeAssignments,
      };
    });
  }, [engineers, getAvailableCapacity]);

  useEffect(() => {
    setSerachedEngineers(updatedEngineers);
  }, [updatedEngineers]);



  const searchValue = (event: any) => {
    if (event.key === "Enter") {
    const serached = updatedEngineers.filter((engineer: any) => engineer.name.toLowerCase().includes(search.toLowerCase()) || engineer.skills.join(', ').toLowerCase().includes(search.toLowerCase()))

    setSerachedEngineers(serached);


   
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-white text-xl font-semibold mb-6">Workload</h1>

      
         <input
        type="text"
        placeholder="Search by name or skill and press enter"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 rounded-md bg-[#1f2a36] text-white border border-gray-600"
        onKeyDown={searchValue}
      />
  


      {serachedEngineers.map((engineer: any) => (
        <div className="mb-8 border-b-[1px] border-[#334D66] pb-1 flex flex-col gap-2">
          <div className="flex items-center space-x-4 mb-1">
            <div>
              <p className="text-white font-semibold">{engineer.name}</p>
              <p className=" text-gray-400 text-lg">
                available : {engineer.availableCapacity}%
              </p>
            </div>
          </div>

          {engineer.activeAssignments.length !== 0 && (
            <p className="text-white text-sm md:text-lg mb-1">
              Projects and Avalability
            </p>
          )}

          {engineer.activeAssignments.map((assignment: any) => (
            <div className="flex flex-col gap-5 bg-[#334D66] p-4 rounded-3xl">
              <p className=" text-white mt-3 font-medium text-lg">
                Project :{" "}
                {
                  projects.find(
                    (project: any) => project._id === assignment.projectId
                  )?.name
                }
              </p>

              <p className="text-gray-200 text-sm md:text-md mt-1">
                starts from:{" "}
                {new Date(assignment.startDate).toLocaleDateString()}
              </p>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${assignment.allocationPercentage || 0}%` }}
                />
              </div>
              <span className=" flex justify-between">
                <p className="text-gray-200 text-sm md:text-md mt-1">
                  Allotted : {assignment.allocationPercentage}%
                </p>
                <p className="text-gray-200 text-sm md:text-md mt-1">
                  Availability :{" "}
                  {engineer.maxCapacity - assignment.allocationPercentage}%{" "}
                </p>

                <p className="text-gray-200 text-sm md:text-md mt-1">
                  Available from :{" "}
                  {new Date(assignment.endDate).toLocaleDateString()}
                </p>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Teams;
