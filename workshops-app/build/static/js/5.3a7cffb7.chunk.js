(this["webpackJsonpworkshops-app"]=this["webpackJsonpworkshops-app"]||[]).push([[5],{79:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(72);function s(){var e=Object(l.a)(["\n    font-size: 2em;\n    cursor: pointer;\n    color: #aaa;\n\n    &:hover {\n        color: black;\n    }\n"]);return s=function(){return e},e}var r=t(73).a.i(s()),o=function(e){var a=e.upvoteCount,t=e.upvote,n=e.downvote;return c.a.createElement("div",{className:"d-flex flex-column align-items-center"},c.a.createElement(r,{className:"fa fa-caret-up",onClick:t}),c.a.createElement("span",null,a),c.a.createElement(r,{className:"fa fa-caret-down",onClick:n}))};function m(e){var a=e.sessions,t=e.upvote,n=e.downvote;return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row my-4"},c.a.createElement("div",{className:"col-12"},c.a.createElement("h3",null,"Sessions in this workshop"),c.a.createElement("hr",null)),c.a.createElement("div",{className:"col-12"},c.a.createElement("ul",{className:"list-group"},a.map((function(e,a){return c.a.createElement("li",{className:"list-group-item",key:e.id},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-1"},c.a.createElement(o,{upvoteCount:e.upvoteCount,upvote:function(){return t(a)},downvote:function(){return n(a)}})),c.a.createElement("div",{className:"col-11"},c.a.createElement("div",{className:"lead"},e.name),c.a.createElement("div",{className:"h6"},"by ",e.speaker),c.a.createElement("div",null,c.a.createElement("span",{className:"badge ".concat((l=e.level,{Basic:"badge-success",Intermediate:"badge-info",Advanced:"badge-warning"}[l]))},e.level)),c.a.createElement("div",{className:"my-2"},e.duration," hours"),c.a.createElement("p",null,e.abstract))));var l}))))))}m.defaultProps={sessions:[]};a.default=m}}]);
//# sourceMappingURL=5.3a7cffb7.chunk.js.map