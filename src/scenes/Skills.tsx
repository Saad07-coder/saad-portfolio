
import { useState } from 'react';

const categories = [
  {
    name: 'LANGUAGES',
    description: 'Programming languages',
    skills: [
      { name: 'Python', icon: 'Py', detail: 'Data analysis, automation and machine learning' },
      { name: 'SQL', icon: 'DB', detail: 'Data querying and analysis' },
      { name: 'R', icon: 'R', detail: 'Statistical analysis and data science' },
      { name: 'C++', icon: 'C+', detail: 'Programming and problem solving' },
    ],
  },
  {
    name: 'DATA ANALYSIS',
    description: 'Analysis and data manipulation',
    skills: [
      { name: 'Pandas', icon: 'Pd', detail: 'Data cleaning and manipulation' },
      { name: 'NumPy', icon: 'Np', detail: 'Numerical computing' },
      { name: 'Excel', icon: 'X', detail: 'Pivot Tables, VLOOKUP and reporting' },
      { name: 'Google Sheets', icon: 'GS', detail: 'Data processing and collaboration' },
    ],
  },
  {
    name: 'MACHINE LEARNING',
    description: 'Models and algorithms',
    skills: [
      { name: 'Scikit-learn', icon: 'Sk', detail: 'Machine learning models' },
      { name: 'Regression', icon: 'ML', detail: 'Predictive modelling' },
      { name: 'Classification', icon: 'Cl', detail: 'Prediction and categorization' },
      { name: 'Feature Engineering', icon: 'FE', detail: 'Preparing useful model features' },
    ],
  },
  {
    name: 'DATA VISUALIZATION',
    description: 'Dashboards and BI tools',
    skills: [
      { name: 'Power BI', icon: 'BI', detail: 'Interactive business dashboards' },
      { name: 'Tableau', icon: 'Tb', detail: 'Data visualization and storytelling' },
      { name: 'Matplotlib', icon: 'Mp', detail: 'Charts and plots with Python' },
      { name: 'Seaborn', icon: 'Sb', detail: 'Statistical visualization' },
    ],
  },
  {
    name: 'DATABASES',
    description: 'Query and data management',
    skills: [
      { name: 'MySQL', icon: 'My', detail: 'Relational database queries' },
      { name: 'PostgreSQL', icon: 'Pg', detail: 'Structured data management' },
    ],
  },
  {
    name: 'TOOLS & PLATFORM',
    description: 'Development and productivity',
    skills: [
      { name: 'Jupyter Notebook', icon: 'Jn', detail: 'Interactive data analysis' },
      { name: 'Git & GitHub', icon: 'Git', detail: 'Version control and collaboration' },
      { name: 'VS Code', icon: 'VS', detail: 'Development environment' },
      { name: 'PowerPoint', icon: 'P', detail: 'Presenting analytical findings' },
    ],
  },
  {
    name: 'STATISTICS',
    description: 'Analytical concepts',
    skills: [
      { name: 'Probability', icon: 'Pr', detail: 'Reasoning under uncertainty' },
      { name: 'Hypothesis Testing', icon: 'Ht', detail: 'Testing data-driven assumptions' },
      { name: 'Correlation', icon: 'Cr', detail: 'Understanding variable relationships' },
      { name: 'Descriptive Statistics', icon: 'Ds', detail: 'Summarizing datasets' },
    ],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const selected = categories[active];

  return (
    <section
      id="skills"
      data-scene="skills"
      className="scene skills toolkit-page"
    >
      <div className="toolkit-inner">
        <div className="section-label">
          <span>(05)</span> — SKILLS / TOOLKIT
        </div>

        <header className="toolkit-heading">
          <h2>
            MY SKILL
            <br />
            <em>UNIVERSE.</em>
          </h2>
          <p>
            Explore the tools and technologies I use across
            data analysis, visualization and machine learning.
          </p>
        </header>

        <div className="toolkit-layout">
          <aside className="toolkit-sidebar">
            {categories.map((category, index) => (
              <button
                type="button"
                key={category.name}
                className={`toolkit-category ${
                  active === index ? 'active' : ''
                }`}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <strong>{category.name}</strong>
                <span>
                  {category.skills.length} skills · {category.description}
                </span>
              </button>
            ))}
          </aside>

          <div className="toolkit-content">
            <div className="toolkit-content-heading">
              <h3>{selected.name}</h3>
              <p>{selected.description}</p>
            </div>

            <div className="toolkit-cards" key={selected.name}>
              {selected.skills.map((skill) => (
                <article className="toolkit-card" key={skill.name}>
                  <div className="toolkit-skill-icon" aria-hidden="true">
                    {skill.icon}
                  </div>
                  <h4>{skill.name}</h4>
                  <p>{skill.detail}</p>
                </article>
              ))}
            </div>

            <div className="toolkit-footnote">
              <span>✳</span> DATA · INSIGHT · IMPACT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
