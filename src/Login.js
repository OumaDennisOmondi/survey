//import { Link } from 'react-router-dom'
import { useState } from 'react'
import auth from './auth'
function Login(props) {

    const [username, setUsername] = useState('oumadennisomondi@gmail.com')
    const [password, setPassword] = useState('oumadennisomondi@gmail.com')
    const[loginFeedback,setLoginFeedback] = useState('');

    const handleLogin =  (e) =>{
        e.preventDefault();
       // console.log(`Username: ${username}, Password:${password}`)
        //console.log(process.env.REACT_APP_CLIENT_ID)
        const loginUser  = async(resp)=>{
            let body=`grant_type=password&username=${username}&password=${password}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
            try{
            const response = await fetch('https://fullstack-role.busara.io/api/v1/oauth/token/',{
             method:'POST',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
               },
             body:body
             
             
         })
         const data = await response.json();
         console.log(data.access_token)
         if(data.access_token !== undefined){

         localStorage.setItem('access_token',data.access_token);
           auth.login(() => {
            props.history.push("/welcome");
          });
         }
         else{
            setLoginFeedback('Wrong Credentials')  
         }
         return data;
        }catch(e){
           setLoginFeedback('Something Went Wrong!') 
         console.log(e)
        }
        
        //   auth.login(() => {
        //     props.history.push("/complete");
        //   });
         }
         loginUser()

    } 
    return (
        <>

        <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
            <header className="max-w-lg mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center">Startup</h1>
            </header>

            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome to Busara Centre</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>

                <section className="mt-10">
                <label className="block text-red-700 text-sm font-bold mb-2 ml-3">{loginFeedback}</label>
                    <form className="flex flex-col" onSubmit={e => handleLogin(e)}>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label>
                            <input type="text" id="email" value={username} required onChange={e => setUsername(e.target.value)} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"></input>
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                            <input type="password" value={password} required onChange = {e => setPassword(e.target.value)} id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"></input>
                        </div>
                        <div className="flex justify-end">
                            
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                    </form>
                </section>
            </main>

        </div>
        </>
    )
}

export default Login
