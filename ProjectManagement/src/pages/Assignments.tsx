import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { service } from "@/Service/service";
import { useAvailableCapacity } from "@/Service/AvailableCapacity";


type FormValues = {
  projectId: string;
  engineerId: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
};
 
type Assignment = {
  _id: string;
  projectId: string;
  engineerId: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
};

type TableArray = {
name: string;
}
const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [projects, setProjects] = useState<TableArray[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [engineers, setEngineers] = useState<TableArray[]>([]);
  const [updatedEngineers, setUpdatedEngineers] = useState<TableArray[]>([]);

   const getAvailableCapacity = useAvailableCapacity()




  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    fetchAssignments();

    async function getProjectData() {
      
      const projectData = await service.getAllProjects();
      setProjects(projectData.projects);

      const engineerData = await service.getAllEngineers();
      setEngineers(engineerData.data);
    }
    getProjectData();
  }, []);



  const fetchAssignments = async () => {
    try {
      const res = await service.getAllAssignments();
      setAssignments(res.assignments);
    } catch (err) {
      console.error(err);
    }
  };

   const getEngineersCapacity: any = useMemo(() => {
       return engineers.map((engineer: any) => {
         const { availableCapacity, activeAssignments } = getAvailableCapacity(
           engineer._id,
           engineer.maxCapacity,
           assignments
         );
         
         return {
           ...engineer,
           availableCapacity,
           activeAssignments,
         };
       });
     }, [engineers, getAvailableCapacity]);

     useEffect(() => {
         setUpdatedEngineers(getEngineersCapacity);
       }, [getEngineersCapacity]);


  console.log(updatedEngineers)

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
 
      // handling edit and create assignment based on edittingAssignment Flag

      if (editingAssignment) {
        await service.updateAssignment(editingAssignment._id, data);
      } else {
        await service.createAssignment(data);
      }
      reset(); // from react-hook-form - it resets the fields
      setEditingAssignment(null);
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (assignment: any) => {
    setEditingAssignment(assignment);

    // setting the values in the form using setValue a react-hook-form method
    Object.entries(assignment).forEach(([key, value]) => setValue<FormValues | any>(key, value));
  };
    

  // deletion of assignment based on Id
  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm("Do you want to delete this assignment?");
  
  if (!confirmDelete) return;

  try {
    const response = await service.deleteAssignment(id); 
    if (response){
      // Optionally: remove from local state
      setAssignments((prev) => prev.filter((a: any) => a._id !== id));
      alert("Assignment deleted successfully");
    } else {
      alert("Failed to delete assignment");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred while deleting the assignment");
  }
};


  return (
    <div className="max-w-4xl mx-auto  p-6 border border-[#334D66] rounded-xl shadow-lg bg-[#1A2633] text-white mt-24">
       
       {/*  conditional rendering for Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center"> 
        {editingAssignment ? "Edit Assignment" : "Create Assignment"} 
      </h2>


        {/* form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-white">Engineer</label>
          <select
            {...register("engineerId", { required: "Engineer is required" })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white">

              {/* selecting an engineer */}
            <option value="">Select an engineer</option>
            {updatedEngineers.map((engineer: any) => (
              <option key={engineer._id} value={engineer._id}>
                {`${engineer.name} - Skills : ${engineer.skills.join(", ")} - Avalability: ${
                  engineer.availableCapacity
                }%`}
              </option>
            ))}
          </select>
          {errors.engineerId && (
            <p className="text-red-500 text-sm">{errors.engineerId.message}</p>
          )}
        </div>


            {/* Selecting a project */}
        <div> 
          <label className="block mb-1 font-medium text-white">Project</label>
          <select
            {...register("projectId", { required: "Project is required" })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          >
            <option value="">Select a project</option>
            {projects.map((project: any) => (
              <option key={project._id} value={project._id}>
                {project.name} -  {project.startDate?.slice(0, 10)} to {project.endDate?.slice(0, 10)} status : {project.status}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="text-red-500 text-sm">{errors.projectId.message}</p>
          )}
        </div>

          {/* Allocation % */}

        <div>
          <label className="block mb-1 font-medium">Allocation %</label>
          <Input
            type="number"
            {...register("allocationPercentage", {
              required: true,
              min: 0,
              max: 100,
            })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66]"
          />
        </div>

            {/* Start dates */}
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <Input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66]"
          />
        </div>
   
              {/* End dates */}
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <Input
            type="date"
            {...register("endDate", { required: "End date is required" })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <Input
            {...register("role", { required: "Role is required" })}
            placeholder="Developer, Tech Lead"
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#1A80E5] hover:bg-blue-700 py-2 rounded-xl"
        >
          {editingAssignment ? "Update Assignment" : "Create Assignment"}
        </Button>
      </form>


      {/* Table starts here */}

      <h2 className="text-xl font-semibold mt-10 mb-4">All Assignments</h2>
     <div className="overflow-x-auto  w-full">
  <table className="min-w-full text-white border border-[#334D66]">
    <thead>
      <tr className="bg-[#334D66] text-sm md:text-base">
        <th className="px-4 py-2 whitespace-nowrap">Engineer</th>
        <th className="px-4 py-2 whitespace-nowrap">Project</th>
        <th className="px-4 py-2 whitespace-nowrap">% Allocated</th>
        <th className="px-4 py-2 whitespace-nowrap">Role</th>
        <th className="px-4 py-2 whitespace-nowrap">Dates</th>
        <th className="px-4 py-2 whitespace-nowrap">Actions</th>
      </tr>
    </thead>

    {/*  table body data extracted from assignments state */}
    <tbody>
      {assignments.map((a:any) => (
        <tr key={a._id} className="text-center border-t border-[#94ADC7] text-sm md:text-base">
          <td className="px-4 py-2 whitespace-nowrap">

            {/* finding the Engineer's name using their id from assignments */}
            {engineers.find((e: any) => e._id === a.engineerId)?.name || "Unknown"}
          </td>

          {/* finding the Project's name using their id from assignments */}
          <td className="px-4 py-2 whitespace-nowrap">
            {projects.find((p: any) => p._id === a.projectId)?.name || "Unknown"}
          </td>

          {/* Allocation % , role and dates */}
          <td className="px-4 py-2 whitespace-nowrap">{a.allocationPercentage}%</td>
          <td className="px-4 py-2 whitespace-nowrap">{a.role}</td>
          <td className="px-4 py-2 whitespace-nowrap">
            {a.startDate?.slice(0, 10)} to {a.endDate?.slice(0, 10)}
          </td>
          <td className="px-4 py-2 whitespace-nowrap space-y-1">

        {/* Edit Button */}
            <button
              onClick={() => handleEdit(a)}
              className="bg-[#4a6177] px-4 py-1 rounded-xl hover:bg-[#5b748c] text-sm" >
              Edit
            </button>

          {/* Delete Button */}
            <button
              onClick={() => handleDelete(a._id)}
              className="bg-[#4a6177] px-4 py-1 rounded-xl hover:bg-[#5b748c] text-sm block w-full">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default AssignmentTable;
