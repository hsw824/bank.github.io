//종이 늘리기 터치무브로도 해보기
const slide = document.querySelector('.up-slide');
const CLICKED_CLASS = 'clicked';
const bts = document.querySelector('.bottom-section');

function ySlide(){
    const hasClass = bts.classList.contains(CLICKED_CLASS);
    if(!hasClass){
        bts.classList.add(CLICKED_CLASS);
    }else{
        bts.classList.remove(CLICKED_CLASS);
    };
};


slide.addEventListener('click', ySlide);


// // x축 슬라이드
let curPos = 0;
let postion = 0;
let start_x, end_x;
const IMAGE_WIDTH = 162;
const images = document.querySelector(".goal-wrap") 
 
images.addEventListener('touchstart', touch_start);
images.addEventListener('touchend', touch_end);
 
function goPrev(){
  if(curPos > 0){
    postion += IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
  }
}
function goNext(){
  if(curPos < 6){
    postion -= IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
  }
}
 
function touch_start(event) {
  start_x = event.touches[0].pageX
}
 
function touch_end(event) {
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    goNext();
  }else{
    goPrev();
  }
}




//전체화면 바꾸기로 진행하기

const slides = document.querySelector('.view-wrap'); //전체 슬라이드 컨테이너 
const slideImg = document.querySelectorAll('.view-wrap >section'); //모든 슬라이드들 
let currentIdx = 0; //현재 슬라이드 index 
const slideCount = slideImg.length; // 슬라이드 개수 
const prev = document.querySelector('#prev'); //이전 버튼 
const next = document.querySelector('#next'); //다음 버튼 
const slideWidth = 375; //한개의 슬라이드 넓이 
// const slideMargin = 100; //슬라이드간의 margin 값



//전체 슬라이드 컨테이너 넓이 설정 

function moveSlide(num) { 
  slides.style.left = -num * 375 + 'px';
  currentIdx = num; 
} 
prev.addEventListener('click', function () { 
  /*첫 번째 슬라이드로 표시 됐을때는 이전 버튼 눌러도 아무런 반응 없게 하기 위해 currentIdx !==0일때만 moveSlide 함수 불러옴 */ 
  if (currentIdx !== 0) moveSlide(currentIdx - 1); }); 
  next.addEventListener('click', function () { 
    /* 마지막 슬라이드로 표시 됐을때는 다음 버튼 눌러도 아무런 반응 없게 하기 위해 currentIdx !==slideCount - 1 일때만 moveSlide 함수 불러옴 */ 
    if (currentIdx !== slideCount -1) {
      moveSlide(currentIdx + 1); 
    } 
  });


