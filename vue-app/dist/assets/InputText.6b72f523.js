import{o as n,c as d,e as i,t as l,m as r,v as s,n as u,F as v,h as f,f as y,p}from"./index.a1eef302.js";import{_ as c}from"./TitleBox.e8558def.js";const b={class:"form-field"},g=["type"],x=["name"],k=["value"],w={__name:"InputText",props:{att:{type:Object},options:{type:Array}},setup(t){return(o,a)=>(n(),d("div",b,[i("label",null,l(t.att.label)+" :",1),t.att.type==="text"||t.att.type==="password"?r((n(),d("input",{key:0,onInput:a[0]||(a[0]=e=>o.$emit("validate-input",e.target.value,t.att.name)),type:t.att.type,"onUpdate:modelValue":a[1]||(a[1]=e=>t.att.value=e)},null,40,g)),[[s,t.att.value,void 0,{trim:!0}]]):t.att.type=="select"?r((n(),d("select",{key:1,name:t.att.name,"onUpdate:modelValue":a[2]||(a[2]=e=>t.att.value=e),multiple:"",onChange:a[3]||(a[3]=e=>o.$emit("validate-input",e.target.value,t.att.name))},[(n(!0),d(v,null,f(t.options,(e,m)=>(n(),d("option",{value:m},l(e.name),9,k))),256))],40,x)),[[u,t.att.value]]):y("",!0),r(i("p",{class:"error"},l(t.att.error),513),[[p,t.att.error]])]))}};var h=c(w,[["__scopeId","data-v-e7f3410a"]]);export{h as I};
