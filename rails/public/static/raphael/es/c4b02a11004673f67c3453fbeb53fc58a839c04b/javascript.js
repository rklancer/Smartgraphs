/*
 * Raphael 1.3.2 - JavaScript Vector Library
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael=(function(){var a=/[, ]+/,aZ=/^(circle|rect|path|ellipse|text|image)$/,ba="prototype",X="hasOwnProperty",Q=document,aC=window,m={was:Object[ba][X].call(aC,"Raphael"),is:aC.Raphael},av=function(){if(av.is(arguments[0],"array")){var e=arguments[0],E=A[a8](av,e.splice(0,3+av.is(e[0],ar))),bd=E.set();
for(var S=0,be=e[n];S<be;S++){var R=e[S]||{};aZ.test(R.type)&&bd[f](E[R.type]().attr(R))
}return bd}return A[a8](av,arguments)},a5=function(){},aV="appendChild",a8="apply",a3="concat",aB="",au=" ",D="split",K="click dblclick mousedown mousemove mouseout mouseover mouseup"[D](au),aI="join",n="length",bc=String[ba].toLowerCase,ag=Math,h=ag.max,aS=ag.min,ar="number",aK="toString",aF=Object[ba][aK],a1={},aW=ag.pow,f="push",a6=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+?)['"]?\)$/i,B=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,V=ag.round,z="setAttribute",ab=parseFloat,L=parseInt,aY=String[ba].toUpperCase,k={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},ae={along:"along",blur:ar,"clip-rect":"csv",cx:ar,cy:ar,fill:"colour","fill-opacity":ar,"font-size":ar,height:ar,opacity:ar,path:"path",r:ar,rotation:"csv",rx:ar,ry:ar,scale:"csv",stroke:"colour","stroke-opacity":ar,"stroke-width":ar,translation:"csv",width:ar,x:ar,y:ar},a0="replace";
av.version="1.3.2";av.type=(aC.SVGAngle||Q.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(av.type=="VML"){var al=Q.createElement("div");al.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(al.childNodes[n]!=2){return av.type=null}al=null}av.svg=!(av.vml=av.type=="VML");
a5[ba]=av[ba];av._id=0;av._oid=0;av.fn={};av.is=function(i,e){e=bc.call(e);return((e=="object"||e=="undefined")&&typeof i==e)||(i==null&&e=="null")||bc.call(aF.call(i).slice(8,-1))==e
};av.setWindow=function(e){aC=e;Q=aC.document};var aN=function(E){if(av.vml){var e=/^\s+|\s+$/g;
aN=ao(function(S){var bd;S=(S+aB)[a0](e,aB);try{var be=new aC.ActiveXObject("htmlfile");
be.write("<body>");be.close();bd=be.body}catch(bg){bd=aC.createPopup().document.body
}var i=bd.createTextRange();try{bd.style.color=S;var bf=i.queryCommandValue("ForeColor");
bf=((bf&255)<<16)|(bf&65280)|((bf&16711680)>>>16);return"#"+("000000"+bf[aK](16)).slice(-6)
}catch(bg){return"none"}})}else{var R=Q.createElement("i");R.title="Rapha\xebl Colour Picker";
R.style.display="none";Q.body[aV](R);aN=ao(function(i){R.style.color=i;return Q.defaultView.getComputedStyle(R,aB).getPropertyValue("color")
})}return aN(E)};var ap=function(){return"hsb("+[this.h,this.s,this.b]+")"},x=function(){return this.hex
};av.hsb2rgb=ao(function(bh,bf,bl){if(av.is(bh,"object")&&"h" in bh&&"s" in bh&&"b" in bh){bl=bh.b;
bf=bh.s;bh=bh.h}var S,bd,bm;if(bl==0){return{r:0,g:0,b:0,hex:"#000"}}if(bh>1||bf>1||bl>1){bh/=255;
bf/=255;bl/=255}var be=~~(bh*6),bi=(bh*6)-be,R=bl*(1-bf),E=bl*(1-(bf*bi)),bn=bl*(1-(bf*(1-bi)));
S=[bl,E,R,R,bn,bl,bl][be];bd=[bn,bl,bl,E,R,R,bn][be];bm=[R,R,bn,bl,bl,E,R][be];S*=255;
bd*=255;bm*=255;var bj={r:S,g:bd,b:bm,toString:x},e=(~~S)[aK](16),bg=(~~bd)[aK](16),bk=(~~bm)[aK](16);
e=e[a0](a6,"0");bg=bg[a0](a6,"0");bk=bk[a0](a6,"0");bj.hex="#"+e+bg+bk;return bj},av);
av.rgb2hsb=ao(function(e,i,bf){if(av.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bf=e.b;
i=e.g;e=e.r}if(av.is(e,"string")){var bh=av.getRGB(e);e=bh.r;i=bh.g;bf=bh.b}if(e>1||i>1||bf>1){e/=255;
i/=255;bf/=255}var be=h(e,i,bf),E=aS(e,i,bf),S,R,bd=be;if(E==be){return{h:0,s:0,b:be}
}else{var bg=(be-E);R=bg/be;if(e==be){S=(i-bf)/bg}else{if(i==be){S=2+((bf-e)/bg)}else{S=4+((e-i)/bg)
}}S/=6;S<0&&S++;S>1&&S--}return{h:S,s:R,b:bd,toString:ap}},av);var aO=/,?([achlmqrstvxz]),?/gi;
av._path2string=function(){return this.join(",")[a0](aO,"$1")};function ao(R,i,e){function E(){var S=Array[ba].slice.call(arguments,0),be=S[aI]("\u25ba"),bd=E.cache=E.cache||{},bf=E.count=E.count||[];
if(bd[X](be)){return e?e(bd[be]):bd[be]}bf[n]>=1000&&delete bd[bf.shift()];bf[f](be);
bd[be]=R[a8](i,S);return e?e(bd[be]):bd[be]}return E}av.getRGB=ao(function(e){if(!e||!!((e=e+aB).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(e=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(({hs:1,rg:1})[X](e.substring(0,2))||e.charAt()=="#")&&(e=aN(e));
var bd,E,R,bg,bh,be=e.match(B);if(be){if(be[2]){bg=L(be[2].substring(5),16);R=L(be[2].substring(3,5),16);
E=L(be[2].substring(1,3),16)}if(be[3]){bg=L((bh=be[3].charAt(3))+bh,16);R=L((bh=be[3].charAt(2))+bh,16);
E=L((bh=be[3].charAt(1))+bh,16)}if(be[4]){be=be[4][D](/\s*,\s*/);E=ab(be[0]);R=ab(be[1]);
bg=ab(be[2])}if(be[5]){be=be[5][D](/\s*,\s*/);E=ab(be[0])*2.55;R=ab(be[1])*2.55;bg=ab(be[2])*2.55
}if(be[6]){be=be[6][D](/\s*,\s*/);E=ab(be[0]);R=ab(be[1]);bg=ab(be[2]);return av.hsb2rgb(E,R,bg)
}if(be[7]){be=be[7][D](/\s*,\s*/);E=ab(be[0])*2.55;R=ab(be[1])*2.55;bg=ab(be[2])*2.55;
return av.hsb2rgb(E,R,bg)}be={r:E,g:R,b:bg};var i=(~~E)[aK](16),S=(~~R)[aK](16),bf=(~~bg)[aK](16);
i=i[a0](a6,"0");S=S[a0](a6,"0");bf=bf[a0](a6,"0");be.hex="#"+i+S+bf;return be}return{r:-1,g:-1,b:-1,hex:"none",error:1}
},av);av.getColor=function(i){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:i||0.75},e=this.hsb2rgb(E.h,E.s,E.b);
E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b})
}return e.hex};av.getColor.reset=function(){delete this.start};var aD=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,at=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
av.parsePathString=ao(function(e){if(!e){return null}var E={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},i=[];
if(av.is(e,"array")&&av.is(e[0],"array")){i=aE(e)}if(!i[n]){(e+aB)[a0](aD,function(S,R,bf){var be=[],bd=bc.call(R);
bf[a0](at,function(bh,bg){bg&&be[f](+bg)});if(bd=="m"&&be[n]>2){i[f]([R][a3](be.splice(0,2)));
bd="l";R=R=="m"?"l":"L"}while(be[n]>=E[bd]){i[f]([R][a3](be.splice(0,E[bd])));if(!E[bd]){break
}}})}i[aK]=av._path2string;return i});av.findDotsAtSegment=function(i,e,bs,bq,be,S,bg,bf,bm){var bk=1-bm,bj=aW(bk,3)*i+aW(bk,2)*3*bm*bs+bk*3*bm*bm*be+aW(bm,3)*bg,bh=aW(bk,3)*e+aW(bk,2)*3*bm*bq+bk*3*bm*bm*S+aW(bm,3)*bf,bo=i+2*bm*(bs-i)+bm*bm*(be-2*bs+i),bn=e+2*bm*(bq-e)+bm*bm*(S-2*bq+e),br=bs+2*bm*(be-bs)+bm*bm*(bg-2*be+bs),bp=bq+2*bm*(S-bq)+bm*bm*(bf-2*S+bq),bl=(1-bm)*i+bm*bs,bi=(1-bm)*e+bm*bq,R=(1-bm)*be+bm*bg,E=(1-bm)*S+bm*bf,bd=(90-ag.atan((bo-br)/(bn-bp))*180/ag.PI);
(bo>br||bn<bp)&&(bd+=180);return{x:bj,y:bh,m:{x:bo,y:bn},n:{x:br,y:bp},start:{x:bl,y:bi},end:{x:R,y:E},alpha:bd}
};var Z=ao(function(bj){if(!bj){return{x:0,y:0,width:0,height:0}}bj=M(bj);var bg=0,bf=0,S=[],E=[],R;
for(var bd=0,bi=bj[n];bd<bi;bd++){R=bj[bd];if(R[0]=="M"){bg=R[1];bf=R[2];S[f](bg);
E[f](bf)}else{var be=aM(bg,bf,R[1],R[2],R[3],R[4],R[5],R[6]);S=S[a3](be.min.x,be.max.x);
E=E[a3](be.min.y,be.max.y);bg=R[5];bf=R[6]}}var e=aS[a8](0,S),bh=aS[a8](0,E);return{x:e,y:bh,width:h[a8](0,S)-e,height:h[a8](0,E)-bh}
}),aE=function(be){var R=[];if(!av.is(be,"array")||!av.is(be&&be[0],"array")){be=av.parsePathString(be)
}for(var E=0,S=be[n];E<S;E++){R[E]=[];for(var e=0,bd=be[E][n];e<bd;e++){R[E][e]=be[E][e]
}}R[aK]=av._path2string;return R},ai=ao(function(S){if(!av.is(S,"array")||!av.is(S&&S[0],"array")){S=av.parsePathString(S)
}var bi=[],bk=0,bj=0,bn=0,bm=0,R=0;if(S[0][0]=="M"){bk=S[0][1];bj=S[0][2];bn=bk;bm=bj;
R++;bi[f](["M",bk,bj])}for(var bf=R,bo=S[n];bf<bo;bf++){var e=bi[bf]=[],bl=S[bf];
if(bl[0]!=bc.call(bl[0])){e[0]=bc.call(bl[0]);switch(e[0]){case"a":e[1]=bl[1];e[2]=bl[2];
e[3]=bl[3];e[4]=bl[4];e[5]=bl[5];e[6]=+(bl[6]-bk).toFixed(3);e[7]=+(bl[7]-bj).toFixed(3);
break;case"v":e[1]=+(bl[1]-bj).toFixed(3);break;case"m":bn=bl[1];bm=bl[2];default:for(var be=1,bg=bl[n];
be<bg;be++){e[be]=+(bl[be]-((be%2)?bk:bj)).toFixed(3)}}}else{e=bi[bf]=[];if(bl[0]=="m"){bn=bl[1]+bk;
bm=bl[2]+bj}for(var bd=0,E=bl[n];bd<E;bd++){bi[bf][bd]=bl[bd]}}var bh=bi[bf][n];switch(bi[bf][0]){case"z":bk=bn;
bj=bm;break;case"h":bk+=+bi[bf][bh-1];break;case"v":bj+=+bi[bf][bh-1];break;default:bk+=+bi[bf][bh-2];
bj+=+bi[bf][bh-1]}}bi[aK]=av._path2string;return bi},0,aE),u=ao(function(S){if(!av.is(S,"array")||!av.is(S&&S[0],"array")){S=av.parsePathString(S)
}var bh=[],bj=0,bi=0,bm=0,bl=0,R=0;if(S[0][0]=="M"){bj=+S[0][1];bi=+S[0][2];bm=bj;
bl=bi;R++;bh[0]=["M",bj,bi]}for(var bf=R,bn=S[n];bf<bn;bf++){var e=bh[bf]=[],bk=S[bf];
if(bk[0]!=aY.call(bk[0])){e[0]=aY.call(bk[0]);switch(e[0]){case"A":e[1]=bk[1];e[2]=bk[2];
e[3]=bk[3];e[4]=bk[4];e[5]=bk[5];e[6]=+(bk[6]+bj);e[7]=+(bk[7]+bi);break;case"V":e[1]=+bk[1]+bi;
break;case"H":e[1]=+bk[1]+bj;break;case"M":bm=+bk[1]+bj;bl=+bk[2]+bi;default:for(var be=1,bg=bk[n];
be<bg;be++){e[be]=+bk[be]+((be%2)?bj:bi)}}}else{for(var bd=0,E=bk[n];bd<E;bd++){bh[bf][bd]=bk[bd]
}}switch(e[0]){case"Z":bj=bm;bi=bl;break;case"H":bj=e[1];break;case"V":bi=e[1];break;
default:bj=bh[bf][bh[bf][n]-2];bi=bh[bf][bh[bf][n]-1]}}bh[aK]=av._path2string;return bh
},null,aE),a9=function(i,R,e,E){return[i,R,e,E,e,E]},aU=function(i,R,be,S,e,E){var bd=1/3,bf=2/3;
return[bd*i+bf*be,bd*R+bf*S,bd*e+bf*be,bd*E+bf*S,e,E]},P=function(bn,bS,bw,bu,bo,bi,bd,bm,bR,bp){var S=ag.PI,bt=S*120/180,e=S/180*(+bo||0),bA=[],bx,bO=ao(function(bT,bW,i){var bV=bT*ag.cos(i)-bW*ag.sin(i),bU=bT*ag.sin(i)+bW*ag.cos(i);
return{x:bV,y:bU}});if(!bp){bx=bO(bn,bS,-e);bn=bx.x;bS=bx.y;bx=bO(bm,bR,-e);bm=bx.x;
bR=bx.y;var E=ag.cos(S/180*bo),bk=ag.sin(S/180*bo),bC=(bn-bm)/2,bB=(bS-bR)/2;var bM=(bC*bC)/(bw*bw)+(bB*bB)/(bu*bu);
if(bM>1){bM=ag.sqrt(bM);bw=bM*bw;bu=bM*bu}var R=bw*bw,bF=bu*bu,bH=(bi==bd?-1:1)*ag.sqrt(ag.abs((R*bF-R*bB*bB-bF*bC*bC)/(R*bB*bB+bF*bC*bC))),br=bH*bw*bB/bu+(bn+bm)/2,bq=bH*-bu*bC/bw+(bS+bR)/2,bh=ag.asin(((bS-bq)/bu).toFixed(7)),bg=ag.asin(((bR-bq)/bu).toFixed(7));
bh=bn<br?S-bh:bh;bg=bm<br?S-bg:bg;bh<0&&(bh=S*2+bh);bg<0&&(bg=S*2+bg);if(bd&&bh>bg){bh=bh-S*2
}if(!bd&&bg>bh){bg=bg-S*2}}else{bh=bp[0];bg=bp[1];br=bp[2];bq=bp[3]}var bl=bg-bh;
if(ag.abs(bl)>bt){var bs=bg,bv=bm,bj=bR;bg=bh+bt*(bd&&bg>bh?1:-1);bm=br+bw*ag.cos(bg);
bR=bq+bu*ag.sin(bg);bA=P(bm,bR,bw,bu,bo,0,bd,bv,bj,[bg,bs,br,bq])}bl=bg-bh;var bf=ag.cos(bh),bQ=ag.sin(bh),be=ag.cos(bg),bP=ag.sin(bg),bD=ag.tan(bl/4),bG=4/3*bw*bD,bE=4/3*bu*bD,bN=[bn,bS],bL=[bn+bG*bQ,bS-bE*bf],bK=[bm+bG*bP,bR-bE*be],bI=[bm,bR];
bL[0]=2*bN[0]-bL[0];bL[1]=2*bN[1]-bL[1];if(bp){return[bL,bK,bI][a3](bA)}else{bA=[bL,bK,bI][a3](bA)[aI]()[D](",");
var by=[];for(var bJ=0,bz=bA[n];bJ<bz;bJ++){by[bJ]=bJ%2?bO(bA[bJ-1],bA[bJ],e).y:bO(bA[bJ],bA[bJ+1],e).x
}return by}},U=function(i,e,R,E,bg,bf,be,bd,bh){var S=1-bh;return{x:aW(S,3)*i+aW(S,2)*3*bh*R+S*3*bh*bh*bg+aW(bh,3)*be,y:aW(S,3)*e+aW(S,2)*3*bh*E+S*3*bh*bh*bf+aW(bh,3)*bd}
},aM=ao(function(E,e,S,R,bn,bm,bj,bg){var bl=(bn-2*S+E)-(bj-2*bn+S),bi=2*(S-E)-2*(bn-S),bf=E-S,be=(-bi+ag.sqrt(bi*bi-4*bl*bf))/2/bl,bd=(-bi-ag.sqrt(bi*bi-4*bl*bf))/2/bl,bh=[e,bg],bk=[E,bj],i;
ag.abs(be)>1000000000000&&(be=0.5);ag.abs(bd)>1000000000000&&(bd=0.5);if(be>0&&be<1){i=U(E,e,S,R,bn,bm,bj,bg,be);
bk[f](i.x);bh[f](i.y)}if(bd>0&&bd<1){i=U(E,e,S,R,bn,bm,bj,bg,bd);bk[f](i.x);bh[f](i.y)
}bl=(bm-2*R+e)-(bg-2*bm+R);bi=2*(R-e)-2*(bm-R);bf=e-R;be=(-bi+ag.sqrt(bi*bi-4*bl*bf))/2/bl;
bd=(-bi-ag.sqrt(bi*bi-4*bl*bf))/2/bl;ag.abs(be)>1000000000000&&(be=0.5);ag.abs(bd)>1000000000000&&(bd=0.5);
if(be>0&&be<1){i=U(E,e,S,R,bn,bm,bj,bg,be);bk[f](i.x);bh[f](i.y)}if(bd>0&&bd<1){i=U(E,e,S,R,bn,bm,bj,bg,bd);
bk[f](i.x);bh[f](i.y)}return{min:{x:aS[a8](0,bk),y:aS[a8](0,bh)},max:{x:h[a8](0,bk),y:h[a8](0,bh)}}
}),M=ao(function(bn,bi){var S=u(bn),bj=bi&&u(bi),bk={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},be=function(bo,bp){var i,bq;
if(!bo){return["C",bp.x,bp.y,bp.x,bp.y,bp.x,bp.y]}!(bo[0] in {T:1,Q:1})&&(bp.qx=bp.qy=null);
switch(bo[0]){case"M":bp.X=bo[1];bp.Y=bo[2];break;case"A":bo=["C"][a3](P[a8](0,[bp.x,bp.y][a3](bo.slice(1))));
break;case"S":i=bp.x+(bp.x-(bp.bx||bp.x));bq=bp.y+(bp.y-(bp.by||bp.y));bo=["C",i,bq][a3](bo.slice(1));
break;case"T":bp.qx=bp.x+(bp.x-(bp.qx||bp.x));bp.qy=bp.y+(bp.y-(bp.qy||bp.y));bo=["C"][a3](aU(bp.x,bp.y,bp.qx,bp.qy,bo[1],bo[2]));
break;case"Q":bp.qx=bo[1];bp.qy=bo[2];bo=["C"][a3](aU(bp.x,bp.y,bo[1],bo[2],bo[3],bo[4]));
break;case"L":bo=["C"][a3](a9(bp.x,bp.y,bo[1],bo[2]));break;case"H":bo=["C"][a3](a9(bp.x,bp.y,bo[1],bp.y));
break;case"V":bo=["C"][a3](a9(bp.x,bp.y,bp.x,bo[1]));break;case"Z":bo=["C"][a3](a9(bp.x,bp.y,bp.X,bp.Y));
break}return bo},E=function(bo,bp){if(bo[bp][n]>7){bo[bp].shift();var bq=bo[bp];while(bq[n]){bo.splice(bp++,0,["C"][a3](bq.splice(0,6)))
}bo.splice(bp,1);bl=h(S[n],bj&&bj[n]||0)}},R=function(bs,br,bp,bo,bq){if(bs&&br&&bs[bq][0]=="M"&&br[bq][0]!="M"){br.splice(bq,0,["M",bo.x,bo.y]);
bp.bx=0;bp.by=0;bp.x=bs[bq][1];bp.y=bs[bq][2];bl=h(S[n],bj&&bj[n]||0)}};for(var bg=0,bl=h(S[n],bj&&bj[n]||0);
bg<bl;bg++){S[bg]=be(S[bg],bk);E(S,bg);bj&&(bj[bg]=be(bj[bg],e));bj&&E(bj,bg);R(S,bj,bk,e,bg);
R(bj,S,e,bk,bg);var bf=S[bg],bm=bj&&bj[bg],bd=bf[n],bh=bj&&bm[n];bk.x=bf[bd-2];bk.y=bf[bd-1];
bk.bx=ab(bf[bd-4])||bk.x;bk.by=ab(bf[bd-3])||bk.y;e.bx=bj&&(ab(bm[bh-4])||e.x);e.by=bj&&(ab(bm[bh-3])||e.y);
e.x=bj&&bm[bh-2];e.y=bj&&bm[bh-1]}return bj?[S,bj]:S},null,aE),s=ao(function(bh){var bg=[];
for(var bd=0,bi=bh[n];bd<bi;bd++){var e={},bf=bh[bd].match(/^([^:]*):?([\d\.]*)/);
e.color=av.getRGB(bf[1]);if(e.color.error){return null}e.color=e.color.hex;bf[2]&&(e.offset=bf[2]+"%");
bg[f](e)}for(bd=1,bi=bg[n]-1;bd<bi;bd++){if(!bg[bd].offset){var E=ab(bg[bd-1].offset||0),R=0;
for(var S=bd+1;S<bi;S++){if(bg[S].offset){R=bg[S].offset;break}}if(!R){R=100;S=bi
}R=ab(R);var be=(R-E)/(S-bd+1);for(;bd<S;bd++){E+=be;bg[bd].offset=E+"%"}}}return bg
}),aw=function(e,S,E,R){var i;if(av.is(e,"string")||av.is(e,"object")){i=av.is(e,"string")?Q.getElementById(e):e;
if(i.tagName){if(S==null){return{container:i,width:i.style.pixelWidth||i.offsetWidth,height:i.style.pixelHeight||i.offsetHeight}
}else{return{container:i,width:S,height:E}}}}else{if(av.is(e,ar)&&R!=null){return{container:1,x:e,y:S,width:E,height:R}
}}},aQ=function(e,E){var i=this;for(var R in E){if(E[X](R)&&!(R in e)){switch(typeof E[R]){case"function":(function(S){e[R]=e===i?S:function(){return S[a8](i,arguments)
}})(E[R]);break;case"object":e[R]=e[R]||{};aQ.call(this,e[R],E[R]);break;default:e[R]=E[R];
break}}}},aq=function(e,i){e==i.top&&(i.top=e.prev);e==i.bottom&&(i.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},ad=function(e,i){if(i.top===e){return
}aq(e,i);e.next=null;e.prev=i.top;i.top.next=e;i.top=e},l=function(e,i){if(i.bottom===e){return
}aq(e,i);e.next=i.bottom;e.prev=null;i.bottom.prev=e;i.bottom=e},F=function(i,e,E){aq(i,E);
e==E.top&&(E.top=i);e.next&&(e.next.prev=i);i.next=e.next;i.prev=e;e.next=i},ay=function(i,e,E){aq(i,E);
e==E.bottom&&(E.bottom=i);e.prev&&(e.prev.next=i);i.prev=e.prev;e.prev=i;i.next=e
},v=function(e){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+e+"\u201d of removed object")
}},aA=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(av.svg){a5[ba].svgns="http://www.w3.org/2000/svg";
a5[ba].xlink="http://www.w3.org/1999/xlink";V=function(e){return +e+(~~e===e)*0.5
};var aa=function(bd){for(var E=0,R=bd[n];E<R;E++){if(bc.call(bd[E][0])!="a"){for(var e=1,S=bd[E][n];
e<S;e++){bd[E][e]=V(bd[E][e])}}else{bd[E][6]=V(bd[E][6]);bd[E][7]=V(bd[E][7])}}return bd
},aT=function(E,e){if(e){for(var i in e){if(e[X](i)){E[z](i,e[i]+aB)}}}else{return Q.createElementNS(a5[ba].svgns,E)
}};av[aK]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var t=function(e,R){var i=aT("path");R.canvas&&R.canvas[aV](i);var E=new aG(i,R);
E.type="path";af(E,{fill:"none",stroke:"#000",path:e});return E};var b=function(S,bm,e){var bj="linear",bg=0.5,be=0.5,bo=S.style;
bm=(bm+aB)[a0](aA,function(bq,i,br){bj="radial";if(i&&br){bg=ab(i);be=ab(br);var bp=((be>0.5)*2-1);
aW(bg-0.5,2)+aW(be-0.5,2)>0.25&&(be=ag.sqrt(0.25-aW(bg-0.5,2))*bp+0.5)&&be!=0.5&&(be=be.toFixed(5)-0.00001*bp)
}return aB});bm=bm[D](/\s*\-\s*/);if(bj=="linear"){var bf=bm.shift();bf=-ab(bf);if(isNaN(bf)){return null
}var bd=[0,0,ag.cos(bf*ag.PI/180),ag.sin(bf*ag.PI/180)],bl=1/(h(ag.abs(bd[2]),ag.abs(bd[3]))||1);
bd[2]*=bl;bd[3]*=bl;if(bd[2]<0){bd[0]=-bd[2];bd[2]=0}if(bd[3]<0){bd[1]=-bd[3];bd[3]=0
}}var bi=s(bm);if(!bi){return null}var E=S.getAttribute("fill");E=E.match(/^url\(#(.*)\)$/);
E&&e.defs.removeChild(Q.getElementById(E[1]));var R=aT(bj+"Gradient");R.id="r"+(av._id++)[aK](36);
aT(R,bj=="radial"?{fx:bg,fy:be}:{x1:bd[0],y1:bd[1],x2:bd[2],y2:bd[3]});e.defs[aV](R);
for(var bh=0,bn=bi[n];bh<bn;bh++){var bk=aT("stop");aT(bk,{offset:bi[bh].offset?bi[bh].offset:!bh?"0%":"100%","stop-color":bi[bh].color||"#fff"});
R[aV](bk)}aT(S,{fill:"url(#"+R.id+")",opacity:1,"fill-opacity":1});bo.fill=aB;bo.opacity=1;
bo.fillOpacity=1;return 1};var T=function(i){var e=i.getBBox();aT(i.pattern,{patternTransform:av.format("translate({0},{1})",e.x,e.y)})
};var af=function(bk,bt){var bn={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bp=bk.node,bl=bk.attrs,bh=bk.rotate(),bd=function(bA,bz){bz=bn[bc.call(bz)];
if(bz){var bx=bA.attrs["stroke-width"]||"1",bv={round:bx,square:bx,butt:0}[bA.attrs["stroke-linecap"]||bt["stroke-linecap"]]||0,by=[];
var bw=bz[n];while(bw--){by[bw]=bz[bw]*bx+((bw%2)?1:-1)*bv}aT(bp,{"stroke-dasharray":by[aI](",")})
}};bt[X]("rotation")&&(bh=bt.rotation);var bg=(bh+aB)[D](a);if(!(bg.length-1)){bg=null
}else{bg[1]=+bg[1];bg[2]=+bg[2]}ab(bh)&&bk.rotate(0,true);for(var bo in bt){if(bt[X](bo)){if(!k[X](bo)){continue
}var bm=bt[bo];bl[bo]=bm;switch(bo){case"blur":bk.blur(bm);break;case"rotation":bk.rotate(bm,true);
break;case"href":case"title":case"target":var br=bp.parentNode;if(bc.call(br.tagName)!="a"){var R=aT("a");
br.insertBefore(R,bp);R[aV](bp);br=R}br.setAttributeNS(bk.paper.xlink,bo,bm);break;
case"cursor":bp.style.cursor=bm;break;case"clip-rect":var i=(bm+aB)[D](a);if(i[n]==4){bk.clip&&bk.clip.parentNode.parentNode.removeChild(bk.clip.parentNode);
var E=aT("clipPath"),bq=aT("rect");E.id="r"+(av._id++)[aK](36);aT(bq,{x:i[0],y:i[1],width:i[2],height:i[3]});
E[aV](bq);bk.paper.defs[aV](E);aT(bp,{"clip-path":"url(#"+E.id+")"});bk.clip=bq}if(!bm){var bs=Q.getElementById(bp.getAttribute("clip-path")[a0](/(^url\(#|\)$)/g,aB));
bs&&bs.parentNode.removeChild(bs);aT(bp,{"clip-path":aB});delete bk.clip}break;case"path":if(bk.type=="path"){aT(bp,{d:bm?bl.path=aa(u(bm)):"M0,0"})
}break;case"width":bp[z](bo,bm);if(bl.fx){bo="x";bm=bl.x}else{break}case"x":if(bl.fx){bm=-bl.x-(bl.width||0)
}case"rx":if(bo=="rx"&&bk.type=="rect"){break}case"cx":bg&&(bo=="x"||bo=="cx")&&(bg[1]+=bm-bl[bo]);
bp[z](bo,V(bm));bk.pattern&&T(bk);break;case"height":bp[z](bo,bm);if(bl.fy){bo="y";
bm=bl.y}else{break}case"y":if(bl.fy){bm=-bl.y-(bl.height||0)}case"ry":if(bo=="ry"&&bk.type=="rect"){break
}case"cy":bg&&(bo=="y"||bo=="cy")&&(bg[2]+=bm-bl[bo]);bp[z](bo,V(bm));bk.pattern&&T(bk);
break;case"r":if(bk.type=="rect"){aT(bp,{rx:bm,ry:bm})}else{bp[z](bo,bm)}break;case"src":if(bk.type=="image"){bp.setAttributeNS(bk.paper.xlink,"href",bm)
}break;case"stroke-width":bp.style.strokeWidth=bm;bp[z](bo,bm);if(bl["stroke-dasharray"]){bd(bk,bl["stroke-dasharray"])
}break;case"stroke-dasharray":bd(bk,bm);break;case"translation":var be=(bm+aB)[D](a);
be[0]=+be[0]||0;be[1]=+be[1]||0;if(bg){bg[1]+=be[0];bg[2]+=be[1]}w.call(bk,be[0],be[1]);
break;case"scale":be=(bm+aB)[D](a);bk.scale(+be[0]||1,+be[1]||+be[0]||1,isNaN(ab(be[2]))?null:+be[2],isNaN(ab(be[3]))?null:+be[3]);
break;case"fill":var S=(bm+aB).match(c);if(S){E=aT("pattern");var bj=aT("image");
E.id="r"+(av._id++)[aK](36);aT(E,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});
aT(bj,{x:0,y:0});bj.setAttributeNS(bk.paper.xlink,"href",S[1]);E[aV](bj);var bu=Q.createElement("img");
bu.style.cssText="position:absolute;left:-9999em;top-9999em";bu.onload=function(){aT(E,{width:this.offsetWidth,height:this.offsetHeight});
aT(bj,{width:this.offsetWidth,height:this.offsetHeight});Q.body.removeChild(this);
bk.paper.safari()};Q.body[aV](bu);bu.src=S[1];bk.paper.defs[aV](E);bp.style.fill="url(#"+E.id+")";
aT(bp,{fill:"url(#"+E.id+")"});bk.pattern=E;bk.pattern&&T(bk);break}if(!av.getRGB(bm).error){delete bt.gradient;
delete bl.gradient;!av.is(bl.opacity,"undefined")&&av.is(bt.opacity,"undefined")&&aT(bp,{opacity:bl.opacity});
!av.is(bl["fill-opacity"],"undefined")&&av.is(bt["fill-opacity"],"undefined")&&aT(bp,{"fill-opacity":bl["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[X](bk.type)||(bm+aB).charAt()!="r")&&b(bp,bm,bk.paper)){bl.gradient=bm;
bl.fill="none";break}}case"stroke":bp[z](bo,av.getRGB(bm).hex);break;case"gradient":(({circle:1,ellipse:1})[X](bk.type)||(bm+aB).charAt()!="r")&&b(bp,bm,bk.paper);
break;case"opacity":case"fill-opacity":if(bl.gradient){var e=Q.getElementById(bp.getAttribute("fill")[a0](/^url\(#|\)$/g,aB));
if(e){var bf=e.getElementsByTagName("stop");bf[bf[n]-1][z]("stop-opacity",bm)}break
}default:bo=="font-size"&&(bm=L(bm,10)+"px");var bi=bo[a0](/(\-.)/g,function(bv){return aY.call(bv.substring(1))
});bp.style[bi]=bm;bp[z](bo,bm);break}}}J(bk,bt);if(bg){bk.rotate(bg.join(au))}else{ab(bh)&&bk.rotate(bh,true)
}};var j=1.2,J=function(e,S){if(e.type!="text"||!(S[X]("text")||S[X]("font")||S[X]("font-size")||S[X]("x")||S[X]("y"))){return
}var bh=e.attrs,E=e.node,bj=E.firstChild?L(Q.defaultView.getComputedStyle(E.firstChild,aB).getPropertyValue("font-size"),10):10;
if(S[X]("text")){bh.text=S.text;while(E.firstChild){E.removeChild(E.firstChild)}var R=(S.text+aB)[D]("\n");
for(var bd=0,bi=R[n];bd<bi;bd++){if(R[bd]){var bf=aT("tspan");bd&&aT(bf,{dy:bj*j,x:bh.x});
bf[aV](Q.createTextNode(R[bd]));E[aV](bf)}}}else{R=E.getElementsByTagName("tspan");
for(bd=0,bi=R[n];bd<bi;bd++){bd&&aT(R[bd],{dy:bj*j,x:bh.x})}}aT(E,{y:bh.y});var be=e.getBBox(),bg=bh.y-(be.y+be.height/2);
bg&&isFinite(bg)&&aT(E,{y:bh.y+bg})},aG=function(i,e){var R=0,E=0;this[0]=i;this.id=av._oid++;
this.node=i;i.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aG[ba].rotate=function(i,e,R){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aI](au)
}return this._.rt.deg}var E=this.getBBox();i=(i+aB)[D](a);if(i[n]-1){e=ab(i[1]);R=ab(i[2])
}i=ab(i[0]);if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}(R==null)&&(e=null);
this._.rt.cx=e;this._.rt.cy=R;e=e==null?E.x+E.width/2:e;R=R==null?E.y+E.height/2:R;
if(this._.rt.deg){this.transformations[0]=av.format("rotate({0} {1} {2})",this._.rt.deg,e,R);
this.clip&&aT(this.clip,{transform:av.format("rotate({0} {1} {2})",-this._.rt.deg,e,R)})
}else{this.transformations[0]=aB;this.clip&&aT(this.clip,{transform:aB})}aT(this.node,{transform:this.transformations[aI](au)});
return this};aG[ba].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aG[ba].show=function(){!this.removed&&(this.node.style.display="");return this
};aG[ba].remove=function(){if(this.removed){return}aq(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var e in this){delete this[e]}this.removed=true};aG[ba].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return Z(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var R=true}var bf={};try{bf=this.node.getBBox()}catch(bd){}finally{bf=bf||{}}if(this.type=="text"){bf={x:bf.x,y:Infinity,width:0,height:0};
for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var be=this.node.getExtentOfChar(E);
(be.y<bf.y)&&(bf.y=be.y);(be.y+be.height-bf.y>bf.height)&&(bf.height=be.y+be.height-bf.y);
(be.x+be.width-bf.x>bf.width)&&(bf.width=be.x+be.width-bf.x)}}R&&this.hide();return bf
};aG[ba].attr=function(R,bf){if(this.removed){return this}if(R==null){var bd={};for(var S in this.attrs){if(this.attrs[X](S)){bd[S]=this.attrs[S]
}}this._.rt.deg&&(bd.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(bd.scale=this.scale());
bd.gradient&&bd.fill=="none"&&(bd.fill=bd.gradient)&&delete bd.gradient;return bd
}if(bf==null&&av.is(R,"string")){if(R=="translation"){return w.call(this)}if(R=="rotation"){return this.rotate()
}if(R=="scale"){return this.scale()}if(R=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[R]}if(bf==null&&av.is(R,"array")){var e={};for(var E=0,be=R.length;
E<be;E++){e[R[E]]=this.attr(R[E])}return e}if(bf!=null){var bg={};bg[R]=bf;af(this,bg)
}else{if(R!=null&&av.is(R,"object")){af(this,R)}}return this};aG[ba].toFront=function(){if(this.removed){return this
}this.node.parentNode[aV](this.node);var e=this.paper;e.top!=this&&ad(this,e);return this
};aG[ba].toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
l(this,this.paper);var e=this.paper}return this};aG[ba].insertAfter=function(e){if(this.removed){return this
}var i=e.node;if(i.nextSibling){i.parentNode.insertBefore(this.node,i.nextSibling)
}else{i.parentNode[aV](this.node)}F(this,e,this.paper);return this};aG[ba].insertBefore=function(e){if(this.removed){return this
}var i=e.node;i.parentNode.insertBefore(this.node,i);ay(this,e,this.paper);return this
};aG[ba].blur=function(i){var e=this;if(+i!==0){var E=aT("filter"),R=aT("feGaussianBlur");
e.attrs.blur=i;E.id="r"+(av._id++)[aK](36);aT(R,{stdDeviation:+i||1.5});E.appendChild(R);
e.paper.defs.appendChild(E);e._blur=E;aT(e.node,{filter:"url(#"+E.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var W=function(i,e,bd,S){e=V(e);
bd=V(bd);var R=aT("circle");i.canvas&&i.canvas[aV](R);var E=new aG(R,i);E.attrs={cx:e,cy:bd,r:S,fill:"none",stroke:"#000"};
E.type="circle";aT(R,E.attrs);return E};var aP=function(E,e,bf,i,bd,be){e=V(e);bf=V(bf);
var S=aT("rect");E.canvas&&E.canvas[aV](S);var R=new aG(S,E);R.attrs={x:e,y:bf,width:i,height:bd,r:be||0,rx:be||0,ry:be||0,fill:"none",stroke:"#000"};
R.type="rect";aT(S,R.attrs);return R};var an=function(i,e,be,bd,S){e=V(e);be=V(be);
var R=aT("ellipse");i.canvas&&i.canvas[aV](R);var E=new aG(R,i);E.attrs={cx:e,cy:be,rx:bd,ry:S,fill:"none",stroke:"#000"};
E.type="ellipse";aT(R,E.attrs);return E};var q=function(E,be,e,bf,i,bd){var S=aT("image");
aT(S,{x:e,y:bf,width:i,height:bd,preserveAspectRatio:"none"});S.setAttributeNS(E.xlink,"href",be);
E.canvas&&E.canvas[aV](S);var R=new aG(S,E);R.attrs={x:e,y:bf,width:i,height:bd,src:be};
R.type="image";return R};var ac=function(i,e,bd,S){var R=aT("text");aT(R,{x:e,y:bd,"text-anchor":"middle"});
i.canvas&&i.canvas[aV](R);var E=new aG(R,i);E.attrs={x:e,y:bd,"text-anchor":"middle",text:S,font:k.font,stroke:"none",fill:"#000"};
E.type="text";af(E,E.attrs);return E};var a7=function(i,e){this.width=i||this.width;
this.height=e||this.height;this.canvas[z]("width",this.width);this.canvas[z]("height",this.height);
return this};var A=function(){var R=aw[a8](0,arguments),E=R&&R.container,i=R.x,be=R.y,S=R.width,e=R.height;
if(!E){throw new Error("SVG container not found.")}var bd=aT("svg");S=S||512;e=e||342;
aT(bd,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:S,height:e});if(E==1){bd.style.cssText="position:absolute;left:"+i+"px;top:"+be+"px";
Q.body[aV](bd)}else{if(E.firstChild){E.insertBefore(bd,E.firstChild)}else{E[aV](bd)
}}E=new a5;E.width=S;E.height=e;E.canvas=bd;aQ.call(E,E,av.fn);E.clear();return E
};a5[ba].clear=function(){var e=this.canvas;while(e.firstChild){e.removeChild(e.firstChild)
}this.bottom=this.top=null;(this.desc=aT("desc"))[aV](Q.createTextNode("Created with Rapha\xebl"));
e[aV](this.desc);e[aV](this.defs=aT("defs"))};a5[ba].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=v(e)}}}if(av.vml){var I={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},az=/([clmz]),?([^clmz]*)/gi,bb=/-?[^,\s-]+/g,aJ=1000+au+1000,p=10,aR=function(bj){var bg=/[ahqstv]/ig,R=u;
(bj+aB).match(bg)&&(R=M);bg=/[clmz]/g;if(R==u&&!(bj+aB).match(bg)){var bf=(bj+aB)[a0](az,function(bm,bo,bk){var bn=[],i=bc.call(bo)=="m",bl=I[bo];
bk[a0](bb,function(bp){if(i&&bn[n]==2){bl+=bn+I[bo=="m"?"l":"L"];bn=[]}bn[f](V(bp*p))
});return bl+bn});return bf}var bh=R(bj),E,e;bf=[];for(var bd=0,bi=bh[n];bd<bi;bd++){E=bh[bd];
e=bc.call(bh[bd][0]);e=="z"&&(e="x");for(var S=1,be=E[n];S<be;S++){e+=V(E[S]*p)+(S!=be-1?",":aB)
}bf[f](e)}return bf[aI](au)};av[aK]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};t=function(E,i){var bd=am("group");bd.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
bd.coordsize=i.coordsize;bd.coordorigin=i.coordorigin;var S=am("shape"),R=S.style;
R.width=i.width+"px";R.height=i.height+"px";S.coordsize=aJ;S.coordorigin=i.coordorigin;
bd[aV](S);var be=new aG(S,bd,i),e={fill:"none",stroke:"#000"};E&&(e.path=E);be.isAbsolute=true;
be.type="path";be.path=[];be.Path=aB;af(be,e);i.canvas[aV](bd);return be};af=function(bh,bm){bh.attrs=bh.attrs||{};
var bk=bh.node,bn=bh.attrs,be=bk.style,R,br=bh;for(var bf in bm){if(bm[X](bf)){bn[bf]=bm[bf]
}}bm.href&&(bk.href=bm.href);bm.title&&(bk.title=bm.title);bm.target&&(bk.target=bm.target);
bm.cursor&&(be.cursor=bm.cursor);"blur" in bm&&bh.blur(bm.blur);if(bm.path&&bh.type=="path"){bn.path=bm.path;
bk.path=aR(bn.path)}if(bm.rotation!=null){bh.rotate(bm.rotation,true)}if(bm.translation){R=(bm.translation+aB)[D](a);
w.call(bh,R[0],R[1]);if(bh._.rt.cx!=null){bh._.rt.cx+=+R[0];bh._.rt.cy+=+R[1];bh.setBox(bh.attrs,R[0],R[1])
}}if(bm.scale){R=(bm.scale+aB)[D](a);bh.scale(+R[0]||1,+R[1]||+R[0]||1,+R[2]||null,+R[3]||null)
}if("clip-rect" in bm){var e=(bm["clip-rect"]+aB)[D](a);if(e[n]==4){e[2]=+e[2]+(+e[0]);
e[3]=+e[3]+(+e[1]);var bg=bk.clipRect||Q.createElement("div"),bq=bg.style,bd=bk.parentNode;
bq.clip=av.format("rect({1}px {2}px {3}px {0}px)",e);if(!bk.clipRect){bq.position="absolute";
bq.top=0;bq.left=0;bq.width=bh.paper.width+"px";bq.height=bh.paper.height+"px";bd.parentNode.insertBefore(bg,bd);
bg[aV](bd);bk.clipRect=bg}}if(!bm["clip-rect"]){bk.clipRect&&(bk.clipRect.style.clip=aB)
}}if(bh.type=="image"&&bm.src){bk.src=bm.src}if(bh.type=="image"&&bm.opacity){bk.filterOpacity=" progid:DXImageTransform.Microsoft.Alpha(opacity="+(bm.opacity*100)+")";
be.filter=(bk.filterMatrix||aB)+(bk.filterOpacity||aB)}bm.font&&(be.font=bm.font);
bm["font-family"]&&(be.fontFamily='"'+bm["font-family"][D](",")[0][a0](/^['"]+|['"]+$/g,aB)+'"');
bm["font-size"]&&(be.fontSize=bm["font-size"]);bm["font-weight"]&&(be.fontWeight=bm["font-weight"]);
bm["font-style"]&&(be.fontStyle=bm["font-style"]);if(bm.opacity!=null||bm["stroke-width"]!=null||bm.fill!=null||bm.stroke!=null||bm["stroke-width"]!=null||bm["stroke-opacity"]!=null||bm["fill-opacity"]!=null||bm["stroke-dasharray"]!=null||bm["stroke-miterlimit"]!=null||bm["stroke-linejoin"]!=null||bm["stroke-linecap"]!=null){bk=bh.shape||bk;
var bl=(bk.getElementsByTagName("fill")&&bk.getElementsByTagName("fill")[0]),bo=false;
!bl&&(bo=bl=am("fill"));if("fill-opacity" in bm||"opacity" in bm){var i=((+bn["fill-opacity"]+1||2)-1)*((+bn.opacity+1||2)-1);
i<0&&(i=0);i>1&&(i=1);bl.opacity=i}bm.fill&&(bl.on=true);if(bl.on==null||bm.fill=="none"){bl.on=false
}if(bl.on&&bm.fill){var E=bm.fill.match(c);if(E){bl.src=E[1];bl.type="tile"}else{bl.color=av.getRGB(bm.fill).hex;
bl.src=aB;bl.type="solid";if(av.getRGB(bm.fill).error&&(br.type in {circle:1,ellipse:1}||(bm.fill+aB).charAt()!="r")&&b(br,bm.fill)){bn.fill="none";
bn.gradient=bm.fill}}}bo&&bk[aV](bl);var S=(bk.getElementsByTagName("stroke")&&bk.getElementsByTagName("stroke")[0]),bp=false;
!S&&(bp=S=am("stroke"));if((bm.stroke&&bm.stroke!="none")||bm["stroke-width"]||bm["stroke-opacity"]!=null||bm["stroke-dasharray"]||bm["stroke-miterlimit"]||bm["stroke-linejoin"]||bm["stroke-linecap"]){S.on=true
}(bm.stroke=="none"||S.on==null||bm.stroke==0||bm["stroke-width"]==0)&&(S.on=false);
S.on&&bm.stroke&&(S.color=av.getRGB(bm.stroke).hex);i=((+bn["stroke-opacity"]+1||2)-1)*((+bn.opacity+1||2)-1);
var bi=(ab(bm["stroke-width"])||1)*0.75;i<0&&(i=0);i>1&&(i=1);bm["stroke-width"]==null&&(bi=bn["stroke-width"]);
bm["stroke-width"]&&(S.weight=bi);bi&&bi<1&&(i*=bi)&&(S.weight=1);S.opacity=i;bm["stroke-linejoin"]&&(S.joinstyle=bm["stroke-linejoin"]||"miter");
S.miterlimit=bm["stroke-miterlimit"]||8;bm["stroke-linecap"]&&(S.endcap=bm["stroke-linecap"]=="butt"?"flat":bm["stroke-linecap"]=="square"?"square":"round");
if(bm["stroke-dasharray"]){var bj={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
S.dashstyle=bj[X](bm["stroke-dasharray"])?bj[bm["stroke-dasharray"]]:aB}bp&&bk[aV](S)
}if(br.type=="text"){be=br.paper.span.style;bn.font&&(be.font=bn.font);bn["font-family"]&&(be.fontFamily=bn["font-family"]);
bn["font-size"]&&(be.fontSize=bn["font-size"]);bn["font-weight"]&&(be.fontWeight=bn["font-weight"]);
bn["font-style"]&&(be.fontStyle=bn["font-style"]);br.node.string&&(br.paper.span.innerHTML=(br.node.string+aB)[a0](/</g,"&#60;")[a0](/&/g,"&#38;")[a0](/\n/g,"<br>"));
br.W=bn.w=br.paper.span.offsetWidth;br.H=bn.h=br.paper.span.offsetHeight;br.X=bn.x;
br.Y=bn.y+V(br.H/2);switch(bn["text-anchor"]){case"start":br.node.style["v-text-align"]="left";
br.bbx=V(br.W/2);break;case"end":br.node.style["v-text-align"]="right";br.bbx=-V(br.W/2);
break;default:br.node.style["v-text-align"]="center";break}}};b=function(e,bf){e.attrs=e.attrs||{};
var bg=e.attrs,bi=e.node.getElementsByTagName("fill"),bd="linear",be=".5 .5";e.attrs.gradient=bf;
bf=(bf+aB)[a0](aA,function(bk,bl,i){bd="radial";if(bl&&i){bl=ab(bl);i=ab(i);aW(bl-0.5,2)+aW(i-0.5,2)>0.25&&(i=ag.sqrt(0.25-aW(bl-0.5,2))*((i>0.5)*2-1)+0.5);
be=bl+au+i}return aB});bf=bf[D](/\s*\-\s*/);if(bd=="linear"){var E=bf.shift();E=-ab(E);
if(isNaN(E)){return null}}var S=s(bf);if(!S){return null}e=e.shape||e.node;bi=bi[0]||am("fill");
if(S[n]){bi.on=true;bi.method="none";bi.type=(bd=="radial")?"gradientradial":"gradient";
bi.color=S[0].color;bi.color2=S[S[n]-1].color;var bj=[];for(var R=0,bh=S[n];R<bh;
R++){S[R].offset&&bj[f](S[R].offset+au+S[R].color)}bi.colors&&(bi.colors.value=bj[n]?bj[aI](","):"0% "+bi.color);
if(bd=="radial"){bi.focus="100%";bi.focussize=be;bi.focusposition=be}else{bi.angle=(270-E)%360
}}return 1};aG=function(S,be,e){var bd=0,E=0,i=0,R=1;this[0]=S;this.id=av._oid++;
this.node=S;S.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=be;this.paper=e;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aG[ba].rotate=function(i,e,E){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aI](au)
}return this._.rt.deg}i=(i+aB)[D](a);if(i[n]-1){e=ab(i[1]);E=ab(i[2])}i=ab(i[0]);
if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}E==null&&(e=null);this._.rt.cx=e;
this._.rt.cy=E;this.setBox(this.attrs,e,E);this.Group.style.rotation=this._.rt.deg;
return this};aG[ba].setBox=function(bq,E,e){if(this.removed){return this}var bk=this.Group.style,S=(this.shape&&this.shape.style)||this.node.style;
bq=bq||{};for(var bo in bq){if(bq[X](bo)){this.attrs[bo]=bq[bo]}}E=E||this._.rt.cx;
e=e||this._.rt.cy;var bm=this.attrs,bf,be,bg,bp;switch(this.type){case"circle":bf=bm.cx-bm.r;
be=bm.cy-bm.r;bg=bp=bm.r*2;break;case"ellipse":bf=bm.cx-bm.rx;be=bm.cy-bm.ry;bg=bm.rx*2;
bp=bm.ry*2;break;case"rect":case"image":bf=+bm.x;be=+bm.y;bg=bm.width||0;bp=bm.height||0;
break;case"text":this.textpath.v=["m",V(bm.x),", ",V(bm.y-2),"l",V(bm.x)+1,", ",V(bm.y-2)][aI](aB);
bf=bm.x-V(this.W/2);be=bm.y-this.H/2;bg=this.W;bp=this.H;break;case"path":if(!this.attrs.path){bf=0;
be=0;bg=this.paper.width;bp=this.paper.height}else{var bn=Z(this.attrs.path);bf=bn.x;
be=bn.y;bg=bn.width;bp=bn.height}break;default:bf=0;be=0;bg=this.paper.width;bp=this.paper.height;
break}E=(E==null)?bf+bg/2:E;e=(e==null)?be+bp/2:e;var R=E-this.paper.width/2,bj=e-this.paper.height/2,bi;
bk.left!=(bi=R+"px")&&(bk.left=bi);bk.top!=(bi=bj+"px")&&(bk.top=bi);this.X=this.type=="path"?-R:bf;
this.Y=this.type=="path"?-bj:be;this.W=bg;this.H=bp;if(this.type=="path"){S.left!=(bi=-R*p+"px")&&(S.left=bi);
S.top!=(bi=-bj*p+"px")&&(S.top=bi)}else{if(this.type=="text"){S.left!=(bi=-R+"px")&&(S.left=bi);
S.top!=(bi=-bj+"px")&&(S.top=bi)}else{bk.width!=(bi=this.paper.width+"px")&&(bk.width=bi);
bk.height!=(bi=this.paper.height+"px")&&(bk.height=bi);S.left!=(bi=bf-R+"px")&&(S.left=bi);
S.top!=(bi=be-bj+"px")&&(S.top=bi);S.width!=(bi=bg+"px")&&(S.width=bi);S.height!=(bi=bp+"px")&&(S.height=bi);
var bd=(+bq.r||0)/aS(bg,bp);if(this.type=="rect"&&this.arcsize.toFixed(4)!=bd.toFixed(4)&&(bd||this.arcsize)){var bl=am("roundrect"),br={},bh=this.events&&this.events[n];
bo=0;bl.arcsize=bd;bl.raphael=this;this.Group[aV](bl);this.Group.removeChild(this.node);
this[0]=this.node=bl;this.arcsize=bd;for(bo in bm){br[bo]=bm[bo]}delete br.scale;
this.attr(br);if(this.events){for(;bo<bh;bo++){this.events[bo].unbind=aj(this.node,this.events[bo].name,this.events[bo].f,this)
}}}}}};aG[ba].hide=function(){!this.removed&&(this.Group.style.display="none");return this
};aG[ba].show=function(){!this.removed&&(this.Group.style.display="block");return this
};aG[ba].getBBox=function(){if(this.removed){return this}if(this.type=="path"){return Z(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};aG[ba].remove=function(){if(this.removed){return
}aq(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e]
}this.removed=true};aG[ba].attr=function(E,be){if(this.removed){return this}if(E==null){var S={};
for(var R in this.attrs){if(this.attrs[X](R)){S[R]=this.attrs[R]}}this._.rt.deg&&(S.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(S.scale=this.scale());S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;
return S}if(be==null&&av.is(E,"string")){if(E=="translation"){return w.call(this)
}if(E=="rotation"){return this.rotate()}if(E=="scale"){return this.scale()}if(E=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[E]}if(this.attrs&&be==null&&av.is(E,"array")){var bd,e={};for(R=0,bd=E[n];
R<bd;R++){e[E[R]]=this.attr(E[R])}return e}var bf;if(be!=null){bf={};bf[E]=be}be==null&&av.is(E,"object")&&(bf=E);
if(bf){if(bf.text&&this.type=="text"){this.node.string=bf.text}af(this,bf);if(bf.gradient&&(({circle:1,ellipse:1})[X](this.type)||(bf.gradient+aB).charAt()!="r")){b(this,bf.gradient)
}(this.type!="path"||this._.rt.deg)&&this.setBox(this.attrs)}return this};aG[ba].toFront=function(){!this.removed&&this.Group.parentNode[aV](this.Group);
this.paper.top!=this&&ad(this,this.paper);return this};aG[ba].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
l(this,this.paper)}return this};aG[ba].insertAfter=function(e){if(this.removed){return this
}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling)
}else{e.Group.parentNode[aV](this.Group)}F(this,e,this.paper);return this};aG[ba].insertBefore=function(e){if(this.removed){return this
}e.Group.parentNode.insertBefore(this.Group,e.Group);ay(this,e,this.paper);return this
};var a4=/ progid:\S+Blur\([^\)]+\)/g;aG[ba].blur=function(e){var i=this.node.style,E=i.filter;
E=E.replace(a4,"");if(+e!==0){this.attrs.blur=e;i.filter=E+" progid:DXImageTransform.Microsoft.Blur(pixelradius="+(+e||1.5)+")";
i.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+e||1.5))}else{i.filter=E;
i.margin=0;delete this.attrs.blur}};W=function(i,e,bf,bd){var S=am("group"),be=am("oval"),E=be.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aJ;S.coordorigin=i.coordorigin;S[aV](be);var R=new aG(be,S,i);R.type="circle";
af(R,{stroke:"#000",fill:"none"});R.attrs.cx=e;R.attrs.cy=bf;R.attrs.r=bd;R.setBox({x:e-bd,y:bf-bd,width:bd*2,height:bd*2});
i.canvas[aV](S);return R};aP=function(i,bf,be,bg,R,e){var S=am("group"),E=am("roundrect"),bh=(+e||0)/(aS(bg,R));
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aJ;S.coordorigin=i.coordorigin;S[aV](E);E.arcsize=bh;var bd=new aG(E,S,i);
bd.type="rect";af(bd,{stroke:"#000"});bd.arcsize=bh;bd.setBox({x:bf,y:be,width:bg,height:R,r:e});
i.canvas[aV](S);return bd};an=function(e,bg,bf,E,i){var S=am("group"),R=am("oval"),be=R.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
S.coordsize=aJ;S.coordorigin=e.coordorigin;S[aV](R);var bd=new aG(R,S,e);bd.type="ellipse";
af(bd,{stroke:"#000"});bd.attrs.cx=bg;bd.attrs.cy=bf;bd.attrs.rx=E;bd.attrs.ry=i;
bd.setBox({x:bg-E,y:bf-i,width:E*2,height:i*2});e.canvas[aV](S);return bd};q=function(i,e,bg,bf,bh,R){var S=am("group"),E=am("image"),be=E.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aJ;S.coordorigin=i.coordorigin;E.src=e;S[aV](E);var bd=new aG(E,S,i);
bd.type="image";bd.attrs.src=e;bd.attrs.x=bg;bd.attrs.y=bf;bd.attrs.w=bh;bd.attrs.h=R;
bd.setBox({x:bg,y:bf,width:bh,height:R});i.canvas[aV](S);return bd};ac=function(i,bg,bf,bh){var S=am("group"),R=am("shape"),be=R.style,bi=am("path"),e=bi.style,E=am("textpath");
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aJ;S.coordorigin=i.coordorigin;bi.v=av.format("m{0},{1}l{2},{1}",V(bg*10),V(bf*10),V(bg*10)+1);
bi.textpathok=true;be.width=i.width;be.height=i.height;E.string=bh+aB;E.on=true;R[aV](E);
R[aV](bi);S[aV](R);var bd=new aG(E,S,i);bd.shape=R;bd.textpath=bi;bd.type="text";
bd.attrs.text=bh;bd.attrs.x=bg;bd.attrs.y=bf;bd.attrs.w=1;bd.attrs.h=1;af(bd,{font:k.font,stroke:"none",fill:"#000"});
bd.setBox();i.canvas[aV](S);return bd};a7=function(E,e){var i=this.canvas.style;E==+E&&(E+="px");
e==+e&&(e+="px");i.width=E;i.height=e;i.clip="rect(0 "+E+" "+e+" 0)";return this};
var am;Q.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!Q.namespaces.rvml&&Q.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
am=function(e){return Q.createElement("<rvml:"+e+' class="rvml">')}}catch(ak){am=function(e){return Q.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}A=function(){var E=aw[a8](0,arguments),e=E.container,bg=E.height,bh,i=E.width,bf=E.x,be=E.y;
if(!e){throw new Error("VML container not found.")}var S=new a5,bd=S.canvas=Q.createElement("div"),R=bd.style;
i=i||512;bg=bg||342;i==+i&&(i+="px");bg==+bg&&(bg+="px");S.width=1000;S.height=1000;
S.coordsize=p*1000+au+p*1000;S.coordorigin="0 0";S.span=Q.createElement("span");S.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
bd[aV](S.span);R.cssText=av.format("width:{0};height:{1};position:absolute;clip:rect(0 {0} {1} 0);overflow:hidden",i,bg);
if(e==1){Q.body[aV](bd);R.left=bf+"px";R.top=be+"px"}else{e.style.width=i;e.style.height=bg;
if(e.firstChild){e.insertBefore(bd,e.firstChild)}else{e[aV](bd)}}aQ.call(S,S,av.fn);
return S};a5[ba].clear=function(){this.canvas.innerHTML=aB;this.span=Q.createElement("span");
this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[aV](this.span);this.bottom=this.top=null};a5[ba].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=v(e)}return true}}if((/^Apple|^Google/).test(aC.navigator.vendor)&&!(aC.navigator.userAgent.indexOf("Version/4.0")+1)){a5[ba].safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);
aC.setTimeout(function(){e.remove()})}}else{a5[ba].safari=function(){}}var aj=(function(){if(Q.addEventListener){return function(S,E,i,e){var R=function(bd){return i.call(e,bd)
};S.addEventListener(E,R,false);return function(){S.removeEventListener(E,R,false);
return true}}}else{if(Q.attachEvent){return function(bd,R,E,i){var S=function(be){return E.call(i,be||aC.event)
};bd.attachEvent("on"+R,S);var e=function(){bd.detachEvent("on"+R,S);return true};
return e}}}})();for(var ah=K[n];ah--;){(function(e){aG[ba][e]=function(i){if(av.is(i,"function")){this.events=this.events||[];
this.events.push({name:e,f:i,unbind:aj(this.shape||this.node,e,i,this)})}return this
};aG[ba]["un"+e]=function(R){var E=this.events,i=E[n];while(i--){if(E[i].name==e&&E[i].f==R){E[i].unbind();
E.splice(i,1);!E.length&&delete this.events;return this}}return this}})(K[ah])}aG[ba].hover=function(i,e){return this.mouseover(i).mouseout(e)
};aG[ba].unhover=function(i,e){return this.unmouseover(i).unmouseout(e)};a5[ba].circle=function(e,E,i){return W(this,e||0,E||0,i||0)
};a5[ba].rect=function(e,S,i,E,R){return aP(this,e||0,S||0,i||0,E||0,R||0)};a5[ba].ellipse=function(e,R,E,i){return an(this,e||0,R||0,E||0,i||0)
};a5[ba].path=function(e){e&&!av.is(e,"string")&&!av.is(e[0],"array")&&(e+=aB);return t(av.format[a8](av,arguments),this)
};a5[ba].image=function(R,e,S,i,E){return q(this,R||"about:blank",e||0,S||0,i||0,E||0)
};a5[ba].text=function(e,E,i){return ac(this,e||0,E||0,i||aB)};a5[ba].set=function(e){arguments[n]>1&&(e=Array[ba].splice.call(arguments,0,arguments[n]));
return new Y(e)};a5[ba].setSize=a7;a5[ba].top=a5[ba].bottom=null;a5[ba].raphael=av;
function y(){return this.x+au+this.y}aG[ba].scale=function(bk,bj,R,E){if(bk==null&&bj==null){return{x:this._.sx,y:this._.sy,toString:y}
}bj=bj||bk;!+bj&&(bj=bk);var bo,bm,bn,bl,bA=this.attrs;if(bk!=0){var bi=this.getBBox(),bf=bi.x+bi.width/2,S=bi.y+bi.height/2,bz=bk/this._.sx,by=bj/this._.sy;
R=(+R||R==0)?R:bf;E=(+E||E==0)?E:S;var bh=~~(bk/ag.abs(bk)),be=~~(bj/ag.abs(bj)),br=this.node.style,bC=R+(bf-R)*bz,bB=E+(S-E)*by;
switch(this.type){case"rect":case"image":var bg=bA.width*bh*bz,bq=bA.height*be*by;
this.attr({height:bq,r:bA.r*aS(bh*bz,be*by),width:bg,x:bC-bg/2,y:bB-bq/2});break;
case"circle":case"ellipse":this.attr({rx:bA.rx*bh*bz,ry:bA.ry*be*by,r:bA.r*aS(bh*bz,be*by),cx:bC,cy:bB});
break;case"path":var bt=ai(bA.path),bu=true;for(var bw=0,bp=bt[n];bw<bp;bw++){var bs=bt[bw],bd=aY.call(bs[0]);
if(bd=="M"&&bu){continue}else{bu=false}if(bd=="A"){bs[bt[bw][n]-2]*=bz;bs[bt[bw][n]-1]*=by;
bs[1]*=bh*bz;bs[2]*=be*by;bs[5]=+!(bh+be?!+bs[5]:+bs[5])}else{if(bd=="H"){for(var bv=1,bx=bs[n];
bv<bx;bv++){bs[bv]*=bz}}else{if(bd=="V"){for(bv=1,bx=bs[n];bv<bx;bv++){bs[bv]*=by
}}else{for(bv=1,bx=bs[n];bv<bx;bv++){bs[bv]*=(bv%2)?bz:by}}}}}var e=Z(bt);bo=bC-e.x-e.width/2;
bm=bB-e.y-e.height/2;bt[0][1]+=bo;bt[0][2]+=bm;this.attr({path:bt});break}if(this.type in {text:1,image:1}&&(bh!=1||be!=1)){if(this.transformations){this.transformations[2]="scale("[a3](bh,",",be,")");
this.node[z]("transform",this.transformations[aI](au));bo=(bh==-1)?-bA.x-(bg||0):bA.x;
bm=(be==-1)?-bA.y-(bq||0):bA.y;this.attr({x:bo,y:bm});bA.fx=bh-1;bA.fy=be-1}else{this.node.filterMatrix=" progid:DXImageTransform.Microsoft.Matrix(M11="[a3](bh,", M12=0, M21=0, M22=",be,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
br.filter=(this.node.filterMatrix||aB)+(this.node.filterOpacity||aB)}}else{if(this.transformations){this.transformations[2]=aB;
this.node[z]("transform",this.transformations[aI](au));bA.fx=0;bA.fy=0}else{this.node.filterMatrix=aB;
br.filter=(this.node.filterMatrix||aB)+(this.node.filterOpacity||aB)}}bA.scale=[bk,bj,R,E][aI](au);
this._.sx=bk;this._.sy=bj}return this};aG[ba].clone=function(){var e=this.attr();
delete e.scale;delete e.translation;return this.paper[this.type]().attr(e)};var g=ao(function(R,e,bf,be,bl,bk,bj,bi,S){var bh=0,bd;
for(var bg=0;bg<1.001;bg+=0.001){var E=av.findDotsAtSegment(R,e,bf,be,bl,bk,bj,bi,bg);
bg&&(bh+=aW(aW(bd.x-E.x,2)+aW(bd.y-E.y,2),0.5));if(bh>=S){return E}bd=E}}),aL=function(e,i){return function(bm,S,bd){bm=M(bm);
var bi,bh,E,be,R="",bl={},bj,bg=0;for(var bf=0,bk=bm.length;bf<bk;bf++){E=bm[bf];
if(E[0]=="M"){bi=+E[1];bh=+E[2]}else{be=o(bi,bh,E[1],E[2],E[3],E[4],E[5],E[6]);if(bg+be>S){if(i&&!bl.start){bj=g(bi,bh,E[1],E[2],E[3],E[4],E[5],E[6],S-bg);
R+=["C",bj.start.x,bj.start.y,bj.m.x,bj.m.y,bj.x,bj.y];if(bd){return R}bl.start=R;
R=["M",bj.x,bj.y+"C",bj.n.x,bj.n.y,bj.end.x,bj.end.y,E[5],E[6]][aI]();bg+=be;bi=+E[5];
bh=+E[6];continue}if(!e&&!i){bj=g(bi,bh,E[1],E[2],E[3],E[4],E[5],E[6],S-bg);return{x:bj.x,y:bj.y,alpha:bj.alpha}
}}bg+=be;bi=+E[5];bh=+E[6]}R+=E}bl.end=R;bj=e?bg:i?bl:av.findDotsAtSegment(bi,bh,E[1],E[2],E[3],E[4],E[5],E[6],1);
bj.alpha&&(bj={x:bj.x,y:bj.y,alpha:bj.alpha});return bj}},o=ao(function(R,e,be,bd,bk,bj,bi,bh){var S={x:0,y:0},bg=0;
for(var bf=0;bf<1.01;bf+=0.01){var E=U(R,e,be,bd,bk,bj,bi,bh,bf);bf&&(bg+=aW(aW(S.x-E.x,2)+aW(S.y-E.y,2),0.5));
S=E}return bg});var ax=aL(1),H=aL(),O=aL(0,1);aG[ba].getTotalLength=function(){if(this.type!="path"){return
}return ax(this.attrs.path)};aG[ba].getPointAtLength=function(e){if(this.type!="path"){return
}return H(this.attrs.path,e)};aG[ba].getSubpath=function(E,i){if(this.type!="path"){return
}if(ag.abs(this.getTotalLength()-i)<0.000001){return O(this.attrs.path,E).end}var e=O(this.attrs.path,i,1);
return E?O(e,E).end:e};av.easing_formulas={linear:function(e){return e},"<":function(e){return aW(e,3)
},">":function(e){return aW(e-1,3)+1},"<>":function(e){e=e*2;if(e<1){return aW(e,3)/2
}e-=2;return(aW(e,3)+2)/2},backIn:function(i){var e=1.70158;return i*i*((e+1)*i-e)
},backOut:function(i){i=i-1;var e=1.70158;return i*i*((e+1)*i+e)+1},elastic:function(E){if(E==0||E==1){return E
}var i=0.3,e=i/4;return aW(2,-10*E)*ag.sin((E-e)*(2*ag.PI)/i)+1},bounce:function(R){var i=7.5625,E=2.75,e;
if(R<(1/E)){e=i*R*R}else{if(R<(2/E)){R-=(1.5/E);e=i*R*R+0.75}else{if(R<(2.5/E)){R-=(2.25/E);
e=i*R*R+0.9375}else{R-=(2.625/E);e=i*R*R+0.984375}}}return e}};var N={length:0},a2=function(){var bg=+new Date;
for(var bs in N){if(bs!="length"&&N[X](bs)){var bx=N[bs];if(bx.stop||bx.el.removed){delete N[bs];
N[n]--;continue}var be=bg-bx.start,bp=bx.ms,bo=bx.easing,bt=bx.from,bl=bx.diff,R=bx.to,bk=bx.t,bn=bx.prev||0,bf=bx.el,S=bx.callback,bm={},E;
if(be<bp){var bd=av.easing_formulas[bo]?av.easing_formulas[bo](be/bp):be/bp;for(var bq in bt){if(bt[X](bq)){switch(ae[bq]){case"along":E=bd*bp*bl[bq];
R.back&&(E=R.len-E);var br=H(R[bq],E);bf.translate(bl.sx-bl.x||0,bl.sy-bl.y||0);bl.x=br.x;
bl.y=br.y;bf.translate(br.x-bl.sx,br.y-bl.sy);R.rot&&bf.rotate(bl.r+br.alpha,br.x,br.y);
break;case"number":E=+bt[bq]+bd*bp*bl[bq];break;case"colour":E="rgb("+[G(V(bt[bq].r+bd*bp*bl[bq].r)),G(V(bt[bq].g+bd*bp*bl[bq].g)),G(V(bt[bq].b+bd*bp*bl[bq].b))][aI](",")+")";
break;case"path":E=[];for(var bv=0,bj=bt[bq][n];bv<bj;bv++){E[bv]=[bt[bq][bv][0]];
for(var bu=1,bw=bt[bq][bv][n];bu<bw;bu++){E[bv][bu]=+bt[bq][bv][bu]+bd*bp*bl[bq][bv][bu]
}E[bv]=E[bv][aI](au)}E=E[aI](au);break;case"csv":switch(bq){case"translation":var bi=bl[bq][0]*(be-bn),bh=bl[bq][1]*(be-bn);
bk.x+=bi;bk.y+=bh;E=bi+au+bh;break;case"rotation":E=+bt[bq][0]+bd*bp*bl[bq][0];bt[bq][1]&&(E+=","+bt[bq][1]+","+bt[bq][2]);
break;case"scale":E=[+bt[bq][0]+bd*bp*bl[bq][0],+bt[bq][1]+bd*bp*bl[bq][1],(2 in R[bq]?R[bq][2]:aB),(3 in R[bq]?R[bq][3]:aB)][aI](au);
break;case"clip-rect":E=[];bv=4;while(bv--){E[bv]=+bt[bq][bv]+bd*bp*bl[bq][bv]}break
}break}bm[bq]=E}}bf.attr(bm);bf._run&&bf._run.call(bf)}else{if(R.along){br=H(R.along,R.len*!R.back);
bf.translate(bl.sx-(bl.x||0)+br.x-bl.sx,bl.sy-(bl.y||0)+br.y-bl.sy);R.rot&&bf.rotate(bl.r+br.alpha,br.x,br.y)
}(bk.x||bk.y)&&bf.translate(-bk.x,-bk.y);R.scale&&(R.scale=R.scale+aB);bf.attr(R);
delete N[bs];N[n]--;bf.in_animation=null;av.is(S,"function")&&S.call(bf)}bx.prev=be
}}av.svg&&bf&&bf.paper.safari();N[n]&&aC.setTimeout(a2)},G=function(e){return e>255?255:(e<0?0:e)
},w=function(e,E){if(e==null){return{x:this._.tx,y:this._.ty,toString:y}}this._.tx+=+e;
this._.ty+=+E;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+E+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+E+this.attrs.y});
break;case"path":var i=ai(this.attrs.path);i[0][1]+=+e;i[0][2]+=+E;this.attr({path:i});
break}return this};aG[ba].animateWith=function(i,E,e,S,R){N[i.id]&&(E.start=N[i.id].start);
return this.animate(E,e,S,R)};aG[ba].animateAlong=aH();aG[ba].animateAlongBack=aH(1);
function aH(e){return function(R,E,i,bd){var S={back:e};av.is(i,"function")?(bd=i):(S.rot=i);
R&&R.constructor==aG&&(R=R.attrs.path);R&&(S.along=R);return this.animate(S,E,bd)
}}aG[ba].onAnimation=function(e){this._run=e||0;return this};aG[ba].animate=function(bs,bj,bi,R){if(av.is(bi,"function")||!bi){R=bi||null
}var bn={},E={},bg={};for(var bk in bs){if(bs[X](bk)){if(ae[X](bk)){bn[bk]=this.attr(bk);
(bn[bk]==null)&&(bn[bk]=k[bk]);E[bk]=bs[bk];switch(ae[bk]){case"along":var bq=ax(bs[bk]),bl=H(bs[bk],bq*!!bs.back),S=this.getBBox();
bg[bk]=bq/bj;bg.tx=S.x;bg.ty=S.y;bg.sx=bl.x;bg.sy=bl.y;E.rot=bs.rot;E.back=bs.back;
E.len=bq;bs.rot&&(bg.r=ab(this.rotate())||0);break;case"number":bg[bk]=(E[bk]-bn[bk])/bj;
break;case"colour":bn[bk]=av.getRGB(bn[bk]);var bm=av.getRGB(E[bk]);bg[bk]={r:(bm.r-bn[bk].r)/bj,g:(bm.g-bn[bk].g)/bj,b:(bm.b-bn[bk].b)/bj};
break;case"path":var bd=M(bn[bk],E[bk]);bn[bk]=bd[0];var bh=bd[1];bg[bk]=[];for(var bp=0,bf=bn[bk][n];
bp<bf;bp++){bg[bk][bp]=[0];for(var bo=1,br=bn[bk][bp][n];bo<br;bo++){bg[bk][bp][bo]=(bh[bp][bo]-bn[bk][bp][bo])/bj
}}break;case"csv":var e=(bs[bk]+aB)[D](a),be=(bn[bk]+aB)[D](a);switch(bk){case"translation":bn[bk]=[0,0];
bg[bk]=[e[0]/bj,e[1]/bj];break;case"rotation":bn[bk]=(be[1]==e[1]&&be[2]==e[2])?be:[0,e[1],e[2]];
bg[bk]=[(e[0]-bn[bk][0])/bj,0,0];break;case"scale":bs[bk]=e;bn[bk]=(bn[bk]+aB)[D](a);
bg[bk]=[(e[0]-bn[bk][0])/bj,(e[1]-bn[bk][1])/bj,0,0];break;case"clip-rect":bn[bk]=(bn[bk]+aB)[D](a);
bg[bk]=[];bp=4;while(bp--){bg[bk][bp]=(e[bp]-bn[bk][bp])/bj}break}E[bk]=e}}}}this.stop();
this.in_animation=1;N[this.id]={start:bs.start||+new Date,ms:bj,easing:bi,from:bn,diff:bg,to:E,el:this,callback:R,t:{x:0,y:0}};
++N[n]==1&&a2();return this};aG[ba].stop=function(){N[this.id]&&N[n]--;delete N[this.id];
return this};aG[ba].translate=function(e,i){return this.attr({translation:e+" "+i})
};aG[ba][aK]=function(){return"Rapha\xebl\u2019s object"};av.ae=N;var Y=function(e){this.items=[];
this[n]=0;if(e){for(var E=0,R=e[n];E<R;E++){if(e[E]&&(e[E].constructor==aG||e[E].constructor==Y)){this[this.items[n]]=this.items[this.items[n]]=e[E];
this[n]++}}}};Y[ba][f]=function(){var S,e;for(var E=0,R=arguments[n];E<R;E++){S=arguments[E];
if(S&&(S.constructor==aG||S.constructor==Y)){e=this.items[n];this[e]=this.items[e]=S;
this[n]++}}return this};Y[ba].pop=function(){delete this[this[n]--];return this.items.pop()
};for(var C in aG[ba]){if(aG[ba][X](C)){Y[ba][C]=(function(e){return function(){for(var E=0,R=this.items[n];
E<R;E++){this.items[E][e][a8](this.items[E],arguments)}return this}})(C)}}Y[ba].attr=function(E,be){if(E&&av.is(E,"array")&&av.is(E[0],"object")){for(var e=0,bd=E[n];
e<bd;e++){this.items[e].attr(E[e])}}else{for(var R=0,S=this.items[n];R<S;R++){this.items[R].attr(E,be)
}}return this};Y[ba].animate=function(bd,E,bg,bf){(av.is(bg,"function")||!bg)&&(bf=bg||null);
var e=this.items[n],R=e,be=this,S;bf&&(S=function(){!--e&&bf.call(be)});this.items[--R].animate(bd,E,bg||S,S);
while(R--){this.items[R].animateWith(this.items[e-1],bd,E,bg||S,S)}return this};Y[ba].insertAfter=function(E){var e=this.items[n];
while(e--){this.items[e].insertAfter(E)}return this};Y[ba].getBBox=function(){var e=[],be=[],E=[],S=[];
for(var R=this.items[n];R--;){var bd=this.items[R].getBBox();e[f](bd.x);be[f](bd.y);
E[f](bd.x+bd.width);S[f](bd.y+bd.height)}e=aS[a8](0,e);be=aS[a8](0,be);return{x:e,y:be,width:h[a8](0,E)-e,height:h[a8](0,S)-be}
};Y[ba].clone=function(R){R=new Y;for(var e=0,E=this.items[n];e<E;e++){R[f](this.items[e].clone())
}return R};av.registerFont=function(i){if(!i.face){return i}this.fonts=this.fonts||{};
var R={w:i.w,face:{},glyphs:{}},E=i.face["font-family"];for(var be in i.face){if(i.face[X](be)){R.face[be]=i.face[be]
}}if(this.fonts[E]){this.fonts[E][f](R)}else{this.fonts[E]=[R]}if(!i.svg){R.face["units-per-em"]=L(i.face["units-per-em"],10);
for(var S in i.glyphs){if(i.glyphs[X](S)){var bd=i.glyphs[S];R.glyphs[S]={w:bd.w,k:{},d:bd.d&&"M"+bd.d[a0](/[mlcxtrv]/g,function(bf){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bf]||"M"
})+"z"};if(bd.k){for(var e in bd.k){if(bd[X](e)){R.glyphs[S].k[e]=bd.k[e]}}}}}}return i
};a5[ba].getFont=function(bg,bh,E,S){S=S||"normal";E=E||"normal";bh=+bh||{normal:400,bold:700,lighter:300,bolder:800}[bh]||400;
var bd=av.fonts[bg];if(!bd){var R=new RegExp("(^|\\s)"+bg[a0](/[^\w\d\s+!~.:_-]/g,aB)+"(\\s|$)","i");
for(var e in av.fonts){if(av.fonts[X](e)){if(R.test(e)){bd=av.fonts[e];break}}}}var be;
if(bd){for(var bf=0,bi=bd[n];bf<bi;bf++){be=bd[bf];if(be.face["font-weight"]==bh&&(be.face["font-style"]==E||!be.face["font-style"])&&be.face["font-stretch"]==S){break
}}}return be};a5[ba].print=function(S,R,e,bf,bg,bp){bp=bp||"middle";var bl=this.set(),bo=(e+aB)[D](aB),bm=0,bi=aB,bq;
av.is(bf,"string")&&(bf=this.getFont(bf));if(bf){bq=(bg||16)/bf.face["units-per-em"];
var E=bf.face.bbox.split(a),be=+E[0],bh=+E[1]+(bp=="baseline"?E[3]-E[1]+(+bf.face.descent):(E[3]-E[1])/2);
for(var bk=0,bd=bo[n];bk<bd;bk++){var bj=bk&&bf.glyphs[bo[bk-1]]||{},bn=bf.glyphs[bo[bk]];
bm+=bk?(bj.w||bf.w)+(bj.k&&bj.k[bo[bk]]||0):0;bn&&bn.d&&bl[f](this.path(bn.d).attr({fill:"#000",stroke:"none",translation:[bm,0]}))
}bl.scale(bq,bq,be,bh).translate(S-be,R-bh)}return bl};var aX=/\{(\d+)\}/g;av.format=function(i,E){var e=av.is(E,"array")?[0][a3](E):arguments;
i&&av.is(i,"string")&&e[n]-1&&(i=i[a0](aX,function(S,R){return e[++R]==null?aB:e[R]
}));return i||aB};av.ninja=function(){m.was?(Raphael=m.is):delete Raphael;return av
};av.el=aG[ba];return av})();(function(){Raphael.fn.g=Raphael.fn.g||{};Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var b=[0.6,0.2,0.05,0.1333,0.75,0];for(var a=0;a<10;a++){if(a<b.length){Raphael.fn.g.colors.push("hsb("+b[a]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+b[a-b.length]+", 1, .5)")}}Raphael.fn.g.text=function(c,f,e){return this.text(c,f,e).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(c,f,e){if(c){return(c+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(g,i,h){if(i){return(+f).toFixed(i.replace(/^#+\.?/g,"").length)
}if(h){return(f*100/e).toFixed(h.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+f).toFixed(0)
}};Raphael.fn.g.finger=function(j,i,e,k,f,g,h){if((f&&!k)||(!f&&!e)){return h?"":this.path()
}g={square:"square",sharp:"sharp",soft:"soft"}[g]||"round";var m;k=Math.round(k);
e=Math.round(e);j=Math.round(j);i=Math.round(i);switch(g){case"round":if(!f){var c=Math.floor(k/2);
if(e<c){c=e;m=["M",j+0.5,i+0.5-Math.floor(k/2),"l",0,0,"a",c,Math.floor(k/2),0,0,1,0,k,"l",0,0,"z"]
}else{m=["M",j+0.5,i+0.5-c,"l",e-c,0,"a",c,c,0,1,1,0,k,"l",c-e,0,"z"]}}else{var c=Math.floor(e/2);
if(k<c){c=k;m=["M",j-Math.floor(e/2),i,"l",0,0,"a",Math.floor(e/2),c,0,0,1,e,0,"l",0,0,"z"]
}else{m=["M",j-c,i,"l",0,c-k,"a",c,c,0,1,1,e,0,"l",0,k-c,"z"]}}break;case"sharp":if(!f){var l=Math.floor(k/2);
m=["M",j,i+l,"l",0,-k,Math.max(e-l,0),0,Math.min(l,e),l,-Math.min(l,e),l+(l*2<k),"z"]
}else{var l=Math.floor(e/2);m=["M",j+l,i,"l",-e,0,0,-Math.max(k-l,0),l,-Math.min(l,k),l,Math.min(l,k),l,"z"]
}break;case"square":if(!f){m=["M",j,i+Math.floor(k/2),"l",0,-k,e,0,0,k,"z"]}else{m=["M",j+Math.floor(e/2),i,"l",1-e,0,0,-k,e-1,0,"z"]
}break;case"soft":var c;if(!f){c=Math.min(e,Math.round(k/5));m=["M",j+0.5,i+0.5-Math.floor(k/2),"l",e-c,0,"a",c,c,0,0,1,c,c,"l",0,k-c*2,"a",c,c,0,0,1,-c,c,"l",c-e,0,"z"]
}else{c=Math.min(Math.round(e/5),k);m=["M",j-Math.floor(e/2),i,"l",0,c-k,"a",c,c,0,0,1,c,-c,"l",e-2*c,0,"a",c,c,0,0,1,c,c,"l",0,k-c,"z"]
}}if(h){return m.join(",")}else{return this.path(m)}};Raphael.fn.g.disc=function(c,f,e){return this.circle(c,f,e)
};Raphael.fn.g.line=function(c,f,e){return this.rect(c-e,f-e/5,2*e,2*e/5)};Raphael.fn.g.square=function(c,f,e){e=e*0.7;
return this.rect(c-e,f-e,2*e,2*e)};Raphael.fn.g.triangle=function(c,f,e){e*=1.75;
return this.path("M".concat(c,",",f,"m0-",e*0.58,"l",e*0.5,",",e*0.87,"-",e,",0z"))
};Raphael.fn.g.diamond=function(c,f,e){return this.path(["M",c,f-e,"l",e,e,-e,e,-e,-e,e,-e,"z"])
};Raphael.fn.g.flower=function(g,f,c,e){c=c*1.25;var l=c,k=l*0.5;e=+e<3||!e?5:e;var m=["M",g,f+k,"Q"],j;
for(var h=1;h<e*2+1;h++){j=h%2?l:k;m=m.concat([+(g+j*Math.sin(h*Math.PI/e)).toFixed(3),+(f+j*Math.cos(h*Math.PI/e)).toFixed(3)])
}m.push("z");return this.path(m.join(","))};Raphael.fn.g.star=function(c,k,j,e){e=e||j*0.5;
var h=["M",c,k+e,"L"],g;for(var f=1;f<10;f++){g=f%2?j:e;h=h.concat([(c+g*Math.sin(f*Math.PI*0.2)).toFixed(3),(k+g*Math.cos(f*Math.PI*0.2)).toFixed(3)])
}h.push("z");return this.path(h.join(","))};Raphael.fn.g.cross=function(c,f,e){e=e/2.5;
return this.path("M".concat(c-e,",",f,"l",[-e,-e,e,-e,e,e,e,-e,e,e,-e,e,e,e,-e,e,-e,-e,-e,e,-e,-e,"z"]))
};Raphael.fn.g.plus=function(c,f,e){e=e/2;return this.path("M".concat(c-e/2,",",f-e/2,"l",[0,-e,e,0,0,e,e,0,0,e,-e,0,0,e,-e,0,0,-e,-e,0,0,-e,"z"]))
};Raphael.fn.g.arrow=function(c,f,e){return this.path("M".concat(c-e*0.7,",",f-e*0.4,"l",[e*0.6,0,0,-e*0.4,e,e*0.8,-e,e*0.8,0,-e*0.4,-e*0.6,0],"z"))
};Raphael.fn.g.tag=function(c,k,j,i,g){i=i||0;g=g==null?5:g;j=j==null?"$9.99":j;var f=0.5522*g,e=this.set(),h=3;
e.push(this.path().attr({fill:"#000",stroke:"none"}));e.push(this.text(c,k,j).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){this.rotate(0,c,k);var m=this[1].getBBox();if(m.height>=g*2){this[0].attr({path:["M",c,k+g,"a",g,g,0,1,1,0,-g*2,g,g,0,1,1,0,g*2,"m",0,-g*2-h,"a",g+h,g+h,0,1,0,0,(g+h)*2,"L",c+g+h,k+m.height/2+h,"l",m.width+2*h,0,0,-m.height-2*h,-m.width-2*h,0,"L",c,k-g-h].join(",")})
}else{var l=Math.sqrt(Math.pow(g+h,2)-Math.pow(m.height/2+h,2));this[0].attr({path:["M",c,k+g,"c",-f,0,-g,f-g,-g,-g,0,-f,g-f,-g,g,-g,f,0,g,g-f,g,g,0,f,f-g,g,-g,g,"M",c+l,k-m.height/2-h,"a",g+h,g+h,0,1,0,0,m.height+2*h,"l",g+h-l+m.width+2*h,0,0,-m.height-2*h,"L",c+l,k-m.height/2-h].join(",")})
}this[1].attr({x:c+g+h+m.width/2,y:k});i=(360-i)%360;this.rotate(i,c,k);i>90&&i<270&&this[1].attr({x:c-g-h-m.width/2,y:k,rotation:[180+i,c,k]});
return this};e.update();return e};Raphael.fn.g.popupit=function(j,i,k,e,q){e=e==null?2:e;
q=q||5;j=Math.round(j)+0.5;i=Math.round(i)+0.5;var g=k.getBBox(),l=Math.round(g.width/2),f=Math.round(g.height/2),o=[0,l+q*2,0,-l-q*2],m=[-f*2-q*3,-f-q,0,-f-q],c=["M",j-o[e],i-m[e],"l",-q,(e==2)*-q,-Math.max(l-q,0),0,"a",q,q,0,0,1,-q,-q,"l",0,-Math.max(f-q,0),(e==3)*-q,-q,(e==3)*q,-q,0,-Math.max(f-q,0),"a",q,q,0,0,1,q,-q,"l",Math.max(l-q,0),0,q,!e*-q,q,!e*q,Math.max(l-q,0),0,"a",q,q,0,0,1,q,q,"l",0,Math.max(f-q,0),(e==1)*q,q,(e==1)*-q,q,0,Math.max(f-q,0),"a",q,q,0,0,1,-q,q,"l",-Math.max(l-q,0),0,"z"].join(","),n=[{x:j,y:i+q*2+f},{x:j-q*2-l,y:i},{x:j,y:i-q*2-f},{x:j+q*2+l,y:i}][e];
k.translate(n.x-l-g.x,n.y-f-g.y);return this.path(c).attr({fill:"#000",stroke:"none"}).insertBefore(k.node?k:k[0])
};Raphael.fn.g.popup=function(c,j,i,e,g){e=e==null?2:e;g=g||5;i=i||"$9.99";var f=this.set(),h=3;
f.push(this.path().attr({fill:"#000",stroke:"none"}));f.push(this.text(c,j,i).attr(this.g.txtattr).attr({fill:"#fff"}));
f.update=function(m,l,n){m=m||c;l=l||j;var q=this[1].getBBox(),s=q.width/2,o=q.height/2,v=[0,s+g*2,0,-s-g*2],t=[-o*2-g*3,-o-g,0,-o-g],k=["M",m-v[e],l-t[e],"l",-g,(e==2)*-g,-Math.max(s-g,0),0,"a",g,g,0,0,1,-g,-g,"l",0,-Math.max(o-g,0),(e==3)*-g,-g,(e==3)*g,-g,0,-Math.max(o-g,0),"a",g,g,0,0,1,g,-g,"l",Math.max(s-g,0),0,g,!e*-g,g,!e*g,Math.max(s-g,0),0,"a",g,g,0,0,1,g,g,"l",0,Math.max(o-g,0),(e==1)*g,g,(e==1)*-g,g,0,Math.max(o-g,0),"a",g,g,0,0,1,-g,g,"l",-Math.max(s-g,0),0,"z"].join(","),u=[{x:m,y:l+g*2+o},{x:m-g*2-s,y:l},{x:m,y:l-g*2-o},{x:m+g*2+s,y:l}][e];
if(n){this[0].animate({path:k},500,">");this[1].animate(u,500,">")}else{this[0].attr({path:k});
this[1].attr(u)}return this};return f.update(c,j)};Raphael.fn.g.flag=function(c,i,h,g){g=g||0;
h=h||"$9.99";var e=this.set(),f=3;e.push(this.path().attr({fill:"#000",stroke:"none"}));
e.push(this.text(c,i,h).attr(this.g.txtattr).attr({fill:"#fff"}));e.update=function(j,m){this.rotate(0,j,m);
var l=this[1].getBBox(),k=l.height/2;this[0].attr({path:["M",j,m,"l",k+f,-k-f,l.width+2*f,0,0,l.height+2*f,-l.width-2*f,0,"z"].join(",")});
this[1].attr({x:j+k+f+l.width/2,y:m});g=360-g;this.rotate(g,j,m);g>90&&g<270&&this[1].attr({x:j-r-f-l.width/2,y:m,rotation:[180+g,j,m]});
return this};return e.update(c,i)};Raphael.fn.g.label=function(c,g,f){var e=this.set();
e.push(this.rect(c,g,10,10).attr({stroke:"none",fill:"#000"}));e.push(this.text(c,g,f).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){var i=this[1].getBBox(),h=Math.min(i.width+10,i.height+10)/2;
this[0].attr({x:i.x-h/2,y:i.y-h/2,width:i.width+h,height:i.height+h,r:h})};e.update();
return e};Raphael.fn.g.labelit=function(f){var e=f.getBBox(),c=Math.min(20,e.width+10,e.height+10)/2;
return this.rect(e.x-c/2,e.y-c/2,e.width+c,e.height+c,c).attr({stroke:"none",fill:"#000"}).insertBefore(f[0])
};Raphael.fn.g.drop=function(c,i,h,f,g){f=f||30;g=g||0;var e=this.set();e.push(this.path(["M",c,i,"l",f,0,"A",f*0.4,f*0.4,0,1,0,c+f*0.7,i-f*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-g,c,i]}));
g=(g+90)*Math.PI/180;e.push(this.text(c+f*Math.sin(g),i+f*Math.cos(g),h).attr(this.g.txtattr).attr({"font-size":f*12/30,fill:"#fff"}));
e.drop=e[0];e.text=e[1];return e};Raphael.fn.g.blob=function(e,k,j,i,g){i=(+i+1?i:45)+90;
g=g||12;var c=Math.PI/180,h=g*12/12;var f=this.set();f.push(this.path().attr({fill:"#000",stroke:"none"}));
f.push(this.text(e+g*Math.sin((i)*c),k+g*Math.cos((i)*c)-h/2,j).attr(this.g.txtattr).attr({"font-size":h,fill:"#fff"}));
f.update=function(q,p,v){q=q||e;p=p||k;var y=this[1].getBBox(),B=Math.max(y.width+h,g*25/12),x=Math.max(y.height+h,g*25/12),m=q+g*Math.sin((i-22.5)*c),z=p+g*Math.cos((i-22.5)*c),o=q+g*Math.sin((i+22.5)*c),A=p+g*Math.cos((i+22.5)*c),D=(o-m)/2,C=(A-z)/2,n=B/2,l=x/2,u=-Math.sqrt(Math.abs(n*n*l*l-n*n*C*C-l*l*D*D)/(n*n*C*C+l*l*D*D)),t=u*n*C/l+(o+m)/2,s=u*-l*D/n+(A+z)/2;
if(v){this.animate({x:t,y:s,path:["M",e,k,"L",o,A,"A",n,l,0,1,1,m,z,"z"].join(",")},500,">")
}else{this.attr({x:t,y:s,path:["M",e,k,"L",o,A,"A",n,l,0,1,1,m,z,"z"].join(",")})
}return this};f.update(e,k);return f};Raphael.fn.g.colorValue=function(g,f,e,c){return"hsb("+[Math.min((1-g/f)*0.4,1),e||0.75,c||0.75]+")"
};Raphael.fn.g.snapEnds=function(l,m,k){var h=l,n=m;if(h==n){return{from:h,to:n,power:0}
}function o(f){return Math.abs(f-0.5)<0.25?Math.floor(f)+0.5:Math.round(f)}var j=(n-h)/k,c=Math.floor(j),g=c,e=0;
if(c){while(g){e--;g=Math.floor(j*Math.pow(10,e))/Math.pow(10,e)}e++}else{while(!c){e=e||1;
c=Math.floor(j*Math.pow(10,e))/Math.pow(10,e);e++}e&&e--}var n=o(m*Math.pow(10,e))/Math.pow(10,e);
if(n<m){n=o((m+0.5)*Math.pow(10,e))/Math.pow(10,e)}var h=o((l-(e>0?0:0.5))*Math.pow(10,e))/Math.pow(10,e);
return{from:h,to:n,power:e}};Raphael.fn.g.axis=function(s,q,m,E,h,H,k,J,l,c){c=c==null?2:c;
l=l||"t";H=H||10;var D=l=="|"||l==" "?["M",s+0.5,q,"l",0,0.001]:k==1||k==3?["M",s+0.5,q,"l",0,-m]:["M",s,q+0.5,"l",m,0],v=this.g.snapEnds(E,h,H),I=v.from,z=v.to,G=v.power,F=0,A=this.set();
d=(z-I)/H;var p=I,o=G>0?G:0;u=m/H;if(+k==1||+k==3){var e=q,w=(k-1?1:-1)*(c+3+!!(k-1));
while(e>=q-m){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),e+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,e,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}));
p+=d;e-=u}if(Math.round(e+u-(q-m))){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),q-m+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,q-m,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}))
}}else{var g=s,p=I,o=G>0?G:0,w=(k?-1:1)*(c+9+!k),u=m/H,B=0,C=0;while(g<=s+m){l!="-"&&l!=" "&&(D=D.concat(["M",g+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(B=this.text(g,q+w,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr));
var n=B.getBBox();if(C>=n.x-5){A.pop(A.length-1).remove()}else{C=n.x+n.width}p+=d;
g+=u}if(Math.round(g-u-s-m)){l!="-"&&l!=" "&&(D=D.concat(["M",s+m+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(this.text(s+m,q+w,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr))
}}var K=this.path(D);K.text=A;K.all=this.set([K,A]);K.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return K};Raphael.el.lighter=function(e){e=e||2;
var c=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);c[0].b=Math.min(c[0].b*e,1);c[0].s=c[0].s/e;
c[1].b=Math.min(c[1].b*e,1);c[1].s=c[1].s/e;this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.darker=function(e){e=e||2;var c=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
c[0].s=Math.min(c[0].s*e,1);c[0].b=c[0].b/e;c[1].s=Math.min(c[1].s*e,1);c[1].b=c[1].b/e;
this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();Raphael.fn.g.linechart=function(L,K,a,c,u,t,E){function D(y,aa){var x=y.length/aa,X=0,i=x,Z=0,Y=[];
while(X<y.length){i--;if(i<0){Z+=y[X]*(1+i);Y.push(Z/x);Z=y[X++]*-i;i+=x}else{Z+=y[X++]
}}return Y}E=E||{};if(!this.raphael.is(u[0],"array")){u=[u]}if(!this.raphael.is(t[0],"array")){t=[t]
}var Q=Array.prototype.concat.apply([],u),O=Array.prototype.concat.apply([],t),p=this.g.snapEnds(Math.min.apply(Math,Q),Math.max.apply(Math,Q),u[0].length-1),z=p.from,k=p.to,m=E.gutter||10,R=(a-m*2)/(k-z),I=this.g.snapEnds(Math.min.apply(Math,O),Math.max.apply(Math,O),t[0].length-1),w=I.from,h=I.to,P=(c-m*2)/(h-w),v=Math.max(u[0].length,t[0].length),o=E.symbol||"",M=E.colors||Raphael.fn.g.colors,J=this,q=null,l=null,V=this.set(),N=[];
for(var U=0,G=t.length;U<G;U++){v=Math.max(v,t[U].length)}var W=this.set();for(var U=0,G=t.length;
U<G;U++){if(E.shade){W.push(this.path().attr({stroke:"none",fill:M[U],opacity:E.nostroke?1:0.3}))
}if(t[U].length>a-2*m){t[U]=D(t[U],a-2*m);v=a-2*m}if(u[U]&&u[U].length>a-2*m){u[U]=D(u[U],a-2*m)
}}var A=this.set();if(E.axis){var g=(E.axis+"").split(/[,\s]+/);+g[0]&&A.push(this.g.axis(L+m,K+m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),2));
+g[1]&&A.push(this.g.axis(L+a-m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),3));
+g[2]&&A.push(this.g.axis(L+m,K+c-m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),0));
+g[3]&&A.push(this.g.axis(L+m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),1))
}var H=this.set(),S=this.set(),n;for(var U=0,G=t.length;U<G;U++){if(!E.nostroke){H.push(n=this.path().attr({stroke:M[U],"stroke-width":E.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":E.dash||""}))
}var b=this.raphael.is(o,"array")?o[U]:o,B=this.set();N=[];for(var T=0,s=t[U].length;
T<s;T++){var f=L+m+((u[U]||u[0])[T]-z)*R;var e=K+c-m-(t[U][T]-w)*P;(Raphael.is(b,"array")?b[T]:b)&&B.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[T]:b]](f,e,(E.width||2)*3).attr({fill:M[U],stroke:"none"}));
N=N.concat([T?"L":"M",f,e])}S.push(B);if(E.shade){W[U].attr({path:N.concat(["L",f,K+c-m,"L",L+m+((u[U]||u[0])[0]-z)*R,K+c-m,"z"]).join(",")})
}!E.nostroke&&n.attr({path:N.join(",")})}function F(ag){var ad=[];for(var ae=0,ai=u.length;
ae<ai;ae++){ad=ad.concat(u[ae])}ad.sort();var aj=[],aa=[];for(var ae=0,ai=ad.length;
ae<ai;ae++){ad[ae]!=ad[ae-1]&&aj.push(ad[ae])&&aa.push(L+m+(ad[ae]-z)*R)}ad=aj;ai=ad.length;
var Z=ag||J.set();for(var ae=0;ae<ai;ae++){var Y=aa[ae]-(aa[ae]-(aa[ae-1]||L))/2,ah=((aa[ae+1]||L+a)-aa[ae])/2+(aa[ae]-(aa[ae-1]||L))/2,x;
ag?(x={}):Z.push(x=J.rect(Y-1,K,Math.max(ah+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=J.set();x.y=[];x.x=aa[ae];x.axis=ad[ae];for(var ac=0,af=t.length;
ac<af;ac++){aj=u[ac]||u[0];for(var ab=0,y=aj.length;ab<y;ab++){if(aj[ab]==ad[ae]){x.values.push(t[ac][ab]);
x.y.push(K+c-m-(t[ac][ab]-w)*P);x.symbols.push(V.symbols[ac][ab])}}}ag&&ag.call(x)
}!ag&&(q=Z)}function C(ae){var aa=ae||J.set(),x;for(var ac=0,ag=t.length;ac<ag;ac++){for(var ab=0,ad=t[ac].length;
ab<ad;ab++){var Z=L+m+((u[ac]||u[0])[ab]-z)*R,af=L+m+((u[ac]||u[0])[ab?ab-1:1]-z)*R,y=K+c-m-(t[ac][ab]-w)*P;
ae?(x={}):aa.push(x=J.circle(Z,y,Math.abs(af-Z)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=Z;x.y=y;x.value=t[ac][ab];x.line=V.lines[ac];x.shade=V.shades[ac];x.symbol=V.symbols[ac][ab];
x.symbols=V.symbols[ac];x.axis=(u[ac]||u[0])[ab];ae&&ae.call(x)}}!ae&&(l=aa)}V.push(H,W,S,A,q,l);
V.lines=H;V.shades=W;V.symbols=S;V.axis=A;V.hoverColumn=function(j,i){!q&&F();q.mouseover(j).mouseout(i);
return this};V.clickColumn=function(i){!q&&F();q.click(i);return this};V.hrefColumn=function(Y){var Z=J.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof Y=="object"){for(var j in Y){for(var y=0,X=q.length;
y<X;y++){if(q[y].axis==j){q[y].attr("href",Y[j])}}}}!q&&F();for(var y=0,X=Z.length;
y<X;y++){q[y]&&q[y].attr("href",Z[y])}return this};V.hover=function(j,i){!l&&C();
l.mouseover(j).mouseout(i);return this};V.click=function(i){!l&&C();l.click(i);return this
};V.each=function(i){C(i);return this};V.eachColumn=function(i){F(i);return this};
return V};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("raphael")
};