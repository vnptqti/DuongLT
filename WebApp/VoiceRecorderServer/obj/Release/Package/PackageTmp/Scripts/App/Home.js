//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var globalBlob = {};
var globalFileName;
var recordCount = 0;

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function startRecording() {
    $('#stopButton').attr('disabled', false);
  recordCount += 1;
  if (recordCount === 4) {
    
    $('#MessageModal').modal('show');
    return;
  }
  //$('#recordingsList').html('');
  $('#controls3').show();
  $('#mainMsg').hide();
  console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/

  var constraints = { audio: true, video: false }

  /*
    Disable the record button until we get a success or fail from getUserMedia() 
*/

  //recordButton.disabled = true;
  //stopButton.disabled = false;
  //pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device
		*/
    audioContext = new AudioContext();

    //update the format 
    //document.getElementById("formats").innerHTML = "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz"

    /*  assign to gumStream for later use  */
    gumStream = stream;

    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
    rec = new Recorder(input, { numChannels: 1 })

    //start the recording process
    rec.record()

    console.log("Recording started");

  }).catch(function (err) {
    console.log(err);
    //enable the record button if getUserMedia() fails
    //recordButton.disabled = false;
    //stopButton.disabled = true;
    //pauseButton.disabled = true
  });
}

function pauseRecording() {
  console.log("pauseButton clicked rec.recording=", rec.recording);
  
  if (rec.recording) {
    //pause
    rec.stop();
    pauseButton.innerHTML = "Resume";
  } else {
    //resume
    rec.record()
    pauseButton.innerHTML = "Pause";

  }
}

function stopRecording() {
    $('#stopButton').attr('disabled', true);
    if (recordCount === 4) {
        return;
    }
  //console.log("stopButton clicked");
  $('#controls3').hide();
  //disable the stop button, enable the record too allow for new recordings
  //stopButton.disabled = true;
  //recordButton.disabled = false;
  //pauseButton.disabled = true;

  //reset button just in case the recording is stopped while paused
  //pauseButton.innerHTML = "Pause";

  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
  if (recordCount === 1) {
    globalBlob.File1 = blob;
  }
  if (recordCount === 2) {
    globalBlob.File2 = blob;
  }
  if (recordCount === 3) {
    globalBlob.File3 = blob;
  }
  var url = URL.createObjectURL(blob);
  var au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');

  //name of .wav file to use during upload and download (without extendion)
  var filename = new Date().toISOString();
  globalFileName = filename;
  //add controls to the <audio> element
  au.controls = true;
  au.src = url;

  //save to disk link
  //link.href = url;
  //link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
  //link.innerHTML = "Save to disk";

  //add the new audio element to li
  li.appendChild(au);

  //add the filename to the li
  //li.appendChild(document.createTextNode(filename + ".wav "))

  //add the save to disk link to li
  // li.appendChild(link);

  //upload link
  if (recordCount === 3) {
    var upload = document.createElement('a');
    upload.href = "#";
    upload.innerHTML = "<button id='btnOpenModal' type='button' class='btn btn-primary'><i class='glyphicon glyphicon-upload'></i>&nbsp;Tải lên</button>";
    upload.addEventListener("click", function (event) {
      $('#modalMsg').css('display', 'none');
      $('#UploadInfoModal').modal('show');
    });
    li.appendChild(document.createTextNode(" "))//add a space in between
    li.appendChild(upload)//add the upload link to li
  }
  

  //add the li element to the ol
  recordingsList.appendChild(li);
}

function SendToServer() {
  
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      var rs = e.target.responseText;
      console.log("Server returned: ", e.target.responseText);
      if (rs !== '"ok"') {
        $('#modalMsg').css('display', 'block');
        $('#modalMsg').removeClass("alert-error");
        $('#modalMsg').removeClass("alert-info");
        $('#modalMsg').addClass("alert-warning");
        $('#modalMsgContent').text(rs.replace('"',''));
      } else {
        $('#UploadInfoModal').modal('hide');

        $('#mainMsg').css('display', 'block');
        $('#mainMsg').removeClass("alert-error");
        $('#mainMsg').removeClass("alert-warning");
        $('#mainMsg').addClass("alert-info");
        $('#mainMsgContent').text("Gửi thông tin thành công.");
        recordCount = 0;
        $('#recordingsList').html('');
        GetRandomScript();
        $('#controls3').hide();
        $('#MessageModal').modal('hide');
      }
    }
  };
  var fd = new FormData();
  fd.append("audio_data1", globalBlob.File1, globalFileName);
  fd.append("audio_data2", globalBlob.File2, globalFileName);
  fd.append("audio_data3", globalBlob.File3, globalFileName);
  fd.append("model", JSON.stringify(GetModel()));
  xhr.open("POST", "../../api/Home/UploadAudio", true);
  xhr.send(fd);
}