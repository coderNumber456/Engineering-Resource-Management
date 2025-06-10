import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  time: string;
  status: string;
  id:string;
}


function ProjectCard({title, time, status,id}: ProjectCardProps) {
  
  return (
      <Link to={`/project/${id}`}>
    <div className="w-full h-28 border-b-[1px] border-[#334D66] flex justify-between items-center px-4">
      <section>
        <h3 className="text-lg text-white font-bold">{title}</h3>
        <p className="text-gray-400 font-normal text-lg">{time} </p>
      </section>

      <section className="flex items-center text-white font-bold text-lg">
        <p>{status}</p>
      </section>
    </div>
      </Link>
  );
}

export default ProjectCard;
