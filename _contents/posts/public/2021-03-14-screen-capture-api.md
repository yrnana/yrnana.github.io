---
title: 'Screen Capture API'
date: '2021-03-14T02:52:32+09:00'
tags: [Screen Capture API, Web API]
---

`Screen Capture API`를 통해 화면 또는 화면의 일부를 선택하고 미디어 스트림으로 캡쳐할 수 있다. 화면을 캡쳐하는 API이므로 디바이스의 input을 캡쳐하는 `WebRTC API`와 구분이 필요하다.

## Screen Capture API 사용법

```html
<video id="video" autoplay></video>
<button id="start">start</button>
<button id="stop" disabled>stop</button>
<button id="snapshot" disabled>snapshot</button>
```

```js
const videoElement = document.querySelector('#video');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const snapshotButton = document.querySelector('#snapshot');

// 화면캡쳐(video)를 시작하는 함수
async function startCapture() {
  try {
    const displayMediaOptions = { audio: false, video: { cursor: 'always' } };
    const captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions,
    );
    videoElement.srcObject = captureStream;
    startButton.disabled = true;
    stopButton.disabled = false;
    snapshotButton.disabled = false;
  } catch (err) {
    console.error(err);
  }
}

// 화면캡쳐를 중지하는 함수
function stopCapture() {
  const tracks = videoElement.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  videoElement.srcObject = null;
  startButton.disabled = false;
  stopButton.disabled = true;
  snapshotButton.disabled = true;
}

// 스냅샷을 찍는 함수
async function takeSnapshot() {
  const track = videoElement.srcObject.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);
  const image = await imageCapture.grabFrame();
  // ...
}

startButton.addEventListener('click', startCapture);
stopButton.addEventListener('click', stopCapture);
snapshotButton.addEventListener('click', takeSnapshot);
```

`getDisplayMedia`의 옵션은 [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) 객체로 audio, video 옵션을 각각 지정할 수 있다. audio, video는 `boolean` 또는 [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) 값을 가진다.
`getDisplayMedia`는 resolve시 `MediaStream` 객체를 반환하는 `Promise`를 리턴한다. 이 MediaStream은 오디오 또는 비디오 트랙을 나타내는 0개 이상의 객체로 구성된다.
`ImageCapture API`를 사용하면 스냅샷을 캡쳐하는 것도 가능하다.

## 호환성

![](../../assets/image-15.png)
사실상 모바일은 지원하지 않는다...
크롬 익스텐션이나 일렉트론에서 활용하면 좋을 것 같다.

## 참고

- https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API
- https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API
