import test from 'node:test'
import assert from 'node:assert/strict'
import { calculate, DEFAULTS } from '../app/tools/compliance-capacity-calculator/model.mjs'

test('zero workload and zero overhead produces no invented value',()=>{
 const r=calculate({...DEFAULTS,review:0,meetings:0,retrieval:0,preparation:0,overhead:0,setupHours:0})
 assert.equal(r.net,0);assert.equal(r.grossHours,0);assert.equal(r.capacity,0)
})
test('missing coverage creates no gross time benefit',()=>{
 assert.equal(calculate({...DEFAULTS,coverage:0}).grossHours,0)
})
test('portfolio hours do not multiply again; per-firm hours do',()=>{
 const a=calculate()
 const b=calculate({...DEFAULTS,persona:'outsourced',firms:7})
 const c=calculate({...DEFAULTS,persona:'outsourced',firms:7,scope:'firm'})
 assert.equal(a.baseline,b.baseline);assert.equal(c.baseline,a.baseline*7)
 assert.equal(c.subscription,a.subscription)
})
test('ramp and overhead reconcile to net economic value',()=>{
 const s={...DEFAULTS,monthlyPrice:249,setupFee:500,avoidableSpend:20}
 const r=calculate(s)
 assert.ok(Math.abs(r.net-(r.released*s.hourly+12*s.avoidableSpend-12*s.monthlyPrice-s.setupFee))<1e-7)
 assert.ok(Math.abs(r.released-(r.grossHours*11/12-24-8))<1e-7)
 assert.equal(r.cash,240-2988-500)
})
test('scenario ordering and limits',()=>{
 const a=calculate(DEFAULTS,'cautious'),b=calculate(),c=calculate(DEFAULTS,'stretch')
 assert.ok(a.net<=b.net&&b.net<=c.net)
 const top=calculate({...DEFAULTS,coverage:100,adoption:100,reductionReview:100,reductionMeetings:100,reductionRetrieval:100,reductionPreparation:100},'stretch')
 assert.ok(top.grossHours<=top.baseline*.9+1e-7)
})
test('no archive savings and no fabricated cash savings',()=>{
 const a=calculate(),b=calculate({...DEFAULTS,archiveSpend:10000})
 assert.equal(a.net,b.net);assert.equal(a.cash,0)
 assert.equal(calculate({...DEFAULTS,monthlyPrice:200}).cash,-2400)
})
test('negative case remains negative',()=>{
 const r=calculate({...DEFAULTS,coverage:0,monthlyPrice:500})
 assert.ok(r.net<0);assert.equal(r.breakEven,null)
})
test('zero adoption, invalid numbers, zero capacity denominator',()=>{
 assert.equal(calculate({...DEFAULTS,adoption:0}).grossHours,0)
 assert.ok(Number.isFinite(calculate({...DEFAULTS,hourly:Infinity,review:NaN}).net))
 assert.equal(calculate({...DEFAULTS,firmHours:0}).capacity,null)
})
