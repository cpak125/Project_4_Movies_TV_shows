(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports=n(57)},31:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(23),o=n.n(c),u=(n(31),n(7)),s=n(8),i=n(10),l=n(9),p=n(11),h=n(60),m=n(62),f=n(61),d=n(59),b=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Landing Page"),r.a.createElement("p",null,"App description"),r.a.createElement(d.a,{to:"/users"},r.a.createElement("button",null,"Enter")))}}]),t}(a.Component),v=n(6),w=n.n(v),j=n(14),O=n(24),E=n.n(O),k=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={users:[]},n.fetchUsers=Object(j.a)(w.a.mark(function e(){var t;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get("/api/users");case 2:t=e.sent,n.setState({users:t.data});case 4:case"end":return e.stop()}},e,this)})),n.addNewUser=Object(j.a)(w.a.mark(function e(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)})),n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(j.a)(w.a.mark(function e(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchUsers();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.users.map(function(e,t){return r.a.createElement("div",{key:t},e.name)});return r.a.createElement("div",null,r.a.createElement("h1",null,"All Users"),r.a.createElement("div",null,e))}}]),t}(a.Component),y=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement(m.a,null,r.a.createElement(f.a,{exact:!0,path:"/",component:b}),r.a.createElement(f.a,{exact:!0,path:"/users",component:k})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.fd26537d.chunk.js.map