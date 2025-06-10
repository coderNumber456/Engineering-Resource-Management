import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { service } from "@/Service/service";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";



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

function Home() {
  const [projects, setProjects] = useState([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [assignments, setAssignments] = useState([]);
  const [userRole, setUserRole] = useState(" ");
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentRes, projectRes, currrentUser] = await Promise.all([
          service.getAllAssignments(),
          service.getAllProjects(),
          service.getCurrentUser(),
        ]);

        setAssignments(assignmentRes.assignments);
        setProjects(projectRes.projects);
        setUser(currrentUser.data);
        setUserRole(currrentUser.data.role);
       

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

   
  
    useEffect(() => {
      if (assignments.length && projects.length && user?._id) {
             getUserProjects()
        }
      }, [assignments,projects,user]);
      
      console.log(projects)
      function getUserProjects() {
        const userAssisgnments = assignments.filter(
        (assignment: any) => assignment.engineerId === user._id
      );
      console.log(projects)
    
      const currentProjects = projects.filter((project: any) =>
        userAssisgnments.some(
          (assignment: any) => assignment.projectId === project._id
        )
      );
    
      console.log(currentProjects);
      setUserProjects(currentProjects);
      }
      
  if (userRole === "manager") {
    return (
      <div className="flex flex-col justify-center items-center  mt-[170px] hover:cursor-pointer">
        <div className="flex flex-col w-[70%] gap-2">
          <div className="flex justify-between">
            <h1 className="text-white text-2xl font-medium">Projects</h1>
            <Button
              onClick={() => navigate("/create-project")}
              className="bg-[#334D66] w-46 hover:bg-[#4a6177] text-lg font-medium"
            >
              Create Project
            </Button>
          </div>

          {projects.map((project: any) => {
            const timeInWeeks =
              (new Date(project.endDate).getTime() - today.getTime()) /
              (1000 * 60 * 60 * 24 * 7); // ms -> weeks

            const formattedTime =
              timeInWeeks >= 0
                ? `${timeInWeeks.toFixed(1)} weeks left`
                : `${Math.abs(timeInWeeks).toFixed(1)} weeks ago`;

            return (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.name}
                status={project.status}
                time={formattedTime}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center mt-[170px]">
        <div className="flex flex-col w-[70%] gap-6">
          <div className="flex justify-between">
            <h1 className="text-white text-2xl font-medium">Projects</h1>
          </div>

          {/* CURRENT PROJECTS */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">
              Current Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects
                .filter((p) => new Date(p.startDate) <= new Date())
                .map((project) => (
                  <div
                    key={project._id}
                    className="bg-[#334D66] text-white p-4 rounded-xl shadow-md"
                  >
                    <Link   to={`/project/${project._id}`}>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-sm">
                      Start: {new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      End: {new Date(project.endDate).toLocaleDateString()}
                    </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* UPCOMING PROJECTS */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">
              Upcoming Projects
            </h2>
            {userProjects && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects 
                .filter((p) => new Date(p.startDate) > new Date())
                .map((project) => (
                  <div
                    key={project._id}
                    className="bg-[#1A2633] text-white p-4 rounded-xl shadow-md border border-[#4a6177]"
                  >
                    <Link   to={`/project/${project._id}`}>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-sm">
                      Start: {new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      End: {new Date(project.endDate).toLocaleDateString()}
                    </p>
                    </Link>
                  </div>
                ))}
            </div>} : {<div className="text-white  mt-2 text-lg">No Upcoming Projects</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
