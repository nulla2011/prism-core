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
  let src = await fetch(window.location + 'post', {
    method: 'POST',
    body: input,
  }).then((r) => r.text());
  if (input.toLowerCase().endsWith('.png') || input.toLowerCase().endsWith('.jpg')) {
    clean();
    let img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute(
      'style',
      'background-image: linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,.25) 0), linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,.25) 0); background-position: 0 0, 15px 15px; background-size: 30px 30px;'
    );
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
