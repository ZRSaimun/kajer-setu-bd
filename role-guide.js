import {sampleRoles,answerQuestion} from './role-guide-model.js';
const $=id=>document.getElementById(id);
for(const role of sampleRoles){const option=document.createElement('option');option.value=role.id;option.textContent=`${role.title} — ${role.location} (demo)`;$('role').append(option);}
function show(question){const result=answerQuestion({question,roleId:$('role').value,language:$('language').value});const answer=$('answer');answer.replaceChildren();const status=document.createElement('p');status.className='eyebrow';status.textContent=result.label;const content=document.createElement('p');content.textContent=result.message;answer.append(status,content);answer.focus();$('feedback').textContent=result.kind==='clarify'?'Choose a sample role to continue.':'Guidance updated. No data sent.';}
$('question-form').addEventListener('submit',event=>{event.preventDefault();show($('question').value);});
document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{$('question').value=button.dataset.question;show(button.dataset.question);}));
$('clear').addEventListener('click',()=>{$('question').value='';$('answer').replaceChildren();const p=document.createElement('p');p.textContent='Cleared on this device. No chat history was saved.';$('answer').append(p);$('feedback').textContent='History cleared.';$('question').focus();});
