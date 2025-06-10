import { service } from '@/Service/service';
import React, {  useEffect } from 'react';


type User={
  name:string,
  email:string,
  skills:string |string[],
  role:string,
  _id:string,
   seniority:string,
   maxCapacity:number,

}


const Profile: React.FC = () => {

const [user , setUser] = React.useState<User|null >(null);
const [edit ,setEdit] = React.useState<Boolean>(true);
const [skills ,setSkills] = React.useState<string>("");

   useEffect(() => {

    async function getUser() {
         try {
           const userData = await service.getCurrentUser();
          
           console.log(userData);
           setUser(userData.data);
           setSkills(userData.data.skills);
         } catch (error) {
           console.log(error);
         }
       }
       getUser();
     }, []);

  const updateSkills = async function(){

    if(user){
      user.skills = skills;    
      const response = await service.updateUser(user,user._id);
      
          if(response){
            setEdit(true);
          }
    }
  }
     

     

  return (
    <div className="max-w-md mx-auto  p-6 border-[#334D66] border-[1px] rounded-xl shadow-lg bg-[#1A2633] text-white mt-28">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-400">Name</label>
          <p className="text-lg font-medium">{user?.name}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-400">Email</label>
          <p className="text-lg font-medium">{user?.email}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-400">Role</label>
          <p className="text-lg font-medium capitalize">{user?.role}</p>
        </div>

       { user?.role !== "manager" && <div>
          <label className="block text-sm font-semibold text-gray-400">Max Capacity</label>
          <p className="text-lg font-medium">{user?.maxCapacity}</p>
        </div>}
       { user?.role !== "manager" && <div>
          <label className="block text-sm font-semibold text-gray-400">Seniority</label>
          <p className="text-lg font-medium">{user?.seniority}</p>
        </div>}
       { user?.role !== "manager" && <div>
          <label className="block text-sm font-semibold text-gray-400">Skills</label>
       {  !edit ? <input type="text" value={skills} onChange={(e) => {setSkills(e.target.value)}} className="w-full p-2 border border-[#94ADC7] rounded-xl bg-[#334D66] text-white"/> : <p className="text-lg font-medium">{skills}</p>}

          {edit ? <button onClick={() => {setEdit(false)}}>
            <p className="text-md font-medium bg-[#334D66] px-3 py-1 rounded-3xl mt-2">Edit Skills</p>
          </button>  : <button onClick={() => {setEdit(true); updateSkills()}}>
            <p className="text-md font-medium bg-[#334D66] px-3 py-1 rounded-3xl mt-2">Save</p>
          </button>
          }
        </div>}


       
      </div>
    </div>
  );
};

export default Profile;
