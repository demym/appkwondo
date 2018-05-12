




(function() {
	var streaming = false;
	var video = document.createElement('video');
	var width = 320;
	var height = 240;
    var feed = document.getElementById('feed');
    var feedContext = feed.getContext('2d');
    var output = document.getElementById('output');
    var outputContext = output.getContext('2d');
    var imageData;

var rooturl = 'https://192.168.1.100:3000';
var socket = io.connect(rooturl);

var image = new Image();
image.onload = function() {
    outputContext.drawImage(image, 0, 0);
};

console.log("socket",socket);

socket.on("videochunk",function(data){
    //console.log("got videochunk",data);
       image.src=data; //putImageData(data, 0, 0);

    });


	navigator.getMedia = ( 
		navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

	navigator.getMedia({video: true}, getStream, someError);

	function getStream(stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
		feed.width = output.width = width;
		feed.height = output.height = height;	
		streamFeed();
	}

	function someError(e) {
		console.error(e);
	}

	window.requestAnimationFrame ||
	(window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback ){
        window.setTimeout(callback, 100 / 60);
    });

    var volte=1;

    function right(str, chr)
  {
	return str.slice(str.length-chr,str.length);
  }

    function streamFeed() {
        requestAnimationFrame(streamFeed);
        feedContext.drawImage(video, 0, 0, width, height);
        imageData = feedContext.getImageData(0, 0, width, height);
        
        //imageData.data = addEffects(imageData.data); //call this to add effects to the output stream
		if (volte<300) {
            
             volte++
            //outputContext.putImageData(imageData, 0, 0);
            var dataurl =feed.toDataURL('image/png');
            //console.log(dataurl);
            var obj={
                numbering: right("0000"+volte,3),
                data: dataurl,
                puredata: JSON.stringify(imageData)
            }
            socket.emit("videochunk",obj);
           
            
        }
    }

    function addEffects(data) {
        /*for (var i = 0, l = data.length; i < l; i += 4) {
			//use this loop to add effects to the output stream
        }*/
        return data;
    }
})();