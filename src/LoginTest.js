import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useLocation } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/LoginTest.module.css"


const { naver } = window;

export default function LoginTest() {
  const [user, setUser] = useState({});
  const [loginCheck, setLoginCheck] = useState(false);
  const location = useLocation();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "GFRk_SJiZVzSpToWr01V",
      callbackUrl: "http://localhost:3000/#/",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 3, height: "94" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0];
    console.log(token);
  };

  function onChange(e) {
    const name = e.target.name;
    if (name === "id") {
      setUser({ ...user, userId: e.target.value });
    } else if (name === "password") {
      setUser({ ...user, userPassword: e.target.value });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:8081/user/login`, user)
      .then(function (response) {
        console.log("성공");
        if (response.data.userId !== "") {
          window.sessionStorage.setItem("user", JSON.stringify(response.data));
          setLoginCheck(!loginCheck);
        } else {
          alert("로그인 실패");
        }
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  useEffect(() => {
    console.log("useEffect실행");
    initializeNaverLogin();
    getNaverToken();
  }, []);


  return (
    <>
      <style type="text/css">
        {`
                Form.Group{
                    margin-bottom: 15px;
                }
                `}
      </style>
      {sessionStorage.getItem("user") !== null ? (
        <Redirect to="/"></Redirect>
      ) : (
        
        <div className={styles.loginform}>
          <h1>국비 위키</h1>
          <br />
          <form>
              <br />
              <p>Email address</p>
              <input
                className={styles.input_id}
                type="text"
                name="id"
                placeholder="이메일 주소"
                onChange={onChange}
              />
            

            
              <br />
              <p>Password</p>
              <input
                className={styles.input_password}
                type="password"
                name="password"
                placeholder="비밀번호"
                onChange={onChange}
              />
            
              <br />
              <button
                className={styles.login_btn}
                type="button"
                name="submit"
                
                onChange={onChange}
              >로그인</button>


            <div>
              <div className={styles.horizontal}>
                <span>or</span>
              </div>
            </div>
          </form>

          <div id="naverIdLogin"></div>
          <div className={styles.horizontal, styles.horizontal2}></div>
          <div className={styles.loginlast}>
            아직 회원이 아니세요?
            <span>
              <a href="/join">회원가입</a>
            </span>
          </div>
        </div>
      )}
    </>
  );
}