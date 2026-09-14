import { calculate, DEFAULTS } from './model.mjs'

export const MODEL_VERSION = '1.1.0'
export const STORAGE_KEY = 'complyvault.capacity.saved.v1'
export const MAX_FILE_SIZE = 128 * 1024

const choices = {
 persona:['ria','internal','outsourced','platform','provider','other'],
 registration:['sec','state','mixed','other'],
 scope:['portfolio','firm'],
 overheadScope:['portfolio','firm'],
}
const maximums = {
 firms:1000,hourly:2000,review:100000,meetings:100000,retrieval:100000,preparation:100000,
 reductionReview:90,reductionMeetings:90,reductionRetrieval:90,reductionPreparation:90,
 coverage:100,adoption:100,ramp:12,overhead:100000,setupHours:100000,
 monthlyPrice:100000,setupFee:100000,avoidableSpend:100000,cashPercent:100,
 archiveSpend:100000,firmHours:100000,
}
const object = value => value!==null && typeof value==='object' && !Array.isArray(value)

// Explicit whitelist. Imported contacts, results, HTML and unknown fields never propagate.
export function createAssessment(inputs=DEFAULTS, scenario='base', readiness=['unknown','unknown','unknown','unknown']) {
 const assumptions={...DEFAULTS}
 for (const key of Object.keys(DEFAULTS)) assumptions[key]=inputs[key] ?? DEFAULTS[key]
 const result=calculate(assumptions,scenario)
 return {
  modelVersion:MODEL_VERSION,scenario,assumptions,readiness:[...readiness],
  priceIncluded:result.priceIncluded,result,
  statement:'Illustrative planning model. Staff capacity is not guaranteed cash savings. Existing archive retained.',
 }
}

export function restoreAssessment(value) {
 if(!object(value) || !['1.0.0',MODEL_VERSION].includes(value.modelVersion) || !object(value.assumptions))
  throw new Error('Choose a ComplyVault model exported as version 1.0 or 1.1.')
 const inputs={...DEFAULTS}
 for(const key of Object.keys(DEFAULTS)){
  // Older models used portfolio overhead. Preserve that meaning when restoring.
  const v=key==='overheadScope' && value.modelVersion==='1.0.0' ? 'portfolio' : value.assumptions[key]
  if(v===undefined) throw new Error('The model is missing an assumption: '+key)
  if(typeof DEFAULTS[key]==='number'){
   if(typeof v!=='number' || !Number.isFinite(v) || v<0 || v>maximums[key])
    throw new Error('Invalid number for '+key+'. The current model has not changed.')
   if((key==='firms' && (v<1 || !Number.isInteger(v))) || (key==='ramp' && !Number.isInteger(v)))
    throw new Error('Firm count and ramp months must be whole numbers.')
  }else if(!choices[key].includes(v)) throw new Error('Invalid choice for '+key)
  inputs[key]=v
 }
 if(!['cautious','base','stretch'].includes(value.scenario)) throw new Error('Invalid model scenario.')
 if(!Array.isArray(value.readiness) || value.readiness.length!==4 ||
    value.readiness.some(v=>!['unknown','yes','partial','no'].includes(v))) throw new Error('Invalid readiness answers.')
 // Recalculate rather than trusting potentially stale or modified saved outputs.
 return createAssessment(inputs,value.scenario,value.readiness)
}

export function readSavedModels(raw) {
 if(!raw) return []
 if(raw.length>1024*1024) throw new Error('Saved model storage is too large to read.')
 const rows=JSON.parse(raw)
 if(!Array.isArray(rows) || rows.length>20) throw new Error('Saved model storage is not valid.')
 const ids=new Set()
 return rows.map(row=>{
  if(!object(row)||typeof row.id!=='string'||!row.id||ids.has(row.id)||
   typeof row.name!=='string'||!row.name.trim()||row.name.length>80||
   typeof row.savedAt!=='string'||!Number.isFinite(Date.parse(row.savedAt))) throw new Error('A saved model could not be read.')
  ids.add(row.id)
  return {id:row.id,name:row.name,savedAt:row.savedAt,assessment:restoreAssessment(row.assessment)}
 })
}
