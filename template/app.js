let input;
let button = document.querySelector('button');
function clean() {
  let img = document.querySelector('img');
  let video = document.querySelector('video');
  if (img) img.remove();
  if (video) video.remove();
}
button.addEventListener('click', async (e) => {
  e.preventDefault();
  input = document.querySelector('input').value;
  if (
    !input.toLowerCase().endsWith('.png') &&
    !input.toLowerCase().endsWith('.jpg') &&
    !input.toLowerCase().endsWith('.mp4')
  ) {
    alert('format not support!');
    return;
  }
  let src = await fetch('http://localhost:4120/post', {
    method: 'POST',
    body: input,
  }).then((r) => r.text());
  if (input.toLowerCase().endsWith('.png') || input.toLowerCase().endsWith('.jpg')) {
    clean();
    let img = document.createElement('img');
    img.setAttribute('src', src);
    document.body.appendChild(img);
  } else if (input.toLowerCase().endsWith('.mp4')) {
    clean();
    let video = document.createElement('video');
    video.setAttribute('controls', true);
    video.setAttribute('autoplay', true);
    video.setAttribute('loop', true);
    let source = document.createElement('source');
    source.setAttribute('src', src);
    video.appendChild(source);
    document.body.appendChild(video);
  }
});