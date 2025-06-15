
const url = import.meta.env.VITE_API_URL

class API {

 async login(data: any) {
  try {
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

   
    // Handle errors before parsing
    console.log(response)
    if (!response.ok) {
      // Try to safely extract JSON error message
      let errorMessage = "Login failed";


      try {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
      } catch (jsonErr) {
        console.log(jsonErr)
        // Fallback in case the response is not JSON (e.g. HTML)
        console.error("Failed to parse error JSON:", jsonErr);
        const text = await response.text();
        console.warn("Error response text:", text.slice(0, 200));
      }

      throw new Error(errorMessage);
    }

    // Safe to parse JSON now
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw (" Invalid Email or Password"); // Optional: rethrow or handle in UI
  }
}

    // Method to fetch current User
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
              throw new Error(result.message || "Failed to get User");
            }
            return result;
    
            // On success, navigate to dashboard or next route
          } catch (error) {
            console.log(error);
          }
      }

       // Method to fetch All Projects
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
            throw new Error(result.message || "Failed to get Projects");
          }
          return result;
        } catch (error) {
          console.log(error);
        }
      }

       // Method to fetch to Project
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


// Method to fetch all Assignments
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

    // Method to fetch All Engineers
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

      // Method to fetch Create an Assignment
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

       // Method to Update Assignment
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

        // Method to fetch Active Assignments
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

        // Method to fetch Logout User
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

        // Method to fetch User Profile
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
              throw new Error(result.message || "Failed to Update the User");
            }
            return result;
          } catch (error) {
            console.log(error);
          }
        }

        // Method to fetch Delete Assignment
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