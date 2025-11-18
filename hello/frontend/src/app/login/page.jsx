
export default async function page() {
  async function onSubmit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("http://localhost:8090/api/user/login", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="w-full h-screen bg-white">
      <input type="text" name="number" className="border text-black" placeholder="Enter number"/>
      <input type="text" name="password" className="border text-black" placeholder="Enter password"/>
      <button type="submit" className="bg-blue-800 px-2 text-white hover:bg-blue-600">Submit</button>
      {/* {`login page ${data}`} */}
      
    </div>
  )
}
