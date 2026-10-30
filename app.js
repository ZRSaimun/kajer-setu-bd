import {filterJobs} from './model.js';
import {readSaved, save, escapeHTML} from './common.js';

const KEY = 'kajer-saved-v1';
const $ = id => document.getElementById(id);
let saved = readSaved(KEY, []);
if (!Array.isArray(saved)) saved = [];
saved = saved.filter(id => typeof id === 'string');
let selectedId = null;

function filtered() {
  return filterJobs($('query').value, $('location').value, $('savedOnly').checked, saved);
}

function detail(job) {
  if (!job) {
    $('roleDetail').innerHTML = '<p class="empty-detail">কোনো নমুনা পদ পাওয়া যায়নি। ফিল্টার বদলান বা মুছে আবার চেষ্টা করুন।</p>';
    return;
  }
  $('roleDetail').innerHTML = `
    <p class="detail-tag">FICTIONAL EXAMPLE · NOT A VACANCY</p>
    <h3>${escapeHTML(job.title)}</h3>
    <p class="detail-employer">${escapeHTML(job.employer)} · ${escapeHTML(job.location)}</p>
    <dl class="role-facts"><div><dt>প্রয়োজনীয় দক্ষতার উদাহরণ</dt><dd>${escapeHTML(job.skills)}</dd></div><div><dt>আসল নিয়োগ বিজ্ঞপ্তি</dt><dd>পাওয়া যায়নি / Not provided</dd></div><div><dt>আবেদনের শেষ তারিখ</dt><dd>অজানা / Not verified</dd></div><div><dt>যোগ্যতা ও বেতন</dt><dd>অজানা / Not verified</dd></div></dl>
    <div class="preparation-list"><h4>আবেদনের আগে যা যাচাই করবেন</h4><p>এই তালিকা শুধু এই পাতায় থাকে। টিক দেওয়া মানে তথ্য যাচাই হয়েছে এমন দাবি নয়।</p>
      <label><input type="checkbox"> নিয়োগদাতার নিজস্ব ওয়েবসাইটে বিজ্ঞপ্তি পেয়েছি</label>
      <label><input type="checkbox"> যোগ্যতা ও অবস্থান মিলিয়েছি</label>
      <label><input type="checkbox"> শেষ তারিখ ও আবেদনের নিয়ম মিলিয়েছি</label>
      <label><input type="checkbox"> কোনো অগ্রিম টাকা বা গোপন তথ্য চাওয়া হচ্ছে কি না দেখেছি</label>
    </div>
    <a class="detail-link" href="./role-guide.html">বিজ্ঞপ্তি যাচাই শেখার নির্দেশিকা</a>
    <p class="detail-footnote">এটি কোনো চাকরির আবেদন নয়। সাধারণ <a href="https://alljobs.teletalk.com.bd/" target="_blank" rel="noopener noreferrer">সরকারি নিয়োগ ডিরেক্টরি</a> এই পদের উৎস নয়।</p>`;
}

function render() {
  const list = filtered();
  if (!list.some(job => job.id === selectedId)) selectedId = list[0]?.id ?? null;
  $('count').textContent = `${list.length}টি কল্পিত পদ · No live vacancies`;
  $('jobs').innerHTML = list.length ? list.map(job => `
    <article class="career-role ${job.id === selectedId ? 'is-selected' : ''}">
      <button type="button" class="role-select" data-select="${escapeHTML(job.id)}" aria-pressed="${job.id === selectedId}">
        <span class="role-label">SAMPLE · ${escapeHTML(job.location)}</span>
        <strong>${escapeHTML(job.title)}</strong><span>${escapeHTML(job.employer)}</span>
        <span class="role-hint">দক্ষতা ও যাচাইয়ের তালিকা দেখুন</span>
      </button>
      <button type="button" class="role-save" data-save="${escapeHTML(job.id)}" aria-pressed="${saved.includes(job.id)}">${saved.includes(job.id) ? '★ সংরক্ষিত · Remove' : '☆ নমুনা সংরক্ষণ'}</button>
    </article>`).join('') : '<p class="career-empty">কোনো নমুনা পদ মেলেনি। অন্য শব্দ বা এলাকা চেষ্টা করুন, অথবা ফিল্টার মুছুন।</p>';
  detail(list.find(job => job.id === selectedId));
}

$('jobs').addEventListener('click', event => {
  const button = event.target.closest('button[data-select],button[data-save]');
  if (!button) return;
  if (button.dataset.select) {
    selectedId = button.dataset.select;
    render();
    // Preserve keyboard focus after re-rendering the selected list.
    const next = [...$('jobs').querySelectorAll('[data-select]')].find(el => el.dataset.select === selectedId);
    next?.focus();
    return;
  }
  const id = button.dataset.save;
  saved = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
  $('storage').textContent = save(KEY, saved) ? 'নমুনা এই ব্রাউজারে সংরক্ষিত।' : 'স্টোরেজ বন্ধ: এই সেশনের পর সংরক্ষণ থাকবে না।';
  render();
  const next = [...$('jobs').querySelectorAll('[data-save]')].find(el => el.dataset.save === id);
  next?.focus();
});

for (const id of ['query','location','savedOnly']) {
  $(id).addEventListener(id === 'query' ? 'input' : 'change', render);
}
$('clearFilters').addEventListener('click', () => {
  $('query').value = '';
  $('location').value = '';
  $('savedOnly').checked = false;
  render();
  $('query').focus();
});
render();
