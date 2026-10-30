import {jobs} from './model.js';

// Exercises are editorial examples, not employer requirements or official training.
const catalogue = Object.freeze({
  'demo-1': [
    {id:'communication',en:'Communication',bn:'যোগাযোগ',exerciseEn:'Practise explaining a customer issue clearly in two sentences.',exerciseBn:'গ্রাহকের একটি সমস্যা দুই বাক্যে স্পষ্ট করে বোঝানোর অনুশীলন করুন।'},
    {id:'computer',en:'Basic computer skills',bn:'মৌলিক কম্পিউটার দক্ষতা',exerciseEn:'Practise organising five fictional customer requests in a table.',exerciseBn:'পাঁচটি কাল্পনিক গ্রাহকের অনুরোধ একটি ছকে সাজানোর অনুশীলন করুন।'}
  ],
  'demo-2': [
    {id:'organisation',en:'Organisation',bn:'কাজ গুছিয়ে করা',exerciseEn:'Prioritise three fictional tasks and explain the order.',exerciseBn:'তিনটি কাল্পনিক কাজ অগ্রাধিকার অনুযায়ী সাজিয়ে কারণ বলুন।'},
    {id:'spreadsheets',en:'Spreadsheets',bn:'স্প্রেডশিট',exerciseEn:'Create a small practice sheet and check a simple total.',exerciseBn:'একটি ছোট অনুশীলনী স্প্রেডশিট বানিয়ে মোট হিসাব যাচাই করুন।'}
  ],
  'demo-3': [
    {id:'html',en:'HTML',bn:'এইচটিএমএল',exerciseEn:'Write a semantic heading and labelled form in a practice file.',exerciseBn:'একটি অনুশীলনী ফাইলে অর্থপূর্ণ শিরোনাম ও লেবেলযুক্ত ফর্ম লিখুন।'},
    {id:'css',en:'CSS',bn:'সিএসএস',exerciseEn:'Make a small practice page readable at phone width.',exerciseBn:'একটি ছোট অনুশীলনী পাতা মোবাইলে পড়ার উপযোগী করুন।'},
    {id:'javascript',en:'JavaScript',bn:'জাভাস্ক্রিপ্ট',exerciseEn:'Write a simple input check and test an invalid value.',exerciseBn:'সহজ ইনপুট যাচাই লিখে একটি ভুল মান দিয়ে পরীক্ষা করুন।'}
  ]
});
export const practiceRoles = Object.freeze(jobs.filter(j=>catalogue[j.id]).map(j=>Object.freeze({
  id:j.id,title:j.title,location:j.location,
  skills:Object.freeze(catalogue[j.id].map(s=>Object.freeze({...s})))
})));
const messages={
  en:{
    choose:'Choose a fictional role to make a practice plan.',
    invalid:'These choices cannot be used. Select a sample role, listed skills and a 15, 30 or 60 minute session.',
    verify:'Check the original circular',
    verifyText:'Before applying to a real role, independently verify the employer, eligibility, deadline and application link. This sample has no real circular.',
    reflect:'Review and decide what to practise next',
    reflectText:'Write down what you understood and what needs more practice. Do not put personal documents into this website.',
    review:'Review a skill you marked as practised',
    note:'Practice plan only. These fictional skills are not verified hiring requirements, training recommendations or proof of eligibility.'
  },
  bn:{
    choose:'অনুশীলনের পরিকল্পনা করতে একটি কাল্পনিক পদ বেছে নিন।',
    invalid:'এই তথ্য দিয়ে পরিকল্পনা করা যায় না। নমুনা পদ, তালিকার দক্ষতা এবং ১৫, ৩০ বা ৬০ মিনিট বেছে নিন।',
    verify:'মূল নিয়োগ বিজ্ঞপ্তি যাচাই করুন',
    verifyText:'বাস্তব পদে আবেদন করার আগে নিয়োগদাতা, যোগ্যতা, শেষ তারিখ ও আবেদন লিংক নিজে যাচাই করুন। এই নমুনার বাস্তব বিজ্ঞপ্তি নেই।',
    reflect:'শেখা বিষয় পর্যালোচনা করুন',
    reflectText:'কী বুঝেছেন এবং কী আরও অনুশীলন দরকার তা নিজের কাছে লিখে রাখুন। এই ওয়েবসাইটে ব্যক্তিগত নথি দেবেন না।',
    review:'অনুশীলন করা একটি দক্ষতা আবার ঝালাই করুন',
    note:'শুধু অনুশীলনের পরিকল্পনা। এই কাল্পনিক দক্ষতাগুলো যাচাইকৃত নিয়োগের শর্ত, প্রশিক্ষণ পরামর্শ বা যোগ্যতার প্রমাণ নয়।'
  }
};
export function createPracticePlan({roleId='',selectedSkillIds=[],minutes=30,language='bn'}={}){
  const lang=language==='en'?'en':'bn', t=messages[lang];
  const role=practiceRoles.find(r=>r.id===roleId);
  if(!role)return {kind:'clarify',message:t.choose};
  const validIds=new Set(role.skills.map(s=>s.id));
  if(![15,30,60].includes(minutes) || !Array.isArray(selectedSkillIds) ||
     selectedSkillIds.length>role.skills.length ||
     selectedSkillIds.some(id=>typeof id!=='string'||!validIds.has(id)) ||
     new Set(selectedSkillIds).size!==selectedSkillIds.length){
    return {kind:'invalid',message:t.invalid};
  }
  const done=new Set(selectedSkillIds);
  const missing=role.skills.filter(s=>!done.has(s.id));
  const focus=(missing.length?missing:role.skills).slice(0,2);
  const practiceMinutes=minutes-10;
  const each=Math.floor(practiceMinutes/focus.length);
  const steps=[
    {kind:'verify',minutes:5,title:t.verify,description:t.verifyText},
    ...focus.map((s,i)=>({
      kind:'practice',minutes:each+(i===0?practiceMinutes-each*focus.length:0),
      title:missing.length?(lang==='bn'?s.bn:s.en):t.review,
      description:lang==='bn'?s.exerciseBn:s.exerciseEn
    })),
    {kind:'reflect',minutes:5,title:t.reflect,description:t.reflectText}
  ];
  return {kind:'ready',roleId:role.id,roleTitle:role.title,minutes,
    practisedCount:done.size,totalSkills:role.skills.length,
    remainingCount:missing.length,steps,note:t.note,
    label:lang==='bn'?'অনুশীলনী পরিকল্পনা · বাস্তব চাকরি নয়':'Practice plan · not a real vacancy'};
}
