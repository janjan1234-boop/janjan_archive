const notes=[
 {cat:'ux',tag:'UI/UX',id:'01',title:'좋은 사용자 경험은 어디서 시작될까?',summary:'사용자 관찰과 문제 정의를 배우며 정리한 첫 번째 메모.',detail:'사용자 경험 디자인의 출발점으로 관찰, 질문, 문제 정의를 살펴보는 학습 기록 예시입니다.'},
 {cat:'ai',tag:'AI',id:'02',title:'프롬프트 한 문장이 바꾸는 결과',summary:'생성형 AI를 실험하며 발견한 표현의 차이.',detail:'프롬프트의 맥락과 제약, 반복 실험이 결과를 어떻게 바꾸는지 기록하는 글의 예시입니다.'},
 {cat:'process',tag:'과정 기록',id:'03',title:'처음 만든 와이어프레임을 돌아보며',summary:'화면을 그리기 전에 사용자 흐름부터 생각하기.',detail:'초안, 피드백, 수정 이유를 함께 남기는 제작 과정 기록의 예시입니다.'},
 {cat:'ux',tag:'UI/UX',id:'04',title:'버튼 하나에도 이유가 필요하다',summary:'인터랙션과 정보 위계를 연습하며 남긴 생각.',detail:'클릭 가능한 요소의 상태와 안내 문구, 정보의 우선순위를 살펴보는 학습 기록 예시입니다.'},
 {cat:'ai',tag:'AI',id:'05',title:'AI 도구를 디자인 과정에 더하기',summary:'아이디어 발산부터 이미지 탐색까지의 활용 메모.',detail:'AI 도구를 어떤 단계에서 활용하고 어떻게 결과를 검토할지 정리하는 기록 예시입니다.'},
 {cat:'process',tag:'과정 기록',id:'06',title:'이번 주 배움, 세 줄로 정리하기',summary:'잘된 점과 막힌 점, 다음에 시도할 일을 기록.',detail:'짧은 회고를 쌓아 변화의 흐름을 확인하는 주간 기록의 예시입니다.'}
];
const projects={
 service:{tag:'UI/UX DESIGN / SAMPLE PROJECT',title:'감정 기록 서비스 디자인',detail:'일상 속 감정을 쉽게 돌아볼 수 있는 모바일 서비스 콘셉트입니다. 사용자 흐름, 화면 구조, 주요 인터랙션을 소개할 수 있는 프로젝트 상세 공간입니다.'},
 ai:{tag:'AI EXPERIMENT / SAMPLE PROJECT',title:'생성형 AI 비주얼 실험',detail:'프롬프트를 여러 번 조정하며 이미지의 분위기와 구성을 탐색하는 프로젝트 예시입니다. 작업 과정과 결과를 이곳에 정리할 수 있습니다.'},
 research:{tag:'UX RESEARCH / SAMPLE PROJECT',title:'사용자 리서치 노트',detail:'사용자 인터뷰와 관찰을 통해 발견한 문제, 인사이트, 디자인 방향을 정리하는 프로젝트 예시입니다.'}
};
const list=document.querySelector('#notes'),search=document.querySelector('#search');let filter='all';
function render(){const q=search.value.trim().toLocaleLowerCase();const matched=notes.filter(n=>(filter==='all'||n.cat===filter)&&[n.title,n.summary,n.tag].join(' ').toLocaleLowerCase().includes(q));list.innerHTML=matched.map(n=>'<button class="note" type="button" data-note="'+n.id+'"><span class="note-top"><span>'+n.tag+' / 예시 기록</span><span>NOTE '+n.id+'</span></span><h3>'+n.title+'</h3><p>'+n.summary+'</p><span class="note-bottom">기록 읽기 <span>↗</span></span></button>').join('');document.querySelector('#empty').hidden=matched.length>0}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filters .selected')?.classList.remove('selected');b.classList.add('selected');filter=b.dataset.filter;render()}));search.addEventListener('input',render);render();
const dialog=document.querySelector('#detail');document.addEventListener('click',e=>{let item;const p=e.target.closest('[data-project]'),n=e.target.closest('[data-note]');if(p)item=projects[p.dataset.project];if(n){const v=notes.find(x=>x.id===n.dataset.note);item={tag:v.tag+' / SAMPLE NOTE',title:v.title,detail:v.detail}}if(!item)return;document.querySelector('#detail-body').innerHTML='<small>'+item.tag+'</small><h2>'+item.title+'</h2><p>'+item.detail+'</p><div class="notice">이 콘텐츠는 실제 기록을 넣기 전 화면 구성을 보여주는 예시입니다. 수업에서 만든 작업과 글로 교체할 수 있습니다.</div>';dialog.showModal()});
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.sidebar nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}),{rootMargin:'-30% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
