import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Redirect } from "react-router";

//import {Form, Button} from 'react-bootstrap'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/JoinTest.css"


export default function JoinTest(){
  const [user,setUser] = useState({userId:'',userPassword:''});
  const [getData,setGetData] = useState([]);
  const [message,setMessage] = useState({text:'',color:''});
  const [joinCheck,setJoinCheck] = useState(false);
  
  //렌더링 시 기존 유저들의 정보를 가져온다  
  useEffect(()=>{
    callData();
  },[])

  //유저 정보를 가져와 스테이트에 값을 넣어주는 함수
  function callData(){
    const url = 'http://localhost:8081/user';
    axios.get(url)
    .then(function(response) {
        console.log("성공");
        console.log(response.data);
        setGetData(response.data);
    })
    .catch(function(error) {
        console.log("실패");
    })
  }
 
  //post 데이터 전송
  function onSubmit(e){
    e.preventDefault();
    console.log('onSubmit 실행')
    console.log(user);
    console.log(getData);
    axios.post('http://localhost:8081/user',user)
    .then(function(response){
        console.log('성공');
        setJoinCheck(true);
    })
    .catch(function(error){
        console.log('실패');
    });
  }

  //입력창에 텍스트 입력시 스테이트 갱신
  function onChange(e){
    const name = e.target.name;

    if(name === "id"){
        setUser({...user,userId:e.target.value});
    }else if(name === "password"){
        setUser({...user,userPassword:e.target.value});
    }
  }
  
  //id 체크 함수
  function idCheck(){
    let checked = false;
    for(var i=0; i<getData.length;i++){
        if(user.userId === getData[i].userId){
            checked = true;
            break;
        }
    }
    if(checked){
        setMessage({text:'중복된 아이디입니다.',color:'red'});
    }else{
        if(user.userId.length > 3){
            setMessage({text:'사용가능한 아이디입니다',color:'#3CB371'});
            console.log(user.userId);
        }else{
            if(user.userId)
            setMessage({text:'3글자이상 입력해주세요.',color:'red'})
        }
        
    }
  }


  return(
    <>
    {joinCheck ? 
      <Redirect to="/"></Redirect>
    :
    <div className="joinBox">
      <h2>국비 위키</h2>

      
      <form onSubmit={onSubmit}>  
        <h4>회원가입</h4>
        
        <input type = "text" name="id" onChange={onChange} onBlur={idCheck} placeholder="이메일 주소"></input><br/>
        <input type = "text" name="email_check" placeholder="이메일 인증 번호"></input><br/>
        <input type = "text" name="nickname" placeholder="닉네임"></input><br/>        
        <input type = "password" name="password" onChange={onChange} placeholder="비밀번호"></input><br/>
        <input type = "password" name="password_check" placeholder="비밀번호 확인"></input><br/>
        <input type = "text" name="name" placeholder="실명"></input><br/>

        <input type = "submit" value="join" />
      </form>

      <div className="horizontal"></div>

      <div className="login">
        <p>이미 회원이세요?</p>
                            
        <a href="">로그인</a>             
      </div>
    </div>
    }  
    </>
  );
}