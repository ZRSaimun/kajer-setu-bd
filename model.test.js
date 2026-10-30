import {test} from 'node:test';
import assert from 'node:assert/strict';
import {filterJobs} from './model.js';
import {escapeHTML} from './common.js';
test('core workflow and failure cases',()=>{assert.equal(filterJobs('WEB').length,1);assert.equal(filterJobs('','Dhaka').length,1);assert.equal(filterJobs('','',true,[]).length,0);assert.equal(filterJobs('','',true,['demo-2'])[0].location,'Chattogram');assert.equal(filterJobs('<script>').length,0);});
test('escape untrusted text',()=>{assert.equal(escapeHTML('<script>'), '&lt;script&gt;');});
