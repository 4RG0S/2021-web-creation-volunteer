unmuteButton.addEventListener('click', function() {
    video.volume = 0.2;
    video.muted = false;
    setTimeout(function() {
        document.body.style.background = "url('https://images.unsplash.com/photo-1514483127413-f72f273478c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') no-repeat 0 0";
    }, 2000);
    setTimeout(function() {
        document.getElementById("start_content").style.visibility = "";
    }, 3000);
});

scaryUnmuteButton.addEventListener('click', function() {
    video.volume = 0.2;
    scaryVideo.volume = 0.2;

    video.muted = false;
    scaryVideo.muted = false;
    setTimeout(function() {
        document.body.style.background = "url('https://images.unsplash.com/photo-1514483127413-f72f273478c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') no-repeat 0 0";
    }, 2000);
    setTimeout(function() {
        document.getElementById("start_content").style.visibility = "";
    }, 3000);
});
