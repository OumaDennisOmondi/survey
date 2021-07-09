import { useEffect, useState } from 'react';
//import auth from './auth'
//import survey from './survey.json';
function Survey(props) {
  const [data,setData] = useState();
  const [answers,setAnswers]= useState([]);
  //set survey metadata
  const setAns=(e) =>{
  console.log(`column_match: ${e.target.getAttribute('data-column')},q_ans: ${e.target.value}, q_id: ${e.target.name}`)
  let ans_obj={column_match:e.target.getAttribute('data-column'), q_ans:e.target.value, q_id:e.target.name}
  let clean_ans=answers.filter(ans =>{
    return ans.qn_id !== e.target.name;
  })
  // setAnswers([...new_answers,{qn_id:e.target.name, ans_id:e.target.value}])
  clean_ans.push(ans_obj)
  setAnswers(clean_ans)
 // console.log(data.forms[0].id);
  }
 const handleSubmit= (e) =>{
   e.preventDefault();
  // console.log(answers)
   //prepare form meta data.
   const end_time='2021-02-03 11:47:37.739 +0300'
   const local_id =0
   const location={
       accuracy:0,
       lat:0,
       lan:0
   }
   const start_time='2021-02-03 11:27:37.739 +0300'
   const survey_id=data.forms[0].id;

   //build complete survey response payload
   let response=[
       {
           ans:answers,
           end_time:end_time,
           local_id:local_id,
           location:location,
           start_time:start_time,
           survey_id:survey_id
       }
   ]

  console.log(JSON.stringify(response))

  //submit survey
  const submitSurvey  = async(resp)=>{
    const auth_token = localStorage.getItem('access_token'); 
    try{
    const response = await fetch('http://fullstack-role.busara.io/api/v1/recruitment/answers/submit/',{
     method:'POST',
     headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${auth_token}`
       },
     body:JSON.stringify(resp)
     
 })
 const data = await response.json();
 console.log(data)
 props.history.push("/complete");
 return data;
}catch(e){
 console.log(e)
}

//   auth.login(() => {
//     props.history.push("/complete");
//   });
 }
 submitSurvey(response)
}

  useEffect(() => {
  //get auth token
  const auth_token = localStorage.getItem('access_token');

   const fetchSurvey  = async()=>{
       try{
       const response = await fetch('http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
        
    })
    const data = await response.json();
    setData(data)
    console.log(data.forms)

    return data;
    }catch(e){
        setData(undefined)
        console.log(e)
    }
    }
    //console.log(data);
    fetchSurvey()
  }, [])
  return (
      
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-no-repeat bg-cover relative items-center">
     { data !== undefined 
     ?
        <div className="border border-purple-600 rounded-lg px-12">
      { data.forms.map(form => (
        <form onSubmit={e => handleSubmit(e)}>
        <h1 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4" key={form.id}>{form.name}</h1><hr/>
        {form.pages.map(page => (
          <div className="my-8">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2" key={page.id}>Page: { page.name}</h2><hr/>
          {page.sections.map(section =>(
            <div>
            <h3 className="title-font text-xl font-medium text-gray-900 mb-3" key={section.id}> Section{section.name}</h3>
            {section.questions.map(question =>(
              <div>
              <label className="leading-7 text-sm text-gray-600 mt-12" key={question.id}>{question.text} { question.is_mandatory? '*' : ''} </label><br></br>
              { question.type === 'select' ?  <select 
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              onChange={e => setAns(e)} defaultValue={ 'select'  } name={question.id} data-column={question.column_match} required={ question.is_mandatory? true : false}>
               <option disabled value='select'>---Select---</option> 
              {question.q_options.map(q_option =>(
                <option value={q_option.id}>{q_option.name}</option>
              ))}
                
                </select> : <input type={ question.type} onKeyUp={e => setAns(e)} data-column={question.column_match} name={question.id} required={ question.is_mandatory? true : false}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>}<br></br>

              </div>
            ))}
            </div>
          ))}
          </div>
        ))}
        <div className="my-8">
          <button type='submit' className=" w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">SUBMIT</button>
          <button onClick={() => {
           
           props.history.push("/welcome");

       }}className=" my-6 w-full text-white bg-red-400 border-0 py-2 px-6 focus:outline-none hover:bg-red-500 rounded text-lg">CANCEL </button>
        </div>
        <div key={form.email} className="mb-6">
        <h2>Meta Data</h2>
        <p>Created By : {form.creator.email}</p>
        <p>Airtime Compensation : {form.airtime_compensation}</p>
        <hr/>
        </div>
        
        </form>
        
      ))}
      </div>
      : <div><h1 className="text-gray-900 text-lg title-font font-medium mb-2">Fetching Survey..</h1></div> }
      
    </div>
  );
}

export default Survey;
