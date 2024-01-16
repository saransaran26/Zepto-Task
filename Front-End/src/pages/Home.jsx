import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

function Home() {
    const[click,setclick] = useState([])
    console.log("state",click);
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState([]);

  const getdatas = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(res.data);
    setdata(res.data);
    setfilter(res.data);
  };

  const filtered = (e) => {
    const datas = filter.filter((f) =>
      f.name.toLowerCase().includes(e.target.value)
    );
    setdata(datas);
  };

  const handleClick = async(id) => {
    const update = data.filter(i => i.id != id)
    setdata(update)
    const updatedData = filter.filter(item => item.id == id)
    console.log("After Click",updatedData);
    const newData = [...click,...updatedData]
    console.log("newdata",newData);
    setclick(newData)
  }

  const handleCancel = (id) => {
    const remove = click.filter(i => i.id != id)
    setclick(remove)
    const updatedData = filter.filter(item => item.id == id)
    const newdata = [...data,...updatedData]
    setdata(newdata)
  }

  useEffect(() => {
    getdatas();
  }, []);
  return (
    <div className="w-full flex justify-center items-center ">
        
      <div className="flex flex-col bg-white p-5 mt-10 rounded-md mb-4">
        <div className="w-[350px] flex flex-wrap gap-3">
      {click.length>0 && click.map((item)=>{
            return <div className="mb-4" key={item.id}>
                <p className="p-2 bg-gray-300 flex justify-center items-center rounded-md">{item.name} <MdOutlineCancel className="ml-2 text-xl cursor-pointer" onClick={()=>handleCancel(item.id)}/></p>
                
            </div>
        })}
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Search"
            className="border border-black rounded-lg p-3 w-[350px]"
            onChange={filtered}
          />
        </div>
        {data.length>0?data.map((item)=>{
            return (
                <ul key={item.id} className="">
                  <li className="mt-3 bg-slate-300 p-3 rounded-lg cursor-pointer hover:transfrom transition-transform duration-300 hover:scale-105" onClick={()=>handleClick(item.id)}>
                    {item.name}
                  </li>
                </ul>
              );
        }) :<p className="text-2xl font-semibold text-red-400 mt-5 text-center">No data found</p>}
      </div>
    </div>
  );
}

export default Home;
