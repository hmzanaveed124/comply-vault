// Illustrative records only. Never customer data or measured product results.
export const demo = {
  client: "Robert Calloway",
  meeting: "Annual review",
  date: "21 Oct 2026",
  hash: "d7a9f83b6e4c21a095d0fba8731ce640a78d31b905e6c294f83a71de420cb659",
  notes: [
    {
      label: "Priorities",
      text: "Explore retiring at 62 rather than 65.",
      time: "00:14:32",
      status: "Needs confirmation",
      excerpt:
        "Robert: I would like to understand whether retiring at 62 is realistic. I am not making that decision today.",
    },
    {
      label: "Decisions",
      text: "Model the earlier retirement date before changing the plan.",
      time: "00:16:08",
      status: "Draft",
      excerpt:
        "Adviser: We will compare both dates first. We are keeping the current plan in place while we work through the figures.",
    },
    {
      label: "Follow-ups",
      text: "Send a comparison of the two fee options.",
      time: "00:28:41",
      status: "Open",
      excerpt:
        "Adviser: I will send you a side-by-side comparison of the two fee options before our next conversation.",
    },
  ],
  flag: "Risk tolerance change not documented in IPS",
  riskExcerpt:
    "Robert: I am less comfortable with market swings now that retirement is getting closer. Can we review the level of risk?",
  trail: [
    "Drafted from recording · 10:42",
    "Edited by adviser · 11:05",
    "Reviewed by CCO · 14:12",
  ],
  inbox: [
    {
      client: "Robert Calloway",
      subject: "Risk tolerance and IPS",
      status: "Escalated",
    },
    {
      client: "Maya Chen",
      subject: "Annual review documentation",
      status: "Cleared",
    },
    {
      client: "James Torres",
      subject: "Quarterly supervision sample",
      status: "Sampled",
    },
    {
      client: "Helen Brooks",
      subject: "Unindexed source referenced",
      status: "Held",
    },
  ],
  pack: [
    { label: "Request item", value: "Client review and decision history" },
    { label: "Scope", value: "Robert Calloway · 1 Oct to 31 Oct 2026" },
    {
      label: "Candidate evidence",
      value: "Meeting transcript, reviewed note, audit trail",
    },
    { label: "Coverage", value: "3 records included · 1 source held" },
  ],
};
export const integrations = [
  "Microsoft 365",
  "Gmail",
  "Zoom",
  "Microsoft Teams",
  "Redtail",
  "DocuSign",
];
export const faq = [
  [
    "What can I use today?",
    "Review recordings, inspect transcript-linked notes, record CCO sign-off and export documentation packs. Email and meeting ingest connect the record to the tools your firm uses.",
  ],
  [
    "Do I need a meeting booked to prepare?",
    "Preparation begins with the client context, not a calendar invitation. Ask to see how briefs, open commitments and information gaps fit your firm’s working day.",
  ],
  [
    "Does ComplyVault connect to my CRM, email or WhatsApp?",
    "Supported connections include Microsoft 365, Gmail, Zoom, Microsoft Teams, Redtail and DocuSign. WhatsApp is not listed as a supported connection. Unindexed sources are refused and logged rather than treated as evidence.",
  ],
  [
    "What makes the follow-through different?",
    "The documentation stays connected to its evidence and review history. Inspect the transcript context, correct the draft and preserve sign-off alongside the exported record.",
  ],
  [
    "Who reviews and finalizes the record?",
    "Team members can contribute to draft records. CCO or owner roles finalize them. Your firm remains responsible for its review decisions and documentation requirements.",
  ],
  [
    "Does a documentation pack guarantee compliance?",
    "No. ComplyVault supports documentation and review. AI-generated drafts need human review, and an export does not establish that advice or a firm is compliant.",
  ],
];
export const useCases = [
  {
    text: "Prepare for a client meeting with the full context",
    pill: "Prepare",
    href: "#adviser-view",
  },
  {
    text: "Turn a meeting into a reviewed, source-linked note",
    pill: "Meet",
    href: "#source-evidence",
  },
  {
    text: "See which conversations need supervision",
    pill: "Review",
    href: "#review-inbox",
  },
  {
    text: "Show how a client decision was handled",
    pill: "Inspect",
    href: "#source-evidence",
  },
  {
    text: "Respond to a document request",
    pill: "Export",
    href: "#documentation-pack",
  },
];
