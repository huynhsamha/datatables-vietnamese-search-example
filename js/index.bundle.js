(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(a,t,n){"use strict";n.r(t);var e=n(10),o=n.n(e),d=n(1),s=n.n(d);$(()=>{const a={dataLoading:$("#dataLoading"),tbData:$("#tbData")},t={tbData:null},n=async()=>o.a.get("data/data.json").then(a=>a.data);!async function(){t.tbData=a.tbData.DataTable({data:[],pagingType:"numbers",deferRender:!0,columns:[{},{},{},{},{visible:!1}],createdRow:(a,t,n)=>{}});const e=await n();console.log(e);const o=function(a=[]){return a.map(a=>{const{city:t,admin:n,lat:e,lng:o}=a,d=`${s.a.removeVI(t)}|${s.a.removeVI(n)}`;return[t,n,parseInt(e,10),parseInt(o,10),d]})}(e);t.tbData.rows.add(o).draw(),a.dataLoading.hide()}()})}},[[11,2,1]]]);