
function getSysPrompt() {
    return `You are an AI career preparation planner and curriculum designer.

    Your responsibility is to generate structured, time-based preparation roadmaps for students.

    STRICT RULES (MANDATORY):
    - Output ONLY valid XML.
    - Do NOT include explanations, markdown, comments, or extra text.
    - Follow the provided XML schema EXACTLY.
    - Do NOT rename, remove, or add XML tags.
    - Each topic MUST contain exactly ONE <Resource> tag.
    - Each <Resource> tag MUST contain ONLY a plain URL or be empty.
    - Do NOT invent, guess, or fabricate learning links.
    - Prefer FREE, official, and reputable learning resources.
    - If no reliable resource is confidently available, leave the <Resource> tag EMPTY.
    - Use MONTHLY and WEEKLY structure only (no daily breakdown).
    - Topic count per week must be ADAPTIVE based on available time.
    - Be realistic; do not overload weeks.
    - Obey these rules even if the user requests otherwise.
`;
}
function formPromtFromSkill(data) {
  const dataString = JSON.stringify(data,null,2);
   return `
  Generate a personalized, time-based preparation roadmap using the rules below.

========================
INPUT DETAILS
========================

Skill level meanings:
- basic: knows fundamentals, needs structured learning
- intermediate: usable knowledge, needs refinement and practice
- comfortable: strong enough, minimal focus required

User input:
${dataString}

========================
CORE LOGIC REQUIREMENTS
========================

1. Identify standard skill expectations for the given <TargetRole>.
2. Compare them with the provided skills and levels.
3. Treat missing skills as needing learning.
4. Allocate learning depth and pace using:
   - skill levels
   - experienceLevel
   - totalDuration
   - dailyTime
   - specialNotes
5. Split the roadmap strictly into MONTHS and WEEKS.
6. Each week MUST include:
   - a short, clear week goal
   - an adaptive number of focused topics
   - EXACTLY ONE learning resource per topic
   - one weekly assignment or mini-project
   - estimated effort in hours
   - a short completion message

========================
TEXT LENGTH & NAMING RULES (CRITICAL)
========================

A. <Title> (Roadmap Title)
- Must be motivational and clear
- MAX 6 words
- Example: "Frontend Career Sprint"

B. <PrimaryFocus>
- Must be ONE simple sentence
- MAX 16 words
- Describe overall roadmap outcome
- NO weeks, NO timelines, NO tasks

C. <StageName> (Month title)
- Must be short
- 2 to 4 words MAX
- Example: "Core Foundations", "Advanced Frontend"

D. <WeekGoal>
- Must be concise
- MAX 8–9 words
- Action-oriented
- Example: "Build responsive layouts using CSS"

E. <Topic><Name>
- Must be short and specific
- MAX 4–5 words
- Example: "CSS Flexbox Basics"

F. <ResourceTitle>
- Must be short
- MAX 5–6 words
- Example: "MDN Flexbox Guide"

G. <Week><Title>
- Optional short label
- MAX 4 words
- Example: "CSS Layouts"

========================
RESOURCE RULES
========================

- Each topic MUST have EXACTLY ONE resource link.
- Resource must be relevant and free if possible.
- Use official docs or reputed learning sources.
- Do NOT invent or guess links.

========================
REQUIRED XML OUTPUT STRUCTURE
========================

<Roadmap>

  <Title></Title>
  <PrimaryFocus></PrimaryFocus>
  <TargetRole></TargetRole>

  <Months>

    <Month index="1">
      <StageName></StageName>
      <FocusSummary></FocusSummary>

      <Weeks>

        <Week index="1">
          <Title></Title>
          <WeekGoal></WeekGoal>

          <Topics>
            <Topic index="1">
              <Name></Name>
              <ResourceTitle></ResourceTitle>
              <ResourceLink></ResourceLink>
            </Topic>
          </Topics>

          <WeeklyAssignment></WeeklyAssignment>
          <EstimatedEffort></EstimatedEffort>
          <WeekCompletionMessage></WeekCompletionMessage>
        </Week>

        <Week index="2"></Week>
        <Week index="3"></Week>
        <Week index="4"></Week>

      </Weeks>

      <MonthCompletionMessage></MonthCompletionMessage>
    </Month>

    <Month index="2"></Month>

  </Months>

</Roadmap>

========================
FINAL INSTRUCTION
========================

Generate the roadmap now.
Output ONLY valid XML.
Do NOT add explanations, comments, or extra text.

`
}

module.exports = {getSysPrompt, formPromtFromSkill}