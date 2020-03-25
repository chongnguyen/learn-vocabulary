window.addEventListener('DOMContentLoaded', function(){
  let words = JSON.parse(localStorage.getItem('words')) || [];

  let input = document.getElementById('input');
  let btn = document.getElementById('btn');
  let content = document.getElementById('mean');

  // Closuer
  let count = (function(){
    let n = 0;
    return {
      increa(){
        return n++;
      },
      reduce(){
        return n--;
      },
      reset(){
        n = 0;
      }
    }
  })();

  btn.addEventListener('click', function(){
    checkWord();
  });

  input.addEventListener('keypress', function(event){
    // console.log(event.keyCode);
    if(event.keyCode == 13){
      checkWord();
    }
  });

  function checkWord(){
    let n = count.increa();
    if(input.value.toLowerCase() == words[n].word.toLowerCase()){
      notification();
      render(++n);
      input.value = '';
    } else {
      count.reduce();
      notification('alertDanger');
    }
  }

  function notification(elem = 'alertSuccess'){
      document.getElementById(elem).style.opacity = 1;
      setTimeout(function() {
        document.getElementById(elem).style.opacity = 0;
      }, 3000);
  }

  function render(n = 0){
    if(n >= words.length) {
      alert('chuc mung ban da hoan thanh bai test');
      location.assign('/');
      return;
    }
    content.innerHTML = (n + 1) + '. ' + words[n].mean;
  }
  render();
});