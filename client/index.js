const searchField = document.getElementById('search-field');             // 검색창 input 들고 오기
const wordList = document.querySelector('.autocomplete-results');   // unorder list 들고오기

// fetch api를 사용해서 url을 통해 json 정보 string array로 가져오기
const searchWord = async searchText => {
    const res = await fetch('http://localhost:3000/autocomplete?keyword='+ searchField.value);
    const words = await res.json();
    
    
    // 길이가 0이면 unorder List 비우기
    if(searchText.length === 0) {
        wordList.innerHTML = '';
    }

    // html로 내보내는 함수
    renderHtml(words);
};

const renderHtml = words => {
    if(words.length > 0) {
        // 받아온 string array의 가각 string을 하나하나 html로 바꾸어 li로 표현함
        // hover와 click시 완성 기능 추가
        const html = words.map(word => `
            <li onclick="clickWord(this.innerText)" onMouseOver="this.style.color='#00F'" onMouseOut="this.style.color='#000'">
                ${word}
            </li>
        `).join("");

        // unorder List 안으로 집어넣음
        wordList.innerHTML = html;
    }
};

// click시 단어 완성
const clickWord = word => {
   searchField.value = word;
   wordList.innerHTML = '';
}
// input에 event 삽입
searchField.addEventListener('input', () => searchWord(searchField.value));