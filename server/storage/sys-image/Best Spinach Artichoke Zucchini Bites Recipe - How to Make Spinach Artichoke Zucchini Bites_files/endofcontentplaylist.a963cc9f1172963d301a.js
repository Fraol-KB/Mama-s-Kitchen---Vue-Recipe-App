(window.webpackJsonp=window.webpackJsonp||[]).push([["modules/endofcontentplaylist"],{"8fff2404b6904b87e20c":function(e,c,m){"use strict";m.r(c),function(e,i,t,s){var n=m("7ec90be294f8945e7663"),l=m("d46c288b6d4387f2b7de"),o=m("e5f201a09441168159e8"),a=m("891a19eb7d3552f95f46"),d=m("abfbe0c0349d83b0558c"),r=m("5dc27f426de813a8f06e"),h=m("654adc4d2d3e5dbaee18");c.default=e.View.extend({el:".standard-body-content, .listicle-body-content, .recipe-body-content",endpoint:Object(h.o)("ajax/endofcontentplaylist/"),logger:new a.a("EndOfContentPlaylist"),initialize:function(){this.$el.length&&(this.setVariables(),this.setListeners())},setVariables:function(){this.overrideDefaults({mediaLoader:null}),this.window=this.options.window||window,this.mediaLoader=Object(h.c)(this.mediaLoader,d.a),this.model=new o.a,this.modelView=new l.a({model:this.model,templateSelector:"#eoc-playlist-template"}),this.isContentSponsored=!i.isEmpty(n.a.getValue("content.sponsor")),this.sectionId=this.modelView.$template.data("sectionId"),this.model.url=Object(h.e)(this.endpoint,{id:this.sectionId}),this.playerSettings={hideTitle:!0},this.titleElement=null,this.playerEvents={onLoaded:this.onPlayerLoaded.bind(this),onPlaylistItemChange:this.onPlayerPlaylistItemChange.bind(this)},this.glimmerChannel=t.channel("glimmer"),this.mediaQueryChannel=r.a},setListeners:function(){this.model.on("sync",this.onSuccess.bind(this)),this.glimmerChannel.on("player-loaded",this.onGlimmerLoaded.bind(this))},onGlimmerLoaded:function(e){e.events.on("playlistitem",this.handleGlimmerPlaylistItem.bind(this))},getPlayerApi:function(){return window.PlayerApi||window.hearstPlayer},getCustomSettings:function(){return window.hdsCustomSettingById=window.hdsCustomSettingById||{},window.hdsCustomSettingById},setTitleElement:function(e){this.titleElement=e.find(".video-title")},onPlayerLoaded:function(e){this.titleElement.show(),e.setPlayerSettings(this.playerSettings)},onPlayerPlaylistItemChange:function(e,t){this.titleElement.text(Object(h.i)("item.title",t,""))},handleGlimmerPlaylistItem:function(e){try{var t=e.target.player,i=t.playlist.currentIndex(),n=t.playlist()[i].title;this.titleElement.show(),this.titleElement.text(n)}catch(e){this.logger.log("Error grabbing title from player events.")}},setPlayerCustomSettings:function(e){var t=this.getCustomSettings();t[e]=i.extend(t[e]||{},this.playerEvents)},getPlayerEl:function(e){return e.find(".glimmerPlayer, .hearstPlayer")},isGlimmerPlayer:function(e){return e.hasClass("glimmerPlayer")},shouldGetSection:function(){return this.sectionId?!this.isContentSponsored||(this.logger.log("Content is sponsored, exiting"),!1):(this.logger.log("No section ID, exiting"),!1)},fetch:function(){return!!this.shouldGetSection()&&(this.logger.log("Fetching EOC Playlist",{sectionId:this.sectionId}),this.fetchModel())},fetchModel:function(){return this.model.fetch()},interpolateWatchNext:function(){if(!(0<Object(h.i)("HRST.article.sponsor",window,[]).length)){var e=document.querySelector(".end-of-content-playlist[data-interpolate]"),t=document.querySelector(".article-body-content p:nth-of-type(2)");if(e&&t){var i=e.querySelector(".watch-next-header"),n=i.getAttribute("data-wn-label-body");t.insertAdjacentElement("afterend",e),i.textContent=n,e.classList.add("watch-next-in-body")}}},onSuccess:function(){var e,t=this.model.getAttributeFromData("embed_id"),i=this.getPlayerApi();if(t){e=s(this.modelView.render().el),this.$el.append(e);var n=this.getPlayerEl(e);this.setTitleElement(e),i&&(this.setPlayerCustomSettings(t),this.isGlimmerPlayer(n)||i.initPlayer(n[0])),this.logger.log("EOC Playlist added",{videoEmbedId:t}),this.interpolateWatchNext()}else this.logger.log("Embed id not found")}})}.call(this,m("292bef011bf0a540c727"),m("37047f07c1f267630157"),m("483f749fef9ba28566c7"),m("4124695a4a0df23fd56c"))}}]);
//# sourceMappingURL=endofcontentplaylist.a963cc9f1172963d301a.js.map