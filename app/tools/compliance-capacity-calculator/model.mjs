/**
 * Model v1.1.0. All defaults are illustrative, not measured ComplyVault outcomes.
 * Recurring workload inputs are monthly; preparationHours is annual.
 */
export const WORKFLOWS = [
 {key:'review',label:'Communications review',description:'Triage, sampling and documenting review decisions.',reduction:35},
 {key:'meetings',label:'Meeting documentation',description:'Preparing structured records after adviser meetings.',reduction:50},
 {key:'retrieval',label:'Evidence retrieval',description:'Searching, linking and assembling supporting records.',reduction:45},
 {key:'preparation',label:'Exam & annual-review preparation',description:'Incremental preparation only; exclude work counted above.',reduction:30},
];
export const DEFAULTS = {
 persona:'ria',registration:'sec',firms:1,scope:'portfolio',hourly:95,
 review:16,meetings:20,retrieval:6,preparation:24,
 reductionReview:35,reductionMeetings:50,reductionRetrieval:45,reductionPreparation:30,
 coverage:80,adoption:80,ramp:3,overhead:2,overheadScope:'firm',setupHours:8,
 monthlyPrice:0,setupFee:0,avoidableSpend:0,cashPercent:0,
 archiveSpend:100,firmHours:120,
};
export function calculate(input = DEFAULTS, scenario = 'base') {
 const s = {...DEFAULTS,...input};
 const n = (key, max=10000000) => Math.min(max,Math.max(0,Number(s[key])||0));
 const factor = scenario==='cautious' ? 0.6 : scenario==='stretch' ? 1.25 : 1;
 const firms = s.persona==='ria' || s.persona==='internal' ? 1 : Math.max(1,Math.floor(n('firms',1000)));
 const scope = s.scope==='firm' ? firms : 1;
 const rate=n('hourly',2000), coverage=n('coverage',100)/100, adoption=n('adoption',100)/100;
 const reductions=['reductionReview','reductionMeetings','reductionRetrieval','reductionPreparation'];
 const rows=WORKFLOWS.map((w,i)=>{
   const annual=n(w.key)*scope*(w.key==='preparation'?1:12);
   const reduction=Math.min(0.9,n(reductions[i],100)/100*factor);
   return {...w,annual,reduction,saved:annual*reduction*coverage*adoption};
 });
 const grossHours=rows.reduce((a,r)=>a+r.saved,0);
 const baseline=rows.reduce((a,r)=>a+r.annual,0);
 const ramp=Math.floor(n('ramp',12));
 const overheadMonthly=n('overhead')*(s.overheadScope==='firm'?firms:1);
 const overhead=overheadMonthly*12;
 const subscription=n('monthlyPrice')*12, setup=n('setupFee')+n('setupHours')*rate;
 const avoided=n('avoidableSpend')*12, archive=n('archiveSpend')*12;
 let running=-setup, cash=-n('setupFee')-n('setupHours')*rate*n('cashPercent',100)/100;
 let released=-n('setupHours');
 const months=[{month:0,net:running,cash,hours:0}];
 for(let month=1;month<=12;month++){
   const rampFactor=ramp===0?1:Math.min(1,month/ramp);
   const hours=grossHours/12*rampFactor-overhead/12;
   released+=hours;
   running+=hours*rate-subscription/12+avoided/12;
   cash+=hours*rate*n('cashPercent',100)/100-subscription/12+avoided/12;
   months.push({month,net:running,cash,hours});
 }
 const investment=subscription+setup+overhead*rate;
 const priceIncluded=n('monthlyPrice')>0;
 // Sustained break-even: later months must not fall below zero again.
 const breakEven=!priceIncluded || investment===0 ? null : months.find((m,i)=>i>0 && m.net>=0 && months.slice(i).every(p=>p.net>=0))?.month ?? null;
 return {rows,firms,baseline,grossHours,released,net:running,cash,months,investment,
  roi:priceIncluded&&investment>0?running/investment*100:null,breakEven,subscription,setup,archive,
  priceIncluded,valueBasis:priceIncluded?'net_capacity_value':'before_subscription',overheadMonthly,
  steadyHours:grossHours-overhead,
  capacity:n('firmHours')>0?Math.max(0,grossHours-overhead)/n('firmHours'):null,
  totalCurrentCost:baseline*rate+archive,
  effectiveReduction:baseline>0?grossHours/baseline*100:0,
 };
}
