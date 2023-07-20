// import React, { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
// export const authService = getAuth();
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";

// const Signup = () => {
//   const [newAccount, setNewAccount] = useState();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     authService.onAuthStateChanged((user) => {
//       // 유저 상태 변화 있을 때 실행되는 메소드
//       if (user) {
//         // 로그인 상태
//         setIsLoggedIn(true);
//       } else {
//         // 로그아웃 상태
//         setIsLoggedIn(false);
//       }
//     });
//   }, []);

//   const Signup = () => {
//     if (newAccount) {
//       createUserWithEmailAndPassword(authService, email, password)
//         .then(() => {
//           // Signin
//           if (authService.currentUser != null)
//             updateProfile(authService.currentUser, {
//               displayName: displayName,
//             });
//         })
//         .catch((error) => alert(error.message));
//       setEmail("");
//       setPassword("");
//       setDisplayName("");
//     } else {
//       signInWithEmailAndPassword(authService, email, password).catch((error) =>
//         alert(error.message)
//       );
//     }
//     setEmail("");
//     setPassword("");
//   };

//   return <></>;
// };

// export default Signup;
