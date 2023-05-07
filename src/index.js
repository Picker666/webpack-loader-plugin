import md from './markdownFile.md';

const showMarkdown = () => {
  
  const div = document.createElement('div');
  div.innerHTML = md;
  document.querySelector('#markdownContainer').appendChild(div);
};

(function () {
    document
        .querySelector('div')
        .addEventListener('click', (e) => {
            showMarkdown();
        })
})()
