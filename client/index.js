const search = document.getElementById('search-field');             // 검색창 input 들고 오기
const dataList = document.querySelector('.autocomplete-results');   // unorder list 들고오기

// fetch api를 사용해서 url을 통해 json 정보 string array로 가져오기
const searchData = async searchText => {
    const res = await fetch('http://localhost:3000/autocomplete?keyword='+search.value);
    const datas = await res.json();
    
    
    // 길이가 0이면 unorder List 비우기
    if(searchText.length === 0) {
        dataList.innerHTML = '';
    }

    // html로 내보내는 함수
    outputHtml(datas);
};

const outputHtml = datas => {
    if(datas.length > 0) {
        // 받아온 string array의 가각 string을 하나하나 html로 바꾸어 li로 표현함
        const html = datas.map(data => `
            <li>
                ${data}
            </li>
        `);

        // unorder List 안으로 집어넣음
        dataList.innerHTML = html;
    }
};

// input에 event 삽입
search.addEventListener('input', () => searchData(search.value));