
const url = import.meta.env.VITE_API_URL

class API {

     async login(data: any) {
     try {
          const response = await fetch(`${url}/api/auth/login`, {
             method: "POST",
             credentials: 'include',
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(data),

           
           });

           console.log("done")
           console.log(response)
    
           const result = await response.json();
    
           if (!response.ok) {
             throw new Error(result.message || "Login failed");
           }
           return result;
    
           // On success, navigate to dashboard or next route

     } catch (error) {
        console.log(error);
     }


      }

      async getCurrentUser(){
        try {
            const response = await fetch(`${url}/api/auth/profile`, {
              method: "GET",
              headers: { 
                "Content-Type": "application/json",
              },
               credentials: 'include' 
            });
            const result = await response.json();
    
            if (!response.ok) {
              throw new Error(result.message || "Login failed");
            }
            return result;
    
            // On success, navigate to dashboard or next route
          } catch (error) {
            console.log(error);
          }
      }

      async getAllProjects(){
        try {
          const response = await fetch(`${url}/api/projects`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "Login failed");
          }
          return result;
        } catch (error) {
          console.log(error);
        }
      }

      async getProject(id :any){
        try {
          const response = await fetch(`${url}/api/projects/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "Login failed");
          }
          return result;
        } catch (error) {
          console.log(error);
        }

      }

      async getAllAssignments(){

      try {
          const response = await fetch(`${url}/api/assignments`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }});

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "Login failed");
          }
          return result;
      } catch (error) {
           console.log(error);
      }}


      async getAllEngineers(){
        try {
          const response = await fetch(`${url}/api/engineers`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "Failed to get engineers");
          }
          return result;
        } catch (error) {
          console.log(error);
        }
      }

      async createAssignment(data:any){
         
        const response = await fetch(`${url}/api/assignments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to create assignment");
        }
        return result;

      }

      async updateAssignment(id:string,data:any){

        const response = await fetch(`${url}/api/assignments/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to update assignment");
        }
        return result;
      }

      async getActiveAssignments(id:string){
  
         try {
          const response = await fetch(`${url}api/assignments/${id}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
       }
         );
         const result = await response.json();
         if (!response.ok) {
           throw new Error(result.message || "failed to get assignments");
         }
         return result;

         } catch (error) {
           console.log(error);
          
         }
        }

      async logout()  {
          try {
            const response = await fetch(`${url}/api/auth/logout`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const result = await response.json();
            if (!response.ok) {
              throw new Error(result.message || "Logout failed");
            }
            return result;
          } catch (error) {
            console.log(error);
          }
        };

        async updateUser(user:any,id:string) {
          try {
            const response = await fetch(`${url}/api/auth/${id}`, {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
            const result = await response.json();
            if (!response.ok) {
              throw new Error(result.message || "Logout failed");
            }
            return result;
          } catch (error) {
            console.log(error);
          }
        }

        async deleteAssignment(id:string){
             try {
                  const response = await fetch(`${url}/api/assignments/${id}`,{
                    method:"DELETE",
                    credentials:"include",
                    headers:{
                      "Content-Type": "application/json",
                    }
                  })

                 const result  = await response.json();
                 
                 if(!response.ok){
                  throw new Error(result.message || " Unable to Delete");
                 }
                 return result;

             } catch (error) {
                  console.log(error);
             }  

        }
}

export const service = new API();