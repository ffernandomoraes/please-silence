var audioContext = null;
var meter = null;
var mediaStreamSource = null;
const $microphoneSwitcher = document.getElementById("microphone-switcher");
const $elementMicrophoneState = document.querySelector(".microphone-state");

window.onload = () => {
    $microphoneSwitcher.addEventListener("click", (event) => {
        audioContext = new AudioContext();

        try {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;

            navigator.getUserMedia({
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "true",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "true",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, gotStream, didntGetStream);

        } catch (e) {
            alert('getUserMedia threw exception :' + e);
        }
    });
}

function didntGetStream() {
    console.log('Permissão bloqueada para o microfone.');

    meter.shutdown();

    if ( $microphoneSwitcher.classList.contains("-active") ) {
        $microphoneSwitcher.classList.remove("-active");
    }

    $elementContent.style.background = "#002f58";
    $elementMicrophoneState.style.display = "block";

    $elementMicrophoneEffect.style.width = 0;
    $elementMicrophoneEffect.style.height = 0;
}

function gotStream(stream) {
    console.log('Permissão concedida para o microfone.');

    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    meter = volumeMeter.createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    $microphoneSwitcher.classList.add("-active");
    $elementMicrophoneState.style.display = "none";
}
