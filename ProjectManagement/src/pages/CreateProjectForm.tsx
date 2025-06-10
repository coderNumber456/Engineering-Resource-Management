import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import { service } from '@/Service/service';


type Project = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: any; // will convert to string input
  teamSize: number;
  status: 'planning' | 'active' | 'completed';
  managerId: string;
  _id?: string;
};

type Props = {
  project?: Project; // optional
};
const url = import.meta.env.VITE_API_URL;

const CreateProjectForm: React.FC<Props> = () => {

  const location = useLocation();
  const project = location.state?.project;  
  console.log(project)
  
  const [userData, setUserData] = React.useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Project>();

  const navigate = useNavigate();
  const [apiError, setApiError] = React.useState('');

  useEffect(() => {
     async function getUser(){
            try {
              const user = await service.getCurrentUser();
              setUserData(user.data._id);
              console.log(userData);
            } catch (error) {
              console.log(error);
            }
          };getUser()
  })

  useEffect(() => {
    if (project) {
      // Set default values
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('startDate', project.startDate.split('T')[0]);
      setValue('endDate', project.endDate.split('T')[0]);
      setValue('requiredSkills', project.requiredSkills.join(', '));
      setValue('teamSize', project.teamSize);
      setValue('status', project.status);
      setValue('managerId', project.managerId);
    }
  }, [project, setValue]);



  const onSubmit = async (data: any) => {
      console.log(data)
    try {
      const formattedData = {
        ...data,
        requiredSkills: data.requiredSkills.split(',').map((skill: string) => skill.trim()),
        managerId:userData
      };

      const endpoint = project?._id ? `/api/projects/${project._id}`: '/api/projects/';

   

      const method = project?._id ? 'PUT' : 'POST';
      console.log(method)

      const response = await fetch(url+endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const error = await response.json();
        setApiError(error.message || 'Failed to save project');
        return;
      }

      navigate('/home');
    } catch (err) {
      setApiError('Unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-[#334D66] border-[1px] rounded-xl shadow-lg bg-[#1A2633]">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {project ? 'Edit Project' : 'Create Project'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-white">Project Name</label>
          <Input
            {...register('name', { required: 'Project name is required' })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Description</label>
          <Input
            {...register('description')}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Start Date</label>
          <Input
            type="date"
            {...register('startDate', { required: 'Start date is required' })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">End Date</label>
          <Input
            type="date"
            {...register('endDate')}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Required Skills</label>
          <Input
            {...register('requiredSkills')}
            placeholder="e.g., React, Node.js, MongoDB"
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Team Size</label>
          <Input
            type="number"
            {...register('teamSize', { required: 'Team size is required', min: 1 })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
          {errors.teamSize && <p className="text-red-500 text-sm">{errors.teamSize.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Status</label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

       

        <button
          type="submit"
          className="w-full bg-[#1A80E5] hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
        >
          {project ? 'Update Project' : 'Create Project'}
        </button>

        {apiError && <p className="text-red-600 text-center mt-2">{apiError}</p>}
      </form>
    </div>
  );
};

export default CreateProjectForm;
