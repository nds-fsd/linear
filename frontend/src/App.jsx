
const url = 'http://127.0.0.1:27605/users'
const testData = {
	name: "hola",
	lastname: "holita",
	email:"riderelli.ben@gmail.com",
	password:"hola"	
}

const test = () => {
  fetch(url,{
  method:'POST',
  headers: {
      "Content-Type": "application/json",
    },
  body: JSON.stringify(testData)
 })
 .then(res => {res.json()})
 .then(data => {
  console.log(testData)
  console.log(data)})   
  .catch(err => {
    console.log(JSON.stringify(testData))
    console.log(err)})
}



function App() {
    // 
    return (
    <div>
        <button
          onClick={() => test()}
        > test </button>
    </div>


  )
}

export default App
