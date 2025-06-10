import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { service } from "@/Service/service";
import { useAuth } from "@/Context/AuthContext";


const Project: React.FC = function () {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    managerId: "",
    requiredSkills: [],
    teamSize: 0,
    status: "",
  });

  const {user} = useAuth();


  
  const { id } = useParams();


  useEffect(() => {
    async function getProjectData() {
      try {
        const projectData = await service.getProject(id);
        setProject(projectData.project);
      } catch (error) {
        console.log(error);
      }
    }
    getProjectData();
  }, []);

  return (
    <div className=" text-white md:w-[70%] w-[95%] md:ml-[10%] ml-[5%] mt-10 flex flex-col gap-2 ">
      {/* Name */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          Project : {project.name}{" "}
        </h2>
      </section>

      {/* description */}
      <section className="border-b-[1px] border-[#334D66] py-4 text-gray-200">
        <h3 className="font-semibold text-xl">Description</h3>
        <p className="mt-4">

          {project.description}
        </p>
      </section>

      {/* dates */}
      <section className="   border-b-[1px] border-[#334D66] ">
        <section className="md:w-[60%] w-full flex justify-between py-4">
          <span>
            <p className="text-gray-400 font-semibold">Start date</p>
            <p className="text-gray-200 font-semibold"> {new Date(project.startDate).toLocaleDateString('en-GB')}</p>
          </span>
          <span>
            <p className="text-gray-400 font-semibold">End date</p>
            <p className="text-gray-200 font-semibold"> {new Date(project.endDate).toLocaleDateString('en-GB')}</p>
          </span>
        </section>
      </section>

      {/* status */}
      <section>
        <h3 className="text-gray-300 font-semibold text-lg">Status : {project.status}</h3>

        {/* skills */}
      </section>
      <section className="mt-4 border-b-[1px] border-[#334D66] pb-4">
        <h3 className="text-gray-300 font-semibold text-lg">Skills Required</h3>

        <span className="flex gap-2 mt-4">
            {project.requiredSkills.map((skill) => (
              <button className="px-6 py-2 bg-[#334D66] rounded-3xl" key={skill}> {skill}</button>
            ))}
        </span>
      </section>

      {/* members */}
      {/* <section>
        <h3 className="text-gray-300 font-semibold text-lg">Members</h3>
      </section> */}
 
      {/* edit */}


  {user?.role === "manager" &&    
       <section>
        <Link to={"/create-project"} state={{project}}>       
      <button className="bg-[#334D66] px-6 py-2 rounded-3xl"  >
        <h3 className="text-gray-300 font-semibold text-lg">Edit</h3>
      </button>
        </Link>
     </section>}
    </div>

  );
};

export default Project;
