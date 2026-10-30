import {jobs} from './model.js';

// These are navigation routes, not evidence for any fictional role.
export const officialRoutes = Object.freeze([
  {label:'Teletalk government recruitment directory',url:'https://alljobs.teletalk.com.bd/'},
  {label:'National Skills Portal',url:'https://www.skillsportal.gov.bd/'}
]);
export const sampleRoles = jobs.map(job=>Object.freeze({
  ...job, sourceUrl:null, publishedAt:null, deadline:null, verifiedAt:null,
  requirementsVerified:false, exampleOnly:true
}));
const validDay = value => typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0,10)===value;
const safeUrl = value => {try {const url=new URL(value);return url.protocol==='https:' && !url.username && !url.password && ['teletalk.com.bd','gov.bd'].some(domain=>url.hostname===domain||url.hostname.endsWith(`.${domain}`));}catch{return false;}};
export function evidenceState(role,today='2026-10-30'){
  if(!role||!validDay(today))return 'invalid';
  if(role.exampleOnly)return 'demo';
  if(!safeUrl(role.sourceUrl)||!validDay(role.verifiedAt)||!validDay(role.publishedAt))return 'unverified';
  if(role.deadline!==null && role.deadline!==undefined && !validDay(role.deadline))return 'unverified';
  if(role.verifiedAt>today || role.publishedAt>today)return 'unverified';
  if(role.deadline && role.deadline<today)return 'expired';
  const elapsed=(Date.parse(`${today}T00:00:00Z`)-Date.parse(`${role.verifiedAt}T00:00:00Z`))/86400000;
  if(elapsed>7)return 'stale';
  // Even a recently checked URL is not proof of a vacancy or eligibility.
  return 'requires-manual-circular-check';
}
const translations={
  en:{select:'Choose a sample role first. This guide does not assess real eligibility.',private:'Please do not enter identity numbers, passwords, OTPs, or personal documents.',tooLong:'Please ask a shorter question (up to 180 characters).',current:'No live vacancy, deadline, salary or eligibility is verified here. Check the employer’s original circular and application portal yourself.',skills:'These are fictional skill examples, not official hiring criteria. Compare your skills with the requirements in the original employer circular. The National Skills Portal can help you explore training.',apply:'This website cannot apply for jobs. Find the original employer circular, check requirements and deadline, then use only the official application route.',safety:'Treat unexpected fees, password requests, OTP requests and offers without an original employer circular as warning signs. Verify the employer independently.',source:'This fictional role has no employer circular, publication date, verification date or deadline. Its requirements cannot be verified.',unknown:'I cannot verify that from this fictional listing. Open an original employer circular for requirements, fees, dates and application instructions.',label:'Reviewed offline FAQ — not AI, not a live vacancy service.'},
  bn:{select:'আগে একটি নমুনা পেশা বেছে নিন। এখানে বাস্তব যোগ্যতা যাচাই করা হয় না।',private:'জাতীয় পরিচয় নম্বর, পাসওয়ার্ড, ওটিপি বা ব্যক্তিগত নথি লিখবেন না।',tooLong:'অনুগ্রহ করে ১৮০ অক্ষরের মধ্যে প্রশ্ন করুন।',current:'এখানে কোনো বর্তমান শূন্যপদ, সময়সীমা, বেতন বা যোগ্যতা যাচাই করা হয়নি। নিয়োগদাতার মূল বিজ্ঞপ্তি নিজে দেখুন।',skills:'এগুলো কল্পিত দক্ষতার উদাহরণ, সরকারি নিয়োগের শর্ত নয়। মূল বিজ্ঞপ্তির শর্তের সঙ্গে নিজের দক্ষতা মিলিয়ে দেখুন। প্রশিক্ষণের জন্য জাতীয় দক্ষতা পোর্টাল দেখতে পারেন।',apply:'এই সাইট থেকে চাকরির আবেদন করা যায় না। নিয়োগদাতার মূল বিজ্ঞপ্তি, যোগ্যতা ও শেষ তারিখ যাচাই করে কেবল নির্ধারিত আবেদনপথ ব্যবহার করুন।',safety:'অপ্রত্যাশিত ফি, পাসওয়ার্ড বা ওটিপি চাওয়া এবং মূল বিজ্ঞপ্তি ছাড়া চাকরির প্রস্তাব সতর্কতার লক্ষণ। নিয়োগদাতাকে আলাদাভাবে যাচাই করুন।',source:'এই কল্পিত পদের কোনো মূল বিজ্ঞপ্তি, প্রকাশের তারিখ, যাচাইয়ের তারিখ বা শেষ তারিখ নেই। শর্ত যাচাই করা যায় না।',unknown:'এই কল্পিত পদের তথ্য দিয়ে উত্তর যাচাই করা যাচ্ছে না। প্রকৃত শর্ত, ফি, তারিখ ও আবেদনের নিয়ম মূল বিজ্ঞপ্তিতে দেখুন।',label:'পর্যালোচিত অফলাইন প্রশ্নোত্তর — এআই নয়, সরাসরি চাকরির তথ্য নয়।'}
};
export function answerQuestion({question='',roleId='',language='bn'}={}){
  const t=translations[language==='en'?'en':'bn'];
  const q=String(question).trim();
  const role=sampleRoles.find(r=>r.id===roleId);
  const base={label:t.label,links:officialRoutes,role:role?.title??null};
  if(!role)return {...base,kind:'clarify',message:t.select};
  if(q.length>180)return {...base,kind:'reject',message:t.tooLong};
  if(/\b(?:\d[ -]?){8,}\b|[০-৯]{8,}|\b(?:otp|password|passport|nid|pin|cvv)\b|পাসওয়ার্ড|পাসওয়ার্ড|ওটিপি|এনআইডি|পাসপোর্ট/i.test(q))return {...base,kind:'privacy',message:t.private};
  if(/ignore (?:all |previous |the )?instructions|system prompt|developer message|নির্দেশনা উপেক্ষা/i.test(q))return {...base,kind:'abstain',message:t.unknown};
  if(/\b(?:today|current|live|open|vacan\w*|deadline|salary|pay|fee|closing|available)\b|এখন|আজ|চলমান|শেষ তারিখ|বেতন|ফি|শূন্যপদ/i.test(q))return {...base,kind:'unverified',message:t.current};
  if(/\b(?:eligible|qualif\w*|require\w*|age|degree|experience|skill|training)\b|যোগ্য|শিক্ষা|বয়স|অভিজ্ঞতা|দক্ষতা|প্রশিক্ষণ/i.test(q))return {...base,kind:'guidance',message:t.skills};
  if(/\b(?:apply|application|submit|register)\b|আবেদন|জমা/i.test(q))return {...base,kind:'guidance',message:t.apply};
  if(/\b(?:scam|fraud|safe|fake|otp)\b|প্রতারণা|ভুয়া|নিরাপদ/i.test(q))return {...base,kind:'guidance',message:t.safety};
  if(/\b(?:source|proof|verify|circular|date)\b|উৎস|বিজ্ঞপ্তি|যাচাই|তারিখ/i.test(q))return {...base,kind:'unverified',message:t.source};
  return {...base,kind:'abstain',message:t.unknown};
}
