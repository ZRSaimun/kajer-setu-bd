import {practiceRoles,createPracticePlan} from './practice-model.js';
const $=id=>document.getElementById(id);
const roleSelect=$('practice-role'),skills=$('practice-skills'),result=$('practice-result'),status=$('practice-status');
for(const role of practiceRoles){const option=document.createElement('option');option.value=role.id;option.textContent=role.title+' — '+role.location+' (demo)';roleSelect.append(option);}
function renderSkills(){
  const selected=new Set([...skills.querySelectorAll('input:checked')].map(el=>el.value));
  skills.replaceChildren();
  const legend=document.createElement('legend');legend.textContent=$('practice-language').value==='bn'?'আগে অনুশীলন করেছেন':'Already practised';skills.append(legend);
  const role=practiceRoles.find(r=>r.id===roleSelect.value);
  if(!role){const p=document.createElement('p');p.textContent='Choose a fictional role / একটি নমুনা পদ বেছে নিন';skills.append(p);return;}
  for(const skill of role.skills){
    const label=document.createElement('label'),box=document.createElement('input'),name=document.createElement('span');
    box.type='checkbox';box.name='skill';box.value=skill.id;box.checked=selected.has(skill.id);
    name.textContent=$('practice-language').value==='bn'?skill.bn:skill.en;
    label.append(box,name);skills.append(label);
  }
}
function clearPlan(){
  result.replaceChildren();
  const p=document.createElement('p');p.textContent='No plan is saved. Choose a sample role and generate a new one.';result.append(p);
  $('practice-print').disabled=true;
}
roleSelect.addEventListener('change',()=>{renderSkills();clearPlan();status.textContent='';});
$('practice-language').addEventListener('change',()=>{renderSkills();clearPlan();status.textContent='';});
$('practice-form').addEventListener('submit',event=>{
  event.preventDefault();
  const selected=[...skills.querySelectorAll('input:checked')].map(el=>el.value);
  const plan=createPracticePlan({roleId:roleSelect.value,selectedSkillIds:selected,minutes:Number($('practice-minutes').value),language:$('practice-language').value});
  result.replaceChildren();
  if(plan.kind!=='ready'){
    const p=document.createElement('p');p.textContent=plan.message;result.append(p);status.textContent=plan.message;$('practice-print').disabled=true;result.focus();return;
  }
  const heading=document.createElement('h3');heading.textContent=plan.roleTitle+' · '+plan.minutes+' min';
  const meta=document.createElement('p');meta.textContent=plan.label+' · '+plan.practisedCount+'/'+plan.totalSkills+' sample skills already practised';
  const list=document.createElement('ol');
  for(const step of plan.steps){
    const li=document.createElement('li'),title=document.createElement('strong'),duration=document.createElement('span'),description=document.createElement('p');
    title.textContent=step.title;duration.className='minutes';duration.textContent=' · '+step.minutes+' min';description.textContent=step.description;
    li.append(title,duration,description);list.append(li);
  }
  const note=document.createElement('p');note.className='plan-note';note.textContent=plan.note;
  result.append(heading,meta,list,note);$('practice-print').disabled=false;
  status.textContent=$('practice-language').value==='bn'?'পরিকল্পনা তৈরি হয়েছে। কোনো তথ্য পাঠানো হয়নি।':'Plan ready. No data was sent.';
  result.focus();
});
$('practice-clear').addEventListener('click',()=>{
  roleSelect.value='';$('practice-minutes').value='30';renderSkills();clearPlan();
  status.textContent='Cleared. No choices were stored.';roleSelect.focus();
});
$('practice-print').addEventListener('click',()=>{
  if($('practice-print').disabled)return;
  if(typeof window.print!=='function'){status.textContent='Printing is unavailable. The plan remains readable on this page.';return;}
  try{window.print();}catch{status.textContent='Printing was blocked. The plan remains readable on this page.';}
});
renderSkills();
