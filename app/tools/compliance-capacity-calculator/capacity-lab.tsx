'use client'

import { useId, useMemo, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { calculate, DEFAULTS, WORKFLOWS } from './model.mjs'
import styles from './capacity.module.css'

type Inputs = typeof DEFAULTS
type Reading = { title:string; slug:string; excerpt:string; image:string|null; alt:string }
type Scenario = 'cautious'|'base'|'stretch'
type Result = ReturnType<typeof calculate>
const currency = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)
const number = (value:number) => new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(value)
const scenarios: {key:Scenario;label:string}[] = [{key:'cautious',label:'Cautious'},{key:'base',label:'Working case'},{key:'stretch',label:'Stretch'}]
const readinessLabels = ['Client records can be retrieved across every business channel','Review decisions are linked to supporting evidence','Missing or unindexed channels are visible to the reviewer','An evidence pack can be reproduced from its source records']
const readinessActions = ['Map business channels to their archive and test one client retrieval.','Sample a cleared finding and trace the decision back to its evidence.','List missing channels explicitly before relying on any search result.','Rebuild a previous request and verify sources, participants and timestamps.']

function Field({label,hint,value,onChange,max=100000,step=1,range=false}:{label:string;hint?:string;value:number;onChange:(v:number)=>void;max?:number;step?:number;range?:boolean}) {
 const id=useId()
 return <label className={styles.field} htmlFor={id}><span>{label}{range&&<b>{value}%</b>}</span>
  <input id={id} type={range?'range':'number'} min={0} max={max} step={step} value={value} onChange={e=>onChange(Math.min(max,Math.max(0,Number(e.target.value)||0)))}/>
  {hint&&<small>{hint}</small>}
 </label>
}
function WorkflowChart({result}:{result:Result}) {
 const id=useId().replace(/:/g,'')
 const max=Math.max(1,...result.rows.map(row=>row.annual))
 return <>
 <svg className={styles.chart} viewBox="0 0 680 290" role="img" aria-label="Annual baseline and released hours for each workflow. Exact values follow in the table.">
 <defs><filter id={id} x="0" y="-20%" width="100%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".05 .6" numOctaves="2" seed="8" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
 {result.rows.map((row,i)=><g key={row.key}>
  <text x="0" y={22+i*65}>{row.label}</text>
  <rect x="0" y={33+i*65} width={540*row.annual/max} height="17" fill="#dee7df"/>
  <rect className={styles.brush} x="0" y={33+i*65} width={540*row.saved/max} height="17" fill="#117a4b" filter={'url(#'+id+')'}/>
  <text x="670" y={47+i*65} textAnchor="end">{number(row.saved)} / {number(row.annual)}h</text>
 </g>)}
 <text x="0" y="286">0h</text><text x="540" y="286" textAnchor="end">{number(max)}h / year</text>
 </svg>
 <p className={styles.small}>Green: hours potentially released at full adoption. Grey: current workload. First-year ramp and extra review effort are applied below.</p>
 </>
}
function ValueChart({result,priceKnown}:{result:Result;priceKnown:boolean}) {
 const [month,setMonth]=useState(12)
 const id=useId().replace(/:/g,'')
 const values=result.months.flatMap(p=>[p.net,p.cash,0])
 const low=Math.min(...values), high=Math.max(1,...values), span=high-low||1
 const x=(m:number)=>70+m*46
 const y=(v:number)=>225-(v-low)/span*185
 const path=(key:'net'|'cash')=>result.months.map((p,i)=>(i?'L':'M')+x(p.month)+' '+y(p[key])).join(' ')
 const selected=result.months[month]
 return <>
 <div className={styles.legend}><span>{priceKnown?'Cumulative net capacity value':'Capacity value before subscription'}</span><span>{priceKnown?'Modelled cash balance':'Cash balance before subscription'}</span></div>
 <svg className={styles.chart} viewBox="0 0 650 270" role="img" aria-label="Cumulative capacity value and cash balance from implementation to month twelve. Use the month slider for exact values.">
 <defs><filter id={id} x="-5%" y="-10%" width="110%" height="120%"><feTurbulence baseFrequency=".02 .4" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter></defs>
 {[0,.5,1].map(t=>{const v=low+span*t;return <g key={t}><line x1="70" x2="622" y1={y(v)} y2={y(v)} stroke="#dce5de"/><text x="62" y={y(v)+4} textAnchor="end">{Math.abs(v)>=1000?(v/1000).toFixed(1)+'k':number(v)}</text></g>})}
 <line x1="70" x2="622" y1={y(0)} y2={y(0)} stroke="#849b8b" strokeDasharray="4 5"/>
 <path d={path('net')} fill="none" stroke="#117a4b" strokeWidth="8" opacity=".18" filter={'url(#'+id+')'}/>
 <path d={path('net')} fill="none" stroke="#117a4b" strokeWidth="2.5"/>
 <path d={path('cash')} fill="none" stroke="#b65031" strokeWidth="2.5" strokeDasharray="6 4"/>
 {[0,3,6,9,12].map(m=><text key={m} x={x(m)} y="255" textAnchor="middle">{m===0?'Setup':'M'+m}</text>)}
 <line x1={x(month)} x2={x(month)} y1="30" y2="230" stroke="#12372c" opacity=".3"/>
 {result.months.map(p=><circle key={p.month} cx={x(p.month)} cy={y(p.net)} r={month===p.month?6:4} fill="#117a4b" tabIndex={0} role="button" aria-label={'Month '+p.month+': '+currency(p.net)} onMouseEnter={()=>setMonth(p.month)} onFocus={()=>setMonth(p.month)} onClick={()=>setMonth(p.month)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setMonth(p.month)}}}/>)}
 </svg>
 <label className={styles.field}><span>Explore month {month}<b>{currency(selected.net)}</b></span><input type="range" min="0" max="12" value={month} onChange={e=>setMonth(Number(e.target.value))}/><small>USD · cash balance: {currency(selected.cash)}. Preparation effort is spread evenly over the year for planning.</small></label>
 </>
}

export default function CapacityLab({reading}:{reading:Reading[]}) {
 const [inputs,setInputs]=useState<Inputs>({...DEFAULTS})
 const [scenario,setScenario]=useState<Scenario>('base')
 const [checks,setChecks]=useState(['unknown','unknown','unknown','unknown'])
 const [contact,setContact]=useState({name:'',email:'',company:'',consent:false,website:''})
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle')
 const [token,setToken]=useState<string|null>(null)
 const captcha=useRef<TurnstileInstance>(null)
 const key=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
 const captchaReady=Boolean(key && key!=='1x00000000000000000000AA')
 const result=useMemo(()=>calculate(inputs,scenario),[inputs,scenario])
 const allCases=useMemo(()=>scenarios.map(s=>({...s,result:calculate(inputs,s.key)})),[inputs])
 const priceKnown=inputs.monthlyPrice>0
 const multi=!['ria','internal'].includes(inputs.persona)
 const confirmed=checks.filter(c=>c==='yes').length
 const known=checks.filter(c=>c!=='unknown').length
 const set=<K extends keyof Inputs>(key:K,value:Inputs[K])=>setInputs(p=>({...p,[key]:value}))
 const snapshot=()=>({modelVersion:'1.0.0',date:new Date().toISOString(),scenario,assumptions:inputs,priceIncluded:priceKnown,readiness:checks,result,statement:'Illustrative planning model. Capacity value is not guaranteed cash savings. Existing archive retained.'})
 function download(){
  const blob=new Blob([JSON.stringify(snapshot(),null,2)],{type:'application/json'})
  const url=URL.createObjectURL(blob),a=document.createElement('a')
  a.href=url;a.download='complyvault-capacity-model.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
 }
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault()
  if(status==='sending'||contact.website||!contact.consent||!token||!captchaReady)return
  setStatus('sending')
  try{
   const response=await fetch('https://formspree.io/f/xnjjoely',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({
    firstName:contact.name,email:contact.email,company:contact.company,
    _subject:'ComplyVault capacity model discussion',
    message:JSON.stringify(snapshot()),'cf-turnstile-response':token,
    consent:'Visitor requested contact about this model; no marketing subscription.',
   }),signal:AbortSignal.timeout(15000)})
   if(!response.ok)throw new Error('Submission failed')
   setStatus('success')
  }catch{setStatus('error')}finally{setToken(null);captcha.current?.reset()}
 }
 return <main className={styles.lab}><div className={styles.wrap}>
 <nav className={styles.nav} aria-label="Main navigation"><Link className={styles.logo} href="/">ComplyVault<span style={{color:'#117a4b'}}> / </span>Capacity Lab</Link><div className={styles.navlinks}><Link href="/blog">Field notes</Link><a href="#methodology">Methodology</a></div></nav>
 <header className={styles.intro}><div className={styles.eyebrow}>An interactive field guide · Model 1.0</div><h1>What is the cost of<br/>reconstructing compliance?</h1><p className={styles.lead}>Move from scattered records to a working business case. Model the hours behind review, documentation and evidence preparation—then see what improving that process could release.</p></header>
 <div className={styles.workspace}>
 <aside className={styles.controls} aria-label="Model assumptions">
 <h2>Your operating reality</h2><p className={styles.small}>Start with illustrative inputs. Replace them with your own workload; all financial amounts are USD.</p>
 <label className={styles.field}><span>I work as</span><select value={inputs.persona} onChange={e=>set('persona',e.target.value)}><option value="ria">An RIA / advisory firm</option><option value="internal">An internal compliance team</option><option value="outsourced">An outsourced / fractional CCO</option><option value="platform">A multi-firm platform</option><option value="provider">A compliance technology provider</option><option value="other">Another compliance operator</option></select></label>
 <label className={styles.field}><span>Registration context</span><select value={inputs.registration} onChange={e=>set('registration',e.target.value)}><option value="sec">SEC registered</option><option value="state">State registered</option><option value="mixed">Mixed registrations</option><option value="other">Other / not applicable</option></select><small>Context only; no regulatory multiplier is applied.</small></label>
 {multi&&<><Field label="Firms supervised" value={inputs.firms} max={1000} onChange={v=>set('firms',Math.max(1,Math.floor(v)))}/><label className={styles.field}><span>Workload numbers below cover</span><select value={inputs.scope} onChange={e=>set('scope',e.target.value)}><option value="portfolio">My entire portfolio</option><option value="firm">One average firm</option></select><small>{inputs.scope==='firm'?'Workload is multiplied by '+result.firms+' firms.':'Workload is counted once across all firms.'} Prices, setup and overhead always cover the entire portfolio.</small></label></>}
 <details open><summary>01 / Where the hours go</summary>
 {WORKFLOWS.map(w=><Field key={w.key} label={w.label+(w.key==='preparation'?' · hours/year':' · hours/month')} hint={w.description} value={Number(inputs[w.key as keyof Inputs])} onChange={v=>set(w.key as keyof Inputs,v)}/>)}
 <Field label="Fully loaded hourly cost" value={inputs.hourly} max={2000} onChange={v=>set('hourly',v)} hint="Salary, benefits and employer costs per hour. Use a blended rate for the people doing this work."/>
 </details>
 <details><summary>02 / What can actually improve?</summary>
 <p className={styles.small}>Hypotheses to validate in a pilot. Reductions apply only to covered work that the team adopts.</p>
 {(['reductionReview','reductionMeetings','reductionRetrieval','reductionPreparation'] as const).map((k,i)=><Field key={k} range max={90} label={WORKFLOWS[i].label+' reduction'} value={inputs[k]} onChange={v=>set(k,v)}/>)}
 <Field range label="Workload with usable evidence" value={inputs.coverage} max={100} onChange={v=>set('coverage',v)} hint="Share supported by accessible, indexed evidence. Missing channels receive no assumed benefit."/>
 <Field range label="Adoption of the new workflow" value={inputs.adoption} max={100} onChange={v=>set('adoption',v)}/>
 <Field label="Months to reach full adoption" value={inputs.ramp} max={12} onChange={v=>set('ramp',v)}/>
 <Field label="Extra oversight · hours/month" value={inputs.overhead} onChange={v=>set('overhead',v)} hint="Additional checking and maintenance across the whole organisation."/>
 </details>
 <details><summary>03 / Costs and cash reality</summary>
 <Field label="ComplyVault quote · total/month" value={inputs.monthlyPrice} onChange={v=>set('monthlyPrice',v)} hint="Enter your actual quote. Zero means pricing has not been supplied; this is not a free plan."/>
 <Field label="One-time implementation fee" value={inputs.setupFee} onChange={v=>set('setupFee',v)}/>
 <Field label="Internal setup · total hours" value={inputs.setupHours} onChange={v=>set('setupHours',v)}/>
 <Field label="Existing archive · total/month" value={inputs.archiveSpend} onChange={v=>set('archiveSpend',v)} hint="Retained in the cost baseline. No archive replacement saving is assumed."/>
 <Field label="Confirmed tool costs retired/month" value={inputs.avoidableSpend} onChange={v=>set('avoidableSpend',v)} hint="Only non-archive costs you can actually cancel. Exclude labour already counted above. Assumed retired from month one."/>
 <Field range max={100} label="Released labour value realised in cash" value={inputs.cashPercent} onChange={v=>set('cashPercent',v)} hint="Keep at zero unless hours will reduce paid overtime, contractor spend or another cash expense. Apply the same share to additional labour costs."/>
 {multi&&<Field label="Hours to serve one extra firm/year" value={inputs.firmHours} onChange={v=>set('firmHours',v)} hint="Use the entire engagement workload, including work ComplyVault cannot automate."/>}
 </details>
 <button className={styles.btn+' '+styles.secondary} onClick={()=>{setInputs({...DEFAULTS});setScenario('base');setChecks(['unknown','unknown','unknown','unknown'])}}>Reset model</button>
 </aside>
 <section className={styles.results} aria-label="Live model results">
 <div className={styles.resultHero}>
 <div className={styles.eyebrow}>Your first-year capacity case</div>
 <div className={styles.scenario} role="group" aria-label="Efficiency scenario">{scenarios.map(s=><button key={s.key} aria-pressed={scenario===s.key} onClick={()=>setScenario(s.key)}>{s.label}</button>)}</div>
 <div className={styles.mainNumber}>{currency(result.net)}</div>
 <p>{priceKnown?'Estimated net capacity value in year one':'Estimated capacity value before subscription costs'}</p>
 <p className={styles.small}>{number(result.released)} hours after ramp-up, additional oversight and setup. {priceKnown?'Includes the quote you entered.':'Enter a quote under costs to calculate net value and payback.'} Staff time has economic value; it does not automatically reduce expenditure.</p>
 </div>
 <div className={styles.metrics}>
 <div className={styles.metric}><span>First-year hours released</span><strong>{number(result.released)}h</strong><span>after implementation effort</span></div>
 <div className={styles.metric}><span>Modelled cash balance</span><strong>{priceKnown?currency(result.cash):'Quote needed'}</strong><span>{inputs.cashPercent}% labour cash realisation</span></div>
 <div className={styles.metric}><span>Capacity-value payback</span><strong>{!priceKnown?'Quote needed':result.breakEven?'Month '+result.breakEven:'Beyond year 1'}</strong><span>cash payback can differ</span></div>
 </div>
 {result.released<0&&<p className={styles.insight}>The model adds more labour than it releases. Check coverage, adoption and additional oversight before making an investment case.</p>}
 <section className={styles.panel}><div className={styles.panelTop}><h2>Where capacity comes back</h2><span className={styles.pill}>{number(result.effectiveReduction)}% effective reduction</span></div><p className={styles.small}>Current annual labour value: {currency(result.baseline*inputs.hourly)}. Archive spend retained: {currency(result.archive)}/year. Changing archive spend does not create a saving.</p><WorkflowChart result={result}/><details><summary>See exact annual hours</summary><div className={styles.tableWrap}><table><thead><tr><th>Workflow</th><th>Current hours</th><th>Hours released*</th></tr></thead><tbody>{result.rows.map(r=><tr key={r.key}><td>{r.label}</td><td>{r.annual.toFixed(1)}</td><td>{r.saved.toFixed(1)}</td></tr>)}</tbody></table></div><p className={styles.small}>*At full adoption, before extra oversight. The financial model applies the first-year ramp separately.</p></details></section>
 <section className={styles.panel}><div className={styles.panelTop}><h2>The first twelve months</h2><span className={styles.pill}>Includes implementation</span></div><ValueChart result={result} priceKnown={priceKnown}/></section>
 <section className={styles.panel}><h2>Does the case survive a slower start?</h2><p className={styles.small}>Cautious uses 60% of your reduction assumptions. Stretch uses 125%, capped at 90% per workflow. These are scenarios, not confidence intervals.</p><div className={styles.tableWrap}><table><thead><tr><th>Case</th><th>Year-one hours</th><th>{priceKnown?'Net capacity value':'Value before subscription'}</th></tr></thead><tbody>{allCases.map(c=><tr key={c.key}><td>{c.label}</td><td>{number(c.result.released)}</td><td>{currency(c.result.net)}</td></tr>)}</tbody></table></div>
 {priceKnown&&<p className={styles.small}>Year-one return on modelled investment: {result.roi===null?'Not applicable':number(result.roi)+'%'}. Investment includes subscription, implementation fee, setup labour and additional oversight labour.</p>}{multi&&<p className={styles.insight}>{result.capacity===null?'Enter the annual workload for one additional firm to model engagement capacity.':result.capacity.toFixed(1)+' firm-equivalents of annual capacity at full adoption.'} This is a workload comparison, not a forecast of additional clients, revenue or staffing capacity.</p>}
 </section>
 <section className={styles.panel}><div className={styles.panelTop}><h2>Can you reconstruct the record?</h2><span className={styles.pill}>{confirmed}/4 confirmed</span></div><p className={styles.small}>Self-reported workflow checks. {known}/4 answered. These do not certify compliance or change the savings calculation.</p>
 <div className={styles.readiness}>{readinessLabels.map((label,i)=><label className={styles.field} key={label}><span>{label}</span><select value={checks[i]} onChange={e=>setChecks(p=>p.map((v,j)=>j===i?e.target.value:v))}><option value="unknown">Not yet checked</option><option value="yes">Yes, tested</option><option value="partial">Partially</option><option value="no">No</option></select></label>)}</div>
 {checks.map((v,i)=>v!=='yes'?<p key={i} className={styles.insight}>{readinessActions[i]}</p>:null)}
 {confirmed===4&&<p className={styles.insight}>Next, time a repeatable examiner-style request and use it as the pilot baseline.</p>}
 </section>
 <section className={styles.panel}><h2>Keep the assumptions with the answer.</h2><p>Save this model for a team discussion. Your inputs and scenario travel with the result.</p><div className={styles.row+' '+styles.noprint}><button className={styles.btn} onClick={()=>window.print()}>Print / save PDF</button><button className={styles.btn+' '+styles.secondary} onClick={download}>Download model</button></div></section>
 </section>
 </div>
 <article className={styles.article} id="methodology">
 <div className={styles.eyebrow}>The field guide</div><h2>A retained record still has a cost to use.</h2><p>An archive answers whether a record was retained. Preparing an examination response also takes retrieval, context, review and a traceable explanation. This model prices that human work using your own inputs.</p>
 <h2>Count a task once.</h2><p>Enter communications review, meeting documentation and evidence retrieval as monthly hours. Enter incremental exam and annual-review preparation as annual hours. If finding a document is already counted under retrieval, do not count it again under preparation. Multi-firm teams can enter portfolio totals or an average firm workload.</p>
 <h2>The mathematics stays visible.</h2><p>Annual hours potentially released = baseline hours × workflow reduction × usable-evidence coverage × adoption. In the first months, this is multiplied by month ÷ ramp months, capped at one. Additional oversight and setup hours are then deducted.</p><p>Year-one capacity value = released hours × loaded hourly cost + confirmed retired-tool spend − subscription − implementation fee. Cash balance applies your cash-realisation share to the labour value. Existing archiving spend stays in place and contributes no savings. Preparation work is spread evenly across the year, so the chart models planning value rather than invoice timing.</p>
 <div className={styles.insight}>All starting values and efficiency assumptions are illustrative. They are not customer results, industry benchmarks, a product quote or a guarantee. Use zero coverage for an unsupported evidence source. Validate the selected workflows and integrations with ComplyVault before using this estimate in a purchase decision.</div>
 <h2>Turn the estimate into a pilot.</h2><p>Choose one firm, one review workflow and one historical evidence request. Measure the original work, then repeat it with ComplyVault using the same evidence and review standard. Record corrections and checking time. Replace this model’s assumptions with the measured result.</p>
 <div className={styles.printOnly}><h2>Assumptions in this report</h2><pre style={{whiteSpace:'pre-wrap',fontSize:12}}>{JSON.stringify({scenario,...inputs,readiness:checks},null,2)}</pre></div>
 </article>
 <section className={styles.panel+' '+styles.noprint} id="discuss"><h2>Bring your model to a workflow conversation.</h2><p>Share your assumptions with ComplyVault to check integration fit, the workload baseline and pricing.</p>
 {status==='success'?<div className={styles.status} role="status">Your request and model were submitted successfully. You can still print or download your assessment above.</div>:captchaReady?<form className={styles.form} onSubmit={submit}>
 <label className={styles.field}><span>Your name</span><input type="text" autoComplete="name" required maxLength={100} value={contact.name} onChange={e=>setContact(p=>({...p,name:e.target.value}))}/></label>
 <label className={styles.field}><span>Business email</span><input type="email" autoComplete="email" required maxLength={254} value={contact.email} onChange={e=>setContact(p=>({...p,email:e.target.value}))}/></label>
 <label className={styles.field+' '+styles.full}><span>Company</span><input type="text" autoComplete="organization" required maxLength={150} value={contact.company} onChange={e=>setContact(p=>({...p,company:e.target.value}))}/></label>
 <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:'none'}} value={contact.website} onChange={e=>setContact(p=>({...p,website:e.target.value}))}/>
 <label className={styles.checkbox+' '+styles.full}><input type="checkbox" required checked={contact.consent} onChange={e=>setContact(p=>({...p,consent:e.target.checked}))}/><span>I agree to share this model and my contact details with ComplyVault for a discussion about this assessment. <Link href="/privacy">Privacy policy</Link>.</span></label>
 <div className={styles.full}><Turnstile ref={captcha} siteKey={key!} onSuccess={setToken} onExpire={()=>setToken(null)} onError={()=>{setToken(null);setStatus('error')}}/>
 {status==='error'&&<p role="alert" className={styles.error}>We could not submit this request. Please retry the verification, or <Link href="/contact">contact us directly</Link>. Your calculator inputs are still available.</p>}
 <button type="submit" className={styles.btn} disabled={status==='sending'||!token||!contact.consent}>{status==='sending'?'Submitting…':'Discuss my model'}</button></div>
 </form>:<Link href="/contact" className={styles.btn}>Contact ComplyVault</Link>}
 <p className={styles.small} style={{marginTop:16}}>No email is needed to use or export this calculator. Contact details and the model are sent only when you submit this form. No automated report email or newsletter subscription is created.</p>
 </section>
 {reading.length>0&&<section className={styles.noprint}><h2>Go deeper into the evidence.</h2><div className={styles.reading}>{reading.map(post=><Link key={post.slug} href={'/blog/'+post.slug} className={styles.card}>{post.image&&/* eslint-disable-next-line @next/next/no-img-element */<img src={post.image} alt={post.alt} loading="lazy" width="900" height="506"/>}<div><h3>{post.title}</h3><p>{post.excerpt}</p><span>Read field note →</span></div></Link>)}</div></section>}
 <footer className={styles.footer}><span>ComplyVault · Operational planning model, version 1.0</span><Link href="/privacy">Privacy</Link></footer>
 </div></main>
}
