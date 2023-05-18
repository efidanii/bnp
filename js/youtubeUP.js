let videoUpSound = document.querySelector('.video__up_sound')
let videoMuteSound = document.querySelector('.video__mute_sound')
let isSticky = true;

function soundToggle(event) {
  if (player.isMuted()) {
    player.unMute()
    videoUpSound.style.opacity = '0'
    videoMuteSound.style.opacity = '1'
    return
  }
  if (event.target === document.querySelector('#volume_down')) {
    if (!player.isMuted()) {
      player.mute()
      videoUpSound.style.opacity = '1'
      videoMuteSound.style.opacity = '0'
      return
    }
  }
}
setTimeout(function() { videoUpSound.style.opacity = '1' }, 2000);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    width: '560',
    videoId: videoId,
    playerVars: {
      controls: 0,
      disablekb: 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      showinfo: 0,
      autoplay: 1,
      playlist: videoId,
      mute: 1,
    },
    events: {
      'onReady': function(event) {
        setTimeout(onPlayerReady, 2000);
      }
    }
  });
}

function onPlayerReady(event) {
  document.getElementById('video').addEventListener('click', soundToggle)
  setStickyVideo()
}

function setStickyVideo() {
  let video = document.getElementById('video')
  if (video && isSticky && window.innerWidth > 1200) {
    let top = video.offsetTop
    let offset = Math.floor(top + video.offsetHeight / 2)
    window.addEventListener('scroll', function() {
      video.classList.toggle('is-sticky', window.pageYOffset > offset)
    })
  }
}

if (!window['YT']) { var YT = { loading: 0, loaded: 0 }; }
if (!window['YTConfig']) { var YTConfig = { 'host': 'http://www.youtube.com' }; }
if (!YT.loading) {
  YT.loading = 1;
  (function() {
    var l = [];
    YT.ready = function(f) { if (YT.loaded) { f(); } else { l.push(f); } };
    window.onYTReady = function() { YT.loaded = 1; for (var i = 0; i < l.length; i++) { try { l[i](); } catch (e) {} } };
    YT.setConfig = function(c) { for (var k in c) { if (c.hasOwnProperty(k)) { YTConfig[k] = c[k]; } } };
    var a = document.createElement('script');
    a.type = 'text/javascript';
    a.id = 'www-widgetapi-script';
    a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflN2g023/www-widgetapi.js';
    a.async = true;
    var c = document.currentScript;
    if (c) { var n = c.nonce || c.getAttribute('nonce'); if (n) { a.setAttribute('nonce', n); } }
    var b = document.getElementsByTagName('script')[0];
    b.parentNode.insertBefore(a, b);
  })();
}