//import auth from './auth'
function Complete(props) {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-no-repeat bg-cover relative items-center">
           <div className="border border-purple-600 rounded-lg p-12">
           <h1 className="text-gray-900 text-lg title-font font-medium mb-2">Survey Completed!</h1>
           <button onClick={() => {
           
           props.history.push("/welcome");

       }}className=" my-6 w-full text-white bg-purple-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded text-lg"> Go Home </button>
        </div>
    </div>
    )
}

export default Complete
