import test from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULTS } from '../app/tools/compliance-capacity-calculator/model.mjs'
import { createAssessment, restoreAssessment, readSavedModels } from '../app/tools/compliance-capacity-calculator/saved-models.mjs'

test('save/restore preserves workload, scenario, readiness and recalculates results',()=>{
 const a=createAssessment({...DEFAULTS,persona:'outsourced',firms:7,scope:'firm',monthlyPrice:800},'cautious',['yes','partial','no','unknown'])
 const restored=restoreAssessment(JSON.parse(JSON.stringify(a)))
 assert.deepEqual(restored,a)
})
test('unquoted payloads never carry ROI or payback',()=>{
 const a=createAssessment()
 assert.equal(a.priceIncluded,false)
 assert.equal(a.result.roi,null);assert.equal(a.result.breakEven,null)
})
test('import drops contacts and ignores supplied financial outputs',()=>{
 const a=createAssessment({...DEFAULTS,email:'should-not-persist@example.com'})
 a.contact={email:'private@example.com'}
 a.result.roi=999999;a.result.breakEven=1
 const restored=restoreAssessment(a)
 assert.equal(restored.result.roi,null);assert.equal(restored.result.breakEven,null)
 assert.equal(JSON.stringify(restored).includes('@example.com'),false)
})
test('v1.0 imports retain the original fixed portfolio overhead',()=>{
 const legacy=createAssessment({...DEFAULTS,persona:'platform',firms:50,scope:'firm'})
 legacy.modelVersion='1.0.0';delete legacy.assumptions.overheadScope
 const restored=restoreAssessment(legacy)
 assert.equal(restored.assumptions.overheadScope,'portfolio')
 assert.equal(restored.result.overheadMonthly,2)
 assert.equal(restored.modelVersion,'1.1.0')
})
test('invalid inputs and unsupported versions cannot restore',()=>{
 const a=createAssessment()
 assert.throws(()=>restoreAssessment({...a,modelVersion:'99'}))
 assert.throws(()=>restoreAssessment({...a,scenario:'invented'}))
 assert.throws(()=>restoreAssessment({...a,readiness:['yes']}))
 assert.throws(()=>restoreAssessment({...a,assumptions:{...a.assumptions,review:Infinity}}))
 assert.throws(()=>restoreAssessment({...a,assumptions:{...a.assumptions,overheadScope:'invented'}}))
})
test('saved lists validate each entry and reject corrupt or duplicate records',()=>{
 const row={id:'one',name:'Seven-firm pilot',savedAt:'2026-09-14T12:00:00.000Z',assessment:createAssessment()}
 assert.equal(readSavedModels(null).length,0)
 assert.equal(readSavedModels(JSON.stringify([row]))[0].name,row.name)
 assert.throws(()=>readSavedModels('not JSON'))
 assert.throws(()=>readSavedModels(JSON.stringify([row,row])))
 assert.throws(()=>readSavedModels(JSON.stringify([{...row,assessment:{}}])))
})
