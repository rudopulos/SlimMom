import{u as l,a as d,j as e,r as c}from"./index-B4bITQ3H.js";import{c as x,a,F as h,b as p,d as r,E as i,H as u}from"./Header-cXSeFYpR.js";const j=()=>{const n=l(),t=d(),o=x().shape({name:a().min(2,"Too Short!").max(30,"Too Long!").required("Name is required"),email:a().email("Invalid email address").required("Email is required"),password:a().min(6,"Password must be at least 6 characters").max(12,"Must be 12 characters or less").required("Password is required")});return e.jsxs("div",{className:"register",children:[e.jsx("h1",{children:"REGISTER"}),e.jsx(h,{initialValues:{name:"",email:"",password:""},validationSchema:o,onSubmit:(s,{setSubmitting:m})=>{n(c(s)),t("/calculator"),m(!1)},children:({isSubmitting:s})=>e.jsxs(p,{children:[e.jsx("label",{htmlFor:"name",children:"Name *"}),e.jsx(r,{id:"name",type:"text",name:"name"}),e.jsx(i,{name:"name",component:"div"}),e.jsx("label",{htmlFor:"email",children:"Email *"}),e.jsx(r,{id:"email",type:"email",name:"email"}),e.jsx(i,{name:"email",component:"div"}),e.jsx("label",{htmlFor:"password",children:"Password *"}),e.jsx(r,{id:"password",type:"password",name:"password"}),e.jsx(i,{name:"password",component:"div"}),e.jsx("button",{disabled:s,className:"login-orange-btn",type:"submit",children:"Register"}),e.jsx("button",{onClick:()=>{t("/login")},className:"login-white-btn",type:"button",children:"Log in"})]})})]})},w=()=>e.jsxs("div",{className:"container",children:[e.jsx(u,{}),e.jsx(j,{})]});export{w as default};