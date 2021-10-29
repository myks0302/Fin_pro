import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchTest() {
    
    
    let [getData, setGetData] = useState([]);
    let [keyword,setKeyword] = useState('');
    let [type,setType] = useState('name');
    console.log('render');
    
    useEffect(()=>{
    console.log('useEffect 실행');
    const url = "https://jsonplaceholder.typicode.com/users";
    axios.get(url)
    .then(function(response) {
        setGetData(response.data);
        console.log("성공");
    })
    .catch(function(error) {
        console.log("실패");
    })
    },[])
    return (
        <>
            <input type="text" placeholder="Search..." value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <select onChange={(e) => setType(e.target.value)}>
                <option value="name" >이름</option>
                <option value="username" >유저이름</option>
                <option value="id" >ID</option>
            </select>
            {getData.filter((data)=>{
                if(keyword === ''){
                    return data;
                }else{
                    if(type === 'name'){
                        return data.name.toLowerCase().includes(keyword.toLowerCase());
                    }else if(type === 'username'){
                        return data.username.toLowerCase().includes(keyword.toLowerCase());
                    }else if(type === 'id'){
                        return String(data.id).toLowerCase().includes(keyword.toLowerCase());
                    }
                    return null;
                }
            }).map(data=>{
                return (
                    <p key={data.id}>{data.name} | {data.username} | {data.id}</p>
                );
            })}
        </>
    )
}



export default SearchTest;