window.onload = function () {
  const topBtn = document.querySelector('#top');
  if (topBtn != null) {
    topBtn.onclick = () => {
      window.scrollTo({ top: 0 });
    }
  }

  const params = utils.parseQuery(window.location.search);

  if (params['n'] != null) {
    const id = params['n'];
    utils.getMMLData(id)
      .then((res) => {
        patchContentData(res);
        showContent();
      })
  }
  else {
    utils.getMMLList()
      .then((res) => {
        patchListData(res);
        showList();
      })
  }
}

function showList() {
  const listEl = document.querySelector('#lists');
  const contentEl = document.querySelector('#content');
  const loadingEl = document.querySelector('#loading');

  if (listEl != null && contentEl != null) {
    listEl.classList.replace('hidden', 'block');
    contentEl.classList.replace('block', 'hidden');
    loadingEl.classList.add('hidden');
  }
}

function patchListData(res) {
  const group = utils.group(res, 'category');

  for (const [key, value] of Object.entries(group)) {
    const tableEl = document.querySelector(`[data-list="${key}"]`);
    
    if(tableEl == null) continue;

    const tBodyEl = tableEl.querySelector('tbody');
    utils.sortByFilename(value).forEach(data => addRow(tBodyEl, data));
  }
}

function addRow(tbody, data) {
  const row = tbody.insertRow();
  const title = document.createElement('a');
  const mmlSize = document.createTextNode(utils.getKiloByte(data.mml_file_size) + ' KB');
  const pmdSize = document.createTextNode(utils.getKiloByte(data.pmd_file_size) + ' KB');
  const lastUpdate = document.createTextNode(utils.formatDate(new Date(data.updated_at.seconds * 1000)));
  row.insertCell().appendChild(title);
  row.insertCell().appendChild(mmlSize);
  row.insertCell().appendChild(pmdSize);
  row.insertCell().appendChild(lastUpdate);
  title.href = `/mml.html?n=${data.filename}`;
  title.classList.add('link');
  title.title = data.title;
  title.appendChild(document.createTextNode(utils.substring(data.title, 80)));
}

function showContent() {
  const listEl = document.querySelector('#lists');
  const contentEl = document.querySelector('#content');
  const loadingEl = document.querySelector('#loading');

  if (listEl != null && contentEl != null) {
    listEl.classList.replace('block', 'hidden');
    contentEl.classList.replace('hidden', 'block');
    loadingEl.classList.add('hidden');
  }
}

function createCodeView(data) {
  const _data = data.split('\n');

  const createLine = (index, text) => {
    const line = document.createElement('div');
    line.style.display = 'flex';

    const lineNumber = document.createElement('code');
    lineNumber.classList.add('line-number')
    lineNumber.textContent = index;

    const content = document.createElement('code');
    if (text.length > 0) content.textContent = text;
    else content.innerHTML = '&NewLine;';
    content.classList.add('line-content')

    line.append(lineNumber);
    line.append(content);
    return line;
  }

  const content = document.querySelector('[data-content]');
  for (let i = 1; i <= _data.length; i++) {
    const line = createLine(i, _data[i - 1]);
    content.append(line);
  }
}

function patchContentData(data) {
  document.querySelector('#title').textContent = data.title;
  document.querySelector('#mml-download-link').href = data['mml_file_url'];
  document.querySelector('#pmd-download-link').href = data['pmd_file_url'];
  createCodeView(data['mml_content']);
}
