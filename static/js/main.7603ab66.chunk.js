(this["webpackJsonpstream-racing-wheel"]=this["webpackJsonpstream-racing-wheel"]||[]).push([[0],{125:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(47),s=a.n(o),i=a(2),c=a(3),l=a(10),u=a(5),h=a(4),p=(a(53),a(1));p.a.set("maxrotation",900);for(var m=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=p.a.get("maxrotation"),t={transform:"rotate("+this.props.currentRotation*(e/2)+"deg)"};return r.a.createElement("img",{alt:"",style:t,src:"/stream-racing-wheel/g920/wheel.png"})}}]),a}(n.Component),d=p.a.connect([],(function(e){return["axes-"+e.axis]}),(function(e,t,a,n){return{currentRotation:t}}))(m),g=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this.props.downAmount*this.props.value*-1,t={width:"70px",position:"absolute",top:this.props.top+"px",left:this.props.left+"px",transform:"translateY("+e+"px)"};return r.a.createElement("img",{alt:"",style:t,src:this.props.src})}}]),a}(n.Component),v=p.a.connect([],(function(e){return["axes-"+e.axis]}),(function(e,t,a,n){return{value:t}}))(g),b=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(v,{top:-20,left:290,downAmount:50,axis:1,src:"/stream-racing-wheel/g920/gas.png"}),r.a.createElement(v,{top:-10,left:160,downAmount:50,axis:2,src:"/stream-racing-wheel/g920/brake.png"}),r.a.createElement(v,{top:-10,left:40,downAmount:50,axis:5,src:"/stream-racing-wheel/g920/clutch.png"}),r.a.createElement("img",{alt:"",style:{width:"400px"},src:"/stream-racing-wheel/g920/pedals.png"}))}}]),a}(n.Component),f=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).halfGrid=n.props.gridSize/2,n.halfGridY=n.props.gridSize/2.2,n.moveX=0,n.moveY=0,n}return Object(c.a)(a,[{key:"render",value:function(){var e="100ms";switch(this.props.gear){case-1:e="500ms",this.moveX=0,this.moveY=0;break;case 0:this.moveX=this.halfGrid,this.moveY=this.halfGridY;break;case 1:this.moveX=-this.halfGrid,this.moveY=-this.halfGridY;break;case 2:this.moveX=-this.halfGrid,this.moveY=this.halfGridY;break;case 3:this.moveX=0,this.moveY=-this.halfGridY;break;case 4:this.moveX=0,this.moveY=this.halfGridY;break;case 5:this.moveX=this.halfGrid,this.moveY=-this.halfGridY;break;case 6:this.moveX=this.halfGrid,this.moveY=this.halfGridY;break;default:e="500ms",this.moveX=0,this.moveY=0}var t={width:"150px",zIndex:"999",position:"absolute",top:this.props.top+"px",left:this.props.left+"px",transition:"all "+e,transform:"translate("+this.moveX+"px, "+this.moveY+"px)"},a={backgroundColor:"red",width:"10px",height:"20px",zIndex:"999",position:"absolute",top:"0px",left:"0px",display:"none"};return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("div",{style:a}),r.a.createElement("img",{alt:"",style:t,src:"/stream-racing-wheel/g920/shifter.png"}))}}]),a}(n.Component),x=p.a.connect([],(function(e){return["buttons-"+e.gear1,"buttons-"+e.gear2,"buttons-"+e.gear3,"buttons-"+e.gear4,"buttons-"+e.gear5,"buttons-"+e.gear6,"buttons-"+e.reverse]}),(function(e,t,a,n){var r=n.gear||-1,o=n.gearButton||-1;if(t.pressed)switch(e){case"buttons-"+n.gear1:r=1,o=n.gear1;break;case"buttons-"+n.gear2:r=2,o=n.gear2;break;case"buttons-"+n.gear3:r=3,o=n.gear3;break;case"buttons-"+n.gear4:r=4,o=n.gear4;break;case"buttons-"+n.gear5:r=5,o=n.gear5;break;case"buttons-"+n.gear6:r=6,o=n.gear6;break;case"buttons-"+n.reverse:r=0,o=n.reverse;break;default:r=-1}else"buttons-"+n.gearButton===e&&(r=-1);return{gear:r,gearButton:o}}))(f),w=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(x,{top:70,left:50,gridSize:150,gear1:12,gear2:13,gear3:14,gear4:15,gear5:16,gear6:17,reverse:11}),r.a.createElement("img",{alt:"",width:"250px",src:"/stream-racing-wheel/g920/shifter-base.png"}))}}]),a}(n.Component),y=p.a.connect([],(function(e){return["buttons-"+e.axis]}),(function(e,t,a,n){return{value:t}}))(w),k=[],E=[],j=0;j<20;j++)k.push({pressed:!1,touched:!1,value:0}),E.push(0);p.a.set("buttons",k),p.a.set("axes",E);var O=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).gamePads={},n.start=0,n.a=0,n.b=0,n.gamePadIndex=-1,n.state={gameLoopStarted:!1,rotation:900},n.gameLoop=n.gameLoop.bind(Object(l.a)(n)),n.onGamepadConnected=n.onGamepadConnected.bind(Object(l.a)(n)),window.addEventListener("gamepadconnected",n.onGamepadConnected),n}return Object(c.a)(a,[{key:"onGamepadConnected",value:function(e){var t=navigator.getGamepads()[e.gamepad.index];console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",t.index,t.id,t.buttons.length,t.axes.length),this.gamePads[t.index]=t,this.setState({gamePads:this.gamePads}),t.id.toLowerCase().indexOf("wheel")>-1&&this.changeGamepad(t.index)}},{key:"onChange",value:function(e){this.changeGamepad(e.target.value)}},{key:"changeGamepad",value:function(e){console.log(e),this.gamePadIndex=e,this.setState({gamepadIndex:e,gameLoopStarted:!0}),this.gameLoop()}},{key:"onWheelRotationChange",value:function(e){var t=e.target.value;p.a.set("maxrotation",t),this.setState({rotation:t})}},{key:"render",value:function(){var e=this,t=Object.values(this.gamePads).map((function(t){var a=t.index===e.gamePadIndex;return r.a.createElement("option",{selected:a,value:t.index},t.id)}));return r.a.createElement("div",{style:{width:"600px",height:"100%",position:"absolute",top:"0px",left:"0px"}},r.a.createElement("label",{style:{color:"white"}},"Driving System"),r.a.createElement("select",{name:"gamepadSelection",onChange:function(t){e.onChange(t)}},t),r.a.createElement("br",null),r.a.createElement("label",{style:{color:"white"}},"Max Rotation"),r.a.createElement("input",{name:"wheelRotation",type:"number",value:this.state.rotation,onChange:function(t){e.onWheelRotationChange(t)}}),r.a.createElement("br",null),r.a.createElement("div",{style:{position:"relative",top:"20px"}},r.a.createElement(d,{axis:0,rotation:this.state.rotation})),r.a.createElement("div",{style:{position:"relative",top:"-300px",left:"500px",marginLeft:"50px"}},r.a.createElement(y,null)),r.a.createElement("div",{style:{position:"relative",top:"-170px",left:"30px",marginLeft:"50px"}},r.a.createElement(b,null)))}},{key:"buttonPressed",value:function(e){return"object"==typeof e?e.pressed:1===e}},{key:"gameLoop",value:function(){if(-1!==this.gamePadIndex){for(var e=navigator.getGamepads()[this.gamePadIndex],t=[],a=0;a<e.buttons.length;a++){var n=e.buttons[a],r={pressed:n.pressed,touched:n.touched,value:n.value};t.push(r)}for(var o=[],s=0;s<e.axes.length;s++){var i=e.axes[s];o.push(i)}p.a.set("buttons",t),p.a.set("axes",o),this.start=requestAnimationFrame(this.gameLoop)}}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},48:function(e,t,a){e.exports=a(125)},53:function(e,t,a){}},[[48,1,2]]]);
//# sourceMappingURL=main.7603ab66.chunk.js.map