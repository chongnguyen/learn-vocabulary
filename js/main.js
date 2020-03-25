window.addEventListener('DOMContentLoaded', function(){
  var words = JSON.parse(localStorage.getItem('words')) || [];

  let table = document.getElementById('table-bd');
  let inputWord = document.getElementById('input-word');
  let inputMean = document.getElementById('input-mean');
  let btnAdd = document.getElementById('btn-add');

  btnAdd.addEventListener('click', function(){
    let data = {
      word: inputWord.value,
      mean: inputMean.value
    };

    words.push(data);
    render();
    localStorage.setItem('words', JSON.stringify(words));
    // set lai input.
    inputWord.value = '';
    inputMean.value = '';
  });

  table.addEventListener('click', function(event){
    if(event.target.className.indexOf('btn-remove') > -1){
      removeWord(event.target);
    }
  });
  
  function removeWord(btn){
    let id = btn.dataset.id;
    words.splice(id, 1);
    render();
    localStorage.setItem('words', JSON.stringify(words));
  }

  function sortWord(a, b){
    let word1 = a.word.toUpperCase();
    let word2 = b.word.toUpperCase();
    if(word1 > word2){
      return 1;
    } else if(word1 < word2){
      return -1;
    }
    return 0;
  }
  
  function render(){
    words.sort(sortWord);
    let data = words.map((item, i) => {
      return '<tr><td>'+ (i + 1) +'</td><td>' + item.word + '</td><td>' + 
      item.mean + '</td><td class="btn-remove" data-id=' + i + '>&times;</td></tr>'
    });
    table.innerHTML = data.join('');
  }
  render();
});